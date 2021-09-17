import { Injectable } from '@angular/core';
import { Patient } from '../patient.model';
import { Clinical } from '../clinical.model';
import { ClinicalNew } from '../clinical_new.model';
import { Task } from '../task.model';
import { Login } from '../login.model';
import { UDID } from '../udid.model';
import { Record } from '../record.model';
import {Notes}  from '../notes.model';
import {Count}  from '../count.model';
import {History}  from '../history.model';
import {Taluks}  from '../taluk.model';
import {Phcs}  from '../phc.model';
import {Districts}  from '../district.model';
import { BehaviorSubject, from, Observable, of, throwError } from 'rxjs';
import { take, map, tap, delay, switchMap, catchError } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Plugins } from '@capacitor/core';
import { OfflineManagerService } from './offline-manager.service';
import {v4 as uuid} from "uuid";
import { UUID } from 'angular2-uuid';
import { DatePipe } from '@angular/common'
interface PatientData {
  patient_id:number,
  group_data_id:number,
  kshema_id: number,
  name: string,
  demographic_info: string,
  consent_arr: string,
  needs_assessment: string,
  uuid_info: string,
  status: string
}

@Injectable({
  providedIn: 'root'
})
export class PatientService {

  private _patient = new BehaviorSubject<Patient[]>([]);
  private _patient1 = new BehaviorSubject<Patient[]>([]);
  private clinical1 = new BehaviorSubject<Clinical[]>([]);
  private clinical1_new = new BehaviorSubject<ClinicalNew[]>([]);
  private clinical2 = new BehaviorSubject<Clinical[]>([]);
  private clinical3 = new BehaviorSubject<Clinical[]>([]);
  private clinical4 = new BehaviorSubject<Clinical[]>([]);
  private clinical5 = new BehaviorSubject<Clinical[]>([]);
  private clinical6 = new BehaviorSubject<Clinical[]>([]);
  private task1 = new BehaviorSubject<Task[]>([]);
  private task2 = new BehaviorSubject<Task[]>([]);
  private task3 = new BehaviorSubject<Task[]>([]);
  private task4 = new BehaviorSubject<Task[]>([]);
  private login1 = new BehaviorSubject<Login[]>([]);
  private record1 = new BehaviorSubject<Record[]>([]);
  private udid1 = new BehaviorSubject<UDID[]>([]);
  private notes1 = new BehaviorSubject<Notes[]>([]);
  private taluk1 = new BehaviorSubject<Taluks[]>([]);
  private phc1 = new BehaviorSubject<Phcs[]>([]);
  private district1 = new BehaviorSubject<Districts[]>([]);
  private count1 = new BehaviorSubject<Count[]>([]);
  private history1 = new BehaviorSubject<History[]>([]);
  imageUrl = new BehaviorSubject<string>("");

  _sqlite: any;
  DBstatus: any;
  lastId: any;
  taluk_id1 = sessionStorage.getItem("taluk_id");
  taluk_id = parseInt(this.taluk_id1);


 
  constructor(private http: HttpClient, private offlineManager : OfflineManagerService,private datePipe: DatePipe) { }
      sw_id1 = sessionStorage.getItem("sw_id");
      sw_id = parseInt(this.sw_id1);

    get patient() {

      return this._patient.asObservable();
    }

    //save psw  login credentials in device db
    async addUser(user_id,user_name,password,group_data_id,sw_id,supervisor_id,first_name,taluka_id){
      
     
      return this.offlineManager.sqlQuery("addUser",{users_id:user_id,user_name:user_name,password:password,role:'',
      email:'',contact_no:'',first_name:first_name,last_name:'',address:'',taluka_id:taluka_id,created_at:'',group_data_id:group_data_id,
      social_worker_id:sw_id,supervisor_id:supervisor_id,status:"active"});
    }

    //psw offline login
    async offlineLogin(user_name,password){
      const login_array = [];
      let retSelect:any;
      let test = await this.offlineManager.sqlQuery("loginUser",{user_name:user_name,password:password}).then(result => {
        retSelect=result;
      });
    
      
      // for (let i = 0; i < retSelect.length; i++) {
        login_array.push(
          new Login(
             retSelect.loginData.values,
             retSelect.swData.values,
             retSelect.groupData.values,
            //  retSelect.values[0].role,
            //  retSelect.values[0].email,
            //  retSelect.values[0].contact_no,
            //  retSelect.values[0].first_name,
            //  retSelect.values[0].last_name,
            //  retSelect.values[0].address,
            //  retSelect.values[0].taluka_id,
            //  retSelect.values[0].created_at,
          )
        );
         // }
      //this.login1.next(login_array);
      return login_array;
     // });
     
    }

     // to save the patient data in table in local db
    async addPatient(name,demo,uuid,assess,consent,clinical,taskData,follow_up_date,sw_id,group_data_id,medObj){
   
   
      let patient_uuid = UUID.UUID();
      const clinical_visits_uuid = UUID.UUID();

      //name,demo - form1,clinical-form2,assess - form3,taskdata - form4,uuid - form4,visitdata-form5
      //consent-form5,follow_up_date - form5
      let taskArray = JSON.parse(taskData);
      taskArray.push(medObj)
      console.log(taskArray)
      var date = new Date();
      let today =
         
          date.getFullYear() + "-"+("00" + (date.getMonth() + 1)).slice(-2) + "-" +("00" + date.getDate()).slice(-2) + " " +
          ("00" + date.getHours()).slice(-2) + ":" +
          ("00" + date.getMinutes()).slice(-2) + ":" +
          ("00" + date.getSeconds()).slice(-2);
   
         
      //method to save patient demo
      await this.offlineManager.sqlQuery("addPatient",{patient_uuid:patient_uuid,group_data_id:group_data_id,social_worker_id:sw_id,kshema_id:"2",name:name,demographic_info:demo,
        uuid_info:uuid,needs_assessment:assess,consent_arr:consent,status:"active"
      });

      //method to save tasks data
      for(var k = 0;k<taskArray.length;k++){
        
      const tasks_uuid =  UUID.UUID();
      await this.offlineManager.sqlQuery("addTasks",{tasks_uuid:tasks_uuid,patient_uuid:patient_uuid,task_type:taskArray[k].option,creation_date:today,task_due_date:taskArray[k].date,
      task_details:taskArray[k].task_details,status:'pending',update_date:'',prev_record_uuuid:'',origin_record_id:'',created_at:today});
     
      }
    
    //method to save clinical data
    await this.offlineManager.sqlQuery("addClinical",{clinical_visits_uuid:clinical_visits_uuid,patient_uuid:patient_uuid,social_worker_id:sw_id,visit_date:today,visit_type:"PHC",visit_details:clinical,followup_date:follow_up_date,
    prv_visit_uuid:''});

    }
    
   //get all active patients 
  async fetchPatients() {
  
    const patients = [];
    let retSelect:any;
    
    let test = await this.offlineManager.sqlQuery("getActivePatients",{}).then(result => {
      retSelect=result;
    });
    
    for (let i = 0; i < retSelect.values.length; i++) {
    
    patients.push(
      new Patient(
          retSelect.values[i].patient_id,
          retSelect.values[i].patient_uuid,
          retSelect.values[i].group_data_id,
          retSelect.values[i].kshema_id,
          retSelect.values[i].name,
          retSelect.values[i].demographic_info,
          retSelect.values[i].consent_arr,
          retSelect.values[i].needs_assessment,
          retSelect.values[i].uuid_info,
          retSelect.values[i].status,
          retSelect.values[i].created_at,
      )
    );
  }
  this._patient.next(patients);
  return patients;

  }

  //get all active patients to display in the all patients page
  async fetchPatientsAll() {
  
    const patients = [];
    let retSelect:any;
    
    let test = await this.offlineManager.sqlQuery("getAllPatients",{}).then(result => {
      retSelect=result;
    });
    
    for (let i = 0; i < retSelect.values.length; i++) {
    
    patients.push(
      new Patient(
          retSelect.values[i].patient_id,
          retSelect.values[i].patient_uuid,
          retSelect.values[i].group_data_id,
          retSelect.values[i].kshema_id,
          retSelect.values[i].name,
          retSelect.values[i].demographic_info,
          retSelect.values[i].consent_arr,
          retSelect.values[i].needs_assessment,
          retSelect.values[i].uuid_info,
          retSelect.values[i].status,
          retSelect.values[i].created_at,
      )
    );
  }
  this._patient.next(patients);
  return patients;

  }

  //get today's consultation data only
  async todaysPatients(today_date1){
    let today_date = new Date();
    today_date.setHours(0,0,0,0);

    const clinical_data1 = [];
    let retSelect1:any;
    
      let test = await this.offlineManager.sqlQuery("todaysPatients",{followup_date:today_date}).then(result => {
      retSelect1 = result;

    });
  
      for (let i = 0; i < retSelect1.values.length; i++) {
       
       clinical_data1.push(
        new Clinical(
          retSelect1.values[i].clinical_visits_id,
          retSelect1.values[i].clinical_visits_uuid,
          retSelect1.values[i].patient_uuid,
          retSelect1.values[i].social_worker_id,
          retSelect1.values[i].visit_date,
          retSelect1.values[i].visit_type,
          retSelect1.values[i].visit_details,
          new Date(retSelect1.values[i].followup_date),
          retSelect1.values[i].prv_visit_uuid,
          retSelect1.values[i].created_at,
         
        )
      );
      
    }
    this.clinical1.next(clinical_data1);
    return clinical_data1;

  }

 //get today's consultation data along with number of upcoming and overdue consulations and tasks
  async todaysPatients1(today_date1){
    let today_date = new Date();
    today_date.setHours(0,0,0,0);
    const clinical_data = [];
    let retSelect1:any = [];
    
    let test = await this.offlineManager.sqlQuery("todaysPatients1",{followup_date:today_date}).then(result => {
      retSelect1.push(result);

    });
  
      for (let i = 0; i < retSelect1.length; i++) {
       
      clinical_data.push(
        new ClinicalNew(
          retSelect1[0].today_visit_data.values,
          retSelect1[0].upcoming_visit,
          retSelect1[0].overdue_visit,
          retSelect1[0].today_task,
          retSelect1[0].upcoming_task,
          retSelect1[0].overdue_task,
          retSelect1[0].task_completed,
          retSelect1[0].note_count,
          retSelect1[0].total_patients
          
          
          
        )
      );
      }
    this.clinical1_new.next(clinical_data);
    return clinical_data;

  }

 //get today's tasks
 async todaysPatientsTasks(today_date1){
  let today_date = new Date();
  today_date.setHours(0,0,0,0);
  const task_data = [];
  let retSelect5:any;
  
  let test = await this.offlineManager.sqlQuery("todaysPatientsTasks",{task_due_date:today_date}).then(result => {
    retSelect5=result;

  });
  
  
  for (let i = 0; i < retSelect5.values.length; i++) {
   
      task_data.push(
        new Task(
          retSelect5.values[i].tasks_id,
          retSelect5.values[i].tasks_uuid,
          retSelect5.values[i].patient_uuid,
          retSelect5.values[i].task_type,
            retSelect5.values[i].creation_date,
            new Date(retSelect5.values[i].task_due_date),
            retSelect5.values[i].task_details,
            retSelect5.values[i].status,
            retSelect5.values[i].update_date,
            retSelect5.values[i].prev_record_id,
            retSelect5.values[i].origin_record_id,
            retSelect5.values[i].created_at,
          
        )
      );
 
    
      
      }
    this.task1.next(task_data);
    return task_data;
}

   //get upcoming consultations 
  async upcomingPatients(today_date1){
    let today_date = new Date();
    today_date.setHours(0,0,0,0);
    const clinical_data_upcoming = [];
    let retSelect2:any;
    
    let test = await this.offlineManager.sqlQuery("upcomingPatients",{followup_date:today_date}).then(result => {
      retSelect2=result;
      

    });

    for (let i = 0; i < retSelect2.values.length; i++) {
     
    
        clinical_data_upcoming.push(
          new Clinical(
            retSelect2.values[i].clinical_visits_id,
            retSelect2.values[i].clinical_visits_uuid,
            retSelect2.values[i].patient_uuid,
            retSelect2.values[i].social_worker_id,
            retSelect2.values[i].visit_date,
            retSelect2.values[i].visit_type,
            retSelect2.values[i].visit_details,
            new Date(retSelect2.values[i].followup_date),
            retSelect2.values[i].prv_visit_uuid,
            retSelect2.values[i].created_at,
           
            
          )
        );
     
      
        }
      this.clinical2.next(clinical_data_upcoming);
      return clinical_data_upcoming;
    
  }

 
  //get upcoming tasks
  async upcomingPatientsTasks(today_date1){
    let today_date = new Date();
    today_date.setHours(0,0,0,0);
    const task_data = [];
    let retSelect6:any;
    
    let test = await this.offlineManager.sqlQuery("upcomingPatientsTasks",{task_due_date:today_date}).then(result => {
      retSelect6=result; 

    });
    
    
    for (let i = 0; i < retSelect6.values.length; i++) {
     
        task_data.push(
          new Task(
            retSelect6.values[i].tasks_id,
            retSelect6.values[i].tasks_uuid,
            retSelect6.values[i].patient_uuid,
            retSelect6.values[i].task_type,
            retSelect6.values[i].creation_date,
            new Date(retSelect6.values[i].task_due_date),
              retSelect6.values[i].task_details,
              retSelect6.values[i].status,
              retSelect6.values[i].update_date,
              retSelect6.values[i].prev_record_id,
              retSelect6.values[i].origin_record_id,
              retSelect6.values[i].created_at,
            
          )
        );
       
     
       
        }
      this.task1.next(task_data);
      return task_data;
  }

  //get overdue consultations
  async overdueVisit(today_date1){
    let today_date = new Date();
    today_date.setHours(0,0,0,0);
    const clinical_data_over = [];
    let retSelect3:any;
    let test = await this.offlineManager.sqlQuery("overdueVisit",{followup_date:today_date}).then(result => {
      retSelect3=result;
    });
    for (let i = 0; i <  retSelect3.values.length; i++) {
     
        clinical_data_over.push(
          new Clinical(
            retSelect3.values[i].clinical_visits_id,
            retSelect3.values[i].clinical_visits_uuid,
            retSelect3.values[i].patient_uuid,
            retSelect3.values[i].social_worker_id,
            retSelect3.values[i].visit_date,
            retSelect3.values[i].visit_type,
            retSelect3.values[i].visit_details,
            new Date(retSelect3.values[i].followup_date),
            retSelect3.values[i].prv_visit_uuid,
            retSelect3.values[i].created_at,
            
            
          )
        );
    

      
        }
      this.clinical3.next(clinical_data_over);
      return clinical_data_over;
    
  }

  //get overdue tasks
  async getOverTask(today_date1){
    let today_date = new Date();
    today_date.setHours(0,0,0,0);
    const task_data_over = [];
    let retSelect4:any;
    
    let test = await this.offlineManager.sqlQuery("overdueTask",{task_due_date:today_date}).then(result => {
      retSelect4=result;

    });
    
    if(retSelect4.values.length > 0){
    for (let i = 0; i < retSelect4.values.length; i++) {
     

        task_data_over.push(
          new Task(
            retSelect4.values[i].tasks_id,
            retSelect4.values[i].tasks_uuid,
            retSelect4.values[i].patient_uuid,
            retSelect4.values[i].task_type,
            retSelect4.values[i].creation_date,
            new Date(retSelect4.values[i].task_due_date),
            retSelect4.values[i].task_details,
            retSelect4.values[i].status,
            retSelect4.values[i].update_date,
            retSelect4.values[i].prev_record_id,
            retSelect4.values[i].origin_record_id,
            retSelect4.values[i].created_at,
            
          )
        );
    
   
        }
      }
      this.task2.next(task_data_over);
      return task_data_over;

  }

   //get completed task
   async getCompletedTask(today_date){
    const task_data_over = [];
    let retSelect5:any;
    
    let test = await this.offlineManager.sqlQuery("completedTask",{}).then(result => {
      retSelect5=result;

    });
    
    if(retSelect5.values.length > 0){
    for (let i = 0; i < retSelect5.values.length; i++) {
      
      task_data_over.push(
          new Task(
            retSelect5.values[i].tasks_id,
            retSelect5.values[i].tasks_uuid,
            retSelect5.values[i].patient_uuid,
            retSelect5.values[i].task_type,
            retSelect5.values[i].creation_date,
            new Date(retSelect5.values[i].task_due_date),
            retSelect5.values[i].task_details,
            retSelect5.values[i].status,
            retSelect5.values[i].update_date,
            retSelect5.values[i].prev_record_id,
            retSelect5.values[i].origin_record_id,
            retSelect5.values[i].created_at,
            
          )
        );
        }
      }
      this.task4.next(task_data_over);
      return task_data_over;

  }

    //to get patient demographic details to display in the header
  async fetchPatient(pat_id){
    
      const patients1 = [];
      let retSelect = [];
      
      let test = await this.offlineManager.sqlQuery("getPatient",{patient_uuid:pat_id}).then(result => {
        retSelect.push(result);
      });

      for (let i = 0; i < retSelect.length; i++) {
      
        patients1.push(
            new Patient(
              retSelect[0].patient_id,
              retSelect[0].patient_uuid,
              retSelect[0].group_data_id,
              retSelect[0].kshema_id,
              retSelect[0].name,
              retSelect[0].demographic_info,
              retSelect[0].consent_arr,
              retSelect[0].needs_assessment,
              retSelect[0].uuid_info,
              retSelect[0].status,
              retSelect[0].created_at,
          )
        );
          }
        this._patient1.next(patients1);
        return patients1;
  }

  //get patient tasks for phc form and rehab form
  async  getPatientTasks(patient){
  
      const task3_array = [];
      let retSelect:any;
        
        let test = await this.offlineManager.sqlQuery("getPatientTasks",{patient_uuid:patient}).then(result => {
          retSelect = result;
        });
       
       for (let i = 0; i < retSelect.values.length; i++) {
      
        task3_array.push(
             new Task(
              retSelect.values[i].tasks_id,
              retSelect.values[i].tasks_uuid,
              retSelect.values[i].patient_uuid,
              retSelect.values[i].task_type,
              retSelect.values[i].creation_date,
              retSelect.values[i].task_due_date,
              retSelect.values[i].task_details,
              retSelect.values[i].status,
              retSelect.values[i].update_date,
              retSelect.values[i].prev_record_uuuid,
              retSelect.values[i].origin_record_id,
              retSelect.values[i].created_at,
            )
          );
        }
      
          this.task3.next(task3_array);
          return task3_array;

  }

  //get patient medicine refill task data for phone call and home forms
  async  getPatientMedTasks(patient){
  
    const task3_array = [];
    let retSelect:any;
      
      let test = await this.offlineManager.sqlQuery("getPatientMedTasks",{patient_uuid:patient}).then(result => {
        retSelect = result;
      });
     
     for (let i = 0; i < retSelect.values.length; i++) {
    
      task3_array.push(
           new Task(
            retSelect.values[i].tasks_id,
            retSelect.values[i].tasks_uuid,
            retSelect.values[i].patient_uuid,
            retSelect.values[i].task_type,
            retSelect.values[i].creation_date,
            retSelect.values[i].task_due_date,
            retSelect.values[i].task_details,
            retSelect.values[i].status,
            retSelect.values[i].update_date,
            retSelect.values[i].prev_record_uuuid,
            retSelect.values[i].origin_record_id,
            retSelect.values[i].created_at,
          )
        );
      }
     
        this.task3.next(task3_array);
        return task3_array;

}

//get welfare tasks data for displaying in the welfare form
  async fetchPatientWelfare(patient){
    const task3_array = [];
    let retSelect:any;
      
      let test = await this.offlineManager.sqlQuery("getPatientWelfareTasks",{patient_uuid:patient}).then(result => {
        retSelect = result;
      });
     
     for (let i = 0; i < retSelect.values.length; i++) {
  
      task3_array.push(
           new Task(
            retSelect.values[i].tasks_id,
            retSelect.values[i].tasks_uuid,
            retSelect.values[i].patient_uuid,
            retSelect.values[i].task_type,
            retSelect.values[i].creation_date,
            retSelect.values[i].task_due_date,
            retSelect.values[i].task_details,
            retSelect.values[i].status,
            retSelect.values[i].update_date,
            retSelect.values[i].prev_record_uuuid,
            retSelect.values[i].origin_record_id,
            retSelect.values[i].created_at,
          )
        );
      }
     
        this.task3.next(task3_array);
        return task3_array;
  }

  //get the previous visit details of a patient
  async getPreviousVisit(patient){
    const record_array1 = [];
    let retSelect = [];
      
      let test = await this.offlineManager.sqlQuery("getPreviousVisitRecord",{patient_uuid:patient}).then(result => {
    
        retSelect.push(result);
      });
      for (let i = 0; i < retSelect.length; i++) {
        
      
        record_array1.push(
            new Record(
              retSelect[0].visit_type,
              retSelect[0].visit_details,
              retSelect[0].followup_date
              
            
          )
        );
          }
        this.record1.next(record_array1);
        return record_array1;

  }

  //add new clinical visit data of a patient
    async addNewPHCVisit(patient,clinicaldetails,next_due_date,taskArray,statusAyyay,sw_id,next_visit_place){
      const clinical_visits_uuid = UUID.UUID();
      var date = new Date();
      let today =
         
          date.getFullYear() + "-"+("00" + (date.getMonth() + 1)).slice(-2) + "-" +("00" + date.getDate()).slice(-2) + " " +
          ("00" + date.getHours()).slice(-2) + ":" +
          ("00" + date.getMinutes()).slice(-2) + ":" +
          ("00" + date.getSeconds()).slice(-2);
      if(statusAyyay.length > 0){

        for(var k = 0;k<statusAyyay.length;k++){
         
          await   this.offlineManager.sqlQuery("updateTaskStatus",{tasks_uuid:statusAyyay[k].uuid,task_due_date:statusAyyay[k].task_date,
          task_details:statusAyyay[k].task_remark,status:statusAyyay[k].task_status,update_date:today});
       
        }
      }

      if(taskArray.length > 0){
      for(var k = 0;k<taskArray.length;k++){
        const tasks_uuid =  UUID.UUID();
        await this.offlineManager.sqlQuery("addTasks",{tasks_uuid:tasks_uuid,patient_uuid:patient,task_type:taskArray[k].option,creation_date:today,task_due_date:taskArray[k].date,
        task_details:taskArray[k].task_details,status:'pending',update_date:'',prev_record_uuuid:'',origin_record_id:'',created_at:today});
     
      }
    }

      await this.offlineManager.sqlQuery("addClinicalNew",{clinical_visits_uuid:clinical_visits_uuid,patient_uuid:patient,social_worker_id:sw_id,visit_date:today,visit_type:next_visit_place,visit_details:clinicaldetails,followup_date:next_due_date,
        prv_visit_uuid:''});

    }
   
//add new phone call data of a patient
    async addNewPhoneCall(patient,clinicaldetails,next_due_date,next_visit,sw_id,statusArray){
      const clinical_visits_uuid = UUID.UUID();
    
      var date = new Date();
      let today =date.getFullYear() + "-"+("00" + (date.getMonth() + 1)).slice(-2) + "-" +("00" + date.getDate()).slice(-2) + " " +
          ("00" + date.getHours()).slice(-2) + ":" +
          ("00" + date.getMinutes()).slice(-2) + ":" +
          ("00" + date.getSeconds()).slice(-2);
          if(statusArray[0].tasks_uuid != ""  || statusArray[0].tasks_uuid != undefined){

            for(var k = 0;k<statusArray.length;k++){
            
             
              await   this.offlineManager.sqlQuery("updateTaskStatus",{tasks_uuid:statusArray[k].tasks_uuid,task_due_date:statusArray[k].task_date,
              task_details:statusArray[k].task_remark,status:statusArray[k].task_status,update_date:today});
           
            }
    
    }
    return this.offlineManager.sqlQuery("addClinicalNew",{clinical_visits_uuid:clinical_visits_uuid,patient_uuid:patient,social_worker_id:sw_id,visit_date:today,visit_type:next_visit,visit_details:clinicaldetails,followup_date:next_due_date,
      prv_visit_uuid:''});
  }

    //add new home visit data of a patient
    async addNewHomeVisit(patient,clinicaldetails,next_due_date,next_visit,sw_id,statusArray){
      const clinical_visits_uuid = UUID.UUID();
      var date = new Date();
      let today = date.getFullYear() + "-"+("00" + (date.getMonth() + 1)).slice(-2) + "-" +("00" + date.getDate()).slice(-2) + " " +
          ("00" + date.getHours()).slice(-2) + ":" +
          ("00" + date.getMinutes()).slice(-2) + ":" +
          ("00" + date.getSeconds()).slice(-2);
          if(statusArray[0].tasks_uuid != ""  || statusArray[0].tasks_uuid != undefined){

            for(var k = 0;k<statusArray.length;k++){
             
              await   this.offlineManager.sqlQuery("updateTaskStatus",{tasks_uuid:statusArray[k].tasks_uuid,task_due_date:statusArray[k].task_date,
              task_details:statusArray[k].task_remark,status:statusArray[k].task_status,update_date:today});
           
            }
    
    }
      return this.offlineManager.sqlQuery("addClinicalNew",{clinical_visits_uuid:clinical_visits_uuid,patient_uuid:patient,social_worker_id:sw_id,visit_date:today,visit_type:next_visit,visit_details:clinicaldetails,followup_date:next_due_date,
      prv_visit_uuid:''});

    }
   
    //add new tasks and update the status of already selected tasks for a patient
    async addNewTask(patient,task_array,statusAyyay){
   
  
      var date = new Date();
      let today = date.getFullYear() + "-"+("00" + (date.getMonth() + 1)).slice(-2) + "-" +("00" + date.getDate()).slice(-2) + " " +
          ("00" + date.getHours()).slice(-2) + ":" +
          ("00" + date.getMinutes()).slice(-2) + ":" +
          ("00" + date.getSeconds()).slice(-2);
      if(statusAyyay.length > 0){

        for(var k = 0;k<statusAyyay.length;k++){
         
          await   this.offlineManager.sqlQuery("updateTaskStatus",{tasks_uuid:statusAyyay[k].uuid,task_due_date:statusAyyay[k].task_date,
          task_details:statusAyyay[k].task_remark,status:statusAyyay[k].task_status,update_date:today});
       
        }
      }
      
      if(task_array.length > 0){
      for(var k = 0;k<task_array.length;k++){
        const tasks_uuid =  UUID.UUID();
        await   this.offlineManager.sqlQuery("addNewTasks",{tasks_uuid:tasks_uuid,patient_uuid:patient,task_type:task_array[k].option,creation_date:today,task_due_date:task_array[k].date,
        task_details:task_array[k].task_details,status:'pending',update_date:'',prev_record_uuuid:'',origin_record_id:'',created_at:today});
     
      }
    
      }
     
     

    }

    //add welfare tasks data
    async addWelfareTask(patient,task_array){
     
  
      var date = new Date();
      let today =date.getFullYear() + "-"+("00" + (date.getMonth() + 1)).slice(-2) + "-" +("00" + date.getDate()).slice(-2) + " " +
          ("00" + date.getHours()).slice(-2) + ":" +
          ("00" + date.getMinutes()).slice(-2) + ":" +
          ("00" + date.getSeconds()).slice(-2);
     
      
      if(task_array.length > 0){
      for(var k = 0;k<task_array.length;k++){
        const tasks_uuid =  UUID.UUID();
        let date:any;
        if(!(task_array[k].date)){
         
          task_array[k].date = "";
        }
        await   this.offlineManager.sqlQuery("addNewTasks",{tasks_uuid:tasks_uuid,patient_uuid:patient,task_type:task_array[k].option,creation_date:today,task_due_date:task_array[k].date,
        task_details:task_array[k].task_details,status:'pending',update_date:'',prev_record_uuuid:'',origin_record_id:'',created_at:today});
     
      }
    
      }
     
     

    }

    //update the welfare tasks 
    async updateWelfareTask(patient,statusAyyay,task_array){
      
      var date = new Date();
      let today =date.getFullYear() + "-"+("00" + (date.getMonth() + 1)).slice(-2) + "-" +("00" + date.getDate()).slice(-2) + " " +
          ("00" + date.getHours()).slice(-2) + ":" +
          ("00" + date.getMinutes()).slice(-2) + ":" +
          ("00" + date.getSeconds()).slice(-2);
          
          if(statusAyyay.length > 0){
     
            for(var k = 0;k<statusAyyay.length;k++){
              if(!(statusAyyay[k].date)){
                statusAyyay[k].date = "";
              }
              await   this.offlineManager.sqlQuery("updateTaskStatus",{tasks_uuid:statusAyyay[k].uuid,task_due_date:statusAyyay[k].date,
              task_details:statusAyyay[k].task_details,status:statusAyyay[k].task_status,update_date:today});
               
           
            }
          }

          if(task_array.length > 0){
          
                for(var k = 0;k<task_array.length;k++){
                  const tasks_uuid =  UUID.UUID();
                  let date:any;
                  if(!(task_array[k].date)){
                    task_array[k].date = "";
                  }
                  await   this.offlineManager.sqlQuery("addNewTasks",{tasks_uuid:tasks_uuid,patient_uuid:patient,task_type:task_array[k].option,creation_date:today,task_due_date:task_array[k].date,
                  task_details:task_array[k].task_details,status:'pending',update_date:'',prev_record_uuuid:'',origin_record_id:'',created_at:today});
              
                }
              
          }
      
  

    }
    
    //update the assessment of needs data of a patient
    async updateAssessment(patient,assessment){
    
      var date = new Date();
      let today =
         
          date.getFullYear() + "-"+("00" + (date.getMonth() + 1)).slice(-2) + "-" +("00" + date.getDate()).slice(-2) + " " +
          ("00" + date.getHours()).slice(-2) + ":" +
          ("00" + date.getMinutes()).slice(-2) + ":" +
          ("00" + date.getSeconds()).slice(-2);
       return   this.offlineManager.sqlQuery("updatePatientAssessment",{patient_uuid:patient,needs_assessment:assessment});
     
    }

    //update the patient demographic data of a patient
    async updatePatientDemo(patient,name,demo,status){
     
      var date = new Date();
      let today =
         
          date.getFullYear() + "-"+("00" + (date.getMonth() + 1)).slice(-2) + "-" +("00" + date.getDate()).slice(-2) + " " +
          ("00" + date.getHours()).slice(-2) + ":" +
          ("00" + date.getMinutes()).slice(-2) + ":" +
          ("00" + date.getSeconds()).slice(-2);
      
       await   this.offlineManager.sqlQuery("updatePatientDemo",{patient_uuid:patient,name:name,demographic_info:demo,status:status});
     
    }

    //get the all visit details of all patients
    async getAllVisit(){
      const clinical_data3 = [];
      let retSelect7:any;
      
      let test = await this.offlineManager.sqlQuery("allVisits",{}).then(result => {
        retSelect7=result;
      });
     
       for (let i = 0; i < retSelect7.values.length; i++) {
     
        clinical_data3.push(
          new Clinical(
            retSelect7.values[i].clinical_visits_id,
            retSelect7.values[i].clinical_visits_uuid,
            retSelect7.values[i].patient_uuid,
            retSelect7.values[i].social_worker_id,
            retSelect7.values[i].visit_date,
            retSelect7.values[i].visit_type,
            retSelect7.values[i].visit_details,
            new Date(retSelect7.values[i].followup_date),
            retSelect7.values[i].prv_visit_uuid,
            retSelect7.values[i].created_at,
             
            
          )
        );
       }
      this.clinical3.next(clinical_data3);
      return clinical_data3;

    }

    //get the count of all consultations and tasks and notes data of a patient
    async getCounts(patient){
      const clinical_data = [];
      let retSelect8:any = [];
      
      let test = await this.offlineManager.sqlQuery("getCounts",{patient_uuid:patient}).then(result => {
        retSelect8.push(result);
  
      });
      
    
        for (let i = 0; i < retSelect8.length; i++) {
         
        clinical_data.push(
          new Count(
            retSelect8[0].notes_data.values,
            retSelect8[0].phc_count,
            retSelect8[0].home_count,
            retSelect8[0].phone_count,
            retSelect8[0].wel_count,
            retSelect8[0].udid_count,
            retSelect8[0].rehab_count,
           
          )
        );
        }
      
      this.count1.next(clinical_data);
      return clinical_data;
    }


    //to add new notes for a patient
    async addNewNotes(patient,notes,sw_id,supervisor_id){
    
      const notes_uuid =  UUID.UUID();
     
      return this.offlineManager.sqlQuery("addNotes",{notes_uuid:notes_uuid,notes_message:notes,read_flag:1,patient_uuid:patient,sender_user_id:sw_id,recipient_user_id:supervisor_id});
    }

    
    //to add UDID data of a patient
    async addUDID(patient,udid_data,tasks_uuid,date2){
      const udid_uuid =  UUID.UUID();
     
      if(tasks_uuid == undefined){
        const tasks_uuid =  UUID.UUID();
        var date = new Date();
        let today =
           
            date.getFullYear() + "-"+("00" + (date.getMonth() + 1)).slice(-2) + "-" +("00" + date.getDate()).slice(-2) + " " +
            ("00" + date.getHours()).slice(-2) + ":" +
            ("00" + date.getMinutes()).slice(-2) + ":" +
            ("00" + date.getSeconds()).slice(-2);
        await   this.offlineManager.sqlQuery("addNewTasks",{tasks_uuid:tasks_uuid,patient_uuid:patient,task_type:41,creation_date:today,task_due_date:date2,
        task_details:"",status:'pending',update_date:'',prev_record_uuuid:'',origin_record_id:'',created_at:today}); 
      }else{
      if(date2 != ""){
      await   this.offlineManager.sqlQuery("updateUUIDTaskStatus",{task_due_date:date2,tasks_uuid:tasks_uuid});
      }else{
        let date1  = new Date();
        let date = ("0" + date1.getDate()).slice(-2);
        let month = ("0" + (date1.getMonth() + 1)).slice(-2);
        let year =date1.getFullYear();
        let date2 = date + "-" + month + "-" + year;
        var date_today = new Date();
        let today =
         
        date_today.getFullYear() + "-"+("00" + (date_today.getMonth() + 1)).slice(-2) + "-" +("00" + date_today.getDate()).slice(-2) + " " +
          ("00" + date_today.getHours()).slice(-2) + ":" +
          ("00" + date_today.getMinutes()).slice(-2) + ":" +
          ("00" + date_today.getSeconds()).slice(-2);
        await   this.offlineManager.sqlQuery("updateTaskStatus",{tasks_uuid:tasks_uuid,task_due_date:date2,
          task_details:"",status:"Completed",update_date:today});
      }
    }
      await this.offlineManager.sqlQuery("addUDID",{udid_uuid:udid_uuid,patient_uuid:patient,udid_info_obj:udid_data});
  
    }

    //get the all visits data(history) and notes data of a patient for the history page
    async getVisitHistory(patient){
      
      const clinical_data4 = [];
      let retSelect11:any = [];
      
      let test = await this.offlineManager.sqlQuery("patientAllVisits",{patient_uuid:patient}).then(result => {
        retSelect11.push(result);
    
        
      });
     
       for (let i = 0; i < retSelect11.length; i++) {
    
        clinical_data4.push(
          new History(
            retSelect11[0].history_data.values,
            retSelect11[0].notes_data.values,
            retSelect11[0].pat_data.values,
            retSelect11[0].task_data.values
           
           
            
          )
        );
       }
      this.clinical3.next(clinical_data4);
      return clinical_data4;

    }

    //get the notes data for a patient
    async getNotes(patient){
      const notes_array1 = [];
      let retSelect12:any;
      
      let test = await this.offlineManager.sqlQuery("getPatientNotes",{patient_uuid:patient}).then(result => {
        retSelect12=result;
    
        
      });
     if( retSelect12.values.length > 0){
       for (let i = 0; i < retSelect12.values.length; i++) {
     
        notes_array1.push(
          new Notes(
            retSelect12.values[i].notes_id,
            retSelect12.values[i].notes_uuid,
            retSelect12.values[i].notes_message,
            retSelect12.values[i].read_flag,
            retSelect12.values[i].patient_uuid,
            retSelect12.values[i].sender_user_id,
            retSelect12.values[i].recipient_user_id,
            retSelect12.values[i].created_at
            
           
            
          )
        );
       }
      }
      this.notes1.next(notes_array1);
      return notes_array1;
    }

    //get the supervisor notes from the local db(which is fetched from server db)
    async fetchSuperNotes(sw_id){
      const notes_array1 = [];
      let retSelect13:any;
      
      let test = await this.offlineManager.sqlQuery("getSuperNotes",{recipient_user_id:JSON.stringify(sw_id)}).then(result => {
        retSelect13=result;
    
        
      });
     
       for (let i = 0; i < retSelect13.values.length; i++) {
     
        notes_array1.push(
          new Notes(
            retSelect13.values[i].notes_id,
            retSelect13.values[i].notes_uuid,
            retSelect13.values[i].notes_message,
            retSelect13.values[i].read_flag,
            retSelect13.values[i].patient_uuid,
            retSelect13.values[i].sender_user_id,
            retSelect13.values[i].recipient_user_id,
            retSelect13.values[i].created_at
            
           
            
          )
        );
       }
      this.notes1.next(notes_array1);
      return notes_array1;
    }

    //update the status of read notes
    async updateNotesStatus(notes_uuid){
      return this.offlineManager.sqlQuery("updateNotes",{notes_uuid:notes_uuid});
    }
    
    //to get the notification count to display in the dashboard 
      async getCount(sw_id){
        const notes_array1 = [];
      let retSelect14:any;
      
      let test = await this.offlineManager.sqlQuery("getSuperNotes",{recipient_user_id:JSON.stringify(sw_id)}).then(result => {
        retSelect14=result;
    
       
      });
     
       for (let i = 0; i < retSelect14.values.length; i++) {
     
        notes_array1.push(
          new Notes(
            retSelect14.values[i].notes_id,
            retSelect14.values[i].notes_uuid,
            retSelect14.values[i].notes_message,
            retSelect14.values[i].read_flag,
            retSelect14.values[i].patient_uuid,
            retSelect14.values[i].sender_user_id,
            retSelect14.values[i].recipient_user_id,
            retSelect14.values[i].created_at
            
           
            
          )
        );
       }
      this.notes1.next(notes_array1);
      return notes_array1;
      }
      
      //get the latest udid data and the tasks_uuid of the udid task 
      async getPatientUUIDUDID(patient){
        const udid1_array1 = [];
        let retSelect:any = [];
          
          let test = await this.offlineManager.sqlQuery("getPatientUDID",{patient_uuid:patient}).then(result => {
         
            retSelect.push(result);
           
          });
         

          udid1_array1.push(
               new UDID(
                retSelect[0].udid_uuid_data.values,
                retSelect[0].latest_udid_data.values,
               
              )
            );
      
            this.udid1.next(udid1_array1);
            return udid1_array1;
      }

      //get all taluks to dislay in the add/edit patient form dropdown
      async getTaluks(){
        const taluk_array1 = [];
        let retSelect15:any;
        let test = await this.offlineManager.sqlQuery("getTaluks",{}).then(result => {
          retSelect15=result;
      
         
        });

        for (let i = 0; i < retSelect15.values.length; i++) {
          
     
            taluk_array1.push(
              new Taluks(
                retSelect15.values[i].taluka_master_id,
                retSelect15.values[i].taluka_name,
                retSelect15.values[i].taluka_details,
                retSelect15.values[i].createdAt,
                
                
               
                
              )
            );
           
         
         }
        
         this.taluk1.next(taluk_array1);
         return taluk_array1;
      }

      async getPhcs(){
        const phc_array1 = [];
        let retSelect16:any;
        let test = await this.offlineManager.sqlQuery("getPhcs",{}).then(result => {
          retSelect16=result;
      
         
        });

        for (let i = 0; i < retSelect16.values.length; i++) {
          
     
            phc_array1.push(
              new Phcs(
                retSelect16.values[i].phc_id,
                retSelect16.values[i].phc_name
               
                
                
               
                
              )
            );
           
         
         }
        
         this.phc1.next(phc_array1);
         return phc_array1;
      }

      async getDistricts(){
        const district_array1 = [];
        let retSelect17:any;
        let test = await this.offlineManager.sqlQuery("getDistricts",{}).then(result => {
          retSelect17=result;
      
         
        });

        for (let i = 0; i < retSelect17.values.length; i++) {
          
     
          district_array1.push(
              new Districts(
                retSelect17.values[i].district_master_id,
                retSelect17.values[i].district_name
               
                
                
               
                
              )
            );
           
         
         }
        
         this.district1.next(district_array1);
         return district_array1;
      }

    
}
