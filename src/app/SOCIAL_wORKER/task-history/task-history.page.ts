import { Component, OnInit,ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ServerService } from 'src/app/services/server.service';
import {FormBuilder,FormControl,FormGroupDirective,NgForm, FormGroup, Validators,ValidatorFn} from '@angular/forms';

import { MatTabGroup } from '@angular/material/tabs';
interface status_options{
  value: string;
  viewValue_status: string;
  checked:boolean;
}
interface tobacco_options{
  value: string;
  viewValue: string;
  checked:boolean
}
interface yesno_options{
  value: string;
  viewValue_yesno: string;
  checked:boolean;
}
interface yesno_other_options{
  value: string;
  viewValue_yesno_other: string;
  checked:boolean
}

interface remind_optons {
  value: string;
  viewValue: string;
}
interface status_optons{
  value: string;
  viewValue: string;
}
@Component({
  selector: 'app-task-history',
  templateUrl: './task-history.page.html',
  styleUrls: ['./task-history.page.scss'],
})
export class TaskHistoryPage implements OnInit {

  constructor(private router: Router,private serverService: ServerService,private _formBuilder: FormBuilder,) { }
  @ViewChild(MatTabGroup) tabGroup: MatTabGroup;
  prefTabs:any;
  prefTabs_pat:any;
  role;
  user_name;
  patient_uuid;
  show_edit;
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
  patient_array:any;
  demo1:any;
  check1_remark ="";
  check2_remark ="";
  check3_remark ="";
  check4_remark ="";
  check5_remark ="";
  check6_remark ="";
  check7_remark ="";
  check8_remark ="";
  check9_remark ="";
  check10_remark ="";
  check11_remark ="";
  check12_remark ="";
  check13_remark ="";
  check14_remark ="";
  check15_remark ="";
  check16_remark ="";
  check17_remark ="";
  check18_remark ="";
  check19_remark ="";
  check1_date;
  check2_date;
  check3_date;
  check4_date;
  check5_date;
  check6_date;
  check7_date;
  check8_date;
  check9_date;
  check10_date;
  check11_date;
  check12_date;
  check13_date;
  check14_date;
  check15_date;
  check16_date;
  check17_date;
  check18_date;
  check19_date;
  optionCheck1 = false;
  optionCheck2 = false;
  optionCheck3 = false;
  optionCheck4 = false;
  optionCheck5 = false;
  optionCheck6 = false;
  optionCheck7 = false;
  optionCheck8 = false;
  optionCheck9 = false;
  optionCheck10 = false;
  optionCheck11= false;
  optionCheck12 = false;
  optionCheck13 = false;
  optionCheck14 = false;
  optionCheck15 = false;
  optionCheck16 = false;
  optionCheck17 = false;
  optionCheck18 = false; 
  optionCheck19 = false; 
  check1_date1;
  check2_date1;
  check3_date1;
  check4_date1;
  check5_date1;
  check6_date1;
  check7_date1;
  check8_date1;
  check9_date1;
  check10_date1;
  check11_date1;
  check12_date1;
  check13_date1;
  check14_date1;
  check15_date1;
  check16_date1;
  check17_date1;
  check18_date1;
  check19_date1;
 
  patObject = {
    description:'',
    skill:'',
    skill_yes:'',
    job:'',
    job_yes:'',
    interest_act:'',
    interest_act_yes:'',
    community:'',
    community_yes:'',
    daily:'',
    daily_yes:'',
    house:'',
    house_yes:'',
    finance:'',
    finance_yes:'',
    other_help:'',
    other_help_yes:''


  };
  check1 =false;
  det1="";
  date1;
 

  check2 = false;
  det2="";
  date2;

  check3 = false;
  det3="";
  date3;

  check4 = false;
  det4="";
  date4;

  check5 = false;
  det5="";
  date5;

  check6 = false;
  det6="";
  date6;

  check7 = false;
  det7="";
  date7;

  check8 = false;
  det8="";
  date8;

  check9 = false;
  det9="";
  date9;

  check10 = false;
  det10="";
  date10;

  check11 = false;
  det11="";
  date11;

  check12 = false;
  det12="";
  date12;

  check13 = false;
  det13="";
  date13;

  check14 = false;
  det14="";
  date14;
  date1_new;
  date2_new;
  date3_new;
  date4_new;
  date5_new;
  date6_new;
  date7_new;
  date8_new;
  date9_new;
  date10_new;
  date11_new;
  date12_new;
  date13_new;
  date14_new;
  option_value1;
  option_value2;
  option_value3;
  option_value4;
  option_value5;
  option_value6;
  option_value7;
  option_value8;
  option_value9;
  option_value10;
  option_value11;
  option_value12;
  option_value13;
  option_value14;
  details1;
  details2;
  details3;
  details4;
  details5;
  details6;
  details7;
  details8;
  details9;
  details10;
  details11;
  details12;
  details13;
  details14;
 
  task_id1;
  task_id2;
  task_id3;
  task_id4;
  task_id5;
  task_id6;
  task_id7;
  task_id8;
  task_id9;
  task_id10;
  task_id11;
  task_id12;
  task_id13;
  task_id14;
  udidObj = {
    udid_details_first:'',
    remarks_first:'',
    completed_date_first:'',
    ack_first:'',
    review_date:'',

    udid_details_1week:'',
    remarks_1week:'',
    completed_date_1week:'',
    ack_1week:'',
    date_time_1week:'',
    appointment_date_1week:'',
    verification_place_1week:'',

    udid_details_2days:'',
    remarks_2days:'',
    completed_date_2days:'',
    ack_2days:'',
    date_time_2days:'',
    appointment_date_2days:'',
    verification_place_2days:'',
    reminder_given_2days:'',
    reminder_method_2days:'',

    udid_details_1month:'',
    remarks_1month:'',
    completed_date_1month:'',
    ack_1month:'',
    date_time_1month:'',
    appointment_date_1month:'',
    verification_place_1month:'',
    reminder_given_1month:'',
    reminder_method_1month:'',
    udid_status:'',
    details_further_steps:'',
    welfare_benefits:'',
    brochure:'',
    module:'',
    med_authority:'',
    date_supervisor:'',
  }
  fourthFormGroup: any;
  uploadYes = true;
  statusPending = false;
  certifcateIssued = true;
 assess_details1;
 assess_details2;
 assess_details3;
 assess_details4;
 assess_details5;
 assess_details6;
 assess_details7;
 assess_details8;
 assess_details9;
 step1_remark;
 completed_date_1month;
 review_date;
 ack_1month;
 appointment_date_1month;
 verification_place_1month;
 reminder_method_1month;
 udid_status;
 details_further_steps;
 date_supervisor;
 welfare_benefits;
 brochure;
 module;
 uploadNo = false;
 showSpinner = false;
 reminder1;
 reminder2;
  
  
   
  ngOnInit() {
    
  }

  ionViewWillEnter() {
    this.step1_remark= "";
    this.completed_date_1month ="";
    this.review_date= "";
    this.ack_1month ="";
    this.appointment_date_1month ="";
    this.verification_place_1month="";
    this.reminder_method_1month="";
    this.udid_status="";
    this.details_further_steps="";
    this.date_supervisor="";
    this.welfare_benefits="";
    this.brochure="";
    this.module="";
    this.uploadNo = false;
    this.reminder1 = "";
    this.reminder2 = "";
   for(var i=0;i<this.tobaccooptionsArray2udid.length;i++){
     this.tobaccooptionsArray2udid[i].checked = false;
   }
   for(var i=0;i<this.tobaccooptionsArray2udid2.length;i++){
    this.tobaccooptionsArray2udid2[i].checked = false;
  }
  for(var i=0;i<this.tobaccooptionsArray1udid.length;i++){
    this.tobaccooptionsArray1udid[i].checked = false;
  }
  for(var i=0;i<this.tobaccooptionsArray3.length;i++){
    this.tobaccooptionsArray3[i].checked = false;
  }
  for(var i=0;i<this.statusArray1.length;i++){
    this.statusArray1[i].checked = false;
    this.statusArray2[i].checked = false;
    this.statusArray3[i].checked = false;
    this.statusArray4[i].checked = false;
    this.statusArray5[i].checked = false;
    this.statusArray6[i].checked = false;
    this.statusArray7[i].checked = false;
    this.statusArray8[i].checked = false;
    this.statusArray9[i].checked = false;
    this.statusArray10[i].checked = false;
    this.statusArray11[i].checked = false;
    this.statusArray12[i].checked = false;
    this.statusArray13[i].checked = false;
    this.statusArray14[i].checked = false;
    this.statusArray15[i].checked = false;
    this.statusArray16[i].checked = false;
    this.statusArray17[i].checked = false;
    this.statusArray18[i].checked = false;
    this.statusArray19[i].checked = false;
  }
  this.check1_remark ="";
  this.check1_date = "";
  this.check2_remark ="";
  this.check2_date = "";
  this.check3_remark ="";
  this.check3_date = "";
  this.check4_remark ="";
  this.check4_date = "";
  this.check5_remark ="";
  this.check5_date = "";
  this.check6_remark ="";
  this.check6_date = "";
  this.check7_remark ="";
  this.check7_date = "";
  this.check8_remark ="";
  this.check8_date = "";
  this.check9_remark ="";
  this.check9_date = "";
  this.check10_remark ="";
  this.check10_date = "";
  this.check11_remark ="";
  this.check11_date = "";
  this.check12_remark ="";
  this.check12_date = "";
  this.check13_remark ="";
  this.check13_date = "";
  this.check14_remark ="";
  this.check14_date = "";
  this.check15_remark ="";
  this.check15_date = "";
  this.check16_remark ="";
  this.check16_date = "";
  this.check17_remark ="";
  this.check17_date = "";
  this.check18_remark ="";
  this.check18_date = "";
  this.check19_remark ="";
  this.check19_date = "";
 
  
   
   
    this.showSpinner = true;
    this.check1 =false;
    this.det1="";
    this.date1;
  
    this.check2 = false;
    this.det2="";
    this.date2;
  
    this.check3 = false;
    this.det3="";
    this.date3;
  
    this.check4 = false;
    this.det4="";
    this.date4;
  
    this.check5 = false;
    this.det5="";
    this.date5;
  
    this.check6 = false;
    this.det6="";
    this.date6;
  
    this.check7 = false;
    this.det7="";
    this.date7;
  
    this.check8 = false;
    this.det8="";
    this.date8;
  
    this.check9 = false;
    this.det9="";
    this.date9;
  
    this.check10 = false;
    this.det10="";
    this.date10;
  
    this.check11 = false;
    this.det11="";
    this.date11;
  
    this.check12 = false;
    this.det12="";
    this.date12;
  
    this.check13 = false;
    this.det13="";
    this.date13;
  
    this.check14 = false;
    this.det14="";
    this.date14;
    this.prefTabs = [];
    this.prefTabs_pat = [];
    this.role =  sessionStorage.getItem("role")
    this.user_name = sessionStorage.getItem("user_name");
    this.patient_uuid =  sessionStorage.getItem('patient_uuid');
   

    if(this.role == "supervisor"){
      this.show_edit = false;
      this.getPatientServer(this.patient_uuid);
      this.getPatientUDID(this.patient_uuid)
      this.getPatientTasks(this.patient_uuid);
    }else{
      this.show_edit = true;
     
    }
   
  }
  
 
    async getPatientServer(patient_uuid){
      let patient_array_first :any;
      let test = await this.serverService.getPatitent(patient_uuid).toPromise().then(result1 => {
       
        patient_array_first=result1;
  
     });
     
      
        this.showSpinner = false;
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
        let assessData = JSON.parse(patient_array_first[0].needs_assessment);
        
        this.assess_details1 = assessData.add_help;
      
        if(assessData.skill == "Yes"){
          this.tobaccooptionsArray1[0].checked = true;
          this.assess_details2 =assessData.skill_yes;
          
        }else if(assessData.skill == "No"){
          this.tobaccooptionsArray1[1].checked = true;
          this.assess_details2 = assessData.skill_yes;
          
        }else{
          this.tobaccooptionsArray1[0].checked = false;
          this.tobaccooptionsArray1[1].checked = false;
        }
    
        if(assessData.job == "Yes"){
          this.tobaccooptionsArray2[0].checked = true;
          this.assess_details3 =assessData.job_yes;
         
        }else if(assessData.job == "No"){
          this.tobaccooptionsArray2[1].checked = true;
          this.assess_details3 =assessData.job_yes;
          
        }else{
          this.tobaccooptionsArray2[0].checked = false;
          this.tobaccooptionsArray2[1].checked = false;
        }
    
        if(assessData.interest_act == "Yes"){
        
          this.tobaccooptionsArray3assess[0].checked = true;
          this.assess_details4 =assessData.interest_act_yes;
         
        }else if(assessData.interest_act == "No"){
        
          this.tobaccooptionsArray3assess[1].checked = true;
          this.assess_details4 =assessData.interest_act_yes;
        }else{
          this.tobaccooptionsArray3assess[0].checked = false;
          this.tobaccooptionsArray3assess[1].checked = false;
        }
        if(assessData.community == "Yes"){
          this.tobaccooptionsArray4[0].checked = true;
          this.assess_details5 =assessData.community_yes;
         
        }else if(assessData.community == "No"){
          this.tobaccooptionsArray4[1].checked = true;
          this.assess_details5 =assessData.community_yes;
        }else{
          this.tobaccooptionsArray4[0].checked = false;
          this.tobaccooptionsArray4[1].checked = false;
        }
    
        if(assessData.daily == "Yes"){
          this.tobaccooptionsArray5[0].checked = true;
          this.assess_details6 =assessData.daily_yes;
         
        }else if(assessData.daily == "No"){
          this.tobaccooptionsArray5[1].checked = true;
          this.assess_details6 =assessData.daily_yes;
        }else{
          this.tobaccooptionsArray5[0].checked = false;
          this.tobaccooptionsArray5[1].checked = false;
        }
    
        if(assessData.house == "Yes"){
          this.tobaccooptionsArray6[0].checked = true;
          this.assess_details7 =assessData.house_yes;
         
        }else if(assessData.house == "No"){
          this.tobaccooptionsArray6[1].checked = true;
          this.assess_details7 =assessData.house_yes;
        }else{
          this.tobaccooptionsArray6[0].checked = false;
          this.tobaccooptionsArray6[1].checked = false;
        }
    
        if(assessData.finance == "Yes"){
          this.tobaccooptionsArray7[0].checked = true;
          this.assess_details8 =assessData.finance_yes;
         
        }else if(assessData.finance == "No"){
          this.tobaccooptionsArray7[1].checked = true;
          this.assess_details8 =assessData.finance_yes;
        }else{
          this.tobaccooptionsArray7[0].checked = false;
          this.tobaccooptionsArray7[1].checked = false;
        }
    
        if(assessData.other_help == "Yes"){
          this.tobaccooptionsArray8[0].checked = true;
          this.assess_details9 =assessData.other_help_yes;
         
        }else if(assessData.other_help == "No"){
          this.tobaccooptionsArray8[1].checked = true;
          this.assess_details9 =assessData.other_help_yes;
        }else{
          this.tobaccooptionsArray8[0].checked = false;
          this.tobaccooptionsArray8[1].checked = false;
        }
       
      
  
        
     
    }

  async getPatientUDID(patient_uuid){
    let udid_array_first :any;
    let test = await this.serverService.getPatientUDID(patient_uuid).toPromise().then(result2 => {
     
      udid_array_first=result2;

   });
 
  
   if(udid_array_first[0] != undefined){
  

    let udidObject = JSON.parse(udid_array_first[0].udid_info_obj);
 
  
    if(udidObject.udid_details == "Yes"){
     
      this.tobaccooptionsArray2udid[0].checked = true;
      this.uploadNo = false;
      
    }else  if(udidObject.udid_details == "No"){
      this.tobaccooptionsArray2udid[1].checked = true;
      this.uploadNo = true;
    }else if(udidObject.udid_details == "Incomplete"){
      this.tobaccooptionsArray2udid[2].checked = true;
      this.uploadNo = true;
    }
    this.step1_remark = udidObject.remarks;
    this.completed_date_1month = new Date(udidObject.completed_date);
    this.review_date = new Date(udidObject.review_date);
 if(udidObject.date_time == "Yes"){
     
      this.tobaccooptionsArray2udid2[0].checked = true;
      this.uploadNo = false;
      
    }else  if(udidObject.date_time == "No"){
      this.tobaccooptionsArray2udid2[1].checked = true;
      this.uploadNo = true;
    }else if(udidObject.date_time == "Incomplete"){
      this.tobaccooptionsArray2udid2[2].checked = true;
      this.uploadNo = true;
    }
    this.ack_1month = udidObject.ack_no;
    this.appointment_date_1month = new Date(udidObject.appointment_date)
    this.verification_place_1month =  udidObject.verification_place;
    let follow_up_date2 = new Date(udidObject.appointment_date)
    this.reminder1 = this.addDays1(follow_up_date2,2);
     
    this.reminder2 = this.reminder1;
   if(udidObject.reminder == "Yes"){
    
    this.tobaccooptionsArray1udid[0].checked = true;
   
    
  }else  if(udidObject.reminder == "No"){
    this.tobaccooptionsArray1udid[1].checked = true;
   
  }
  
    if(udidObject.reminder_method === "1"){
      this.reminder_method_1month  = "Phone Call"
    }else if(udidObject.reminder_method == "2"){
      this.reminder_method_1month  = "Text Message"
    }else if(udidObject.reminder_method == "3"){
      this.reminder_method_1month  = "In-person reminder at follow-up"
    }
    
    if(udidObject.udid_status === "1"){
      this.udid_status  = "Pending"
    }else if(udidObject.udid_status == "2"){
      this.udid_status  = "Cerificate Issued- softcopy"
    }else if(udidObject.udid_status == "3"){
      this.udid_status  = "Cerificate Issued- softcopy and hardcopy"
    }else if(udidObject.udid_status == "4"){
      this.udid_status  = "Application rejected"
    }else if(udidObject.udid_status == "5"){
      this.udid_status  = "Other"
    }
    
    if(udidObject.udid_status == 1 || udidObject.udid_status == 4 || udidObject.udid_status == 5 ){
      
      this.certifcateIssued = false;
      this.statusPending = true;
      this.details_further_steps = udidObject.details_further_steps;
      
      this.date_supervisor = new Date(udidObject.date_supervisor)
      
      if(udidObject.med_authority == "Yes"){
        this.tobaccooptionsArray3[0].checked = true;
      
      }else if(udidObject.med_authority == "No"){
        this.tobaccooptionsArray3[1].checked = true; 
      }else if(udidObject.med_authority == "Not done"){
        this.tobaccooptionsArray3[2].checked = true;
      }

    }else{
      this.statusPending = false;
      this.certifcateIssued = true;
      this.details_further_steps = udidObject.details_further_steps;
      this.welfare_benefits = udidObject.welfare_benefits;
      this.brochure = udidObject.brochure;
      this.module = udidObject.module;
    }
    }
  }

  async getPatientTasks(patient_uuid){
    let tasks_array_first :any;
    let test = await this.serverService.getPatientAllTasks(patient_uuid).toPromise().then(result2 => {
     
      tasks_array_first=result2;

   });
 
 
   for(var i = 0; i<tasks_array_first.length;i++){
    
    if(tasks_array_first[i].task_type == 1){
   
   
      this.optionCheck1 = true;
      this.check1_remark = tasks_array_first[i].task_details;
      this.check1_date1 = tasks_array_first[i].task_due_date; 
      this.check1_date = new Date(tasks_array_first[i].task_due_date); 

    if(tasks_array_first[i].status == "pending" || tasks_array_first[i].status == "In Progress"){
      this.statusArray1[0].checked = true;
    }else if(tasks_array_first[i].status == "Completed"){
      this.statusArray1[1].checked = true;

    }else{
      this.statusArray1[2].checked = true;
    }
    }
    if(tasks_array_first[i].task_type == 2){
     
      this.optionCheck2 = true;
      this.check2_remark = tasks_array_first[i].task_details; 
      this.check2_date1 = tasks_array_first[i].task_due_date; 
      this.check2_date = new Date(tasks_array_first[i].task_due_date); 

      
      if(tasks_array_first[i].status == "pending" || tasks_array_first[i].status == "In Progress"){
        this.statusArray2[0].checked = true;
      }else if(tasks_array_first[i].status == "Completed"){
        this.statusArray2[1].checked = true;
  
      }else{
        this.statusArray2[2].checked = true;
      }
    }
    if(tasks_array_first[i].task_type == 3){
      
      this.optionCheck3 = true;
      this.check3_remark = tasks_array_first[i].task_details;
      this.check3_date1 = tasks_array_first[i].task_due_date; 
      this.check3_date = new Date(tasks_array_first[i].task_due_date); 
      
      if(tasks_array_first[i].status == "pending" || tasks_array_first[i].status == "In Progress"){
        this.statusArray3[0].checked = true;
      }else if(tasks_array_first[i].status == "Completed"){
        this.statusArray3[1].checked = true;
  
      }else{
        this.statusArray3[2].checked = true;
      }
    }
    if(tasks_array_first[i].task_type == 4){
    
      this.optionCheck4 = true;
      this.check4_remark = tasks_array_first[i].task_details; 
      this.check4_date1 = tasks_array_first[i].task_due_date; 
      this.check4_date = new Date(tasks_array_first[i].task_due_date); 
      
      if(tasks_array_first[i].status == "pending" || tasks_array_first[i].status == "In Progress"){
        this.statusArray4[0].checked = true;
      }else if(tasks_array_first[i].status == "Completed"){
        this.statusArray4[1].checked = true;
  
      }else{
        this.statusArray4[2].checked = true;
      }
    }
    if(tasks_array_first[i].task_type == 5){
     
      this.optionCheck5 = true;
      this.check5_remark = tasks_array_first[i].task_details; 
      this.check5_date1 = tasks_array_first[i].task_due_date; 
      this.check5_date = new Date(tasks_array_first[i].task_due_date); 
      if(tasks_array_first[i].status == "pending" || tasks_array_first[i].status == "In Progress"){
        this.statusArray5[0].checked = true;
      }else if(tasks_array_first[i].status == "Completed"){
        this.statusArray5[1].checked = true;
  
      }else{
        this.statusArray5[2].checked = true;
      }
    }
    if(tasks_array_first[i].task_type == 6){
      
      this.optionCheck6 = true;
      this.check6_remark = tasks_array_first[i].task_details; 
      this.check6_date1 = tasks_array_first[i].task_due_date; 
      this.check6_date = new Date(tasks_array_first[i].task_due_date); 
      
      if(tasks_array_first[i].status == "pending" || tasks_array_first[i].status == "In Progress"){
        this.statusArray6[0].checked = true;
      }else if(tasks_array_first[i].status == "Completed"){
        this.statusArray6[1].checked = true;
  
      }else{
        this.statusArray6[2].checked = true;
      }
    }
    if(tasks_array_first[i].task_type == 7){
     
      this.optionCheck7 = true;
      this.check7_remark = tasks_array_first[i].task_details; 
      this.check7_date1 = tasks_array_first[i].task_due_date;
      this.check7_date = new Date(tasks_array_first[i].task_due_date); 
     
      if(tasks_array_first[i].status == "pending" || tasks_array_first[i].status == "In Progress"){
        this.statusArray7[0].checked = true;
      }else if(tasks_array_first[i].status == "Completed"){
        this.statusArray7[1].checked = true;
  
      }else{
        this.statusArray7[2].checked = true;
      }
    }
    if(tasks_array_first[i].task_type == 8){
     
      this.optionCheck8 = true;
      this.check8_remark = tasks_array_first[i].task_details; 
      this.check8_date1 = tasks_array_first[i].task_due_date; 
      this.check8_date = new Date(tasks_array_first[i].task_due_date); 
     
      if(tasks_array_first[i].status == "pending" || tasks_array_first[i].status == "In Progress"){
        this.statusArray8[0].checked = true;
      }else if(tasks_array_first[i].status == "Completed"){
        this.statusArray8[1].checked = true;
  
      }else{
        this.statusArray8[2].checked = true;
      }
    }
    if(tasks_array_first[i].task_type == 9){
     
      this.optionCheck9 = true;
      this.check9_remark = tasks_array_first[i].task_details; 
      this.check9_date1 = tasks_array_first[i].task_due_date; 
      this.check9_date = new Date(tasks_array_first[i].task_due_date); 
     
      if(tasks_array_first[i].status == "pending" || tasks_array_first[i].status == "In Progress"){
        this.statusArray9[0].checked = true;
      }else if(tasks_array_first[i].status == "Completed"){
        this.statusArray9[1].checked = true;
  
      }else{
        this.statusArray9[2].checked = true;
      }
    }
    if(tasks_array_first[i].task_type == 10){
     
      this.optionCheck10 = true;
      this.check10_remark = tasks_array_first[i].task_details; 
      this.check10_date1 = tasks_array_first[i].task_due_date; 
      this.check10_date = new Date(tasks_array_first[i].task_due_date); 
     
      if(tasks_array_first[i].status == "pending" || tasks_array_first[i].status == "In Progress"){
        this.statusArray10[0].checked = true;
      }else if(tasks_array_first[i].status == "Completed"){
        this.statusArray10[1].checked = true;
  
      }else{
        this.statusArray10[2].checked = true;
      }
    }
    if(tasks_array_first[i].task_type == 11){
     
      this.optionCheck11 = true;
      this.check11_remark = tasks_array_first[i].task_details; 
      this.check11_date1 = tasks_array_first[i].task_due_date;
      this.check11_date = new Date(tasks_array_first[i].task_due_date); 
      
      if(tasks_array_first[i].status == "pending" || tasks_array_first[i].status == "In Progress"){
        this.statusArray11[0].checked = true;
      }else if(tasks_array_first[i].status == "Completed"){
        this.statusArray11[1].checked = true;
  
      }else{
        this.statusArray11[2].checked = true;
      }
    }
    if(tasks_array_first[i].task_type == 12){
    
      this.optionCheck12 = true;
      this.check12_remark = tasks_array_first[i].task_details; 
      this.check12_date1 = tasks_array_first[i].task_due_date;
      this.check12_date = new Date(tasks_array_first[i].task_due_date); 
    
      if(tasks_array_first[i].status == "pending" || tasks_array_first[i].status == "In Progress"){
        this.statusArray12[0].checked = true;
      }else if(tasks_array_first[i].status == "Completed"){
        this.statusArray12[1].checked = true;
  
      }else{
        this.statusArray12[2].checked = true;
      }
    }
    if(tasks_array_first[i].task_type == 13){
     
      this.optionCheck13 = true;
      this.check13_remark = tasks_array_first[i].task_details; 
      this.check13_date1 = tasks_array_first[i].task_due_date;
      this.check13_date = new Date(tasks_array_first[i].task_due_date); 
      
      if(tasks_array_first[i].status == "pending" || tasks_array_first[i].status == "In Progress"){
        this.statusArray13[0].checked = true;
      }else if(tasks_array_first[i].status == "Completed"){
        this.statusArray13[1].checked = true;
  
      }else{
        this.statusArray13[2].checked = true;
      }
    }
    if(tasks_array_first[i].task_type == 14){
     
      this.optionCheck14 = true;
      this.check14_remark = tasks_array_first[i].task_details; 
      this.check14_date1 = tasks_array_first[i].task_due_date;
      this.check14_date = new Date(tasks_array_first[i].task_due_date); 
      
      if(tasks_array_first[i].status == "pending" || tasks_array_first[i].status == "In Progress"){
        this.statusArray14[0].checked = true;
      }else if(tasks_array_first[i].status == "Completed"){
        this.statusArray14[1].checked = true;
  
      }else{
        this.statusArray14[2].checked = true;
      }
    }
    if(tasks_array_first[i].task_type == 15){
     
      this.optionCheck15 = true;
      this.check15_remark = tasks_array_first[i].task_details; 
      this.check15_date1 = tasks_array_first[i].task_due_date;
      this.check15_date = new Date(tasks_array_first[i].task_due_date); 
      
      if(tasks_array_first[i].status == "pending" || tasks_array_first[i].status == "In Progress"){
        this.statusArray15[0].checked = true;
      }else if(tasks_array_first[i].status == "Completed"){
        this.statusArray15[1].checked = true;
  
      }else{
        this.statusArray15[2].checked = true;
      }
    }
    if(tasks_array_first[i].task_type == 16){
      
      this.optionCheck16 = true;
      this.check16_remark = tasks_array_first[i].task_details; 
      this.check16_date1 = tasks_array_first[i].task_due_date;
      this.check16_date = new Date(tasks_array_first[i].task_due_date); 
     
      if(tasks_array_first[i].status == "pending" || tasks_array_first[i].status == "In Progress"){
        this.statusArray16[0].checked = true;
      }else if(tasks_array_first[i].status == "Completed"){
        this.statusArray16[1].checked = true;
  
      }else{
        this.statusArray16[2].checked = true;
      }
    }
    if(tasks_array_first[i].task_type == 17){
    
      this.optionCheck17 = true;
      this.check17_remark = tasks_array_first[i].task_details; 
      this.check17_date1 = tasks_array_first[i].task_due_date;
      this.check17_date = new Date(tasks_array_first[i].task_due_date); 
      
      if(tasks_array_first[i].status == "pending" || tasks_array_first[i].status == "In Progress"){
        this.statusArray17[0].checked = true;
      }else if(tasks_array_first[i].status == "Completed"){
        this.statusArray17[1].checked = true;
  
      }else{
        this.statusArray17[2].checked = true;
      }
    }  
    if(tasks_array_first[i].task_type == 18){
     
      this.optionCheck18 = true;
      this.check18_remark = tasks_array_first[i].task_details; 
      this.check18_date1 = tasks_array_first[i].task_due_date;
      this.check18_date = new Date(tasks_array_first[i].task_due_date); 
      
      if(tasks_array_first[i].status == "pending" || tasks_array_first[i].status == "In Progress"){
        this.statusArray18[0].checked = true;
      }else if(tasks_array_first[i].status == "Completed"){
        this.statusArray18[1].checked = true;
  
      }else{
        this.statusArray18[2].checked = true;
      }
    }
    if(tasks_array_first[i].task_type == 19){
    
    
      this.optionCheck19 = true;
      this.check19_remark = tasks_array_first[i].task_details; 
      this.check19_date1 = tasks_array_first[i].task_due_date;
      this.check19_date = new Date(tasks_array_first[i].task_due_date); 
     
    
      if(tasks_array_first[i].status == "pending" || tasks_array_first[i].status == "In Progress"){
        this.statusArray19[0].checked = true;
      }else if(tasks_array_first[i].status == "Completed"){
        this.statusArray19[1].checked = true;
  
      }else{
        this.statusArray19[2].checked = true;
      }
    }
   
    if(tasks_array_first[i].task_type == 21){
     
      let option1 = JSON.parse(tasks_array_first[i].task_details);
       this.option_value1 = option1[0];
       this.details1 = option1[1];
        this.check1 = true;

      if(this.option_value1 == "Yes"){
      this.yesNoArray1[0].checked = true;
      
    
      }else if(this.option_value1 == "No"){
      this.yesNoArray1[1].checked = true;
    
      }
      this.det1 = this.details1;
      }

      if(tasks_array_first[i].task_type == 22){
        
        let option2 = JSON.parse(tasks_array_first[i].task_details);
        this.option_value2 = option2[0];
        this.details2 = option2[1];

        if(this.option_value2 == "Yes"){
          this.yesNoArray2[0].checked = true;
          
          this.date2_new = tasks_array_first[i].task_due_date;
          this.date2 = new Date(tasks_array_first[i].task_due_date); 
          
        }else if(this.option_value2 == "No"){
          this.yesNoArray2[1].checked = true;
         
        }
        this.det2 = this.details2;
        this.check2 = true;
      }

      if(tasks_array_first[i].task_type == 23){
     
       
        let option3 = JSON.parse(tasks_array_first[i].task_details);
        this.option_value3 = option3[0];
        this.details3 = option3[1];
        
        if(this.option_value3 == "Yes"){
          this.tobaccooptionsArray1new[0].checked = true;
          this.date3_new = tasks_array_first[i].task_due_date;
          this.date3 = new Date(tasks_array_first[i].task_due_date); 
         
        }else if(this.option_value3 == "No"){
          this.tobaccooptionsArray1new[1].checked = true;
          
        }else if(this.option_value3 == "Already availed"){
          this.tobaccooptionsArray1new[2].checked = true;
         
        }else if(this.option_value3 == "Needs review"){
        
          this.tobaccooptionsArray1new[3].checked = true;
         
          this.date3_new = tasks_array_first[i].task_due_date;
          this.date3 = new Date(tasks_array_first[i].task_due_date); 
        }
        this.det3 = this.details3;
        this.check3 = true;
      }

      if(tasks_array_first[i].task_type == 24){
  
        this.task_id4 =tasks_array_first[i].tasks_uuid;
        let option4 = JSON.parse(tasks_array_first[i].task_details);
        this.option_value4 = option4[0];
        this.details4 = option4[1];
        
        if(this.option_value4 == "Yes"){
          this.tobaccooptionsArray2new[0].checked = true;
         
          this.date4_new = tasks_array_first[i].task_due_date;
          this.date4 = new Date(tasks_array_first[i].task_due_date); 
        }else if(this.option_value4 == "No"){
          this.tobaccooptionsArray2new[1].checked = true;
        
        }else if(this.option_value4 == "Already availed"){
          this.tobaccooptionsArray2new[2].checked = true;
         
        }else if(this.option_value4 == "Needs review"){
         
          this.tobaccooptionsArray2new[3].checked = true;
          this.date4_new = tasks_array_first[i].task_due_date;
          this.date4 = new Date(tasks_array_first[i].task_due_date); 
         
         
        }else if(this.option_value4 == "Does not apply"){
          this.tobaccooptionsArray2new[4].checked = true;
         
        }
        this.check4 = true;
        this.det4 = this.details4;
      }

      if(tasks_array_first[i].task_type == 25){
        this.task_id5 =tasks_array_first[i].tasks_uuid;
        let option5 = JSON.parse(tasks_array_first[i].task_details);
        this.option_value5 = option5[0];
        this.details5 = option5[1];

        if(this.option_value5 == "Yes"){
          this.YesNoOtherOptions[0].checked = true;
          this.date5_new = tasks_array_first[i].task_due_date;
          this.date5 = new Date(tasks_array_first[i].task_due_date); 
         
        }else if(this.option_value5 == "No"){
          this.YesNoOtherOptions[1].checked = true;
         
        }else if(this.option_value5 == "Already availed"){
          this.YesNoOtherOptions[2].checked = true;
          
        }else if(this.option_value5 == "Do not apply"){
          this.YesNoOtherOptions[3].checked =  true;
         
        }
        this.det5 = this.details5;
        this.check5 = true;
      }

      if(tasks_array_first[i].task_type == 26){
        this.task_id6 =tasks_array_first[i].tasks_uuid;
        let option6 = JSON.parse(tasks_array_first[i].task_details);
        this.option_value6 = option6[0];
        this.details6 = option6[1];
        
        if(this.option_value6 == "Yes"){
          this.tobaccooptionsArray3welfare[0].checked = true;
          this.date6_new = tasks_array_first[i].task_due_date;
          this.date6 = new Date(tasks_array_first[i].task_due_date); 
         
          
        }else if(this.option_value6 == "No"){
          this.tobaccooptionsArray3welfare[1].checked = true;
          
        }else if(this.option_value6 == "Already availed"){
          this.tobaccooptionsArray3welfare[2].checked = true;
         
        }
        this.det6 = this.details6;
        this.check6 = true;
      }

      if(tasks_array_first[i].task_type == 27){
        this.task_id7 =tasks_array_first[i].tasks_uuid;
        let option7 = JSON.parse(tasks_array_first[i].task_details);
        this.option_value7 = option7[0];
        this.details7 = option7[1];
        
        if(this.option_value7 == "Yes"){
          this.yesNoArray3[0].checked = true;
          this.date7_new = tasks_array_first[i].task_due_date;
          this.date7 = new Date(tasks_array_first[i].task_due_date); 
        }else if(this.option_value7 == "No"){
          this.yesNoArray3[1].checked = true;
         
        }
        this.det7 = this.details7;
        this.check7 = true;
      }

      if(tasks_array_first[i].task_type == 28){
        
        let option8 = JSON.parse(tasks_array_first[i].task_details);
        this.option_value8 = option8[0];
        this.details8 = option8[1];
        
        if(this.option_value8 == "Yes"){
          this.tobaccooptionsArray4welfare[0].checked = true;
          this.date8_new = tasks_array_first[i].task_due_date;
          this.date8 = new Date(tasks_array_first[i].task_due_date); 
          
         
        }else if(this.option_value8 == "No"){
          this.tobaccooptionsArray4welfare[1].checked = true;
         
        }else if(this.option_value8 == "Already availed"){
          this.tobaccooptionsArray4welfare[2].checked = true;
         
        }
        this.det8 = this.details8;
        this.check8 = true;
      }

      if(tasks_array_first[i].task_type == 29){
        this.task_id9 =tasks_array_first[i].tasks_uuid;
        let option9= JSON.parse(tasks_array_first[i].task_details);
        this.option_value9 = option9[0];
        this.details9 = option9[1];
        
        if(this.option_value9 == "Yes"){
          this.tobaccooptionsArray4welfare[0].checked = true;
          this.date9_new = tasks_array_first[i].task_due_date;
          this.date9 = new Date(tasks_array_first[i].task_due_date); 
         
         
        }else if(this.option_value9 == "No"){
          this.tobaccooptionsArray4welfare[1].checked = true;
        
        }else if(this.option_value9 == "Already availed"){
          this.tobaccooptionsArray4welfare[2].checked = true;
          
        }
        this.det9 = this.details9;
        this.check9 = true;
      }

      if(tasks_array_first[i].task_type == 30){
        this.task_id10 =tasks_array_first[i].tasks_uuid;
        let option10= JSON.parse(tasks_array_first[i].task_details);
        this.option_value10 = option10[0];
        this.details10 = option10[1];

        if(this.option_value10 == "Yes"){
          this.tobaccooptionsArray5welfare[0].checked = true;
          this.date10_new = tasks_array_first[i].task_due_date;
          this.date10 = new Date(tasks_array_first[i].task_due_date); 
         
         
        }else if(this.option_value10 == "No"){
          this.tobaccooptionsArray5welfare[1].checked = true;
          
        }else if(this.option_value10 == "Already availed"){
          this.tobaccooptionsArray5welfare[2].checked = true;
          
        }
        this.det10 = this.details10;
        this.check10 = true;
      }

      if(tasks_array_first[i].task_type == 31){
        this.task_id11 =tasks_array_first[i].tasks_uuid;
        let option11= JSON.parse(tasks_array_first[i].task_details);
        this.option_value11 = option11[0];
        this.details11= option11[1];

        if(this.option_value11 == "Yes"){
          this.tobaccooptionsArray6welfare[0].checked = true;
          this.date11_new = tasks_array_first[i].task_due_date;
          this.date11 = new Date(tasks_array_first[i].task_due_date); 
         
          
        }else if(this.option_value11 == "No"){
          this.tobaccooptionsArray6welfare[1].checked = true;
         
        }else if(this.option_value11 == "Already availed"){
          this.tobaccooptionsArray6welfare[2].checked = true;
         
        }
        this.det11 = this.details11;
        this.check11 = true;
      }

      if(tasks_array_first[i].task_type == 32){
        this.task_id12 =tasks_array_first[i].tasks_uuid;

        let option12= JSON.parse(tasks_array_first[i].task_details);
        this.option_value12 = option12[0];
        this.details12= option12[1];
        
        if(this.option_value12 == "Yes"){
          this.tobaccooptionsArray7welfare[0].checked = true;
          this.date12_new = tasks_array_first[i].task_due_date;
          this.date12 = new Date(tasks_array_first[i].task_due_date); 
         
          
        }else if(this.option_value12 == "No"){
          this.tobaccooptionsArray7welfare[1].checked = true;
         
        }else if(this.option_value12 == "Already availed"){
          this.tobaccooptionsArray7welfare[2].checked = true;
         
        }
        this.det12 = this.details12;
        this.check12 = true;
      }

      if(tasks_array_first[i].task_type == 33){
        this.task_id13 =tasks_array_first[i].tasks_uuid;
        let option13= JSON.parse(tasks_array_first[i].task_details);
        this.option_value13 = option13[0];
        this.details13= option13[1];
        
        if(this.option_value13 == "Yes"){
          this.tobaccooptionsArray8welfare[0].checked = true;
          this.date13_new = tasks_array_first[i].task_due_date;
          this.date13 = new Date(tasks_array_first[i].task_due_date); 
         
         
        }else if(this.option_value13 == "No"){
          this.tobaccooptionsArray8welfare[1].checked = true;
        
        }else if(this.option_value13 == "Already availed"){
          this.tobaccooptionsArray8welfare[2].checked = true;
         
        }
        this.det13 = this.details13;
        this.check13 = true;
      }
      if(tasks_array_first[i].task_type == 34){
        this.task_id14 =tasks_array_first[i].tasks_uuid;
        let option14= JSON.parse(tasks_array_first[i].task_details);
        this.option_value14 = option14[0];
        this.details14= option14[1];
        this.det14 = this.details14;
        this.date14_new = tasks_array_first[i].task_due_date;
        this.date14 = new Date(tasks_array_first[i].task_due_date);
        this.check14 = true;
        
      }
  }
    
  }

  addDays1(theDate, days) {
  
    let date =  new Date(theDate.getTime() - days*24*60*60*1000);
    return date;
  }
  
  home(){
    if(this.role == "psw"){
    this.router.navigate(['dashboard']);
    }else{
      this.router.navigate(['supervisor-dashboard']);
    }
  }

  back(){
   
    this.router.navigate(['history']);
  
  }

  logout(){
    this.router.navigate(['']);
   
  }
  statusArray1: status_options[] = [
    {value: '1', viewValue_status: 'In Progress',checked:false},
    {value: '2', viewValue_status: 'Completed',checked:false},
    {value: '3', viewValue_status: 'Dropped',checked:false}
   
  ]
  statusArray2: status_options[] = [
    {value: '1', viewValue_status: 'In Progress',checked:false},
    {value: '2', viewValue_status: 'Completed',checked:false},
    {value: '3', viewValue_status: 'Dropped',checked:false}
   
  ]
  statusArray3: status_options[] = [
    {value: '1', viewValue_status: 'In Progress',checked:false},
    {value: '2', viewValue_status: 'Completed',checked:false},
    {value: '3', viewValue_status: 'Dropped',checked:false}
   
  ]
  statusArray4: status_options[] = [
    {value: '1', viewValue_status: 'In Progress',checked:false},
    {value: '2', viewValue_status: 'Completed',checked:false},
    {value: '3', viewValue_status: 'Dropped',checked:false}
   
  ]
  statusArray5: status_options[] = [
    {value: '1', viewValue_status: 'In Progress',checked:false},
    {value: '2', viewValue_status: 'Completed',checked:false},
    {value: '3', viewValue_status: 'Dropped',checked:false}
   
  ]
  statusArray6: status_options[] = [
    {value: '1', viewValue_status: 'In Progress',checked:false},
    {value: '2', viewValue_status: 'Completed',checked:false},
    {value: '3', viewValue_status: 'Dropped',checked:false}
   
  ]
  statusArray7: status_options[] = [
    {value: '1', viewValue_status: 'In Progress',checked:false},
    {value: '2', viewValue_status: 'Completed',checked:false},
    {value: '3', viewValue_status: 'Dropped',checked:false}
   
  ]
  statusArray8: status_options[] = [
    {value: '1', viewValue_status: 'In Progress',checked:false},
    {value: '2', viewValue_status: 'Completed',checked:false},
    {value: '3', viewValue_status: 'Dropped',checked:false}
   
  ]
  statusArray9: status_options[] = [
    {value: '1', viewValue_status: 'In Progress',checked:false},
    {value: '2', viewValue_status: 'Completed',checked:false},
    {value: '3', viewValue_status: 'Dropped',checked:false}
   
  ]
  statusArray10: status_options[] = [
    {value: '1', viewValue_status: 'In Progress',checked:false},
    {value: '2', viewValue_status: 'Completed',checked:false},
    {value: '3', viewValue_status: 'Dropped',checked:false}
   
  ]
  statusArray11: status_options[] = [
    {value: '1', viewValue_status: 'In Progress',checked:false},
    {value: '2', viewValue_status: 'Completed',checked:false},
    {value: '3', viewValue_status: 'Dropped',checked:false}
   
  ]
  statusArray12: status_options[] = [
    {value: '1', viewValue_status: 'In Progress',checked:false},
    {value: '2', viewValue_status: 'Completed',checked:false},
    {value: '3', viewValue_status: 'Dropped',checked:false}
   
  ]
  statusArray13: status_options[] = [
    {value: '1', viewValue_status: 'In Progress',checked:false},
    {value: '2', viewValue_status: 'Completed',checked:false},
    {value: '3', viewValue_status: 'Dropped',checked:false}
   
  ]
  statusArray14: status_options[] = [
    {value: '1', viewValue_status: 'In Progress',checked:false},
    {value: '2', viewValue_status: 'Completed',checked:false},
    {value: '3', viewValue_status: 'Dropped',checked:false}
   
  ]
  statusArray15: status_options[] = [
    {value: '1', viewValue_status: 'In Progress',checked:false},
    {value: '2', viewValue_status: 'Completed',checked:false},
    {value: '3', viewValue_status: 'Dropped',checked:false}
   
  ]
  statusArray16: status_options[] = [
    {value: '1', viewValue_status: 'In Progress',checked:false},
    {value: '2', viewValue_status: 'Completed',checked:false},
    {value: '3', viewValue_status: 'Dropped',checked:false}
   
  ]
  statusArray17: status_options[] = [
    {value: '1', viewValue_status: 'In Progress',checked:false},
    {value: '2', viewValue_status: 'Completed',checked:false},
    {value: '3', viewValue_status: 'Dropped',checked:false}
   
  ]
  statusArray18: status_options[] = [
    {value: '1', viewValue_status: 'In Progress',checked:false},
    {value: '2', viewValue_status: 'Completed',checked:false},
    {value: '3', viewValue_status: 'Dropped',checked:false}
   
  ]
  statusArray19: status_options[] = [
    {value: '1', viewValue_status: 'In Progress',checked:false},
    {value: '2', viewValue_status: 'Completed',checked:false},
    {value: '3', viewValue_status: 'Dropped',checked:false}
   
  ]
  
  tobaccooptionsArray1: tobacco_options[] = [
    {value: '1', viewValue: 'Yes',checked:false},
    {value: '2', viewValue: 'No',checked:false}
   
  ];
  tobaccooptionsArray1udid: tobacco_options[] = [
    {value: '1', viewValue: 'Yes',checked:false},
    {value: '2', viewValue: 'No',checked:false}
   
  ];
  tobaccooptionsArray2: tobacco_options[] = [
    {value: '1', viewValue: 'Yes',checked:false},
    {value: '2', viewValue: 'No',checked:false}
   
  ];
  tobaccooptionsArray3: tobacco_options[] = [
    {value: '1', viewValue: 'Yes',checked:false},
    {value: '2', viewValue: 'No',checked:false}
   
  ];
  tobaccooptionsArray3assess: tobacco_options[] = [
    {value: '1', viewValue: 'Yes',checked:false},
    {value: '2', viewValue: 'No',checked:false}
   
  ];
  tobaccooptionsArray4: tobacco_options[] = [
    {value: '1', viewValue: 'Yes',checked:false},
    {value: '2', viewValue: 'No',checked:false}
   
  ];
  tobaccooptionsArray5: tobacco_options[] = [
    {value: '1', viewValue: 'Yes',checked:false},
    {value: '2', viewValue: 'No',checked:false}
   
  ];
  tobaccooptionsArray6: tobacco_options[] = [
    {value: '1', viewValue: 'Yes',checked:false},
    {value: '2', viewValue: 'No',checked:false}
   
  ];
  tobaccooptionsArray7: tobacco_options[] = [
    {value: '1', viewValue: 'Yes',checked:false},
    {value: '2', viewValue: 'No',checked:false}
   
  ];
  tobaccooptionsArray8: tobacco_options[] = [
    {value: '1', viewValue: 'Yes',checked:false},
    {value: '2', viewValue: 'No',checked:false}
   
  ];
  tobaccooptionsArray1welfare: tobacco_options[] = [
    {value: '1', viewValue: 'Yes',checked:false},
    {value: '2', viewValue: 'No',checked:false},
    {value: '3', viewValue: 'Already availed',checked:false}
   
  ];
  tobaccooptionsArray1new: tobacco_options[] = [
    {value: '1', viewValue: 'Yes',checked:false},
    {value: '2', viewValue: 'No',checked:false},
    {value: '3', viewValue: 'Already availed',checked:false},
    {value: '4', viewValue: 'Needs review',checked:false}
   
  ];
  tobaccooptionsArray2welfare: tobacco_options[] = [
    {value: '1', viewValue: 'Yes',checked:false},
    {value: '2', viewValue: 'No',checked:false},
    {value: '2', viewValue: 'Already availed',checked:false}
   
  ];
  tobaccooptionsArray2new: tobacco_options[] = [
    {value: '1', viewValue: 'Yes',checked:false},
    {value: '2', viewValue: 'No',checked:false},
    {value: '3', viewValue: 'Already availed',checked:false},
    {value: '4', viewValue: 'Needs review',checked:false},
    {value: '5', viewValue: 'Does not apply',checked:false}
   
  ];
  tobaccooptionsArray3welfare: tobacco_options[] = [
    {value: '1', viewValue: 'Yes',checked:false},
    {value: '2', viewValue: 'No',checked:false},
    {value: '2', viewValue: 'Already availed',checked:false}
   
  ];
  tobaccooptionsArray4welfare: tobacco_options[] = [
    {value: '1', viewValue: 'Yes',checked:false},
    {value: '2', viewValue: 'No',checked:false},
    {value: '3', viewValue: 'Already availed',checked:false}
   
  ];
  tobaccooptionsArray5welfare: tobacco_options[] = [
    {value: '1', viewValue: 'Yes',checked:false},
    {value: '2', viewValue: 'No',checked:false},
    {value: '2', viewValue: 'Already availed',checked:false}
   
  ];
  tobaccooptionsArray6welfare: tobacco_options[] = [
    {value: '1', viewValue: 'Yes',checked:false},
    {value: '2', viewValue: 'No',checked:false},
    {value: '2', viewValue: 'Already availed',checked:false}
   
  ];
  tobaccooptionsArray7welfare: tobacco_options[] = [
    {value: '1', viewValue: 'Yes',checked:false},
    {value: '2', viewValue: 'No',checked:false},
    {value: '2', viewValue: 'Already availed',checked:false}
   
  ];
  tobaccooptionsArray8welfare: tobacco_options[] = [
    {value: '1', viewValue: 'Yes',checked:false},
    {value: '2', viewValue: 'No',checked:false},
    {value: '2', viewValue: 'Already availed',checked:false}
   
  ];
  YesNoOtherOptions: yesno_other_options[] = [
    {value: '1', viewValue_yesno_other: 'Yes',checked:false},
    {value: '2', viewValue_yesno_other: 'No',checked:false},
    {value: '2', viewValue_yesno_other: 'Already availed',checked:false},
    {value: '2', viewValue_yesno_other: 'Do not apply',checked:false}
   
  ];
  yesNoArray1: yesno_options[] = [
    {value: '1', viewValue_yesno: 'Yes',checked:false},
    {value: '2', viewValue_yesno: 'No',checked:false}
  ];
  yesNoArray2: yesno_options[] = [
    {value: '1', viewValue_yesno: 'Yes',checked:false},
    {value: '2', viewValue_yesno: 'No',checked:false}
  ];
  yesNoArray3: yesno_options[] = [
    {value: '1', viewValue_yesno: 'Yes',checked:false},
    {value: '2', viewValue_yesno: 'No',checked:false}
  ];
  yesNoArray4: yesno_options[] = [
    {value: '1', viewValue_yesno: 'Yes',checked:false},
    {value: '2', viewValue_yesno: 'No',checked:false}
  ];
  Reminder: remind_optons[] = [
    {value: '1', viewValue: 'Phone Call'},
    {value: '2', viewValue: 'Text Message'},
    {value: '3', viewValue: 'In-person reminder at follow-up'}
  ];
  Status: status_optons[] = [
    {value: '1', viewValue: 'Pending'},
    {value: '2', viewValue: 'Cerificate Issued- softcopy'},
    {value: '3', viewValue: 'Cerificate Issued- softcopy and hardcopy'},
    {value: '4', viewValue: 'Application rejected'},
    {value: '5', viewValue: 'Other'}
  ];
 
  tobaccooptionsArray2udid: tobacco_options[] = [
    {value: '1', viewValue: 'Yes',checked:false},
    {value: '2', viewValue: 'No',checked:false},
    {value: '3', viewValue: 'Incomplete',checked:false}
   
  ];
  tobaccooptionsArray2udid2: tobacco_options[] = [
    {value: '1', viewValue: 'Yes',checked:false},
    {value: '2', viewValue: 'No',checked:false},
    {value: '3', viewValue: 'Incomplete',checked:false}
   
  ];

 
  redirectTo(x){
    if(x==1){
      this.router.navigate(['history']);
    }
  }
  }
  

