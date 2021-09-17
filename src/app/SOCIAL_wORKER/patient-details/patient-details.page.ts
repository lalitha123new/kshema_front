import { Component, OnInit, ViewChild } from '@angular/core';
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
import { LoadingController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { OfflineManagerService } from '../../services/offline-manager.service';
import { ServerService } from 'src/app/services/server.service';
import { UUID } from 'angular2-uuid';
@Component({
  selector: 'app-patient-details',
  templateUrl: './patient-details.page.html',
  styleUrls: ['./patient-details.page.scss'],
})
export class PatientDetailsPage implements OnInit {
  
  constructor(private _location: Location,private router: Router,private patientService: PatientService,
    private loadingCtrl: LoadingController,
    public alertController: AlertController,private offlineManager : OfflineManagerService,
    private serverService: ServerService) { }
  
  isValue: number = 1; 
  isShown: boolean = false ;
  notes1;
  sw_id1;
  sw_id = 0;
  supervisor_id1;
  supervisor_id;
  user_name;

  patient_id;
  patient_uuid;
  kshema_id;
  name;
  gender;
  age;
  demo:any;
  mobile;
  address;
  care_giver;
  care_giver_mobile;
  asha;
  psw_incharge;

  notes = false;
  public phc_count: number;
  public home_count: number;
  public phone_count: number;
  public rehab_count: number;
  public welfare_count: number;
  public udid_count: number;

  //supercode
  super_id1;
  super_id;
  firstNote = true;
  allNotes=false;
  patient_array:any;
  replyNote = "";
  patient_notes_array:any;
  demo1:any;
  sender_id;
  group_id;
  group_data_array:any;
  role;
  psw = true;
  buttons = true;
  notes_array_first1:any;
  
  displayedColumns_dashboard1: string[] = ['name',  'message', 'date','time'];
  
  dataSource_dashboard1 = new MatTableDataSource<PeriodicElement_dashboard1>(ELEMENT_DATA_dashboard1);
  group_data;
  group_data1;
  recipient_user_id;
  sw_id2;
  ngOnInit() {
    
  }

ionViewWillEnter() {
    this. sw_id2 = 0;
    this.phc_count=0;
    this.home_count=0;
    this.phone_count=0;
    this.rehab_count=0;
    this.welfare_count=0;
    this.udid_count=0;

    this.user_name = sessionStorage.getItem("user_name");
    this.sw_id1 = sessionStorage.getItem("sw_id");
    this.sw_id1 = JSON.parse(this.sw_id1);
    this.sw_id = parseInt(this.sw_id1);
    this.supervisor_id1 = sessionStorage.getItem("supervisor_id");
    this.supervisor_id1 = JSON.parse(this.supervisor_id1);
    this.supervisor_id = parseInt(this.supervisor_id1);
    this.group_id =  sessionStorage.getItem("group_data_id")
  
  
   this.patient_id =  sessionStorage.getItem('patient_id');
   this.patient_uuid = sessionStorage.getItem('patient_uuid');
   this.role = sessionStorage.getItem("role")

  if(this.role == "psw"){
    this.psw = true;
    this.getPatient();
    this.getCount();
  }else{
    this.psw = false; 
    this.notes = true;
    this.group_data = sessionStorage.getItem("group_data");
    this.group_data1 =  JSON.parse( this.group_data);
   
    this.getGroupDataServer(this.supervisor_id);
   // this.getPatientServer();
    this.getPatientNotesServer();
  }
   
 
}

async getPatient(){
  this.patient_id =  sessionStorage.getItem('patient_id');
  this.patient_uuid =  sessionStorage.getItem('patient_uuid');

  let patient_array_first :any;
    let test = await this.patientService.fetchPatient(this.patient_uuid).then(result1 => {
     
      patient_array_first=result1;

   });
 

  this.kshema_id = patient_array_first[0].kshema_id;
  this.name = patient_array_first[0].name;
  this.demo = JSON.parse(patient_array_first[0].demographic_info);

  if(this.demo.gender == 1){
    this.gender = "M";
    }else if(this.demo.gender == 2){
    this.gender = "F";
    }else{
    this.gender = "O";
    }

    const today = new Date();
    const birthDate = new Date(this.demo.dob);
   
    let age = today.getFullYear() - new Date(this.demo.dob).getFullYear();
    const m = today.getMonth() - new Date(this.demo.dob).getMonth();
   
    if (m < 0 || (m === 0 && today.getDate() < new Date(this.demo.dob).getDate())) {
      age--;
     
    }
    this.age = age;
    this.mobile = this.demo.phone;
    this.address = this.demo.address1;
    this.care_giver = this.demo.caregiver_name;
    this.care_giver_mobile = this.demo.caregiver_phone;

    if(!this.demo.contact_patient){
      this.asha = "test asha";
    }else{
    this.asha = this.demo.contact_patient;
    }
    this.psw_incharge = "test psw";


}

//get the count of consultations and tasks and also the notes history for the patient
async getCount(){
  
  let notes_array:any = [];
  let date_array:any = [];
  this.dataSource_dashboard1.data = [];
  let count_array_first :any;
    let test = await this.patientService.getCounts(this.patient_uuid).then(result1 => {
     
      count_array_first=result1;

   });
 
 
    this.phc_count = count_array_first[0].phc_count;
    if(count_array_first[0].home_count > 0){
    this.home_count = count_array_first[0].home_count;
    }
    if(count_array_first[0].phone_count > 0){
    this.phone_count = count_array_first[0].phone_count;
    }
    if(count_array_first[0].rehab_count > 0){
      this.rehab_count = count_array_first[0].rehab_count;
      }
     
    if(count_array_first[0].wel_count > 0){
    this.welfare_count = count_array_first[0].wel_count;
    }
    if(count_array_first[0].udid_count > 0){
     
    this.udid_count = count_array_first[0].udid_count;
    }
   
    notes_array = [];
    if(count_array_first[0].notes_data.length > 0){
    for(var i = 0; i<count_array_first[0].notes_data.length;i++){
    
      date_array = [];
      notes_array =  count_array_first[0].notes_data;
     
      if(notes_array[i].sender_user_id == this.sw_id){
      notes_array[i].name = "You";
      }else{
        notes_array[i].name = "supervisor";
      } 
      notes_array[i].message  =  count_array_first[0].notes_data[i].notes_message;
      date_array = count_array_first[0].notes_data[i].created_at.split(" ");
      notes_array[i].date  = date_array[0];
      notes_array[i].time  = date_array[1];
      this.dataSource_dashboard1.data = notes_array;
    }
  }
    
 
}


async getGroupDataServer(supervisor_id){
  let group_array_first :any;
  let test = await this.serverService.getGroupData(supervisor_id).toPromise().then(result1 => {
   
    group_array_first=result1;

 });

  
  
   this.group_data_array = group_array_first;
   this.getPatientServer();
  
  
 
}

//get the patient demographic details from server db 
async getPatientServer(){
  let patient_array_first :any;
  let test = await this.serverService.getPatitent(this.patient_uuid).toPromise().then(result2 => {
   
    patient_array_first=result2;

 });
  
  
   
    this.patient_array = patient_array_first;
   
    this.kshema_id = this.patient_array[0].kshema_id;
    this.name =  this.patient_array[0].name;
    this.demo1=this.patient_array[0].demographic_info;
    this.demo1 = JSON.parse(this.demo1)
    if(this.demo1.gender == 1){
      this.gender = "M";
      }else if(this.demo1.gender == 2){
      this.gender = "F";
      }else{
      this.gender = "O";
      }
  
      const today = new Date();
      const birthDate = new Date(this.demo1.dob);
     
      let age = today.getFullYear() - new Date(this.demo1.dob).getFullYear();
      const m = today.getMonth() - new Date(this.demo1.dob).getMonth();
     
      if (m < 0 || (m === 0 && today.getDate() < new Date(this.demo1.dob).getDate())) {
        age--;
       
      }
      this.age = age;
    this.mobile = this.demo1.phone;
    this.address = this.demo1.address1;
    this.care_giver = this.demo1.caregiver_name;
    this.care_giver_mobile = this.demo1.caregiver_phone;
    this.asha = this.demo1.contact_patient;
   for(var j=0;j<this.group_data_array.length;j++){
    if(this.patient_array[0].group_data_id == this.group_data_array[j].group_data_id){
    
      this.sw_id2 = this.group_data_array[j].social_worker_id;
      console.log(this.sw_id2)
     
    }
  }
   

}

//get the notes history for a patient
async getPatientNotesServer(){
  let notes_array_first :any;
//   let test = await this.serverService.getPatientNotes(this.patient_uuid).toPromise().then(result3 => {
  
//     notes_array_first=result3;

// });
this.serverService.getPatientNotes(this.patient_uuid)
.subscribe(
data  => {
  let date_array = [];
  
  
    //this.patient_notes_array = notes_array_first;
    this.patient_notes_array = data;
 
    if(this.patient_notes_array.length > 0){
      this.firstNote = false;
      this.allNotes = true;
    }
    for(var i = 0;i<this.patient_notes_array.length;i++){

    
      if(this.patient_notes_array[i].sender_user_id !=this.supervisor_id){
      
        this.patient_notes_array[i].name = "PSW";
        this.sender_id = this.patient_notes_array[i].sender_user_id;
      }else{
        this.patient_notes_array[i].name = "You";
      
      }
    
      
      date_array = this.patient_notes_array[i].createdAt.split(" ");
      this.patient_notes_array[i].date = [date_array[0]];
      this.patient_notes_array[i].time = [date_array[1]];
      this.patient_notes_array[i].message =  this.patient_notes_array[i].notes_message;
    
    }
    this.dataSource_dashboard1.data = this.patient_notes_array;

  });
  }
sendNotes(){
 
 
   
    this.patientService.addNewNotes(this.patient_uuid,this.notes1,this.sw_id,this.supervisor_id).then(() => {
       
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
              this.notes1 = "";
              this.offlineManager.checkForEvents().subscribe();
             // this.router.navigate(['dashboard']);
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
     
     
        
      },err => {
        console.log("No Internet Connection! Data added to the Request List");
        
       
      });


}


home(){
  if(this.role == "psw"){
  this.router.navigate(['dashboard']);
  }else{
    this.router.navigate(['supervisor-dashboard']);
  }
}

  pageRedirect(i){
    
    if(i == 1){
    
      this.router.navigate(['phc-visit']);
    }else if(i == 2){
    
      this.router.navigate(['home-visit']);
    }else if(i == 3){
     
      this.router.navigate(['phone-call']);
    }else if(i == 4){
   
      this.router.navigate(['welfare']);
    }else if(i == 5){
     
      this.router.navigate(['udid']);
    }else if(i == 6){
     
      this.router.navigate(['rehab-measures']);
    }else {
   
      this.router.navigate(['assessment-needs']);
    }

  }
  
 
  logout(){
    this.router.navigate(['']);
  }

redirectTo(x){
  if(x==1){
  
    this.router.navigate(['history']);
  }else{
    this.router.navigate(['edit-patient']);
  }
}

back(){
 
  this.alertController.create({
    header: '',
    cssClass: 'my-custom-alert',
    subHeader: '',
    
    message: 'Would you want to add any details to Assessment of Needs,Rehabilation Measures, Welfare Module or UDID for the patient',
    
    buttons: [
     
      {
        text: 'Yes',
        cssClass: 'alertButton2',
        handler: () => {

     this.router.navigate(['patient-details']);
   
        }
      
      },
      {
        text: 'No',
        cssClass: 'alertButton2',
        handler: () => {
     
      this.router.navigate(['dashboard']);
      
        }
      
      }
    ]
  }).then(res => {
    res.present();
  });
}

hideNotes(){
  this.notes = false;
}

startNoteSupervisor(){

   this.recipient_user_id = 0;
  const notes_uuid =  UUID.UUID();
  var date = new Date();
  
  let dateStr =
     
      date.getFullYear() + "-"+("00" + (date.getMonth() + 1)).slice(-2) + "-" +("00" + date.getDate()).slice(-2) + " " +
      ("00" + date.getHours()).slice(-2) + ":" +
      ("00" + date.getMinutes()).slice(-2) + ":" +
      ("00" + date.getSeconds()).slice(-2);
    
      let notesObj:any;
 
   // recipient_user_id1 = this.sw_id;
      if(this.sender_id != undefined){
        this.recipient_user_id = this.sender_id;
    }else{
      
      this.recipient_user_id = this.sw_id2;
    }
  
     notesObj = {
      "notes_id":0,
      "notes_uuid" :notes_uuid,
      "notes_message":'',
      "read_flag":1,
      "patient_uuid":this.patient_uuid,
      "sender_user_id":this.supervisor_id,
      "recipient_user_id":this.recipient_user_id,
      "createdAt":dateStr
    

  }
  notesObj.notes_message = this.notes1;
  this.serverService.addNotes(notesObj)
  .subscribe(
  data  => {
    this.notes1 = "";
    this.replyNote = "";
 
    this.router.navigate(['supervisor-dashboard']);
  })
 
}
replyNoteSupervisor(){

  let recipient_user_id1;
  const notes_uuid =  UUID.UUID();
  var date = new Date();
  
  let dateStr =
     
      date.getFullYear() + "-"+("00" + (date.getMonth() + 1)).slice(-2) + "-" +("00" + date.getDate()).slice(-2) + " " +
      ("00" + date.getHours()).slice(-2) + ":" +
      ("00" + date.getMinutes()).slice(-2) + ":" +
      ("00" + date.getSeconds()).slice(-2);
    
      let notesObj:any;
      
       
        recipient_user_id1 = this.sw_id2;
      
    
     
     notesObj = {
      "notes_id":0,
      "notes_uuid" :notes_uuid,
      "notes_message":'',
      "read_flag":1,
      "patient_uuid":this.patient_uuid,
      "sender_user_id":this.supervisor_id,
      "recipient_user_id":recipient_user_id1,
      "createdAt":dateStr
    

  }
 
  notesObj.notes_message = this.replyNote;
  this.serverService.addNotes(notesObj)
  .subscribe(
  data  => {
    this.notes1 = "";
    this.replyNote = "";
 
    this.router.navigate(['supervisor-dashboard']);
  })
 
}
viewReplyNotes(){
  this.notes = true;
  this.buttons = true;
  
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

export interface PeriodicElement_dashboard1 {
  name: string;
  message: string;
  date: string;
  time:string;
  
}

const ELEMENT_DATA_dashboard1: PeriodicElement_dashboard1[] = [
  { name: '',message:' ',date:'',time:''},
 
];