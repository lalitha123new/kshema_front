import { Component, OnInit,ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import {FormBuilder,FormControl,FormGroupDirective,NgForm, FormGroup, Validators,ValidatorFn} from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PatientService } from 'src/app/services/patient.service';
import { LoadingController } from '@ionic/angular';
import {MatTableDataSource} from '@angular/material/table';
import { MatTabGroup } from '@angular/material/tabs';
import { ServerService } from 'src/app/services/server.service';
import { UUID } from 'angular2-uuid';

@Component({
  selector: 'app-patient-history',
  templateUrl: './patient-history.page.html',
  styleUrls: ['./patient-history.page.scss'],
})
export class PatientHistoryPage implements OnInit {
  tabs = [];
  patient_id;
  patient_uuid;
  notes = false;
  clinic = [];
  prefTabs: any;
  patient_notes_array:any;
  super_id1;
  super_id;
  sender_id;
  
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
  firstNote = true;
  allNotes=false;
  replyNote = "";

  displayedColumns_dashboard1: string[] = ['name',  'notes_message', 'date','time'];
  dataSource_dashboard1 = new MatTableDataSource<PeriodicElement_dashboard1>(ELEMENT_DATA_dashboard1);

  constructor(private router: Router,private _formBuilder: FormBuilder,
    private patientService: PatientService,private loadingCtrl: LoadingController,
    private serverService: ServerService) { }

    @ViewChild(MatTabGroup) tabGroup: MatTabGroup;
    secondFormGroup:any
    user_name;
    group_id
    group_data_array;any;
    sw_id;
    notes1 = "";
  
  ngOnInit() {
  
  }

  
  ionViewWillEnter() {
    this.dataSource_dashboard1.data= [];
    this.patient_notes_array = [];
    this.user_name = sessionStorage.getItem("user_name");
    this.patient_id =  sessionStorage.getItem('patient_id');
    this.patient_uuid =  sessionStorage.getItem('patient_uuid');
    this.super_id1 = sessionStorage.getItem("supervisor_id");
    this.super_id = parseInt(this.super_id1);
    this.group_id = sessionStorage.getItem("group_id");
  
    this.getGroupData(this.super_id);
    this.getPatient();
    this.getVisitHistory1();
    
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
  async getVisitHistory1(){
    let history_array_first :any;
    let test = await this.serverService.getHistory(this.patient_uuid).toPromise().then(result3 => {
     
      history_array_first=result3;

   });
      
      let res:any;
      let res1:any;
      res = history_array_first;
     
      for(var i = 0;i <res.length;i++){
  
        this.prefTabs = res;
        this.tabGroup.selectedIndex = 1;

        let visits = res[i].clinical_visits;
       
      
        let check_type =JSON.parse(visits.visit_details);
       
      
        if (!('clinicalData' in check_type) && !('step1Data' in check_type)){
            res[i].visit_type = "Phone";
           
           
            let created_date = new Date(visits.createdAt);
        let date = ("0" + created_date.getDate()).slice(-2);
        let month = ("0" + (created_date.getMonth() + 1)).slice(-2);
        let year =created_date.getFullYear();
        let created_date1 = date + "-" + month + "-" + year;
            res[i].visit_type1 = "Phone "+created_date1;
        }else if(('step1Data' in check_type)){
          res[i].visit_type = "Home";
         
          let created_date = new Date(visits.createdAt);
        let date = ("0" + created_date.getDate()).slice(-2);
        let month = ("0" + (created_date.getMonth() + 1)).slice(-2);
        let year =created_date.getFullYear();
        let created_date1 = date + "-" + month + "-" + year;
          res[i].visit_type1 = "Home "+created_date1;
          
      }else{
        res[i].visit_type = "PHC"
      }
    
      if(res[i].visit_type == "PHC"){
     
        let created_date = new Date(visits.createdAt);
        let date = ("0" + created_date.getDate()).slice(-2);
        let month = ("0" + (created_date.getMonth() + 1)).slice(-2);
        let year =created_date.getFullYear();
        let created_date1 = date + "-" + month + "-" + year;
        res[i].visit_type1 = "Clinic "+created_date1;
     
        this.prefTabs.phc_data = JSON.parse(visits.visit_details);
        if(this.prefTabs.phc_data.clinicalData){
        this.prefTabs.mat_data = JSON.parse(this.prefTabs.phc_data.clinicalData);
      
       
       if ('diagnosis' in this.prefTabs.mat_data){
       
        this.prefTabs[i].who = this.prefTabs.mat_data.diagnosis;
       }else{
        this.prefTabs[i].who = this.prefTabs.mat_data.who_came_with;
       }
       this.prefTabs[i].symp_rate=this.prefTabs.mat_data.phc_symptom_rate;
        this.prefTabs[i].suspicious = this.prefTabs.mat_data.suspicious;
        this.prefTabs[i].suspicious_rate = this.prefTabs.mat_data.suspicious_rate;
        this.prefTabs[i].hallucinatory = this.prefTabs.mat_data.hallucinatory;
        this.prefTabs[i].hallucinatory_rate = this.prefTabs.mat_data.hallucinatory_rate;
        this.prefTabs[i].verbal = this.prefTabs.mat_data.verbal;
        this.prefTabs[i].verbal_rate = this.prefTabs.mat_data.verbal_rate;
        this.prefTabs[i].social_isolation = this.prefTabs.mat_data.social_isolation;
        this.prefTabs[i].social_rate = this.prefTabs.mat_data.social_rate;
        this.prefTabs[i].poor_selfcare = this.prefTabs.mat_data.poor_selfcare;
        this.prefTabs[i].selfcare_rate = this.prefTabs.mat_data.selfcare_rate;
        this.prefTabs[i].sleep = this.prefTabs.mat_data.sleep;
   
        this.prefTabs[i].sleep_rate = this.prefTabs.mat_data.sleep_rate;
        this.prefTabs[i].occupation_rate = this.prefTabs.mat_data.occupation_rate;
        this.prefTabs[i].tobacco = this.prefTabs.mat_data.tobacco;
        this.prefTabs[i].alcohol = this.prefTabs.mat_data.alcohol;
        this.prefTabs[i].other = this.prefTabs.mat_data.other;
        this.prefTabs[i].others = this.prefTabs.mat_data.others;
        this.prefTabs[i].symptomArray = this.prefTabs.mat_data.other_symptom;
        if ('tobacco_yes' in this.prefTabs.mat_data){
       
          this.prefTabs[i].tobacco_yes = this.prefTabs.mat_data.tobacco_yes;
          this.prefTabs[i].tobocco_amount = this.prefTabs.mat_data.tobocco_amount;
          
         }else{
          this.prefTabs[i].tobacco_yes = this.prefTabs.mat_data.tobacco_remark;
          this.prefTabs[i].tobocco_amount = this.prefTabs.mat_data.tobocco_amount;
          
         
         }

         if ('alcohol_yes' in this.prefTabs.mat_data){
       
          this.prefTabs[i].alcohol_yes = this.prefTabs.mat_data.alcohol_yes;
          this.prefTabs[i].alcohol_amount = this.prefTabs.mat_data.alcohol_amount;
          
         }else{
          this.prefTabs[i].alcohol_yes = this.prefTabs.mat_data.alcohol_remark;
          this.prefTabs[i].alcohol_amount = this.prefTabs.mat_data.alcohol_amount;
         
         }
       
       
        if ('other_yes' in this.prefTabs.mat_data){
       
          this.prefTabs[i].other_yes = this.prefTabs.mat_data.other_yes;
          this.prefTabs[i].other_amount = this.prefTabs.mat_data.other_amount;
          
         }else{
          this.prefTabs[i].other_yes = this.prefTabs.mat_data.others_remark;
          this.prefTabs[i].other_amount = this.prefTabs.mat_data.other_amount;
          

         
         }
      
         
          if(typeof this.prefTabs.phc_data.consentObj1 !='object'){
           
          this.prefTabs.consent_data = JSON.parse(this.prefTabs.phc_data.consentObj1);
          this.prefTabs[i].comp_rate = this.prefTabs.consent_data.phc_compliance_rate;
          if(this.prefTabs.consent_data.phc_symptom_rate){
            this.prefTabs[i].symp_rate = this.prefTabs.consent_data.phc_symptom_rate
          }
        
          this.prefTabs[i].med_supervised = this.prefTabs.consent_data.med_supervised;
        
          this.prefTabs[i].supervisor = this.prefTabs.consent_data.med_supervisor;
          this.prefTabs[i].sedation_rate = this.prefTabs.consent_data.sedation_rate;
          this.prefTabs[i].sedation_rate = this.prefTabs.consent_data.sedation_rate;
          this.prefTabs[i].stiffness_rate = this.prefTabs.consent_data.stiffness_rate;
          this.prefTabs[i].tiredness_rate = this.prefTabs.consent_data.tiredness_rate;
          this.prefTabs[i].weight_gain_rate = this.prefTabs.consent_data.weight_gain_rate;
          this.prefTabs[i].mens_rate = this.prefTabs.consent_data.mens_rate;
          this.prefTabs[i].sex_dysfunction_rate = this.prefTabs.consent_data.sex_dysfunction_rate;
          this.prefTabs[i].symptomArray1 = this.prefTabs.consent_data.symtom1; 
          this.prefTabs[i].discuss_doctor = this.prefTabs.consent_data.discuss_doctor;
          this.prefTabs[i].discuss_doctor_details = this.prefTabs.consent_data.discuss_doctor_details;
          this.prefTabs[i].medication = this.prefTabs.consent_data.medication;
          this.prefTabs[i].presc_medicine = this.prefTabs.consent_data.presc_medicine;
         
          if(this.prefTabs.consent_data.changes){
            if(this.prefTabs.consent_data.changes[0] == "patient" || this.prefTabs.consent_data.changes[1] == "patient"){
              this.prefTabs[i].patient = true;
            }else if(this.prefTabs.consent_data.changes[0] == "caregiver" || this.prefTabs.consent_data.changes[1] == "caregiver"){
              this.prefTabs[i].caregiver = true;
            }
          }
          this.prefTabs[i].counselling = this.prefTabs.consent_data.counselling;
          this.prefTabs[i].counselling_med = this.prefTabs.consent_data.counselling_med;
          this.prefTabs[i].referral = this.prefTabs.consent_data.referral;
          this.prefTabs[i].referral_med = this.prefTabs.consent_data.referral_med;
          this.prefTabs[i].psychoeducation = this.prefTabs.consent_data.psychoeducation;
          this.prefTabs[i].psychoeducation_yes = this.prefTabs.consent_data.psychoeducation_yes;
          this.prefTabs[i].psychointervension = this.prefTabs.consent_data.psychointervension;
          this.prefTabs[i].psychointervension_yes = this.prefTabs.consent_data.psychointervension_yes;
          this.prefTabs[i].pat_details = this.prefTabs.consent_data.participant_details;
     
         if(this.prefTabs.consent_data.participant){
          if(this.prefTabs.consent_data.participant[0] == "patient" || this.prefTabs.consent_data.participant[1] == "patient"){
            this.prefTabs[i].patient1 = true;
          }
           if(this.prefTabs.consent_data.participant[0] == "family" || this.prefTabs.consent_data.participant[1] == "family"){
            this.prefTabs[i].family = true;
          }
        }
          this.prefTabs[i].next_date1 =new Date(visits.followup_date);
        
          let date = ("0" + this.prefTabs[i].next_date1.getDate()).slice(-2);
          let month = ("0" + (this.prefTabs[i].next_date1.getMonth() + 1)).slice(-2);
          let year =this.prefTabs[i].next_date1.getFullYear();
          this.prefTabs[i].next_date = date + "-" + month + "-" + year;
          // if(this.prefTabs.consent_data.consent){
          //   if(this.prefTabs.consent_data.consent[0] == "Phone Call" || this.prefTabs.consent_data.consent[1] == "Phone Call" || this.prefTabs.consent_data.consent[1] == "Phone Call"){
          //     this.prefTabs[i].phone = true;
            
          //   }else  if(this.prefTabs.consent_data.consent[0] == "Text Message" || this.prefTabs.consent_data.consent[1] == "Text Message" || this.prefTabs.consent_data.consent[1] == "Text Message"){
          //     this.prefTabs[i].text = true;
          //   }
          //   else  if(this.prefTabs.consent_data.consent[0] == "Home Visit" || this.prefTabs.consent_data.consent[1] == "Home Visit" || this.prefTabs.consent_data.consent[1] == "Home Visit"){
          //     this.prefTabs[i].home = true;
          //   }
          // }

        
          if(this.prefTabs.consent_data.next_visit_place == "PHC"){
            this.prefTabs[i].next_visit_place2 = 2;
           }else if(this.prefTabs.consent_data.next_visit_place == "Home"){
            this.prefTabs[i].next_visit_place2 = 1;
           }else if(this.prefTabs.consent_data.next_visit_place == "Manochaithanya"){
            this.prefTabs[i].next_visit_place2 = 3;
           }else if(this.prefTabs.consent_data.next_visit_place == "Phone"){
            this.prefTabs[i].next_visit_place2 = 4;
           }else{
            this.prefTabs[i].next_visit_place2 = 5;
           }
          
          }else{
          
            this.prefTabs.consent_data = this.prefTabs.phc_data.consentObj1;
           
            this.prefTabs[i].medication = this.prefTabs.consent_data.medication;
            this.prefTabs[i].presc_medicine = this.prefTabs.consent_data.medication_yes;
           
            this.prefTabs[i].counselling = this.prefTabs.consent_data.counselling;
            this.prefTabs[i].counselling_med = this.prefTabs.consent_data.counselling_yes;
            this.prefTabs[i].referral = this.prefTabs.consent_data.referral;
            this.prefTabs[i].referral_med = this.prefTabs.consent_data.referral_yes;
            this.prefTabs[i].psychoeducation = this.prefTabs.consent_data.psychoeducation;
            this.prefTabs[i].psychoeducation_yes = this.prefTabs.consent_data.psychoeducation_yes;
            this.prefTabs[i].psychointervension = this.prefTabs.consent_data.psychointervension;
            this.prefTabs[i].psychointervension_yes = this.prefTabs.consent_data.psychointervension_yes;
            this.prefTabs[i].comp_rate = this.prefTabs.consent_data.pat_compliance_rate;
            
            console.log(this.prefTabs.consent_data)
           if(this.prefTabs.consent_data.participant[0].checked == true){
            this.prefTabs[i].patient1 = true;
          }
           if(this.prefTabs.consent_data.participant[1].checked == true){
            this.prefTabs[i].family = true;
          }
          this.prefTabs[i].pat_details = this.prefTabs.consent_data.participant_details;
          this.prefTabs[i].next_date1 =new Date(visits.followup_date);
          let date = ("0" + this.prefTabs[i].next_date1.getDate()).slice(-2);
          let month = ("0" + (this.prefTabs[i].next_date1.getMonth() + 1)).slice(-2);
          let year =this.prefTabs[i].next_date1.getFullYear();
          this.prefTabs[i].next_date = date + "-" + month + "-" + year;
          this.prefTabs[i].next_visit_place2 = 2;
          }

      }

      }
      else if(res[i].visit_type == "Phone"){
    
        this.prefTabs.phone_data = JSON.parse(visits.visit_details);
        let created_date = new Date(this.prefTabs.phone_data.missed_visit_date);
        let date1 = ("0" + created_date.getDate()).slice(-2);
        let month1 = ("0" + (created_date.getMonth() + 1)).slice(-2);
        let year1 =created_date.getFullYear();
        let created_date1 = date1 + "-" + month1 + "-" + year1;

        this.prefTabs[i].missed_phone = created_date1;
        let created_date_phone = new Date(this.prefTabs.phone_data.missed_visit_date);
        let date2 = ("0" + created_date_phone.getDate()).slice(-2);
        let month2 = ("0" + (created_date_phone.getMonth() + 1)).slice(-2);
        let year2 =created_date_phone.getFullYear();
        let created_date2 = date2 + "-" + month2 + "-" + year2;
        this.prefTabs[i].phone_follow_date = created_date2;
        this.prefTabs[i].patient_contacted = this.prefTabs.phone_data.patient;
        this.prefTabs[i].caregiver_contacted = this.prefTabs.phone_data.caregiver;
        this.prefTabs[i].caregiver_relation = this.prefTabs.phone_data.caregiver_relation;
        this.prefTabs[i].others_contacted = this.prefTabs.phone_data.others;
        this.prefTabs[i].others_relation = this.prefTabs.phone_data.others_relation;
        this.prefTabs[i].compliance_rate = this.prefTabs.phone_data.compliance_rate;
        this.prefTabs[i].med_supervised = this.prefTabs.phone_data.med_supervised;
        this.prefTabs[i].med_supervised_yes = this.prefTabs.phone_data.med_supervised_yes;
        this.prefTabs[i].symptom_rate = this.prefTabs.phone_data.symptom_rate;
        this.prefTabs[i].reason_missed_visit = this.prefTabs.phone_data.reason_missed_visit;
        this.prefTabs[i].plan_support_visit = this.prefTabs.phone_data.plan_support_visit;
        this.prefTabs[i].next_visit_place = this.prefTabs.phone_data.next_visit_place;
        //this.prefTabs[i].next_visit_place = "1";
        this.prefTabs[i].next_date1 = new Date(visits.followup_date);
        let date = ("0" + this.prefTabs[i].next_date1.getDate()).slice(-2);
          let month = ("0" + (this.prefTabs[i].next_date1.getMonth() + 1)).slice(-2);
          let year =this.prefTabs[i].next_date1.getFullYear();
          this.prefTabs[i].next_date = date + "-" + month + "-" + year;

      } else if(res[i].visit_type == "Home"){
        
        this.prefTabs.home_data = JSON.parse(visits.visit_details);
        this.prefTabs.mat_data1 = JSON.parse(this.prefTabs.home_data.step1Data);
        this.prefTabs[i].missed_visit_date = this.prefTabs.mat_data1.missed_visit_date;
        let created_date_phone = new Date(this.prefTabs.mat_data1.last_phone_date);
        let date2 = ("0" + created_date_phone.getDate()).slice(-2);
        let month2 = ("0" + (created_date_phone.getMonth() + 1)).slice(-2);
        let year2 =created_date_phone.getFullYear();
        let created_date2 = date2 + "-" + month2 + "-" + year2;
        this.prefTabs[i].last_phone_date = created_date2;
        
        this.prefTabs[i].home_visit_date = this.prefTabs.mat_data1.home_visit_date;
        this.prefTabs[i].seen_patient = this.prefTabs.mat_data1.seen_patient;
        this.prefTabs[i].seen_caregiver = this.prefTabs.mat_data1.seen_caregiver;
        this.prefTabs[i].caregiver_name_relation = this.prefTabs.mat_data1.caregiver_name_relation;
        this.prefTabs[i].seen_others = this.prefTabs.mat_data1.seen_others;
        this.prefTabs[i].others_name_relation = this.prefTabs.mat_data1.others_name_relation;
        this.prefTabs.mat_data2 = JSON.parse(this.prefTabs.home_data.step2Data);
        this.prefTabs[i].suspicious_rate = this.prefTabs.mat_data2.suspicious_rate;
        this.prefTabs[i].hallucinatory_rate = this.prefTabs.mat_data2.hallucinatory_rate;
        this.prefTabs[i].verbal_rate = this.prefTabs.mat_data2.verbal_rate;
        this.prefTabs[i].social_rate = this.prefTabs.mat_data2.social_rate;
        this.prefTabs[i].selfcare_rate = this.prefTabs.mat_data2.selfcare_rate;
        this.prefTabs[i].occupation_rate = this.prefTabs.mat_data2.occupation_rate;
        
        this.prefTabs[i].sleep_rate = this.prefTabs.mat_data2.sleep_rate;
        this.prefTabs[i].symptomArray = this.prefTabs.mat_data2.symtom; 
        this.prefTabs[i].tobacco = this.prefTabs.mat_data2.tobacco;
        this.prefTabs[i].tobocco_amount1 = this.prefTabs.mat_data2.tobocco_amount;
        this.prefTabs[i].tobacco_remark1 = this.prefTabs.mat_data2.tobacco_remark;
        this.prefTabs[i].alcohol = this.prefTabs.mat_data2.alcohol;
        this.prefTabs[i].alcohol_amount1 = this.prefTabs.mat_data2.alcohol_amount;
        this.prefTabs[i].alcohol_remark1 = this.prefTabs.mat_data2.alcohol_remark;
        this.prefTabs[i].others = this.prefTabs.mat_data2.others;
        this.prefTabs[i].other_amount1 = this.prefTabs.mat_data2.other_amount;
        this.prefTabs[i].others_remark1 = this.prefTabs.mat_data2.others_remark;
        this.prefTabs.mat_data3 = this.prefTabs.home_data.step3Obj;
        this.prefTabs[i].home_compliance_rate = this.prefTabs.mat_data3.home_compliance_rate;
        this.prefTabs[i].symptom_rate = this.prefTabs.mat_data3.symptom_rate;
        this.prefTabs[i].med_supervised_home = this.prefTabs.mat_data3.med_supervised;
        this.prefTabs[i].med_supervisor_home = this.prefTabs.mat_data3.med_supervisor;
        this.prefTabs[i].missed_visit_reason1 = this.prefTabs.mat_data3.missed_visit_reason;
        this.prefTabs[i].next_visit_plan1 = this.prefTabs.mat_data3.next_visit_plan;
        console.log(JSON.stringify(this.prefTabs.mat_data3))
        this.prefTabs[i].next_visit_place1 = this.prefTabs.mat_data3.next_visit_place;
        //this.prefTabs[i].next_visit_place1 ="1";
        this.prefTabs[i].next_follow = visits.followup_date;
       
      }
    }
      
      
     
   
  }


  superNotes(){
    this.router.navigate(['super-notes']);
  }


  viewReplyNotes(){
    this.notes = true;

    this.serverService.getPatientNotes(this.patient_uuid)
  .subscribe(
  data  => {
    
    this.patient_notes_array = data;
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
    
      this.patient_notes_array[i].createdAt2 = this.patient_notes_array[i].createdAt;
    }
    this.dataSource_dashboard1.data = this.patient_notes_array;

  });
  }
  writeNotes(x){
 
   
   
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

  home(){
    this.notes = false;
    this.router.navigate(['supervisor-dashboard']);
  }

  logout(){
    this.notes = false;
    this.router.navigate(['']);
  }

  back(){
    this.notes = false;
    this.router.navigate(['send-message']);
  }

  hide(){
    this.notes = false;
  }

}


export interface PeriodicElement_dashboard1 {
  name: string;
  notes_message: string;
  date: string;
  time:string;
  
}

const ELEMENT_DATA_dashboard1: PeriodicElement_dashboard1[] = [
  { name: '',notes_message:' ',date:'',time:''},
   
];

