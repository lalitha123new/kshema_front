import { Component, OnInit, ViewChild } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {FormBuilder,FormControl,FormGroupDirective,NgForm, FormGroup, Validators} from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import { Router } from '@angular/router';
import { ServerService } from 'src/app/services/server.service';
import { UUID } from 'angular2-uuid';



@Component({
  selector: 'app-send-message',
  templateUrl: './send-message.page.html',
  styleUrls: ['./send-message.page.scss'],
})
export class SendMessagePage implements OnInit {

  constructor(private router: Router,private serverService: ServerService) { }

  displayedColumns_dashboard1: string[] = ['name',  'notes_message','created_at','createdAt2'];
  dataSource_dashboard1 = new MatTableDataSource<PeriodicElement_dashboard1>(ELEMENT_DATA_dashboard1);
  super_id1;
  super_id;
  firstNote = true;
  allNotes=false;
  notes1 = "";
  patient_array:any;
  replyNote = "";

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
  patient_notes_array:any;
  demo1:any;
  sender_id;
  user_name;
  group_id;
  group_data_array:any;
  sw_id;

  ngOnInit() {
  }


  ionViewWillEnter() {
    this.user_name = sessionStorage.getItem("user_name");
    this.super_id1 = sessionStorage.getItem("supervisor_id");
    this.super_id = parseInt(this.super_id1);
   
  
    this.kshema_id;
    this.name;
    this.mobile;
    this.address;
    this.care_giver;
    this.care_giver_mobile;
    this.asha;
   
    this.patient_uuid = sessionStorage.getItem("patient_uuid");
    this.group_id = sessionStorage.getItem("group_id");
    this.getGroupData(this.super_id);
    this.getPatient();
    this.getPatientNotes();
   
  }

  async getGroupData(supervisor_id){
    let group_array_first :any;
    let test = await this.serverService.getGroupData(supervisor_id).toPromise().then(result1 => {
     
      group_array_first=result1;

   });
  
    
    
     this.group_data_array = group_array_first;
    
   
  }

  //get the patient demographic details from server db 
  async getPatient(){
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
      for(var k=0;k<this.group_data_array.length;k++){
        if(this.group_id == this.group_data_array[0].group_data_id){
          this.sw_id = this.group_data_array[0].social_worker_id;
        }
      }
     
  
  }

  //get the notes history for a patient
  async getPatientNotes(){
    let notes_array_first :any;
    let test = await this.serverService.getPatientNotes(this.patient_uuid).toPromise().then(result3 => {
    
      notes_array_first=result3;

  });
    let date_array = [];
    
    
      this.patient_notes_array = notes_array_first;
    
      if(this.patient_notes_array.length > 0){
        this.firstNote = false;
        this.allNotes = true;
      }
      for(var i = 0;i<this.patient_notes_array.length;i++){

      
        if(this.patient_notes_array[i].sender_user_id != this.super_id){
          this.patient_notes_array[i].name = "PSW";
          this.sender_id = this.patient_notes_array[i].sender_user_id;
        }else{
          this.patient_notes_array[i].name = "You";
        
        }
      
        
        date_array = this.patient_notes_array[i].createdAt.split(" ");
        this.patient_notes_array[i].created_at = [date_array[0]];
        this.patient_notes_array[i].createdAt2 = [date_array[1]];
      
      }
      this.dataSource_dashboard1.data = this.patient_notes_array;

  
    }

 //redirect to dashboard page
  home(){
    this.router.navigate(['supervisor-dashboard']);
  }

  //redirect to patient history page
  history(){
    this.router.navigate(['history']);
  }

  writeNotes(x){
  
    this.firstNote = false;
    this.allNotes = true;
  
    const notes_uuid =  UUID.UUID();
    var date = new Date();
    
    let dateStr =
      
        date.getFullYear() + "-"+("00" + (date.getMonth() + 1)).slice(-2) + "-" +("00" + date.getDate()).slice(-2) + " " +
        ("00" + date.getHours()).slice(-2) + ":" +
        ("00" + date.getMinutes()).slice(-2) + ":" +
        ("00" + date.getSeconds()).slice(-2);
        let recipient_user_id1 = 0;
        if(x == 1){
          recipient_user_id1 = this.sw_id;
        }else{
          recipient_user_id1 = this.sender_id;
        }
      
        let notesObj = {
          "notes_id":0,
          "notes_uuid" :notes_uuid,
          "notes_message":'',
          "read_flag":1,
          "patient_uuid":this.patient_uuid,
          "sender_user_id":this.super_id,
          "recipient_user_id":recipient_user_id1,
          "createdAt":dateStr
        

      }


      if(x == 1){
        notesObj.notes_message = this.notes1;
      }else{
        notesObj.notes_message = this.replyNote;
      }
    this.serverService.addNotes(notesObj)
    .subscribe(
    data  => {
      //window.location.reload();
      this.router.navigate(['supervisor-dashboard']);
    })
  }
 
  //redirect to unread/all notes pages
  redirectToNotes(){
    this.router.navigate(['super-notes']);
  }

  logout(){
    this.router.navigate(['']);
  }
  
}
export interface PeriodicElement_dashboard1 {
  name: string;
  notes_message: string;
  created_at: string;
  createdAt2:string;
  
}


const ELEMENT_DATA_dashboard1: PeriodicElement_dashboard1[] = [
  { name: '',notes_message:'', created_at:'',createdAt2:''},
 
  
];