import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { Observable, from, of, forkJoin } from 'rxjs';
import { switchMap, finalize, take } from 'rxjs/operators';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { ToastController } from '@ionic/angular';
import { Plugins,FilesystemDirectory } from '@capacitor/core';
import * as CapacitorSQLPlugin from '@capacitor-community/sqlite';
const { CapacitorSQLite,Device } = Plugins;
import { ServerService } from 'src/app/services/server.service';
import { NetworkService, ConnectionStatus } from 'src/app/services/network.service';
import { async } from 'rxjs/internal/scheduler/async';
import { Network } from '@ionic-native/network/ngx';
import { Router } from '@angular/router';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer/ngx';
import { File } from '@ionic-native/file/ngx';
const {Filesystem} = Plugins;
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';
import { LoadingController } from '@ionic/angular';

 
const STORAGE_REQ_KEY = 'storedreq';
 
interface StoredRequest {
 
  type: string,
  id: string,
  timestamp:Date,
  sw_id:number,
  taluk_id:number
}
const httpOptions = {
  headers: new HttpHeaders({
  'Content-Type':  'application/json'
 })
};

@Injectable({
  providedIn: 'root'
})
export class OfflineManagerService {
 
  constructor( private platform: Platform,private storage: Storage, private http: HttpClient, private toastController: ToastController,
    private serverService: ServerService, private networkService : NetworkService,private network: Network,
    private file:File,private transfer:FileTransfer,
    private androidPermissions: AndroidPermissions,private router: Router,
    private loadingCtrl: LoadingController) { }
    public baseUrl= 'http://13.126.225.131:8080/kshema';
     
    newpatientData = {
      "group_data_id":'',
      "patient_uuid":'',
      "kshema_id":'',
      "name":'',
      "demographic_info": '',
      "needs_assessment":'',
      "consent_arr":'',
      "uuid_info":'',
      'status':''
    };
     newpatientVisitData = {
      "clinical_visits_uuid":'',
      "patient_uuid":'',
      "social_worker_id":1,
      "visit_date":'',
      "visit_type":'',
      "visit_details":'',
      "followup_date":new Date(),
      "prv_visit_uuid":'',
    };

    newpatientTaskData = {
      "tasks_uuid":'',
      "patient_uuid":'',
      "task_type":3,
      "creation_date":'',
      "task_due_date":new Date(),
      "task_details":'',
      "status":'',
    
      "prev_record_uuuid":'',
      "origin_record_id":''
    };
    offlineLoginData = {
      loginData:'',
      swData:'',
      groupData:''
    }

  _sqlite: any;
  DBstatus: any;
  sw_id1 = sessionStorage.getItem("sw_id");
  sw_id = parseInt(this.sw_id1);
  taluk_id1 = sessionStorage.getItem("taluk_id");
  taluk_id = parseInt(this.taluk_id1);
  today_visit_data:any;
  remainging_array:any;
  reciever_user_id;

 dashObj:any= {
  today_visit_data:"",
  today_task:0,
  upcoming_visit:0,
  upcoming_task:0,
  overdue_visit:0,
  overdue_task:0,
  task_completed:0,
  note_count:0,
  total_patients:0,
  syncCount:0

}
 countObj:any = {
   notes_data:"",
phc_count:0,
home_count:0,
phone_count:0,
wel_count:0,
udid_count:0,
rehb_count:0

}
historyObj:any = {
  history_data:"",
  notes_data:"",
  pat_data:"",
  task_data:""

}
udidObj:any = {
  udid_uuid_data:"",
  latest_udid_data:""
}
homeVisitOj:any = {
  last_phc_data:"",
  last_phone_data:"",
  last_visit_data:""
}
mimeType:string="";
fileUri:string="";
url:string=""
 

  //request permission on device. if allowed, then create db and tables
  async openDatabase() {
   
    const info = await Device.getInfo();
   
    if(info.platform === "ios" || info.platform === "android") {
    
     
      this._sqlite = CapacitorSQLite;
     
      console.log(JSON.stringify(this._sqlite))
      

    //new working code for permissions 
    this._sqlite .addListener(
          'androidPermissionsRequest', async (data:any) => { 
           
          if(data.permissionGranted === 1) {
           //console.log("Permission  granted");
          }else{
         
             // console.log("Permission not granted");
              this._sqlite = null;
          }      
      });
      try {
         this._sqlite .requestPermissions();
      } catch (e) {
          console.log("Error requesting permissions " + JSON.stringify(e));
        
      }
      //end of new working code

    }else if(info.platform === "electron") {
      // this._sqlite = CapacitorSQLPlugin.CapacitorSQLiteElectron;
    }else{
      
      this._sqlite = CapacitorSQLPlugin.CapacitorSQLite;
    }
     
      let result:any = await this._sqlite.open({database:"patientDB"});
      this.DBstatus = result.result;
     
  }
  
 
  //called on app init, upon clicking sync button, if network status is online (after a time interval)
  checkForEvents(): Observable<any> {

    return from(Plugins.Storage.get({ key: 'storedreq' })).pipe(
      switchMap(object => {
    
        let storedObj = JSON.parse(object.value);
        //checking whether the storage is empty or contains data for sync with the server db
        if (storedObj && storedObj.length > 0) {
         this.sendRequests(storedObj);
          
        } else {
         // console.log('no local events to sync');
         let toast = this.toastController.create({
          message: `No data to synchronize!`,
          cssClass: 'alert_black_bg',
          duration: 3000,
          position: 'bottom'
        });
        toast.then(toast => toast.present());
          return of(false);
        }
      })
    )
  }

  //on submit, save the uuid of data and type of action in the request table
  storeRequest(type,id,timestamp,sw_id,taluk_id) {
   
    let toast = this.toastController.create({
      message: `Your data is stored locally.`,
      cssClass: 'alert_black_bg',
      duration: 3000,
      position: 'bottom'
    });
    toast.then(toast => toast.present());

    //action has the data which we pass in the storeRequest method each time
    let action: StoredRequest = {
      type: type,
      id: id,
      timestamp: timestamp,
      sw_id:sw_id,
      taluk_id:taluk_id
     

    };
   
      return  Plugins.Storage.get({ key: 'storedreq' }).then(object => {

    
     let storedObj = JSON.parse(object.value);
    
      //is storadObj has previously stored value, we are pushing the action data into it each time
      if (storedObj) {
       
       storedObj.push(action);
        
      } else {
       //if storedObj has no data (storage is empty), then initializing storedObj as array of action  object
        storedObj = [action];
      }
    
      
      return Plugins.Storage.set({key: 'storedreq', value:  JSON.stringify(storedObj)});
     
    });

    
  }
  
 
  //synchronise to server db with the local db data  after checking the request if there exists any data to sync(not the sqlite table data)
  async sendRequests(operations: StoredRequest[]) {

    let toast = this.toastController.create({
      message: `Synchronization in progress.Please wait...!`,
      cssClass: 'alert_black_bg',
      duration: 3000,
      position: 'bottom'
    });
    toast.then(toast => toast.present());

    let obs:StoredRequest[] = [];
    obs=operations;
    let failed_array = [];
     
      for (var i =0;i<operations.length; i++) {
              
              if(operations[i].type == "patient"){
                 
                  let test = await this.sqlQuery("getPatient",{patient_uuid:operations[i].id}).then(async patientData => {
                 
                  let id = obs.findIndex(x => x.type ==="patient" && x.id === patientData.patient_uuid);
                 
                  let patient_uuid = patientData.patient_uuid;
             
                  this.newpatientData = {
                    "group_data_id":patientData.group_data_id,
                    "patient_uuid":patientData.patient_uuid,
                    "kshema_id":"0",
                    "name":patientData.name,
                    "demographic_info": patientData.demographic_info,
                    "needs_assessment":patientData.needs_assessment,
                    "consent_arr":patientData.consent_arr,
                    "uuid_info":patientData.uuid_info,
                    'status':patientData.status
                  };
          
                
                 let testsync = await this.serverService.addPatientServerDb(this.newpatientData,obs[id].sw_id,obs[id].taluk_id).toPromise().then(
                   result => {
                    
                    if(result == true){
                     
                      console.log("Success");
                      this.updateKshema(patient_uuid);
                     
                     }else{
                      
                      console.log("error");
                      failed_array.push(obs.findIndex(x => x.type ==="patient" && x.id === patientData.patient_uuid));
                 
                     }
                    
          
                  },error => {
                    
                    console.log(error);
                    failed_array.push(obs.findIndex(x => x.type ==="patient" && x.id === patientData.patient_uuid));
                 
                   
                  }
                );
               
                },error => {
                 
                  console.log(error);
                 
                });
          
                 
              }else if(operations[i].type == "clinical_visits"){
                
                  let test = await this.sqlQuery("getVisit",{clinical_visits_uuid:operations[i].id}).then(async newVisitData => {
                    
                  let date_new  = new Date(newVisitData.followup_date);
                  newVisitData.followup_date = new Date(date_new.getTime() + 1*24*60*60*1000);
                 
                  this.newpatientVisitData = {
                    "clinical_visits_uuid":newVisitData.clinical_visits_uuid,
                    "patient_uuid":newVisitData.patient_uuid,
                    "social_worker_id":newVisitData.social_worker_id,
                    "visit_date":newVisitData.visit_date,
                    "visit_type":newVisitData.visit_type,
                    "visit_details":newVisitData.visit_details,
                    "followup_date": newVisitData.followup_date,
                    "prv_visit_uuid":newVisitData.prv_visit_uuid,
                  };
          
                  let testsync = await this.serverService.addNewVisitServerDb(this.newpatientVisitData).toPromise().then(
                    result => {
                    if(result == true){
                     
                      console.log("Success");
                    }else{
                     
                      console.log("error");
                      failed_array.push(obs.findIndex(x => x.type ==="clinical_visits" && x.id === newVisitData.patient_uuid));
                   
                     }
                   
                  },error => {
                    
                    console.log(error);
                    failed_array.push(obs.findIndex(x => x.type ==="clinical_visits" && x.id === newVisitData.patient_uuid));
                   
                  });
                },error => {
                 
                  console.log(error);
                  
                });
          
              }else if(operations[i].type == "tasks"){
            
                let test = await this.sqlQuery("getTask",{tasks_uuid:operations[i].id}).then(async newTasksData => {
                 
                  if(newTasksData.task_due_date){
                    let date_new  = new Date(newTasksData.task_due_date);
                    newTasksData.task_due_date = new Date(date_new.getTime() + 1*24*60*60*1000);
                  }else{
                    newTasksData.task_due_date = "";
                  }

                  this.newpatientTaskData = {
                    "tasks_uuid":newTasksData.tasks_uuid,
                    "patient_uuid":newTasksData.patient_uuid,
                    "task_type":newTasksData.task_type,
                    "creation_date":newTasksData.creation_date,
                    "task_due_date":newTasksData.task_due_date,
                    "task_details":newTasksData.task_details,
                    "status":"pending",
                    "prev_record_uuuid":newTasksData.prev_record_uuuid,
                    "origin_record_id":newTasksData.origin_record_id,
                  };
                
                  
                  let testsync = await this.serverService.addNewTaskServerDb(this.newpatientTaskData).toPromise().then(
                    result => {
                    if(result == true){
                     
                      console.log("Success");
                    }else{
                     
                      console.log("error");
                      failed_array.push(obs.findIndex(x => x.type ==="tasks" && x.id === newTasksData.tasks_uuid));
                    
                     }
                    
                  },error => {
                    
                    console.log(error);
                    failed_array.push(obs.findIndex(x => x.type ==="tasks" && x.id === newTasksData.tasks_uuid));
                  });
                },error => {
                  
                  console.log(error);
                });
              }else if(operations[i].type == "editpatient"){
               
              let test = await this.sqlQuery("getPatient",{patient_uuid:operations[i].id}).then( async updatedPatientData => {
             
              this.newpatientData = {
                "group_data_id":updatedPatientData.group_data_id,
                "patient_uuid":updatedPatientData.patient_uuid,
                "kshema_id":updatedPatientData.kshema_id,
                "name":updatedPatientData.name,
                "demographic_info": updatedPatientData.demographic_info,
                "needs_assessment":updatedPatientData.needs_assessment,
                "consent_arr":updatedPatientData.consent_arr,
                "uuid_info":updatedPatientData.uuid_info,
                'status':updatedPatientData.status
              };

              let testsync = await this.serverService.EditedPatientDemoServerDb(this.newpatientData).toPromise().then(result => {
              
              if(result == true){
                
                console.log("Success")
              }else{
                
                console.log("error");
              }
              },error => {
               
                console.log(error);
                failed_array.push(obs.findIndex(x => x.type ==="editpatient" && x.id === updatedPatientData.patient_uuid));
              });
                  
              },error => {
                
                console.log(error);
              });
              
               
              }else if(operations[i].type == "updatetasks"){

                let test = await this.sqlQuery("getTask",{tasks_uuid:operations[i].id}).then(async updatedTaskData => {
                let update_date1:any;

                if(updatedTaskData.task_due_date){
                   let date_new  = new Date(updatedTaskData.task_due_date);
                   update_date1 = new Date(date_new.getTime() + 1*24*60*60*1000);
                }else{
                  update_date1 = "";
                }
               
                  this.newpatientTaskData = {
                    "tasks_uuid":updatedTaskData.tasks_uuid,
                    "patient_uuid":updatedTaskData.patient_uuid,
                    "task_type":updatedTaskData.task_type,
                    "creation_date":updatedTaskData.creation_date,
                    "task_due_date": update_date1,
                    "task_details":updatedTaskData.task_details,
                    "status":updatedTaskData.status,
                    "prev_record_uuuid":updatedTaskData.prev_record_uuuid,
                    "origin_record_id":updatedTaskData.origin_record_id,
                  };
                  
                  
                  let testsync = await this.serverService.updateTaskStatusServerDb(this.newpatientTaskData).toPromise().then(
                    result => {
                    if(result == true){
                     
                      console.log("Success");
                    }else{
                    
                     console.log("ERROR");
                   
                     }
                  },error => {
                   
                    console.log(error);
                    failed_array.push(obs.findIndex(x => x.type ==="updatetasks" && x.id === updatedTaskData.tasks_uuid));
                   
                   
                  });
                },error => {
                  
                   console.log(error)
                 
                });
              }else if(operations[i].type == "notes"){
               
              let test = await this.sqlQuery("getNotes",{notes_uuid:operations[i].id}).then(async notesData => {
               
                  var date = new Date();
                  let dateStr =
                     
                  date.getFullYear() + "-"+("00" + (date.getMonth() + 1)).slice(-2) + "-" +("00" + date.getDate()).slice(-2) + " " +
                  ("00" + date.getHours()).slice(-2) + ":" +
                  ("00" + date.getMinutes()).slice(-2) + ":" +
                  ("00" + date.getSeconds()).slice(-2);
              
                let notesObj = {
                  "notes_uuid" :notesData.notes_uuid,
                  "notes_message":notesData.notes_message,
                  "read_flag":1,
                  "patient_uuid":notesData.patient_uuid,
                  "sender_user_id":notesData.sender_user_id,
                  "recipient_user_id":notesData.recipient_user_id,
                  "createdAt":dateStr
                  
                
                }
             
                  let testsync = await this.serverService.addNotes(notesObj).toPromise().then(result => {
                  
                    if(result == true){
                     
                      console.log("Success");
                    }else{
                     
                      failed_array.push(obs.findIndex(x => x.type ==="notes" && x.id === notesData.notes_uuid));
                      console.log("ERROR")
                     }
                  },error => {
                    
                    console.log(error);
                    failed_array.push(obs.findIndex(x => x.type ==="notes" && x.id === notesData.notes_uuid));
                     
                   
                  });
                },error => {
                  
                  console.log(error);
               
              });
              }else if(operations[i].type == "udid_info"){
              
                let test = await this.sqlQuery("getUDID",{udid_uuid:operations[i].id}).then(async udidData => {
                
                 let udidObj = {
                   "udid_info_id":0,
                   "udid_info_obj":udidData.udid_info_obj,
                   "patient_uuid":udidData.patient_uuid,
                   "udid_uuid" :udidData.udid_uuid
          
                }
                
                
                let testsync = await this.serverService.addUDID(udidObj).toPromise().then(
                  result => {
                    if(result == true){
                     
                      console.log("Success");
                    }else{
                     
                      console.log("ERROR");
                      failed_array.push(obs.findIndex(x => x.type ==="udid_info" && x.id === udidData.udid_uuid));
                    
                     }
                   
                  },error => {
                    
                    console.log(error);
                    failed_array.push(obs.findIndex(x => x.type ==="udid_info" && x.id === udidData.udid_uuid));
                    
                   
                  });
                },error => {
                  
                  console.log(error);
                 
                });
              }
            
          
      }
    let remainging_array = [];
  
    if(failed_array.length > 0){
      
     for(var k =0;k<failed_array.length;k++){
      
      remainging_array.push(obs[failed_array[k]]);
     }
   
    }else{
      console.log("No data to synchronize")
    }
   
    this.remainingData(remainging_array)

  }


  //update the request after successful sync
  remainingData(data){
   
    Plugins.Storage.remove({ key: 'storedreq' });
               
                
                if(data.length > 0){
                  let toast = this.toastController.create({
                    message: `Could not complete synchronization!`,
                    cssClass: 'alert_black_bg',
                    duration: 3000,
                    position: 'bottom'
                  });
                  toast.then(toast => toast.present());
                  Plugins.Storage.remove({ key: 'storedreq'});
                  
                  return  Plugins.Storage.set({key: 'storedreq', value:  JSON.stringify(data)});
                 
                }
                else {
                  let toast = this.toastController.create({
                    message: `Local data succesfully synchronized!`,
                    cssClass: 'alert_black_bg',
                    duration: 3000,
                    position: 'bottom'
                  });
                  toast.then(toast => toast.present());
                  return Plugins.Storage.remove({ key: 'storedreq' });
               }
   }

 
  fetchServerNotes(){
    
    this.getNotesFromSupervisor();
 
}
  //get notes from supervisor(from server db) 
  async getNotesFromSupervisor(){
  
   
    this.reciever_user_id = sessionStorage.getItem("users_id");
  
    let result = await this.serverService.getSupervisorNotes(this.reciever_user_id)
    .subscribe(
    data  => {
    
      this.addSuperNotes(data);
   
      // let image_array = [];
      // image_array = data[0].images.split(',')
      // this.downloadFile(image_array[0])
    })
  }

  //save the supervisor notes in the local db
  async addSuperNotes(data){
  
    if(data){
 
      for(var i =0;i<data.length;i++){
       
        await this.sqlQuery("addNotesFromServer",{notes_uuid:data[i].notes_uuid,notes_message:data[i].notes_message,read_flag:data[i].read_flag,patient_uuid:data[i].patient_uuid,sender_user_id:parseInt(data[i].sender_user_id),recipient_user_id:parseInt(data[i].recipient_user_id)});
      }
      
    }
    

  }

 
  async reverseSync(group_data_id){
    this.serverService.getAllPatientsToDevice(group_data_id)
    .subscribe(
    data  => {
 
    
      if(data){
      this.reverseSyncDevice(data);
    }
    });

  }
  async reverseSyncDevice(data){
 
   let patientObj : any;
   let clinical_visits :any
   let tasks1 :any;
   let notes1 :any;
   let udid_info1 :any;
   patientObj = data[0].patientObj;
   clinical_visits = data[0].clinical_visits;
   tasks1 = data[0].tasks;
   notes1 = data[0].notes;
   
   udid_info1 = data[0].udid_info;


for(var i=0;i<patientObj.length;i++){

    
  let result = await this.sqlQuery("reverseSyncPatients",{patient_uuid:patientObj[i].patient_uuid,kshema_id:patientObj[i].kshema_id,group_data_id:patientObj[i].group_data_id,name:patientObj[i].name,demographic_info:patientObj[i].demographic_info,needs_assessment:patientObj[i].needs_assessment,uuid_info:patientObj[i].uuid_info,status:patientObj[i].status,created_at:patientObj[i].created_at});
    
}

for(var i=0;i<clinical_visits.length;i++){
 
 
  let result = await this.sqlQuery("reverseSyncVisits",{patient_uuid:clinical_visits[i].patient_uuid,clinical_visits_uuid:clinical_visits[i].clinical_visits_uuid,social_worker_id:clinical_visits[i].social_worker_id,visit_date:clinical_visits[i].visit_date,visit_type:clinical_visits[i].visit_type,visit_details:clinical_visits[i].visit_details,followup_date:clinical_visits[i].followup_date,created_at:clinical_visits[i].createdAt});
    
}
for(var i=0;i<tasks1.length;i++){
  
  let result = await this.sqlQuery("reverseSyncTasks",{tasks_uuid:tasks1[i].tasks_uuid,patient_uuid:tasks1[i].patient_uuid,task_type:tasks1[i].task_type,creation_date:tasks1[i].creation_date,task_due_date:tasks1[i].task_due_date,task_details:tasks1[i].task_details,status:tasks1[i].status,update_date:tasks1[i].update_date,prev_record_uuuid:tasks1[i].prev_record_uuuid,origin_record_id:tasks1[i].origin_record_id});
    
}
if(notes1){
  for(var i=0;i<notes1.length;i++){
    
    let result =  await this.sqlQuery("reverseSyncNotes",{notes_uuid:notes1[i].notes_uuid,notes_message:notes1[i].notes_message,read_flag:notes1[i].read_flag,patient_uuid:notes1[i].patient_uuid,sender_user_id:notes1[i].sender_user_id,recipient_user_id:notes1[i].recipient_user_id,created_at:notes1[i].createdAt});
      
  }
  }

  if(udid_info1){
  for(var i=0;i<udid_info1.length;i++){
    let result = await this.sqlQuery("reverseSyncUdid",{udid_uuid:udid_info1[i].udid_uuid,patient_uuid:udid_info1[i].patient_uuid,udid_info_obj:udid_info1[i].udid_info_obj,created_at:udid_info1[i].createdAt});
      
  }
}

  }
  
  //get the kshema id of patient  from the server db to update in the local db
  updateKshema(patient_uuid){
 
    this.serverService.getKshemaId(patient_uuid)
    .subscribe(
    data  => {
   
      this.updatePatientKshemaId(patient_uuid,data);
    
    },error => {
    console.log("KSHEMA EROR"+JSON.stringify(error));
     let kshemaData = error;
    
     this.updatePatientKshemaId(patient_uuid,kshemaData.error.text);
    
     
    }
    );


  }

  //updating the kshema_id (from the server db) of patient in the local db after sync
  async updatePatientKshemaId(patient_uuid,patient){
 
    await this.sqlQuery("updatePatientKshema",{patient_uuid:patient_uuid,kshema_id:patient});
  }

//creating db,tables, table operations
async sqlQuery(op:string,data:any){
  
  let sw_id1 = sessionStorage.getItem("sw_id");
  let sw_id = parseInt(sw_id1);
  let taluk_id1 = sessionStorage.getItem("taluk_id");
  let taluk_id = parseInt(taluk_id1);

  return this.openDatabase().then(async () =>{

  if(this.DBstatus){
    
    let sqlcmd: string = `
    BEGIN TRANSACTION;
    
  CREATE TABLE IF NOT EXISTS clinical_visits (
    clinical_visits_id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
    clinical_visits_uuid TEXT,
    patient_uuid TEXT ,
    social_worker_id INTEGER,
    visit_date DATE,
    visit_type TEXT,
    visit_details TEXT,
    followup_date DATE,
    prv_visit_uuid TEXT,
    created_at TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS notes (
    
    notes_uuid TEXT  PRIMARY KEY,
    notes_message TEXT,
    read_flag INTEGER,
    patient_uuid TEXT ,
    sender_user_id INTEGER,
    recipient_user_id INTEGER,
    created_at TIMESTAMP,
    images TEXT
  );



  CREATE TABLE IF NOT EXISTS group_data (
    group_data_id INTEGER,
    taluka_id INTEGER ,
    social_worker_id INTEGER,
    supervisor_id INTEGER,
    created_at TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS patient (
    patient_id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
    patient_uuid TEXT,
    group_data_id INTEGER ,
    kshema_id TEXT,
    name TEXT,
    demographic_info TEXT,
    consent_arr TEXT,
    needs_assessment TEXT,
    uuid_info TEXT,
    status TEXT,
    created_at TIMESTAMP,
    images TEXT

  );

  CREATE TABLE IF NOT EXISTS social_worker (
    social_worker_id INTEGER,
    Name TEXT ,
    users_id INTEGER,
    contact_info TEXT,
    status TEXT,
    created_at TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS supervisor (
    supervisor_id INTEGER,
    name TEXT ,
    contact_info TEXT,
    users_id INTEGER,
    Status	 TEXT,
    created_at TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS taluka_master (
    
    taluka_master_id INTEGER PRIMARY KEY,
    taluka_name TEXT ,
    taluka_details TEXT,
    createdAt TEXT
  );

  CREATE TABLE IF NOT EXISTS phc_master (
    
    phc_id INTEGER PRIMARY KEY,
    phc_name TEXT 
    
  );
  CREATE TABLE IF NOT EXISTS district_master (
    
    district_master_id INTEGER PRIMARY KEY,
    district_name TEXT 
    
  );

  CREATE TABLE IF NOT EXISTS tasks (
    tasks_id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
    tasks_uuid TEXT,
    patient_uuid TEXT ,
    task_type INTEGER ,
    creation_date DATE,
    task_due_date DATE,
    task_details TEXT,
    status TEXT,
    update_date DATE,
    prev_record_uuuid TEXT,
    origin_record_id INTEGER,
    created_at TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS task_master (
    task_master_id INTEGER PRIMARY KEY NOT NULL,
    task_name TEXT ,
    task_details TEXT,
    created_at TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS udid_info (
    udid_info_id INTEGER PRIMARY KEY  AUTOINCREMENT NOT NULL,
    udid_uuid TEXT,
    patient_uuid TEXT,
    created_at TIMESTAMP,
    udid_info_obj TEXT
    
  );

  CREATE TABLE IF NOT EXISTS users (
    users_id INTEGER UNIQUE,
    user_name TEXT,
    password TEXT,
    role TEXT,
    email TEXT,
    contact_no TEXT,
    first_name TEXT,
    last_name TEXT,
    address address,
    taluka_id INTEGER,
    created_at TIMESTAMP
  );


    PRAGMA user_version = 1;
    COMMIT TRANSACTION;
    `;
    var retExe: any = await this._sqlite.execute({statements:sqlcmd});
    
    //save the user_id, user_name and password in the localstorage in the first login while online
    if(op === "addUser"){
    
      let sqlcmd = "INSERT INTO users (users_id,user_name,password,role,email,contact_no,first_name,last_name,address,taluka_id,created_at) VALUES (?,?,?,?,?,?,?,?,?,?,?)";
      let sqlcmd1 = "INSERT INTO group_data (group_data_id,taluka_id,social_worker_id,supervisor_id,created_at) VALUES (?,?,?,?,?)";
      let sqlcmd2 = "INSERT INTO social_worker (social_worker_id,name,users_id,contact_info,status,created_at) VALUES (?,?,?,?,?,?)";
      let values: Array<any>  = [data.users_id,data.user_name,data.password,data.role,data.email,data.contact_no,data.first_name,data.last_name,data.address,data.taluka_id,data.created_at];
      let values1: Array<any>  =[data.group_data_id,data.taluka_id,data.social_worker_id,data.supervisor_id,data.created_at];
      let values2: Array<any>  =[data.social_worker_id,data.first_name,data.users_id,data.contact_no,data.status,data.created_at];
      var retRun: any = await this._sqlite.run({statement:sqlcmd,values:values});
      var retRun1: any = await this._sqlite.run({statement:sqlcmd1,values:values1});
      var retRun2: any = await this._sqlite.run({statement:sqlcmd2,values:values2});
    }
    //user login using local storage user_credentials validation after first login while offline
    if(op === "loginUser"){
      let sqlcmd = "SELECT * FROM users WHERE user_name = ? and password = ?";
      let sqlcmd1 = "SELECT * FROM social_worker";
      let sqlcmd2 = "SELECT * FROM group_data";
      let values:Array<any>  = [data.user_name,data.password];
      let values1:Array<any>  = [];
      var retSelect: any = await this._sqlite.query({statement:sqlcmd,values:values});
      var retSelect1: any = await this._sqlite.query({statement:sqlcmd1,values:values1});
      var retSelect2: any = await this._sqlite.query({statement:sqlcmd2,values:values1});
      
      this.offlineLoginData.loginData = retSelect;
      this.offlineLoginData.swData = retSelect1;
      this.offlineLoginData.groupData = retSelect2;
      return this.offlineLoginData;
    
    
    }

    
      if(op === "addPatient"){
      let district = sessionStorage.getItem("district");
      let taluk = sessionStorage.getItem("taluk");
      var date = new Date();
      
      
      let sqlcmd = "INSERT INTO patient (patient_uuid,kshema_id,group_data_id,name,demographic_info,consent_arr,needs_assessment,uuid_info,status,created_at) VALUES (?,?,?,?,?,?,?,?,?,?)";
      let values: Array<any>  = [data.patient_uuid,data.kshema_id,data.group_data_id,data.name,data.demographic_info,data.consent_arr,data.needs_assessment,data.uuid_info,data.status,date];
      var retRun: any =await this._sqlite.run({statement:sqlcmd,values:values});
      this.storeRequest("patient",data.patient_uuid,date,district,taluk);
      return null;
      
    }

    //add new task in device db
    if(op === "addTasks"){
      var date = new Date();
      
      
      let sqlcmd = "INSERT INTO tasks (tasks_uuid,patient_uuid,task_type,creation_date,task_due_date,task_details,status,update_date,prev_record_uuuid,origin_record_id,created_at) VALUES (?,?,?,?,?,?,?,?,?,?,?)";
      let values: Array<any>  = [data.tasks_uuid,data.patient_uuid,data.task_type,data.creation_date,data.task_due_date,data.task_details,data.status,data.update_date,data.prev_record_uuuid,data.origin_record_id,data.created_at];
      await this._sqlite.run({statement:sqlcmd,values:values});
      this.storeRequest("tasks",data.tasks_uuid,date,sw_id,taluk_id);
      return null;
      }

    
    if(op === "addClinical"){
      
      var date = new Date();
      
      
      let sqlcmd = "INSERT INTO clinical_visits (clinical_visits_uuid,patient_uuid,social_worker_id,visit_date,visit_type,visit_details,followup_date,prv_visit_uuid,created_at) VALUES (?,?,?,?,?,?,?,?,?)";
      let values: Array<any>  = [data.clinical_visits_uuid,data.patient_uuid,data.social_worker_id,data.visit_date,data.visit_type,data.visit_details,data.followup_date,data.prv_visit_uuid,date];
      var retRun: any = await this._sqlite.run({statement:sqlcmd,values:values});
        this.storeRequest("clinical_visits",data.clinical_visits_uuid,date,sw_id,taluk_id);
      return null;
    }


    if(op === "addClinicalNew"){
      
      var date = new Date();
      
      
      let sqlcmd = "INSERT INTO clinical_visits (clinical_visits_uuid,patient_uuid,social_worker_id,visit_date,visit_type,visit_details,followup_date,prv_visit_uuid,created_at) VALUES (?,?,?,?,?,?,?,?,?)";
      let values: Array<any>  = [data.clinical_visits_uuid,data.patient_uuid,data.social_worker_id,data.visit_date,data.visit_type,data.visit_details,data.followup_date,data.prv_visit_uuid,date];
      var retRun: any = await this._sqlite.run({statement:sqlcmd,values:values});
      this.storeRequest("clinical_visits",data.clinical_visits_uuid,date,sw_id,taluk_id);
      return null;
    }

    
    //get all patients from the devic edb
    if(op == "getActivePatients"){
    
      let sqlcmd = "SELECT * FROM patient WHERE status = 'active'";
      let retSelect: [] = await this._sqlite.query({statement:sqlcmd,values:[]});
      return retSelect;
    }

      //get all patients from the devic edb
      if(op == "getAllPatients"){
        let sqlcmd = "SELECT * FROM patient";
      
        let retSelect: [] = await this._sqlite.query({statement:sqlcmd,values:[]});
        return retSelect;
      }

    //get the patient demographic details and also for synchroing with server db
    if(op === "getPatient"){
      let sqlcmd = "SELECT * FROM patient WHERE patient_uuid = ?";
      let values:Array<any>  = [data.patient_uuid];
      var retSelect: any = await this._sqlite.query({statement:sqlcmd,values:values});
      return retSelect.values[0];
    }

      //get today's consultations - latest consultation only for each patient 
    if(op == "todaysPatients"){
      
    
       let sqlcmd = "SELECT * FROM clinical_visits WHERE followup_date = ? AND clinical_visits_id IN ( SELECT MAX(clinical_visits_id) FROM clinical_visits GROUP BY patient_uuid );"  
       let values:Array<any>  = [data.followup_date];
      let retSelect: [] = await this._sqlite.query({statement:sqlcmd,values:values});
      return retSelect;
    }


      //get today's consultations - latest consultation only for each patient and other counts
    if(op == "todaysPatients1"){
      let syncCount = 0;
      let storedObj:any;
      Plugins.Storage.get({ key: 'storedreq' }).then(object => {
         storedObj = JSON.parse(object.value);
         syncCount = storedObj.length;
      });
    this.reciever_user_id = sessionStorage.getItem("users_id");
    let sqlcmd = "SELECT * FROM clinical_visits WHERE followup_date = ? AND clinical_visits_id IN ( SELECT MAX(clinical_visits_id) FROM clinical_visits GROUP BY patient_uuid )";
    let sqlcmd1 = "SELECT count(*) as cnt1 FROM clinical_visits WHERE followup_date > ?  AND clinical_visits_id IN ( SELECT MAX(clinical_visits_id) FROM clinical_visits GROUP BY patient_uuid )";
    let sqlcmd2 = "SELECT count(*) as cnt2 FROM clinical_visits WHERE followup_date < ?  AND clinical_visits_id IN ( SELECT MAX(clinical_visits_id) FROM clinical_visits GROUP BY patient_uuid )";
    let sqlcmd3 = "SELECT count(*) as cnt3 FROM tasks WHERE task_due_date = ?  AND (task_due_date IS NOT NULL AND task_due_date <> '')";
    let sqlcmd4 = "SELECT count(*) as cnt4 FROM tasks WHERE task_due_date > ? AND (status = 'pending' OR  status = 'In Progress') AND (task_due_date IS NOT NULL AND task_due_date <> '')";
    let sqlcmd5 = "SELECT count(*) as cnt5 FROM tasks WHERE task_due_date < ? AND (status = 'pending' OR  status = 'In Progress') AND (task_due_date IS NOT NULL AND task_due_date <> '') ";
    let sqlcmd6 = "SELECT count(*) as cnt6 FROM tasks WHERE task_due_date = ? AND status ='Completed'";
    let sqlcmd7 = "SELECT count(*) as cnt7 FROM notes  WHERE recipient_user_id = ? AND read_flag = 1";
    let sqlcmd8 = "SELECT count(DISTINCT patient_uuid) as cnt8 FROM clinical_visits";
   
      let values:Array<any>  = [data.followup_date];
      let values1:Array<any>  = [this.reciever_user_id];
      let values2:Array<any>  = [];

      let retSelect: [] = await this._sqlite.query({statement:sqlcmd,values:values});

      let retSelect1: any = await this._sqlite.query({statement:sqlcmd1,values:values});
      let retSelect2: any = await this._sqlite.query({statement:sqlcmd2,values:values});
      let retSelect3: any = await this._sqlite.query({statement:sqlcmd3,values:values});
      let retSelect4: any = await this._sqlite.query({statement:sqlcmd4,values:values});
      let retSelect5: any = await this._sqlite.query({statement:sqlcmd5,values:values});
      let retSelect6: any = await this._sqlite.query({statement:sqlcmd6,values:values});
      let retSelect7: any = await this._sqlite.query({statement:sqlcmd7,values:values1});
      let retSelect8: any = await this._sqlite.query({statement:sqlcmd8,values:values2});


      this.dashObj.today_visit_data = retSelect;
      this.dashObj.upcoming_visit = retSelect1.values[0].cnt1;
      this.dashObj.overdue_visit = retSelect2.values[0].cnt2;
      this.dashObj.today_task = retSelect3.values[0].cnt3;
      this.dashObj.upcoming_task = retSelect4.values[0].cnt4;
      this.dashObj.overdue_task = retSelect5.values[0].cnt5;
      this.dashObj.task_completed = retSelect6.values[0].cnt6;
      this.dashObj.note_count = retSelect7.values[0].cnt7;
      this.dashObj.total_patients = retSelect8.values[0].cnt8;
      this.dashObj.syncCount = syncCount;
      return  this.dashObj;
    }

    //get upcoming consultations
    if(op == "upcomingPatients"){
      
      let sqlcmd = "SELECT * FROM clinical_visits WHERE followup_date > ? AND clinical_visits_id IN ( SELECT MAX(clinical_visits_id) FROM clinical_visits GROUP BY patient_uuid );"
    
      let values:Array<any>  = [data.followup_date];
      let retSelect: [] = await this._sqlite.query({statement:sqlcmd,values:values});
      return retSelect;
    }

    //get today's tasks
    if(op == "todaysPatientsTasks"){
      let sqlcmd = "SELECT * FROM tasks WHERE task_due_date = ? AND (status = 'pending' OR  status = 'In Progress') AND (task_due_date IS NOT NULL AND task_due_date <> '')";
    
      let values:Array<any>  = [data.task_due_date];
      let retSelect: [] = await this._sqlite.query({statement:sqlcmd,values:values});
      return retSelect;
    }

    //get upcoming tasks
    if(op == "upcomingPatientsTasks"){
      let sqlcmd = "SELECT * FROM tasks WHERE task_due_date > ? AND  (status = 'pending' OR  status = 'In Progress') AND (task_due_date IS NOT NULL AND task_due_date > '')";
      let values:Array<any>  = [data.task_due_date];
      let retSelect: [] = await this._sqlite.query({statement:sqlcmd,values:values});
      return retSelect;
    }

    //get overdue consultations
    if(op == "overdueVisit"){
     
      let sqlcmd = "SELECT * FROM clinical_visits WHERE  followup_date < ? AND clinical_visits_id IN ( SELECT MAX(clinical_visits_id) FROM clinical_visits GROUP BY patient_uuid );"
    
      let values:Array<any>  = [data.followup_date];
      let retSelect: [] = await this._sqlite.query({statement:sqlcmd,values:values});
      return retSelect;
    }

    ////get overdue taks
    if(op == "overdueTask"){
     
      let sqlcmd = "SELECT * FROM tasks WHERE task_due_date < ? AND  (status = 'pending' OR  status = 'In Progress') AND (task_due_date IS NOT NULL AND task_due_date <> '')";
      let values:Array<any>  = [data.task_due_date];
      let retSelect: [] = await this._sqlite.query({statement:sqlcmd,values:values});
      return retSelect;
    }
    
    if(op == "completedTask"){
     
      let sqlcmd = "SELECT * FROM tasks WHERE status = 'Completed' AND (task_due_date IS NOT NULL)";
      let values:Array<any>  = [];
      let retSelect: [] = await this._sqlite.query({statement:sqlcmd,values:values});
      return retSelect;
    }

    //get latest consultation data for each of the patient
    if(op == "allVisits"){
     
      let sqlcmd = "SELECT * FROM clinical_visits WHERE clinical_visits_id IN ( SELECT MAX(clinical_visits_id) FROM clinical_visits GROUP BY patient_uuid );"
      
      let retSelect: [] = await this._sqlite.query({statement:sqlcmd,values:[]});
      return retSelect;
    }
    
    //add new visit from clinic,home,phone forms - need to check
    if(op === "addNewVisit"){
    let sqlcmd = "INSERT INTO clinical_visits (clinical_visits_uuid,patient_uuid,social_worker_id,visit_date,visit_type,visit_details,followup_date,prv_visit_uuid) VALUES (?,?,?,?,?,?,?,?)";
    let values: Array<any>  = [data.clinical_visits_uuid,data.patient_uuid,data.social_worker_id,data.visit_date,data.visit_type,data.visit_details,data.followup_date,data.prv_visit_uuid];
    var retRun: any = await this._sqlite.run({statement:sqlcmd,values:values});
  }

  //add new tasks from welfare, uuid, rehab forms
  if(op === "addNewTasks"){
  
    var date = new Date();
    
    let sqlcmd = "INSERT INTO tasks (tasks_uuid,patient_uuid,task_type,creation_date,task_due_date,task_details,status,update_date,prev_record_uuuid,origin_record_id,created_at) VALUES (?,?,?,?,?,?,?,?,?,?,?)";
    let values: Array<any>  = [data.tasks_uuid,data.patient_uuid,data.task_type,data.creation_date,data.task_due_date,data.task_details,data.status,data.update_date,data.prev_record_uuuid,data.origin_record_id,data.created_at];
    await this._sqlite.run({statement:sqlcmd,values:values});
    this.storeRequest("tasks",data.tasks_uuid,date,sw_id,taluk_id);
    return null;
    }

  //get the tasks data for a patient
  if(op === "getPatientTasks"){
    
    let sqlcmd = "SELECT * FROM tasks WHERE patient_uuid = ?";
    let values:Array<any>  = [data.patient_uuid];
    let retSelect: [] = await this._sqlite.query({statement:sqlcmd,values:values});
    return retSelect;
  }

  if(op === "getPatientMedTasks"){
    
   //let sqlcmd = "SELECT * FROM tasks WHERE patient_uuid = ? AND task_type = 45 AND status ='pending'";
    let sqlcmd = "SELECT * FROM tasks WHERE patient_uuid = ? AND task_type = 45";
    let values:Array<any>  = [data.patient_uuid];
    let retSelect: [] = await this._sqlite.query({statement:sqlcmd,values:values});
    return retSelect;
  }

  //get the welfare tasks data for the patient to display in the welfare form
  if(op === "getPatientWelfareTasks"){
    
    let sqlcmd = "SELECT * FROM tasks WHERE patient_uuid = ? AND task_type > 20 AND task_type < 35" ;
    let values:Array<any>  = [data.patient_uuid];
    let retSelect: [] = await this._sqlite.query({statement:sqlcmd,values:values});
    return retSelect;
  }
  if(op === "getPreviousVisitRecordPhone"){
    
    let sqlcmd = "SELECT visit_details,Max(created_at),followup_date,visit_type FROM clinical_visits WHERE patient_uuid = ? and visit_type='PHC'";
   let values:Array<any>  = [data.patient_uuid];
   var retSelect: any = await this._sqlite.query({statement:sqlcmd,values:values});
   return retSelect.values[0];
 }
 //get the latest consultation data of a patient for displaying in the clinic, home or phone forms
 if(op === "getPreviousVisitRecordHome"){
    
  let sqlcmd = "SELECT visit_details,Max(created_at),followup_date,visit_type FROM clinical_visits WHERE patient_uuid = ?";
  let values:Array<any>  = [data.patient_uuid];
  var retSelect: any = await this._sqlite.query({statement:sqlcmd,values:values});
  return retSelect.values[0];
}

  //get the latest consultation data of a patient for displaying in the clinic, home or phone forms
  if(op === "getPreviousVisitRecord"){
    
    let sqlcmd = "SELECT visit_details,Max(created_at),followup_date,visit_type FROM clinical_visits WHERE patient_uuid = ?";
    let values:Array<any>  = [data.patient_uuid];
    var retSelect: any = await this._sqlite.query({statement:sqlcmd,values:values});
    return retSelect.values[0];
  }

  //update the assessment of needs data in the device db
  if(op === "updatePatientAssessment"){
    let timestamp: Date = new Date(); 
    
      let sqlcmd = "UPDATE patient SET needs_assessment = ? WHERE patient_uuid = ?";
      let values: Array<any>  = [data.needs_assessment,data.patient_uuid];
    await this._sqlite.run({statement:sqlcmd,values:values});
    this.storeRequest("editpatient",data.patient_uuid,timestamp,sw_id,taluk_id);
    
  
  }

  //update patient demographic data in the device db
  if(op === "updatePatientDemo"){
    
    let timestamp: Date = new Date(); 
    let sqlcmd = "UPDATE patient SET name= ? ,demographic_info = ?, status = ? WHERE patient_uuid = ?";
    let values: Array<any>  = [data.name,data.demographic_info,data.status,data.patient_uuid];
    await this._sqlite.run({statement:sqlcmd,values:values});
    this.storeRequest("editpatient",data.patient_uuid,timestamp,sw_id,taluk_id);
      
    
  }
  
  //sync with server db
  if(op === "getVisit"){
    let sqlcmd = "SELECT * FROM clinical_visits WHERE clinical_visits_uuid = ?";
    let values:Array<any>  = [data.clinical_visits_uuid];
    var retSelect: any = await this._sqlite.query({statement:sqlcmd,values:values});
    return retSelect.values[0];
  }

  //sync with server db
  if(op === "getTask"){
    let sqlcmd = "SELECT * FROM tasks WHERE  tasks_uuid = ?";
    let values:Array<any>  = [data.tasks_uuid];
    var retSelect: any = await this._sqlite.query({statement:sqlcmd,values:values});
    return retSelect.values[0];
  }

  if(op === "getPatientVisit"){
    let sqlcmd = "SELECT * FROM clinical_visits WHERE patient_uuid = ?";
    let values:Array<any>  = [data.patient_uuid];
    var retSelect: any = await this._sqlite.query({statement:sqlcmd,values:values});
    return retSelect.values[0];
  }

  if(op === "getPatientTask"){
  
    let sqlcmd = "SELECT * FROM tasks WHERE patient_uuid = ?";
    let values:Array<any>  = [data.patient_uuid];
    let retSelect: any = await this._sqlite.query({statement:sqlcmd,values:values});
    return retSelect.values[0];
  }

  //update task status in device db
  if(op === "updateTaskStatus"){
  
    let timestamp: Date = new Date(); 
    let sqlcmd = "UPDATE tasks SET task_due_date= ? ,task_details = ? ,status = ?,update_date = ? WHERE tasks_uuid = ?";
    let values: Array<any>  = [data.task_due_date,data.task_details,data.status,data.update_date,data.tasks_uuid];
    await this._sqlite.run({statement:sqlcmd,values:values});
    this.storeRequest("updatetasks",data.tasks_uuid,timestamp,sw_id,taluk_id);
    return null;
  
  }
  

  
  if(op == "getPatientTotalPHC"){
     let sqlcmd = "SELECT * FROM clinical_visits WHERE patient_uuid = ? ";
    let values:Array<any>  = [data.patient_uuid];
    let retSelect: [] = await this._sqlite.query({statement:sqlcmd,values:values});
    return retSelect;
  }

  //get count of consultations and tasks to display the number in patient details page in social worker login
  if(op == "getCounts"){
    
    let sqlcmd = "SELECT * FROM notes  WHERE patient_uuid = ?";
    let sqlcmd1 = "SELECT count(*) as cnt1 FROM clinical_visits WHERE patient_uuid = ? AND visit_type = 'PHC'";
    let sqlcmd2 = "SELECT count(*) as cnt2 FROM clinical_visits  WHERE patient_uuid = ? AND visit_type = 'Home'";
    let sqlcmd3 = "SELECT count(*) as cnt3 FROM clinical_visits  WHERE patient_uuid = ? AND visit_type = 'Phone' ";
    let sqlcmd4 = "SELECT count(*) as cnt4 FROM tasks WHERE patient_uuid = ? AND task_type < 20 AND status = 'pending'";
    let sqlcmd5 = "SELECT count(*) as cnt5 FROM tasks WHERE patient_uuid = ? AND task_type BETWEEN 20 AND 36 AND (task_due_date IS NOT NULL AND task_due_date <> '')";
    let sqlcmd6 = "SELECT count(*) as cnt6 FROM tasks WHERE patient_uuid = ? AND task_type = 41 AND status = 'pending'";

      let values:Array<any>  = [data.patient_uuid];
      let retSelect: [] = await this._sqlite.query({statement:sqlcmd,values:values});
      let retSelect1: any = await this._sqlite.query({statement:sqlcmd1,values:values});
      let retSelect2: any = await this._sqlite.query({statement:sqlcmd2,values:values});
      let retSelect3: any = await this._sqlite.query({statement:sqlcmd3,values:values});
      let retSelect4: any = await this._sqlite.query({statement:sqlcmd4,values:values});
      let retSelect5: any = await this._sqlite.query({statement:sqlcmd5,values:values});
      let retSelect6: any = await this._sqlite.query({statement:sqlcmd6,values:values});
      

      this.countObj.notes_data = retSelect;
      this.countObj.phc_count = retSelect1.values[0].cnt1;
      this.countObj.home_count = retSelect2.values[0].cnt2;
      this.countObj.phone_count = retSelect3.values[0].cnt3;
      this.countObj.rehab_count = retSelect4.values[0].cnt4;
      this.countObj.wel_count = retSelect5.values[0].cnt5;
      this.countObj.udid_count = retSelect6.values[0].cnt6;
    
    
    return this.countObj;
    }

  //get home data
  if(op == "getPatientTotalHome"){
    let sqlcmd = "SELECT * FROM clinical_visits WHERE patient_uuid = ? AND visit_type = 'Home'";
    let values:Array<any>  = [data.patient_uuid];
    let retSelect: [] = await this._sqlite.query({statement:sqlcmd,values:values});
    return retSelect;
  }

  //get phone data
  if(op == "getPatientTotalPhone"){
    let sqlcmd = "SELECT * FROM clinical_visits WHERE patient_uuid = ? AND visit_type = 'Phone'";
    let values:Array<any>  = [data.patient_uuid];
    let retSelect: [] = await this._sqlite.query({statement:sqlcmd,values:values});
    return retSelect;
  }

  //save notes for a patient in the devie db
  if(op === "addNotes"){
  
    let timestamp: Date = new Date();
   
    let sqlcmd = "INSERT INTO notes (notes_uuid,notes_message,read_flag,patient_uuid,sender_user_id,recipient_user_id,created_at,images) VALUES (?,?,?,?,?,?,?,?)";
    let values: Array<any>  = [data.notes_uuid,data.notes_message,data.read_flag,data.patient_uuid,data.sender_user_id,data.recipient_user_id,timestamp,data.images];
    var retRun: any = await this._sqlite.run({statement:sqlcmd,values:values});
    this.storeRequest("notes",data.notes_uuid,timestamp,sw_id,taluk_id);
    
    
  }

  //get notes from supervisor from server db and save in device db
  if(op === "addNotesFromServer"){

    let timestamp: Date = new Date();
    
    let sqlcmd = "INSERT OR IGNORE INTO notes (notes_uuid,notes_message,read_flag,patient_uuid,sender_user_id,recipient_user_id,created_at) VALUES (?,?,?,?,?,?,?)";
    let values: Array<any>  = [data.notes_uuid,data.notes_message,data.read_flag,data.patient_uuid,data.sender_user_id,data.recipient_user_id,timestamp];
    var retRun: any = await this._sqlite.run({statement:sqlcmd,values:values});
  
  }

  //sync with server db
  if(op === "getNotes"){
    let sqlcmd = "SELECT * FROM notes WHERE notes_uuid = ?";
    let values:Array<any>  = [data.notes_uuid];
    let retSelect: any = await this._sqlite.query({statement:sqlcmd,values:values});
    return retSelect.values[0];
  }

  //save udid data in devie db
  if(op === "addUDID"){
    let timestamp: Date = new Date();
    let sqlcmd = "INSERT INTO udid_info (udid_uuid,patient_uuid,udid_info_obj) VALUES (?,?,?)";
    let values: Array<any>  = [data.udid_uuid,data.patient_uuid,data.udid_info_obj];
    var retRun: any = await this._sqlite.run({statement:sqlcmd,values:values});
    this.storeRequest("udid_info",data.udid_uuid,timestamp,sw_id,taluk_id);
    return null;
  }

  //sync udid data with server db
  if(op === "getUDID"){
    let sqlcmd = "SELECT * FROM udid_info WHERE udid_uuid = ?";
    let values:Array<any>  = [data.udid_uuid];
    let retSelect: any = await this._sqlite.query({statement:sqlcmd,values:values});
    return retSelect.values[0];
  }

  //get all consultations data for a patient from the device db
  if(op == "patientAllVisits"){
    let sqlcmd = "SELECT * FROM clinical_visits  WHERE patient_uuid = ?";
    let sqlcmd1 = "SELECT * FROM notes  WHERE patient_uuid = ?";
    let sqlcmd2 = "SELECT * FROM patient  WHERE patient_uuid = ?";
    let sqlcmd3 = "SELECT * FROM tasks  WHERE patient_uuid = ? and task_type = 45";
    let values:Array<any>  = [data.patient_uuid];
    let retSelect: [] = await this._sqlite.query({statement:sqlcmd,values:values});
    let retSelect1: [] = await this._sqlite.query({statement:sqlcmd1,values:values});
    let retSelect2: [] = await this._sqlite.query({statement:sqlcmd2,values:values});
    let retSelect3: [] = await this._sqlite.query({statement:sqlcmd3,values:values});
    this.historyObj.history_data = retSelect;
    this.historyObj.notes_data = retSelect1;
    this.historyObj.pat_data = retSelect2;
    this.historyObj.task_data = retSelect3;
    return  this.historyObj;
    
  }
  
  //get all the notes for patient from the device db
  if(op == "getPatientNotes"){
  
    let sqlcmd = "SELECT * FROM notes  WHERE patient_uuid = ?";
    let values:Array<any>  = [data.patient_uuid];
    let retSelect: [] = await this._sqlite.query({statement:sqlcmd,values:values});
  
    return retSelect;
    
  }
  
  //to get the notes from supervisor, saved in the device db and display in the notes page, display the cound in the dashboard
  if(op == "getSuperNotes"){
    
    //let sqlcmd = "SELECT * FROM notes  WHERE recipient_user_id = ? AND read_flag=1";
    let sqlcmd = "SELECT * FROM notes  WHERE recipient_user_id = ?";
    let values:Array<any>  = [data.recipient_user_id];
    let retSelect: [] = await this._sqlite.query({statement:sqlcmd,values:values});
    let sqlcmd1 = "UPDATE notes SET read_flag = 0 WHERE recipient_user_id = ?";
  
    var retRun: any = await this._sqlite.run({statement:sqlcmd1,values:values});
    return retSelect;
    
  }

  // update the  kshema_id(saved from server db) of the patient 
  if(op === "updatePatientKshema"){
  
    let timestamp: Date = new Date(); 
    let sqlcmd = "UPDATE patient SET kshema_id = ? WHERE patient_uuid = ?";
    let values: Array<any>  = [data.kshema_id,data.patient_uuid];
    var retRun: any = await this._sqlite.run({statement:sqlcmd,values:values});
    
  
  }
  

  //get the udid data to use in the udid form
  //while adding patient, form4, if the user selected option renew or get new udid, we need to update that each time the user fills in udid form
  //get latest udid data from devie db and display in udid forms
  if(op === "getPatientUDID"){
    
    
    let sqlcmd = "SELECT * FROM tasks WHERE patient_uuid = ? AND task_type = 41";
    let sqlcmd1 = "SELECT udid_info_id,udid_uuid,patient_uuid,Max(created_at),udid_info_obj FROM udid_info WHERE patient_uuid = ?";
    let values:Array<any>  = [data.patient_uuid];
    let retSelect: any = await this._sqlite.query({statement:sqlcmd,values:values});
    let retSelect1: any = await this._sqlite.query({statement:sqlcmd1,values:values});
  
    this.udidObj.udid_uuid_data = "";
    this.udidObj.udid_uuid_data = retSelect;
    this.udidObj.latest_udid_data = retSelect1;
    return this.udidObj;
  }
  
  //update the udid task date in the task table
  if(op === "updateUUIDTaskStatus"){
    let timestamp: Date = new Date(); 
    let sqlcmd = "UPDATE tasks SET task_due_date= ? WHERE  tasks_uuid = ?";
    let values: Array<any>  = [data.task_due_date,data.tasks_uuid];
    var retRun: any = await this._sqlite.run({statement:sqlcmd,values:values});
    this.storeRequest("updatetasks",data.tasks_uuid,timestamp,sw_id,taluk_id);
    return null;
  
  }
  
  if(op === "updateNotes"){
  let sqlcmd = "UPDATE notes SET read_flag = 1 WHERE notes_uuid = ?";
  let values: Array<any>  = [data.notes_uuid];
  var retRun: any = await this._sqlite.run({statement:sqlcmd,values:values});
  }

if(op === "addTaluksLocalDb"){

let sqlcmd = "INSERT or  IGNORE INTO taluka_master (taluka_master_id,taluka_name,taluka_details,createdAt) VALUES (?,?,?,?)";
let values: Array<any>  = [data.taluka_master_id,data.taluka_name,data.taluka_details,data.createdAt];
var retRun: any = await this._sqlite.run({statement:sqlcmd,values:values});
}

if(op === "addPhcsLocalDb"){

  let sqlcmd = "INSERT or  IGNORE INTO phc_master (phc_id,phc_name) VALUES (?,?)";
  let values: Array<any>  = [data.phc_id,data.phc_name];
  var retRun: any = await this._sqlite.run({statement:sqlcmd,values:values});
  }
  if(op === "addDistrictsLocalDb"){

    let sqlcmd = "INSERT or  IGNORE INTO district_master (district_master_id,district_name) VALUES (?,?)";
    let values: Array<any>  = [data.district_master_id,data.district_name];
    var retRun: any = await this._sqlite.run({statement:sqlcmd,values:values});
    }
   
  if(op === "getTaluks"){
    let sqlcmd = "SELECT * FROM taluka_master";
  
    let retSelect: [] = await this._sqlite.query({statement:sqlcmd,values:[]});
  
    return retSelect;
    }

if(op === "getPhcs"){
  let sqlcmd = "SELECT * FROM phc_master";

  let retSelect: [] = await this._sqlite.query({statement:sqlcmd,values:[]});

  return retSelect;
  }
if(op === "getDistricts"){
  let sqlcmd = "SELECT * FROM district_master";

  let retSelect: [] = await this._sqlite.query({statement:sqlcmd,values:[]});
  return retSelect;
  }
  if(op === "reverseSyncPatients"){
    
    let sqlcmd = "INSERT or IGNORE INTO patient (patient_uuid,kshema_id,group_data_id,name,demographic_info,consent_arr,needs_assessment,uuid_info,status,created_at) VALUES (?,?,?,?,?,?,?,?,?,?)";
    let values: Array<any>  = [data.patient_uuid,data.kshema_id,data.group_data_id,data.name,data.demographic_info,data.consent_arr,data.needs_assessment,data.uuid_info,data.status,data.created_at];
    var retRun: any =await this._sqlite.run({statement:sqlcmd,values:values});
    
  }

  if(op === "reverseSyncVisits"){
    
    let sqlcmd = "INSERT or IGNORE INTO clinical_visits (patient_uuid,clinical_visits_uuid,social_worker_id,visit_date,visit_type,visit_details,followup_date,created_at) VALUES (?,?,?,?,?,?,?,?)";
    let values: Array<any>  = [data.patient_uuid,data.clinical_visits_uuid,data.social_worker_id,data.visit_date,data.visit_type,data.visit_details,data.followup_date,data.created_at];
    var retRun: any =await this._sqlite.run({statement:sqlcmd,values:values});

  }
  if(op === "reverseSyncTasks"){
  
    
    let sqlcmd = "INSERT or IGNORE INTO tasks (tasks_uuid,patient_uuid,task_type,creation_date,task_due_date,task_details,status,update_date,prev_record_uuuid,origin_record_id) VALUES (?,?,?,?,?,?,?,?,?,?)";
    let values: Array<any>  = [data.tasks_uuid,data.patient_uuid,data.task_type,data.creation_date,data.task_due_date,data.task_details,data.status,data.update_date,data.prev_record_uuuid,data.origin_record_id];
    var retRun: any =await this._sqlite.run({statement:sqlcmd,values:values});

  }
  if(op === "reverseSyncNotes"){

    let sqlcmd = "INSERT or IGNORE INTO notes (notes_uuid,notes_message,read_flag,patient_uuid,sender_user_id,recipient_user_id,created_at) VALUES (?,?,?,?,?,?,?)";
    let values: Array<any>  = [data.notes_uuid,data.notes_message,data.read_flag,data.patient_uuid,data.sender_user_id,data.recipient_user_id,data.created_at];
    var retRun: any =await this._sqlite.run({statement:sqlcmd,values:values});
  
  }
  if(op === "reverseSyncUdid"){

    let sqlcmd = "INSERT or IGNORE INTO udid_info (udid_uuid,patient_uuid,udid_info_obj,created_at) VALUES (?,?,?,?)";
    let values: Array<any>  = [data.udid_uuid,data.patient_uuid,data.udid_info_obj,data.created_at];
    var retRun: any =await this._sqlite.run({statement:sqlcmd,values:values});
  
  } 
    
  }
});
}
//get the data from server db for the psw login
fetchServerData(){
  
  this.getAlltaluks();
  this.getAllPhcs()
  this.getAllDistricts();

}

async getAlltaluks(){
 
  let result = await this.serverService.getAlltalukas().subscribe(data  => {
  
  
    this.addTaluks(data);
    
  })
}
async getAllPhcs(){

  let result = this.serverService.getPHCs().subscribe(data  => {
  
  
    this.addPhcs(data);
    
  })
}

async getAllDistricts(){

  let result = await this.serverService.getDistricts().subscribe(data  => {
  
  
    this.addDistricts(data);
    
  })
}
async addTaluks(data){
   
  if(data){

    for(var i =0;i<data.length;i++){
     
      await this.sqlQuery("addTaluksLocalDb",{taluka_master_id:parseInt(data[i].taluka_master_id),taluka_name:data[i].taluka_name,taluka_details:data[i].taluka_details,createdAt:data[i].createdAt});
    }
    
  }
  

}
async addPhcs(data){
 
  if(data){

    for(var i =0;i<data.length;i++){
   
      await this.sqlQuery("addPhcsLocalDb",{phc_id:parseInt(data[i].phc_id),phc_name:data[i].phc_name});
    }
    
  }
  

}
async addDistricts(data){
  
  if(data){

    for(var i =0;i<data.length;i++){
   
      await this.sqlQuery("addDistrictsLocalDb",{district_master_id:parseInt(data[i].district_master_id),district_name:data[i].district_name});
    }
    
  }
}
 
 async downloadFile(imageUrl){
  this.androidPermissions.hasPermission(this.androidPermissions.PERMISSION.WRITE_EXTERNAL_STORAGE)
  .then(status => {
    if (status.hasPermission) {
    
    
      const fileTransfer = this.transfer.create();
    
       let downloaduri = encodeURI("http://13.126.225.131:8080/kshema/uploads/e240a0b1-0aa0-1c58-646a-f22579268af9.PNG");
       var targetPath = this.file.dataDirectory+'e240a0b1-0aa0-1c58-646a-f22579268af9.PNG';
       
        
      fileTransfer.download(downloaduri, targetPath).then((entry) => {
         
          console.log('download complete: ' + entry.toURL());
        }, (error) => {
          console.log("No DOWNLOAD"+JSON.stringify(error))
          // handle error
        });
    } else {
      this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.WRITE_EXTERNAL_STORAGE_EXTERNAL_STORAGE)
      .then(status =>{
      
      });
    }
  })
//    this.file.checkDir(this.file.externalDataDirectory, 'supervisor')
//    .then(_ => console.log('Directory exists'))
//    .catch(err => {console.log('Directory doesnt exist');
//      this.file.createDir(this.file.externalDataDirectory,"supervisor",true);
// }); 

// this.file.listDir(this.file.externalDataDirectory, 'supervisor')
// .then(_ => console.log('files found'))
// .catch(err => {console.log('No files exist');
  
// }); 
  // var url = this.baseUrl+imageUrl;
  // this.serverService.getImages(imageUrl).subscribe((data)  => {
  //   console.log("CHECK200"+JSON.stringify(data));
  //   //this.mimeType = data.type;
  //   let arr = url.split('/');
  //   var filename = arr[arr.length -1];
  //   this.convertBlobToBase64(data,filename)

  // },error => {
  //   console.log("KSHEMA EROR"+JSON.stringify(error));
    
    
     
  //   })
  
}

displayLoader(){
  this.loadingCtrl.create({
    message: 'Synchronization in progress. Please wait...',
    cssClass: 'alert_bg'
}).then((response) => {
    response.present();
});
}
dismissLoader(){
  this.loadingCtrl.dismiss().then((response) => {
    console.log('Loader closed!', response);
}).catch((err) => {
    console.log('Error occured : ', err);
});
}
  
}