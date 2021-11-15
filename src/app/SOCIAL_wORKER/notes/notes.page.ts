import { Component, OnInit,ViewChild } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {MatStepperModule} from '@angular/material/stepper';
import {FormBuilder,FormControl,FormGroupDirective,NgForm, FormGroup, Validators} from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import {Location} from '@angular/common';
import {  MatStepper} from '@angular/material/stepper';
import { Router } from '@angular/router';
import { PatientService } from 'src/app/services/patient.service';
import { Patient } from 'src/app/patient.model';
import { Result1 } from 'src/app/result1.model';
import { Subscription } from 'rxjs';
import { HttpClient, HttpHeaders, JsonpClientBackend } from '@angular/common/http';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { NetworkService, ConnectionStatus } from 'src/app/services/network.service';
import { OfflineManagerService } from 'src/app/services/offline-manager.service';
import { Plugins, Capacitor, AppState } from '@capacitor/core';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { LoadingController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { ServerService } from 'src/app/services/server.service';
import { UUID } from 'angular2-uuid';
import { MatSnackBar } from "@angular/material/snack-bar";

@Component({
  selector: 'app-notes',
  templateUrl: './notes.page.html',
  styleUrls: ['./notes.page.scss'],
})
export class NotesPage implements OnInit {
  
  displayedColumns: string[] = ['name','notes_message','date'];
  dataSource= new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
  
  @ViewChild(MatPaginator) paginator: MatPaginator;
  
  data : any;
  newNote = false;
  patientArray:any;
  notes1;
  patient_uuid;
  
  constructor(private _formBuilder: FormBuilder,private _location: Location,
    private router: Router,private patientService: PatientService,
    private networkService : NetworkService,
    private offlineManager : OfflineManagerService,
    public alertController: AlertController,private loadingCtrl: LoadingController,
    private serverService: ServerService,public snackBar: MatSnackBar) { }
    sw_id1;
    sw_id;
    supervisor_id1;
    supervisor_id;
    user_name;

    //supervisor code
    super_id1;
    super_id;
    group_data_id1;
    group_data_id;
    allPatients_array1:any;
    allPatients_array:any;
    role;
    group_data_array:any;
    sw_group_id;
    psw = true;
    newNote1 = false;
    allnotes_array_first1:any;
    group_data;
    group_data1;
    sender_user_id;
    receiver_user_id;
    psw_array:any;
    showSpinner = false;
    super_notes_array_first = [];
  ngOnInit() {
  }

  ionViewWillEnter() {
    this.super_notes_array_first = [];
    this.showSpinner = true;
    this.newNote1 = false;
    this.newNote = false;
    this.role = sessionStorage.getItem("role")
    this.user_name = sessionStorage.getItem("user_name");
    this.sw_id1 = sessionStorage.getItem("sw_id");
    this.sw_id = parseInt(this.sw_id1);
    this.supervisor_id1 = sessionStorage.getItem("supervisor_id");
    this.supervisor_id = parseInt(this.supervisor_id1);
     
    this.group_data_id1 = sessionStorage.getItem("group_data_id");
    this.group_data_id = parseInt(this.group_data_id1);
    this.sender_user_id = sessionStorage.getItem("users_id")
    this.dataSource.data = [];

    if(this.role == "psw"){
      this.psw = true;
      this.getPatients();
      this.getSupervisorNotes();
    }else{
      this.psw = false;
      this.group_data = sessionStorage.getItem("group_data");
      this.group_data1 =  JSON.parse( this.group_data);
      this.group_data_id = 0;
      this.getGroupDataServer(this.supervisor_id);
      this.getAllPatientsServer(this.group_data_id);
      this.getAllTalukasPswsTalukasupervisors();
      //this.getAllPSWs();
      // this.getAllNotesServer();
      
    }

   
  }

   getAllTalukasPswsTalukasupervisors(){
    let taluk_array_first :any;
     this.serverService.getAllTalukasPswsTalukasupervisors().toPromise().then(result3 => {
     
      taluk_array_first=result3;
      this.psw_array = taluk_array_first[0].social_worker;

   });
 
  }
   //to get all psws
 async getAllPSWs(){
  let psw_array_first :any;
  let test = await this.serverService.getPsws().toPromise().then(result1 => {
   
    psw_array_first=result1;

 });
 
  this.psw_array = psw_array_first;

 
}

  async getPatients(){
    let patients_array_first :any;
    let test = await this.patientService.fetchPatients().then(result1 => {
     
      patients_array_first=result1;

   });
   this.patientArray = patients_array_first;
  }

  //get the supervisor notes sent saved in local db from server db 
  async getSupervisorNotes(){
    let notes_array = [];
    let data_res3 = [];
    let new_array = [];
    this.dataSource.data = [];
    let notes_uuid_array = [];
    
    let test = await this.patientService.fetchSuperNotes(this.sender_user_id).then(result2 => {
     
      this.super_notes_array_first=result2;
      

   });
        this.showSpinner = false;
        notes_array = [];

        notes_array = this.super_notes_array_first;
       
        let resultArray1 :any;
        resultArray1 = this.patientArray;
       
     
        //filter all patients array to get the demographic details of patients ids in the today clinical data array
      for(var arr in resultArray1){
        for(var filter in this.super_notes_array_first){
            if(resultArray1[arr].patient_uuid == this.super_notes_array_first[filter].patient_uuid){
              new_array.push(resultArray1[arr]);
              this.super_notes_array_first[filter].name = resultArray1[arr].name;
              
              }
        }
      }
   
      for(var k=0;k<this.super_notes_array_first.length;k++){
    
        this.super_notes_array_first[k].date = new Date(this.super_notes_array_first[k].created_at);
        
        this.dataSource.paginator = this.paginator;
      
        if(this.super_notes_array_first[k].read_flag == 1){
        notes_uuid_array.push(this.super_notes_array_first[k].notes_uuid);
       
        }
     
       
      }
      //this.super_notes_array_first =  this.super_notes_array_first.reverse();
      this.dataSource.data = this.super_notes_array_first.reverse();
  
  }

  //update the read status from this page in local db 
  updateNotesStatus(notes_uuid){
    this.patientService.updateNotesStatus(notes_uuid).then(() => {
    });
  }


  async getGroupDataServer(supervisor_id){
    let group_array_first :any;
    let test = await this.serverService.getGroupData(supervisor_id).toPromise().then(result1 => {
     
      group_array_first=result1;

   });

     this.group_data_array = group_array_first;
   
   
   
  }

  async getAllPatientsServer(group_data_id){
   let patients_array_first  = [];
   let array2:any;
    let test = await this.serverService.getPatitents(group_data_id).toPromise().then(result2 => {
     
     // patients_array_first=result2;
      array2 = result2;

   });
   for(var m=0;m<array2.length;m++){
    for(var n=0;n<this.group_data1.length;n++){
     if(array2[m].patientObj.group_data_id == this.group_data1[n]){
     
      array2[m].group_data = array2[m].patientObj.group_data_id;
      if(array2[m].group_data != null){
       
        patients_array_first.push(array2[m]);
      }
      
    }
     }
   }
      
      this.allPatients_array = patients_array_first;
   
     this.getAllNotesServer();
      for(var m=0;m<this.allPatients_array.length;m++){
        this.allPatients_array[m].patient_uuid = this.allPatients_array[m].patientObj.patient_uuid;
        this.allPatients_array[m].name = this.allPatients_array[m].patientObj.name;
        this.allPatients_array[m].group_id = this.allPatients_array[m].patientObj.group_data_id;

      }
      
  
  }

  async getAllNotesServer(){
  

    let test = await this.serverService.getAllNOtifications(this.sender_user_id).subscribe(data  => {
      this.showSpinner = false;
    let date_array = [];
    let new_array = [];
    let notes_uuid_array = [];
  
      this.allnotes_array_first1 = data;
      this.patientArray = this.allnotes_array_first1;
      let resultArray1;
        resultArray1 = this.allPatients_array;
        
      
      for(var arr in resultArray1){
        for(var filter in this.patientArray){
            if(resultArray1[arr].patient_uuid == this.patientArray[filter].patient_uuid){
              new_array.push(resultArray1[arr]);
              this.patientArray[filter].name = resultArray1[arr].name;
              
              
              }
        }
      }
  
      for(var i = 0;i<this.patientArray.length;i++){
        this.patientArray[i].date = new Date(this.patientArray[i].createdAt);
       
        if(this.patientArray[i].read_flag == 1){
          notes_uuid_array.push(this.patientArray[i].notes_uuid);
          }
      
      }
      //latest first order
      this.patientArray = this.patientArray.reverse();
      this.dataSource.data = this.patientArray;
    
      this.dataSource.paginator = this.paginator;
      
      for(var m=0;m<notes_uuid_array.length;m++){
        this.updateNotesStatusServer(notes_uuid_array[m])
        }
    });
  
  }

  updateNotesStatusServer(notes_uuid){
  
  this.serverService.updateNotesStatus(notes_uuid).subscribe(
    data  => {
     
  });
  }

  applyFilter(filterValue: string) {
  }

  addNewNote(){
    if(this.role == "psw"){
      this.newNote1 = false;
    this.newNote = true;

    }else{
      this.newNote = false;
      this.newNote1 = true;
    }
  }

  changePatient(value) {
   
    this.patient_uuid = value;
    for(var k=0;k<this.allPatients_array.length;k++){
      if(this.patient_uuid == this.allPatients_array[k].patient_uuid){
        
        this.sw_group_id = this.allPatients_array[k].group_id; 
       
      }
    }
    //this.psw_array
    for(var n=0;n<this.group_data_array.length;n++){
      if(this.sw_group_id == this.group_data_array[n].group_data_id){
        this.sw_id = this.group_data_array[n].social_worker_id; 
      }
    }
    for(var n=0;n<this.psw_array.length;n++){
      if(this.sw_id == this.psw_array[n].social_worker_id){
        this.receiver_user_id = this.psw_array[n].users_id; 
      }
    }
  }

  sendNotes(){
  
    if(this.notes1 != undefined){
  if(this.role == "psw"){
   if(this.patient_uuid != undefined){
      this.patientService.addNewNotes(this.patient_uuid,this.notes1,this.sender_user_id,this.supervisor_id,null).then(() => {
        this.alertController.create({
          header: '',
          cssClass: 'my-custom-alert',
          subHeader: '',
          
          message: 'Changes saved successfully',
          
          buttons: [
          
            {
              text: 'OK',
              cssClass: 'alertButton2',
              handler: () => {
                //this.offlineManager.checkForEvents().subscribe();
                this.displayLoader();
                setTimeout(()=>{
                 this.dismissLoader();
                 this.router.navigate(['dashboard']);
                }, 5000);
          
                
              }
            
            }
          ]
        }).then(res => {
          res.present();
        });
      err => {
          console.log("No Internet Connection! Data added to the Request List");
    }
  });
}else{
  this.snackBar.open('Please select patient', 'x', {
    duration: 10000,
  });
}
    
  }else{
    if(this.patient_uuid != undefined){
    const today = new Date();
    const notes_uuid =  UUID.UUID();
    var date = new Date();
      let dateStr =
        
          date.getFullYear() + "-"+("00" + (date.getMonth() + 1)).slice(-2) + "-" +("00" + date.getDate()).slice(-2) + " " +
          ("00" + date.getHours()).slice(-2) + ":" +
          ("00" + date.getMinutes()).slice(-2) + ":" +
          ("00" + date.getSeconds()).slice(-2);

          let notesObj = {
            "notes_uuid" :notes_uuid,
            "notes_message":this.notes1,
            "read_flag":1,
            "patient_uuid":this.patient_uuid,
            "sender_user_id": this.sender_user_id,
            "recipient_user_id":this.receiver_user_id,
            "createdAt":dateStr
        }

      this.loadingCtrl
      .create({
        message: 'Saving Notes data...'
      })
      .then(loadingEl => {
        loadingEl.present();
  
        this.serverService.addNotes(notesObj) .subscribe(data  => {
            this.notes1 = "";
        loadingEl.dismiss();
       
        this.router.navigate(['supervisor-dashboard']);

        },err => {
          console.log(err);
        
        });
        loadingEl.dismiss();
                  
        });
      }else{
        this.snackBar.open('Please select patient', 'x', {
          duration: 10000,
        });
      }
  }
}else{
  this.snackBar.open('Please enter notes', 'x', {
    duration: 10000,
  });
}



  }

  home(){
    if(this.role == "psw"){
    this.router.navigate(['dashboard']);
    }else{
      this.router.navigate(['supervisor-dashboard']);
    }
  }

  logout(){
    this.router.navigate(['']);
  
  }
  displayLoader(){
    this.loadingCtrl.create({
      message: 'Loading. Please wait...'
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

export interface PeriodicElement {
  name: string;
  notes_message:string;
  date:string;
  
 
  
}
const ELEMENT_DATA: PeriodicElement[] = [
  {name:'',notes_message:"",date:''},

  
];