import { Component, OnInit,ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import {FormBuilder,FormControl,FormGroupDirective,NgForm, FormGroup, Validators,ValidatorFn} from '@angular/forms';
import { PatientService } from 'src/app/services/patient.service';
import { LoadingController } from '@ionic/angular';
import {MatTableDataSource} from '@angular/material/table';
import { MatTabGroup,MatTabChangeEvent } from '@angular/material/tabs';
import { OfflineManagerService } from '../../services/offline-manager.service';
import { AlertController } from '@ionic/angular';
import { ServerService } from 'src/app/services/server.service';
import { UUID } from 'angular2-uuid';
import { MatSnackBar } from "@angular/material/snack-bar";
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';



@Component({
  selector: 'app-history',
  templateUrl: './history.page.html',
  styleUrls: ['./history.page.scss'],
})

export class HistoryPage implements OnInit {


  tabs = [];
  patient_id;
  patient_uuid;
  notes1;
  notes = false;
  clinic = [];
  prefTabs: any;
  prefTabs_pat: any;
  displayedColumns_dashboard1: string[] = ['name',  'message', 'date'];
  
  dataSource_dashboard1 = new MatTableDataSource<PeriodicElement_dashboard1>(ELEMENT_DATA_dashboard1);

  constructor(private router: Router,private _formBuilder: FormBuilder,
    private patientService: PatientService,
    private alertController: AlertController,private loadingCtrl: LoadingController,
    private offlineManager : OfflineManagerService, private serverService: ServerService,
    private snackBar: MatSnackBar) { }
    @ViewChild(MatTabGroup) tabGroup: MatTabGroup;

    sw_id1;
    sw_id;
    supervisor_id1;
    supervisor_id;
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
    user_name;

   
    //supervisor code
    patient_notes_array:any;
    super_id1;
    super_id;
    sender_id;
    patient_array:any;
    demo1:any;
    firstNote = true;
    allNotes=false;
    replyNote = "";
    secondFormGroup:any
    group_id;
    group_data_array;any;
    role;
    psw = false;
    supervisor_notes = false;
    show_edit = true;
    notes_array_local :any;
    allNotes1 = false;
    firstNote1 = false;
    group_data;
    group_data1;
    sw_id2;
    medicine_refill_date;
    sender_user_id;
    receiver_user_id;
    psw_array:any;
    medDisplay = true;
    phoneConsult = true;
    showSpinner = false;
    panelOpenState = false;
    imageArray = [];
    private win: any = window;
    nextvisitOther = false;
    next_visit_other = "";
    fileArray = [];
    isDisabled = false;

    udid;
    udid_valid;
    udid_yes = false;
    udid_renew;
    renew_remark;
    renew_date;
    benefit;
    benefit_remark;
    benefit_date;
    renew_yes =  false;
    benefit_yes = false;
    tab1_yes = false;
   
    
  

  ngOnInit() {
 
  }

  ionViewWillEnter() {
    
    this.isDisabled = false;
    this.imageArray = [];
    this.showSpinner = true;
    this.prefTabs = [];
    this.prefTabs_pat = [];
    this.medicine_refill_date = "";
    this.sw_id2 = 0;
    this.notes = false;
    this.role =  sessionStorage.getItem("role")
    this.user_name = sessionStorage.getItem("user_name");
    this.sw_id1 = sessionStorage.getItem("sw_id");
    this.sw_id1 = JSON.parse(this.sw_id1);
    this.sw_id = parseInt(this.sw_id1);
    this.supervisor_id1 = sessionStorage.getItem("supervisor_id");
    this.supervisor_id1 = JSON.parse(this.supervisor_id1);
    this.supervisor_id = parseInt(this.supervisor_id1);
    this.patient_id =  sessionStorage.getItem('patient_id');
    this.patient_uuid =  sessionStorage.getItem('patient_uuid');
    this.group_id =  sessionStorage.getItem("group_data_id")
    this.sender_user_id = sessionStorage.getItem("users_id")
    this.patient_notes_array = [];
    this.notes_array_local;
    this.udid;
    this.udid_valid;
    this.udid_yes = false;
    this.udid_renew;
    this.renew_remark;
    this.renew_date;
    this.benefit;
    this.benefit_remark;
    this.benefit_date;
    this.renew_yes = false;
    this.benefit_yes = false;
    this.tab1_yes = false;

    if(this.role == "psw"){
      this.show_edit = true;
      this.getPatient();
      this.getVisitHistory();
    }else{
      this.show_edit = false;
      this.group_data = sessionStorage.getItem("group_data");
      this.group_data1 =  JSON.parse( this.group_data);
      this.getAllPSWs();
      this.getGroupDataServer(this.supervisor_id);
      this.getVisitHistoryServer();
     
    }
   
  }
    //to get all psws
 async getAllPSWs(){
  let psw_array_first :any;
  let test = await this.serverService.getPsws().toPromise().then(result1 => {
   
    psw_array_first=result1;

 });
 
  this.psw_array = psw_array_first;

 
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
      //this.psw_incharge = "test psw";
      if(this.demo.taluka_psw_incharge){
        this.psw_incharge = this.demo.taluka_psw_incharge;
        }else{
          this.psw_incharge = this.user_name;
        }
        let udid = JSON.parse(patient_array_first[0].uuid_info);
        this.udid = udid.uuid;
        if(this.udid == "Yes"){
          this.udid_yes = true;
        }
        this.udid_valid = udid.uuid_valid;
        this.udid_renew = udid.uuid_renew;
        if(this.udid_renew == "Yes"){
        this.renew_yes = true;
        this.renew_remark = udid.uuid_renew_remark;
        this.renew_date = new Date(udid.uuid_renew_follow_up);
        }
        this.benefit = udid.dis_benefit;
        if(this.benefit == "Yes"){
          this.benefit_yes = true;
        this.benefit_remark = udid.dis_benefit_remark;
        this.benefit_date = new Date(udid.dis_benefit_follow_up);
        }
 
  }

  async getVisitHistory(){
    let notes_array;
    let date_array = [];
    this.dataSource_dashboard1.data = [];

    let history_array_first :any;
    let test = await this.patientService.getVisitHistory(this.patient_uuid).then(result2 => {
     
      history_array_first=result2;

   });

   this.showSpinner = false;
   if(history_array_first[0].notes_data.length > 0){
 
     this.firstNote = false;
     this.allNotes = true;
     for(var i = 0; i<history_array_first[0].notes_data.length;i++){
   
       date_array = [];
       notes_array =  history_array_first[0].notes_data;
     
     if(notes_array[i].recipient_user_id != this.sender_user_id){
       notes_array[i].name = "You";
       }else{
         notes_array[i].name = "supervisor";
       } 
       notes_array[i].message  =  history_array_first[0].notes_data[i].notes_message;
      
      //  if(history_array_first[0].notes_data[i].images != undefined){

      //    //code to allow image display from local resource
       
      //    let fileArray:any;
      //     fileArray = JSON.parse(history_array_first[0].notes_data[i].images);
        
      //   this.imageArray.push(this.win.Ionic.WebView.convertFileSrc(fileArray[0]));
     
      //  }
      
      notes_array[i].date = new Date(history_array_first[0].notes_data[i].created_at);
       this.dataSource_dashboard1.data = notes_array;
     }
   }

let med_task:any;
let med_task_date;this.any;

  med_task = history_array_first[0].task_data;
 // if(med_task[0].status != "Completed"){
    if(med_task[0].status != ""){
    this.medDisplay = true;
  med_task_date = med_task[0].task_due_date;
  let created_date = new Date(med_task_date);
  this.medicine_refill_date = created_date;
  }else{
    this.medDisplay = false;
  }
  

    for(var i = 0;i <history_array_first[0].history_data.length;i++){
    
        this.prefTabs = history_array_first[0].history_data;
        this.prefTabs_pat = history_array_first[0].pat_data;
        this.tabGroup.selectedIndex = 0;
        let check_type =JSON.parse(history_array_first[0].history_data[i].visit_details);
      
        if (!('clinicalData' in check_type) && !('step1Data' in check_type)){
        
          history_array_first[0].history_data[i].visit_type = "Phone";
         
          let created_date = new Date(history_array_first[0].history_data[i].created_at);
          let date = ("0" + created_date.getDate()).slice(-2);
          let month = ("0" + (created_date.getMonth() + 1)).slice(-2);
          let year =created_date.getFullYear();
          let created_date1 = date + "-" + month + "-" + year;

            history_array_first[0].history_data[i].visit_type1 = "Phone "+created_date1;
           
        }else if(('step1Data' in check_type)){
          history_array_first[0].history_data[i].visit_type = "Home";
         let created_date = new Date(history_array_first[0].history_data[i].created_at);
         let date = ("0" + created_date.getDate()).slice(-2);
         let month = ("0" + (created_date.getMonth() + 1)).slice(-2);
         let year =created_date.getFullYear();
         let created_date1 = date + "-" + month + "-" + year;
        
         
         history_array_first[0].history_data[i].visit_type1 = "Home "+created_date1;
         history_array_first[0].history_data[i].visit_type = "Home";
         }else{
          history_array_first[0].history_data[i].visit_type =  "PHC";
         }
        
      if(history_array_first[0].history_data[i].visit_type == "PHC" || history_array_first[0].history_data[i].visit_type=="Manochaithanya"){
        
        let created_date = new Date(history_array_first[0].history_data[i].created_at);
        let date = ("0" + created_date.getDate()).slice(-2);
        let month = ("0" + (created_date.getMonth() + 1)).slice(-2);
        let year =created_date.getFullYear();
        let created_date1 = date + "-" + month + "-" + year;
       
       history_array_first[0].history_data[i].visit_type1 = "Clinic "+created_date1;
        this.prefTabs.phc_data = JSON.parse(history_array_first[0].history_data[i].visit_details);
        if(this.prefTabs.phc_data.clinicalData){
      
        this.prefTabs.mat_data = JSON.parse(this.prefTabs.phc_data.clinicalData);
      
       
       if ('diagnosis' in this.prefTabs.mat_data){
       
        this.prefTabs[i].who = this.prefTabs.mat_data.diagnosis;
       }else{
        this.prefTabs[i].who = this.prefTabs.mat_data.who_came_with;
       }
      
       
        this.prefTabs[i].symp_rate=this.prefTabs.mat_data.phc_symptom_rate;
        this.prefTabs[i].test_reason=this.prefTabs.mat_data.test_reason;
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
        this.prefTabs[i].occupation_rate = this.prefTabs.mat_data.occupation_rate;

        this.prefTabs[i].sleep = this.prefTabs.mat_data.sleep;
        this.prefTabs[i].sleep_rate = this.prefTabs.mat_data.sleep_rate;
        this.prefTabs[i].work = this.prefTabs.mat_data.work;
        this.prefTabs[i].symptomArray = this.prefTabs.mat_data.other_symptom;
     

        this.prefTabs[i].tobacco = this.prefTabs.mat_data.tobacco;
        this.prefTabs[i].alcohol = this.prefTabs.mat_data.alcohol;
        this.prefTabs[i].other = this.prefTabs.mat_data.other;
        this.prefTabs[i].others = this.prefTabs.mat_data.others;
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
          this.prefTabs[i].diag = this.prefTabs.consent_data.diagnosis_step5;
          this.prefTabs[i].comp_rate = this.prefTabs.consent_data.phc_compliance_rate;
          this.prefTabs[i].comp_reason = this.prefTabs.consent_data.comp_reason;
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
          this.prefTabs[i].no_rate_reason = this.prefTabs.consent_data.no_rate_reason;
       
          this.prefTabs[i].symptomArray1 = this.prefTabs.consent_data.symtom1; 
         

        
          this.prefTabs[i].discuss_doctor = this.prefTabs.consent_data.discuss_doctor;
          this.prefTabs[i].discuss_doctor_details = this.prefTabs.consent_data.discuss_doctor_details;
          this.prefTabs[i].medication = this.prefTabs.consent_data.medication;
          this.prefTabs[i].presc_medicine = this.prefTabs.consent_data.presc_medicine;
          this.prefTabs[i].med_supervised_yes = this.prefTabs.consent_data.medication_help_yes;
        
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
         
          if(this.prefTabs.consent_data.consent){
            
            if(this.prefTabs.consent_data.consent[0] == "Phone Call" || this.prefTabs.consent_data.consent[1] == "Phone Call" || this.prefTabs.consent_data.consent[1] == "Phone Call"){
              this.prefTabs[i].phone = true;
            
            }else  if(this.prefTabs.consent_data.consent[0] == "Text Message" || this.prefTabs.consent_data.consent[1] == "Text Message" || this.prefTabs.consent_data.consent[1] == "Text Message"){
              this.prefTabs[i].text = true;
            }
            else  if(this.prefTabs.consent_data.consent[0] == "Home Visit" || this.prefTabs.consent_data.consent[1] == "Home Visit" || this.prefTabs.consent_data.consent[1] == "Home Visit"){
              this.prefTabs[i].home = true;
            }
          }
          
         let follow_date =new Date(history_array_first[0].history_data[i].followup_date);
          this.prefTabs[i].next_date = follow_date;
          //next_visit_place
          
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
            this.nextvisitOther = true;
            this.prefTabs[i].next_visit_other = this.prefTabs.consent_data.next_visit_place;
          
           }
           
        
          }else{
           
            this.prefTabs.consent_data = this.prefTabs.phc_data.consentObj1;
           
            this.prefTabs[i].diag = this.prefTabs.consent_data.diagnosis_step5;
            this.prefTabs[i].comp_rate = this.prefTabs.consent_data.pat_compliance_rate;
            this.prefTabs[i].comp_reason = this.prefTabs.consent_data.comp_reason;
            this.prefTabs[i].medication = this.prefTabs.consent_data.medication;
            this.prefTabs[i].presc_medicine = this.prefTabs.consent_data.medication_yes;
            this.prefTabs[i].med_supervised = this.prefTabs.consent_data.medication_help;
            this.prefTabs[i].supervisor = this.prefTabs.consent_data.medication_help_yes;
            this.prefTabs[i].counselling = this.prefTabs.consent_data.counselling;
            this.prefTabs[i].counselling_med = this.prefTabs.consent_data.counselling_yes;
            this.prefTabs[i].referral = this.prefTabs.consent_data.referral;
            this.prefTabs[i].referral_med = this.prefTabs.consent_data.referral_yes;
            this.prefTabs[i].psychoeducation = this.prefTabs.consent_data.psychoeducation;
            this.prefTabs[i].psychoeducation_yes = this.prefTabs.consent_data.psychoeducation_yes;
            this.prefTabs[i].psychointervension = this.prefTabs.consent_data.psychointervension;
            this.prefTabs[i].psychointervension_yes = this.prefTabs.consent_data.psychointervension_yes;
          
            this.prefTabs[i].pat_details = this.prefTabs.consent_data.participant_details;
           
        
           if(this.prefTabs.consent_data.participant[0].checked == true){
            this.prefTabs[i].patient1 = true;
          }
           if(this.prefTabs.consent_data.participant[1].checked == true){
            this.prefTabs[i].family = true;
          }
          if ('consent_arr' in this.prefTabs_pat[0]){
          let consent = this.prefTabs_pat[0].consent_arr;
         
         
          if(consent.includes("Phone Call")){
            this.prefTabs[i].phone = true;
          }
          if(consent.includes("Text Message")){
            this.prefTabs[i].text = true;
          }
          if(consent.includes("Home Visit")){
            this.prefTabs[i].home = true;
          }
        }
          else{
          
            this.prefTabs[i].phone = true;
            this.prefTabs[i].text = true;
            this.prefTabs[i].home = true;
          }
         
         
          this.prefTabs[i].next_date =new Date(history_array_first[0].history_data[i].followup_date);
          this.prefTabs[i].phc_follow_up_date = date + "-" + month + "-" + year;
       
          if(this.prefTabs.consent_data.phc == 1){
          this.prefTabs[i].next_visit_place2 = 2;
          }else if(this.prefTabs.consent_data.phc == 2){
            this.prefTabs[i].next_visit_place2 = 5;
            this.nextvisitOther =  true;
            this.prefTabs[i].next_visit_other = "Taluk Hospital";
          }else if(this.prefTabs.consent_data.phc == 3){
            this.prefTabs[i].next_visit_place2 = 5;
            this.nextvisitOther =  true;
            this.prefTabs[i].next_visit_other = "District Hospital";
          }else if(this.prefTabs.consent_data.phc == 4){
            this.prefTabs[i].next_visit_place2 = 5;
            this.nextvisitOther =  true;
            this.prefTabs[i].next_visit_other = this.prefTabs.consent_data.phc_other;
          }
          }

      }

      }else if(history_array_first[0].history_data[i].visit_type == "Phone"){
       
      this.prefTabs.phone_data = JSON.parse(history_array_first[0].history_data[i].visit_details);
       if(this.prefTabs.phone_data.missed_visit_date){
        let created_date_phone1 = new Date(this.prefTabs.phone_data.missed_visit_date);
        let date1 = ("0" + created_date_phone1.getDate()).slice(-2);
        let month1 = ("0" + (created_date_phone1.getMonth() + 1)).slice(-2);
        let year1 =created_date_phone1.getFullYear();
        let created_date2 = date1 + "-" + month1 + "-" + year1;
        this.prefTabs[i].missed_phone = created_date_phone1;
       }else{
        this.prefTabs[i].missed_phone = ""
       }

        
        let created_date_phone2 = new Date(this.prefTabs.phone_data.follow_up_date);
        let date2 = ("0" + created_date_phone2.getDate()).slice(-2);
        let month2 = ("0" + (created_date_phone2.getMonth() + 1)).slice(-2);
        let year2 =created_date_phone2.getFullYear();
        let created_date3 = date2 + "-" + month2 + "-" + year2;
        this.prefTabs[i].phone_follow_date = created_date_phone2;
        this.prefTabs[i].patient_contacted = this.prefTabs.phone_data.patient;
        this.prefTabs[i].caregiver_contacted = this.prefTabs.phone_data.caregiver;
        this.prefTabs[i].caregiver_relation = this.prefTabs.phone_data.caregiver_relation;
        this.prefTabs[i].others_contacted = this.prefTabs.phone_data.others;
        this.prefTabs[i].others_relation = this.prefTabs.phone_data.others_relation;
        this.prefTabs[i].compliance_rate = this.prefTabs.phone_data.compliance_rate;
        this.prefTabs[i].comp_reason = this.prefTabs.phone_data.comp_reason;
        this.prefTabs[i].med_supervised = this.prefTabs.phone_data.med_supervised;
        this.prefTabs[i].med_supervised_yes = this.prefTabs.phone_data.med_supervised_yes;
        this.prefTabs[i].symptom_rate = this.prefTabs.phone_data.symptom_rate;
        this.prefTabs[i].test_reason = this.prefTabs.phone_data.test_reason;
        this.prefTabs[i].reason_missed_visit = this.prefTabs.phone_data.reason_missed_visit;
        this.prefTabs[i].plan_support_visit = this.prefTabs.phone_data.plan_support_visit;
        
        this.prefTabs[i].next_visit_place = this.prefTabs.phone_data.next_visit_place;
         if(this.prefTabs[i].next_visit_place == "5"){
        this.nextvisitOther =  true;
        this.prefTabs[i].next_visit_other = this.prefTabs.phone_data.next_visit_place_other;
        }
       
        if(this.prefTabs.phone_data.med_plan){
          
          this.prefTabs[i].med_plan = this.prefTabs.phone_data.med_plan;
          this.prefTabs[i].med_plan_remark = this.prefTabs.phone_data.medicine_plan_remark;

          if(this.prefTabs[i].med_plan == "Others"){
            this.prefTabs[i].med_plan_other_remark = this.prefTabs.phone_data.medicine_plan_other_remark;
          }
        }else{
          this.prefTabs[i].med_plan = "";
        }
     
        this.prefTabs[i].next_date =new Date(history_array_first[0].history_data[i].followup_date);
       

      }else if(history_array_first[0].history_data[i].visit_type == "Home"){
        
        this.prefTabs.home_data = JSON.parse(history_array_first[0].history_data[i].visit_details);
        this.prefTabs.mat_data1 = JSON.parse(this.prefTabs.home_data.step1Data);
        if(this.prefTabs.mat_data1.missed_visit_date){
        this.prefTabs[i].missed_visit_date = new Date(this.prefTabs.mat_data1.missed_visit_date);
        }
       
        if(this.prefTabs.mat_data1.last_phone_date){
          this.phoneConsult = true;
        this.prefTabs[i].last_phone_date = new Date(this.prefTabs.mat_data1.last_phone_date);
        }else{
          this.phoneConsult = false;
          this.prefTabs[i].last_phone_date = "";
        }
        this.prefTabs[i].home_visit_date = new Date(this.prefTabs.mat_data1.home_visit_date);
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
        this.prefTabs[i].work = this.prefTabs.mat_data2.work;
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
        this.prefTabs[i].symptom_rate = this.prefTabs.mat_data2.symptom_rate;
        this.prefTabs[i].test_reason = this.prefTabs.mat_data2.test_reason;
        this.prefTabs.mat_data3 = this.prefTabs.home_data.step3Obj;
        this.prefTabs[i].home_compliance_rate = this.prefTabs.mat_data3.home_compliance_rate;
        this.prefTabs[i].comp_reason = this.prefTabs.mat_data3.comp_reason;
       
        this.prefTabs[i].med_supervised_home = this.prefTabs.mat_data3.med_supervised;
        this.prefTabs[i].med_supervisor_home = this.prefTabs.mat_data3.med_supervisor;
        this.prefTabs[i].missed_visit_reason1 = this.prefTabs.mat_data3.missed_visit_reason;
        this.prefTabs[i].next_visit_plan1 = this.prefTabs.mat_data3.next_visit_plan;
        
        this.prefTabs[i].next_visit_place1 = this.prefTabs.mat_data3.next_visit_place;
        if(this.prefTabs[i].next_visit_place1 == "5"){
          this.nextvisitOther =  true;
        this.prefTabs[i].next_visit_other = this.prefTabs.mat_data3.next_visit_place_other;
        }
        if(this.prefTabs.mat_data3.med_plan){
          
          this.prefTabs[i].med_plan = this.prefTabs.mat_data3.med_plan;
          this.prefTabs[i].med_plan_remark = this.prefTabs.mat_data3.medicine_plan_remark;

          if(this.prefTabs[i].med_plan == "Others"){
            this.prefTabs[i].med_plan_other_remark = this.prefTabs.mat_data3.medicine_plan_other_remark;
          }
        }else{
          this.prefTabs[i].med_plan = "";
        }
       
        this.prefTabs[i].next_follow =new Date(history_array_first[0].history_data[i].followup_date);
       
       
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
      
      let udid = JSON.parse(this.patient_array[0].uuid_info);
      this.udid = udid.uuid;
      if(this.udid == "Yes"){
        this.udid_yes = true;
      }
      this.udid_valid = udid.uuid_valid;
      this.udid_renew = udid.uuid_renew;
      if(this.udid_renew == "Yes"){
      this.renew_yes = true;
      this.renew_remark = udid.uuid_renew_remark;
      this.renew_date = new Date(udid.uuid_renew_follow_up);
      }
      this.benefit = udid.dis_benefit;
      if(this.benefit == "Yes"){
        this.benefit_yes = true;
      this.benefit_remark = udid.dis_benefit_remark;
      this.benefit_date = new Date(udid.dis_benefit_follow_up);
      }
     
    
      if(!this.demo1.taluka_psw_incharge){
        this.psw_incharge = sessionStorage.getItem("psw_incharge");
     
      }else{
        this.psw_incharge = this.demo1.taluka_psw_incharge;
      }
     
      for(var k=0;k<this.group_data_array.length;k++){
        if(this.patient_array[0].group_data_id == this.group_data_array[k].group_data_id){
          this.sw_id2 = this.group_data_array[k].social_worker_id;
        }
      }

    
      for(var k=0;k<this.psw_array.length;k++){
        if( this.sw_id2 == this.psw_array[k].social_worker_id){
          this.receiver_user_id = this.psw_array[k].users_id;
        }
      }
     
    
   
  }

  async getVisitHistoryServer(){
    let history_array_first :any;
    let test = await this.serverService.getHistory(this.patient_uuid).toPromise().then(result3 => {
     
      history_array_first=result3;

   });
      this.showSpinner = false;
      let res:any;
      let res1:any;
      res = history_array_first;
    //newly addd - to remove duplicate records based on patient_uuid 
    res = res.reduce((accumalator, current) => {
      if(!accumalator.some(item => item.clinical_visits.clinical_visits_uuid === current.clinical_visits.clinical_visits_uuid)) {
        accumalator.push(current);
      }
      return accumalator;
    },[]);
    
      for(var i = 0;i <res.length;i++){
  
        this.prefTabs = res;
        this.tabGroup.selectedIndex = 0;
        

        let visits = res[i].clinical_visits;
        if(res[0].tasks != null){
        let tasks = res[0].tasks;
   
      this.medicine_refill_date = new Date(res[0].tasks.task_due_date);
        }
      
        let check_type =JSON.parse(visits.visit_details);
       
      
        if (!('clinicalData' in check_type) && !('step1Data' in check_type)){
            res[i].visit_type = "Phone";
           
           
            //let created_date = new Date(visits.createdAt);
            let created_date = new Date(visits.visit_date);
        let date = ("0" + created_date.getDate()).slice(-2);
        let month = ("0" + (created_date.getMonth() + 1)).slice(-2);
        let year =created_date.getFullYear();
        let created_date1 = date + "-" + month + "-" + year;
            res[i].visit_type1 = "Phone "+created_date1;
        }else if(('step1Data' in check_type)){
          res[i].visit_type = "Home";
         
          //let created_date = new Date(visits.createdAt);
          let created_date = new Date(visits.visit_date);
        let date = ("0" + created_date.getDate()).slice(-2);
        let month = ("0" + (created_date.getMonth() + 1)).slice(-2);
        let year =created_date.getFullYear();
        let created_date1 = date + "-" + month + "-" + year;
          res[i].visit_type1 = "Home "+created_date1;
          
      }else{
        res[i].visit_type = "PHC"
      }
    
      if(res[i].visit_type == "PHC"){
     
        //let created_date = new Date(visits.createdAt);
        let created_date = new Date(visits.visit_date);
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
     
        this.prefTabs[i].test_reason = this.prefTabs.mat_data.test_reason;
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
        this.prefTabs[i].work = this.prefTabs.mat_data.work;
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
          this.prefTabs[i].comp_reason = this.prefTabs.consent_data.comp_reason;
         
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
          
         // this.prefTabs[i].test_reason = this.prefTabs.consent_data.test_reason;
         // this.prefTabs[i].comp_reason = this.prefTabs.consent_data.comp_reason;
        
          this.prefTabs[i].no_rate_reason = this.prefTabs.consent_data.no_rate_reason;
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
          this.prefTabs[i].next_date =new Date(visits.followup_date);
          
          let date = ("0" + this.prefTabs[i].next_date.getDate()).slice(-2);
          let month = ("0" + (this.prefTabs[i].next_date.getMonth() + 1)).slice(-2);
          let year =this.prefTabs[i].next_date.getFullYear();
          this.prefTabs[i].phc_follow_up_date =  date + "-" + month + "-" + year;
       
          if(this.prefTabs.consent_data.consent){
            if(this.prefTabs.consent_data.consent[0] == "Phone Call" || this.prefTabs.consent_data.consent[1] == "Phone Call" || this.prefTabs.consent_data.consent[1] == "Phone Call"){
              this.prefTabs[i].phone = true;
            
            }else  if(this.prefTabs.consent_data.consent[0] == "Text Message" || this.prefTabs.consent_data.consent[1] == "Text Message" || this.prefTabs.consent_data.consent[1] == "Text Message"){
              this.prefTabs[i].text = true;
            }
            else  if(this.prefTabs.consent_data.consent[0] == "Home Visit" || this.prefTabs.consent_data.consent[1] == "Home Visit" || this.prefTabs.consent_data.consent[1] == "Home Visit"){
              this.prefTabs[i].home = true;
            }
          }

        
          if(this.prefTabs.consent_data.next_visit_place == "PHC"){
            this.prefTabs[i].next_visit_place2 = 2;
            this.nextvisitOther =  false;
           }else if(this.prefTabs.consent_data.next_visit_place == "Home"){
            this.prefTabs[i].next_visit_place2 = 1;
            this.nextvisitOther =  false;
           }else if(this.prefTabs.consent_data.next_visit_place == "Manochaithanya"){
            this.prefTabs[i].next_visit_place2 = 3;
            this.nextvisitOther =  false;
           }else if(this.prefTabs.consent_data.next_visit_place == "Phone"){
            this.prefTabs[i].next_visit_place2 = 4;
            this.nextvisitOther =  false;
           }else{
            this.prefTabs[i].next_visit_place2 = 5;
            this.nextvisitOther =  true;
            this.prefTabs[i].next_visit_other = this.prefTabs.consent_data.next_visit_place;
           }
          
          }else{
       
            //data from add patient forms
            this.prefTabs.consent_data = this.prefTabs.phc_data.consentObj1;
        
            this.prefTabs[i].diag = this.prefTabs.consent_data.diagnosis_step5;
            this.prefTabs[i].medication = this.prefTabs.consent_data.medication;
            this.prefTabs[i].presc_medicine = this.prefTabs.consent_data.medication_yes;
            this.prefTabs[i].med_supervised =  this.prefTabs.consent_data.medication_help;
            this.prefTabs[i].supervisor =  this.prefTabs.consent_data.medication_help_yes;
          
            this.prefTabs[i].counselling = this.prefTabs.consent_data.counselling;
            this.prefTabs[i].counselling_med = this.prefTabs.consent_data.counselling_yes;
            this.prefTabs[i].referral = this.prefTabs.consent_data.referral;
            this.prefTabs[i].referral_med = this.prefTabs.consent_data.referral_yes;
            this.prefTabs[i].psychoeducation = this.prefTabs.consent_data.psychoeducation;
            this.prefTabs[i].psychoeducation_yes = this.prefTabs.consent_data.psychoeducation_yes;
            this.prefTabs[i].psychointervension = this.prefTabs.consent_data.psychointervension;
            this.prefTabs[i].psychointervension_yes = this.prefTabs.consent_data.psychointervension_yes;
            this.prefTabs[i].comp_rate = this.prefTabs.consent_data.pat_compliance_rate;
            this.prefTabs[i].comp_reason = this.prefTabs.consent_data.comp_reason;
            let consentarr = JSON.parse(res[0].patientObj.consent_arr);
           
          
            if(consentarr.consent[0] == "Phone Call" || consentarr.consent[1] == "Phone Call" || consentarr.consent[2] == "Phone Call"){
                this.prefTabs[0].phone = true;
                this.prefTabs[i].phone = true;
            }
            if(consentarr.consent[0] == "Text Message" || consentarr.consent[1] == "Text Message" || consentarr.consent[2] == "Text Message"){
              this.prefTabs[0].text = true;
          }
          if(consentarr.consent[0] == "Home Visit" || consentarr.consent[1] == "Home Visit" || consentarr.consent[2] == "Home Visit"){
            this.prefTabs[0].home = true;
        }
         
           if(this.prefTabs.consent_data.participant[0].checked == true){
            this.prefTabs[i].patient1 = true;
          }
           if(this.prefTabs.consent_data.participant[1].checked == true){
            this.prefTabs[i].family = true;
          }
          this.prefTabs[i].pat_details = this.prefTabs.consent_data.participant_details;
          this.prefTabs[i].next_date =new Date(visits.followup_date);
          let date = ("0" + this.prefTabs[i].next_date.getDate()).slice(-2);
          let month = ("0" + (this.prefTabs[i].next_date.getMonth() + 1)).slice(-2);
          let year =this.prefTabs[i].next_date.getFullYear();
          this.prefTabs[i].phc_follow_up_date =  date + "-" + month + "-" + year;
          // this.prefTabs[i].next_visit_place2 = 2;
         
          if(this.prefTabs.consent_data.phc == 1){
            this.prefTabs[i].next_visit_place2 = 2;
            this.nextvisitOther =  false;
            }else if(this.prefTabs.consent_data.phc == 2){
              this.prefTabs[i].next_visit_place2 = 5;
              this.nextvisitOther =  true;
              this.prefTabs[i].next_visit_other = "Taluk Hospital";
            }else if(this.prefTabs.consent_data.phc == 3){
              this.prefTabs[i].next_visit_place2 = 5;
              this.nextvisitOther =  true;
              this.prefTabs[i].next_visit_other = "District Hospital";
            }else if(this.prefTabs.consent_data.phc == 4){
              this.prefTabs[i].next_visit_place2 = 5;
              this.nextvisitOther =  true;
              this.prefTabs[i].next_visit_other = this.prefTabs.consent_data.phc_other;
            }
        
       
          }

      }

      }
      else if(res[i].visit_type == "Phone"){
    
        this.prefTabs.phone_data = JSON.parse(visits.visit_details);
        if(this.prefTabs.phone_data.missed_visit_date){
        this.prefTabs[i].missed_phone =new Date(this.prefTabs.phone_data.missed_visit_date);
        }else{
          this.prefTabs[i].missed_phone ="";
        }
        this.prefTabs[i].phone_follow_date = new Date(this.prefTabs.phone_data.missed_visit_date);
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
        if(this.prefTabs[i].next_visit_place == 5){ 
          this.nextvisitOther = true;
          this.prefTabs[i].next_visit_other = this.prefTabs.phone_data.next_visit_place_other;
          
        }
        this.prefTabs[i].test_reason = this.prefTabs.phone_data.test_reason;
        this.prefTabs[i].comp_reason = this.prefTabs.phone_data.comp_reason;
       
        if(this.prefTabs.phone_data.med_plan){
          
          this.prefTabs[i].med_plan = this.prefTabs.phone_data.med_plan;
          this.prefTabs[i].med_plan_remark = this.prefTabs.phone_data.medicine_plan_remark;

          if(this.prefTabs[i].med_plan == "Others"){
            this.prefTabs[i].med_plan_other_remark = this.prefTabs.phone_data.medicine_plan_other_remark;
          }
        }else{
          this.prefTabs[i].med_plan = "";
        }
      
        this.prefTabs[i].next_date = new Date(visits.followup_date);
        let date = ("0" + this.prefTabs[i].next_date.getDate()).slice(-2);
          let month = ("0" + (this.prefTabs[i].next_date.getMonth() + 1)).slice(-2);
          let year =this.prefTabs[i].next_date.getFullYear();
          this.prefTabs[i].phc_follow_up_date =  date + "-" + month + "-" + year;
       
          

      } else if(res[i].visit_type == "Home"){
        
        this.prefTabs.home_data = JSON.parse(visits.visit_details);
        this.prefTabs.mat_data1 = JSON.parse(this.prefTabs.home_data.step1Data);
        let missed_phc_date = new Date(this.prefTabs.mat_data1.missed_visit_date);
       
        this.prefTabs[i].missed_visit_date = missed_phc_date;
        let created_date_phone:any;
        if(this.prefTabs.mat_data1.last_phone_date){
          this.phoneConsult = true;
        created_date_phone = new Date(this.prefTabs.mat_data1.last_phone_date);
        }else{
          this.phoneConsult = false;
          created_date_phone = ""
        }
        
        this.prefTabs[i].last_phone_date = created_date_phone;
        let home_date:any;
        
        if(typeof this.prefTabs.mat_data1.home_visit_date !='string'){
       
          home_date = new Date(this.prefTabs.mat_data1.home_visit_date)
        }else{
         
          //home_date = "";
          home_date = this.prefTabs.mat_data1.home_visit_date;
        }
     
        this.prefTabs[i].home_visit_date = home_date;
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
        this.prefTabs[i].work = this.prefTabs.mat_data2.work;
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
        this.prefTabs[i].symptom_rate = this.prefTabs.mat_data2.symptom_rate;
        this.prefTabs[i].test_reason = this.prefTabs.mat_data2.test_reason;
        this.prefTabs.mat_data3 = this.prefTabs.home_data.step3Obj;
        this.prefTabs[i].home_compliance_rate = this.prefTabs.mat_data3.home_compliance_rate;
        this.prefTabs[i].comp_reason = this.prefTabs.mat_data3.comp_reason;
        this.prefTabs[i].med_supervised_home = this.prefTabs.mat_data3.med_supervised;
        this.prefTabs[i].med_supervisor_home = this.prefTabs.mat_data3.med_supervisor;
        this.prefTabs[i].missed_visit_reason1 = this.prefTabs.mat_data3.missed_visit_reason;
        this.prefTabs[i].next_visit_plan1 = this.prefTabs.mat_data3.next_visit_plan;
    
        this.prefTabs[i].next_visit_place1 = this.prefTabs.mat_data3.next_visit_place;
        if(this.prefTabs[i].next_visit_place1 == 5){ 
          this.nextvisitOther = true;
          this.prefTabs[i].next_visit_other = this.prefTabs.mat_data3.next_visit_place_other;
          
        }
        this.prefTabs[i].next_follow = new Date(visits.followup_date);
        if(this.prefTabs.mat_data3.med_plan){
          
          this.prefTabs[i].med_plan = this.prefTabs.mat_data3.med_plan;
          this.prefTabs[i].med_plan_remark = this.prefTabs.mat_data3.medicine_plan_remark;

          if(this.prefTabs[i].med_plan == "Others"){
            this.prefTabs[i].med_plan_other_remark = this.prefTabs.mat_data3.medicine_plan_other_remark;
          }
        }else{
          this.prefTabs[i].med_plan = "";
        }
       
      }
    }
      
      
     
   
  }



  sendNotes(){
 
  if(this.notes1 != undefined){ 
      this.isDisabled = true;
      this.patientService.addNewNotes(this.patient_uuid,this.notes1,this.sender_user_id,this.supervisor_id,this.fileArray).then(() => {
       
       
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
               // this.offlineManager.checkForEvents().subscribe();
               this.displayLoader();
               setTimeout(()=>{
                this.dismissLoader();
                this.router.navigate(['patient-details']);
               }, 5000);
          
                
              }
            
            }
          ]
        }).then(res => {
          res.present();
        });
       
          
        
    });
  }else{
    this.snackBar.open('Please enter notes', 'x', {
      duration: 10000,
    });
  }
  
  
  }

  writeNotes1(x){
    
    if(this.notes1 != undefined){ 
        this.isDisabled = true;
        this.patientService.addNewNotes(this.patient_uuid,this.notes1,this.sender_user_id,this.supervisor_id,this.fileArray).then(() => {
         
         
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
                 // this.offlineManager.checkForEvents().subscribe();
                 this.displayLoader();
                 setTimeout(()=>{
                  this.dismissLoader();
                  this.router.navigate(['patient-details']);
                 }, 5000);
            
                  
                }
              
              }
            ]
          }).then(res => {
            res.present();
          });
         
            
          
      });
    }else{
      this.snackBar.open('Please enter notes', 'x', {
        duration: 10000,
      });
    }
    
    
  }
    writeNotes2(x){
      console.log("checking")
    }

  superNotes(){
    this.router.navigate(['super-notes']);
  }


  viewReplyNotes(){
 
    if(this.role == "psw"){
      this.supervisor_notes = false;
     this.notes = true;
     this.psw = true;
      if(this.notes_array_local.length > 0){
       
        this.firstNote = false;
        this.allNotes = true;
      }else{
        this.firstNote = true;
        this.allNotes = false;
      }
      
    }else{
      this.psw = false;
      this.supervisor_notes = true;
      this.notes = true;

    this.serverService.getPatientNotes(this.patient_uuid).subscribe(data  => {
    
    this.patient_notes_array = data;
    if(this.patient_notes_array.length > 0 ){
     
      this.firstNote1 = false;
      this.allNotes1 = true;

    }else{
     
      this.allNotes1 = false;
      this.firstNote1 = true;
    }
   
    for(var i = 0;i<this.patient_notes_array.length;i++){

      if(this.patient_notes_array[i].recipient_user_id == this.supervisor_id){
        this.patient_notes_array[i].name = "PSW";
        this.receiver_user_id = this.patient_notes_array[i].sender_user_id;
      }else{
        this.patient_notes_array[i].name = "You";
       
      }
    
      this.patient_notes_array[i].date = new Date(this.patient_notes_array[i].createdAt);
      this.patient_notes_array[i].message = this.patient_notes_array[i].notes_message;
    
      let tempArray:any;
    
      let images:any;
      if(this.patient_notes_array[i].images != undefined){
      
    //     this.serverService.getImages(this.patient_notes_array[i].notes_uuid).toPromise().then(result1 => {
    //     images =result1;
    //  });
        tempArray = this.patient_notes_array[i].images.split(",")
        this.imageArray.push(this.serverService.baseUrl +tempArray[0]);
     
      }
    }
   
    this.dataSource_dashboard1.data = this.patient_notes_array;

  });
}
  }

  writeNotes3(x){
    if(this.notes1 != undefined){
    this.isDisabled = true;
    let recipient_user_id1;
    const notes_uuid =  UUID.UUID();
    var date = new Date();
    
    let dateStr =
     
    date.getFullYear() + "-"+("00" + (date.getMonth() + 1)).slice(-2) + "-" +("00" + date.getDate()).slice(-2) + " " +
    ("00" + date.getHours()).slice(-2) + ":" +
    ("00" + date.getMinutes()).slice(-2) + ":" +
    ("00" + date.getSeconds()).slice(-2);
      
        let notesObj:any;
    
    
       notesObj = {
        "notes_id":0,
        "notes_uuid" :notes_uuid,
        "notes_message":'',
        "read_flag":1,
        "patient_uuid":this.patient_uuid,
        "sender_user_id":this.sender_user_id,
        "recipient_user_id":this.receiver_user_id,
        "createdAt":dateStr
      

        }
   
    notesObj.notes_message = this.notes1;
    this.serverService.addNotes(notesObj).subscribe(data  => {
      this.notes1 = "";
      this.replyNote = "";
    this.supervisor_notes = false;
      this.router.navigate(['supervisor-dashboard']);
    })
  }else{
    this.snackBar.open('Please enter notes', 'x', {
      duration: 10000,
    });
  }
   
  }
  writeNotes4(x){

    if(this.replyNote != ""){
      this.isDisabled = true;
    let recipient_user_id1;
    const notes_uuid =  UUID.UUID();
    var date = new Date();
    
    
        let dateStr =
     
      date.getFullYear() + "-"+("00" + (date.getMonth() + 1)).slice(-2) + "-" +("00" + date.getDate()).slice(-2) + " " +
      ("00" + date.getHours()).slice(-2) + ":" +
      ("00" + date.getMinutes()).slice(-2) + ":" +
      ("00" + date.getSeconds()).slice(-2);
      
        let notesObj:any;

       notesObj = {
        "notes_id":0,
        "notes_uuid" :notes_uuid,
        "notes_message":'',
        "read_flag":1,
        "patient_uuid":this.patient_uuid,
        "sender_user_id":this.sender_user_id,
        "recipient_user_id":this.receiver_user_id,
        "createdAt":dateStr
      

    }
   
    notesObj.notes_message = this.replyNote;
    this.serverService.addNotes(notesObj).subscribe(data  => {
      this.notes1 = "";
      this.replyNote = "";
    this.supervisor_notes = false;
      this.router.navigate(['supervisor-dashboard']);
    })
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

  back(){
   
    this.router.navigate(['patient-details']);
  
  }

  logout(){
    this.router.navigate(['']);
   
  }

  hide(){
    this.notes = false;
    this.firstNote = false;
    this.allNotes = false;
    this.firstNote1 = false;
    this.allNotes1 = false;
   
  }
  
  redirectTo(x){
    if(x==1){
      this.router.navigate(['history']);
    }else if(x==2){
      this.router.navigate(['edit-patient']);
    }else{
      this.router.navigate(['task-history']);
    }
  }
  
  displayLoader(){
    this.loadingCtrl.create({
      message: 'Loading. Please wait...',
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

  public tabChanged(tabChangeEvent: MatTabChangeEvent): void {
   
    if(tabChangeEvent.index == 0){
      this.tab1_yes = true;
    }else{
      this.tab1_yes = false;
    }
}

 
}

export interface PeriodicElement_dashboard1 {
  name: string;
  message: string;
  date: string;
  
  
}


const ELEMENT_DATA_dashboard1: PeriodicElement_dashboard1[] = [
  { name: '',message:' ',date:''},
 
];