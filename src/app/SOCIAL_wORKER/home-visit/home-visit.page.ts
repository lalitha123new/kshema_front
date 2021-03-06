import { Component, OnInit,ViewChild } from '@angular/core';
import {MatStepperModule} from '@angular/material/stepper';
import {FormBuilder,FormControl,FormGroupDirective,NgForm, FormGroup, Validators} from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import {Location} from '@angular/common';
import {  MatStepper} from '@angular/material/stepper';
import { Router } from '@angular/router';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { MatRadioChange } from '@angular/material/radio';
import { PatientService } from 'src/app/services/patient.service';
import { LoadingController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { OfflineManagerService } from '../../services/offline-manager.service';

interface amount_options{
  value: string;
  viewValue_amount: string;
}
interface rating_options{
  value: string;
  viewValue_rating: string;
}

interface tobacco_options{
  value: string;
  viewValue: string;
}
interface med_options{
  value: string;
  viewValue_amount: string;
}

@Component({
  selector: 'app-home-visit',
  templateUrl: './home-visit.page.html',
  styleUrls: ['./home-visit.page.scss'],
})
export class HomeVisitPage implements OnInit {
 
  
  constructor(private _location: Location,private router: Router,private _formBuilder: FormBuilder,private dialogModel: MatDialog,
    private patientService: PatientService,private loadingCtrl: LoadingController,public alertController: AlertController,private offlineManager : OfflineManagerService) { }
  @ViewChild('stepper') stepper: MatStepper;

  firstFormGroup: any;
  secondFormGroup: any;
  public newSymptom: any = {};
  public symptomArray: Array<any> = [];
  thirdFormGroup: any;
  isValue = 1;
  others_selected =  false;
  med_refill_others = false;
  dateMissed;
  datePhone;
  dateHome;
  sw_id1;
  sw_id;
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
  place_array = [];
  dateToday;
  amount1;
  amount2;
  amount3;
  rate1 = "Unable to rate";
  rate2 = "Unable to rate";
  symp_reason_visible = true;
  comp_reason_visible = true;
  rateSymptom = false;
  compRate = false;
  caregiverFormGroup:any;
  othersFormGroup:any;
  tobaccoFormGroup:any;
  alcoholFormGroup:any;
  OtherUseFormGroup:any;
  medFormGroup:any;
  domainArray = [];
  domainValid = false;

  homeVisitObj = {
    missed_visit_date:'',
    last_phone_date:'',
    home_visit_date:Date,
    seen_patient:'',
    seen_caregiver:'',
    caregiver_name_relation:'',
    seen_others:'',
    others_name_relation:'',

    suspicious_rate:'',
    hallucinatory_rate:'',
    verbal_rate:'',
    social_rate:'',
    selfcare_rate:'',
    occupation_rate:'',
    sleep_rate:'',
    work:'',
    test_reason:'',
    tobacco:'',
    tobocco_amount:'',
    tobacco_remark:'',
    alcohol:'',
    alcohol_amount:'',
    alcohol_remark:'',
    others:'',
    other_amount:'',
    others_remark:'',

    home_compliance_rate:'',
    comp_reason:'',
    med_supervised:'',
    med_supervisor:'',
    symptom:'',
    missed_visit_reason:'',
    next_visit_plan:'',
    next_visit_place_other:'',
    next_visit_date:'',
    medicine_plan:'',
    medicine_plan_other_date:'',
    medicine_plan_other_remark:'',
    medicine_plan_remark:''
  }

  missed_phc_date;
  med_task_array:any = [];
  medObj:any = {};
  med_tasks_uuid;
  med_plan;
  caregiverYesClicked:Boolean = false;
  otherPersonYesClicked:Boolean = false;
  tobaccoYesClicked:Boolean = false;
  alcoholYesClicked:Boolean = false;
  otherSubYesClicked:Boolean = false;
  medHelpYesClicked:Boolean = false;
  medicine_refill_date;
  medDisplay = true;
  isDisabled = false;

  ngOnInit() {

    this.firstFormGroup = this._formBuilder.group({
      missed_visit_date: new FormControl(this.homeVisitObj.missed_visit_date,[]),
      last_phone_date: new FormControl(this.homeVisitObj.last_phone_date,[]),
      home_visit_date: new FormControl(this.homeVisitObj.home_visit_date,[Validators.required]),
      seen_patient: new FormControl(this.homeVisitObj.seen_patient,[Validators.required]),
      caregiverFormGroup:new FormGroup({
      seen_caregiver: new FormControl(this.homeVisitObj.seen_caregiver,[Validators.required]),
      caregiver_name_relation: new FormControl(this.homeVisitObj.caregiver_name_relation,[]),
      }),
      othersFormGroup:new FormGroup({
      seen_others: new FormControl(this.homeVisitObj.seen_others,[Validators.required]),
      others_name_relation: new FormControl(this.homeVisitObj.others_name_relation,[]),
      })
    })
    this.secondFormGroup = this._formBuilder.group({
      symptom: new FormControl(this.homeVisitObj.symptom,[]),
      suspicious_rate: new FormControl(this.homeVisitObj.suspicious_rate,[]),
      hallucinatory_rate: new FormControl(this.homeVisitObj.hallucinatory_rate,[]),
      verbal_rate: new FormControl(this.homeVisitObj.verbal_rate,[]),
      social_rate: new FormControl(this.homeVisitObj.social_rate,[]),
      selfcare_rate: new FormControl(this.homeVisitObj.selfcare_rate,[]),
      occupation_rate: new FormControl(this.homeVisitObj.occupation_rate,[]),
      sleep_rate: new FormControl(this.homeVisitObj.sleep_rate,[]),
      work: new FormControl(this.homeVisitObj.work,[]),
      test_reason:new FormControl(this.homeVisitObj.test_reason,[]),
      tobaccoFormGroup:new FormGroup({
      tobacco: new FormControl(this.homeVisitObj.tobacco,[Validators.required]),
      tobocco_amount: new FormControl(this.homeVisitObj.tobocco_amount,[]),
      tobacco_remark: new FormControl(this.homeVisitObj.tobacco_remark,[]),
      }),
      alcoholFormGroup:new FormGroup({
      alcohol: new FormControl(this.homeVisitObj.alcohol,[Validators.required]),
      alcohol_amount: new FormControl(this.homeVisitObj.alcohol_amount,[]),
      alcohol_remark: new FormControl(this.homeVisitObj.alcohol_remark,[]),
      }),
      OtherUseFormGroup:new FormGroup({
      others: new FormControl(this.homeVisitObj.others,[Validators.required]),
      other_amount: new FormControl(this.homeVisitObj.other_amount,[]),
      others_remark: new FormControl(this.homeVisitObj.others_remark,[]),
      })
    })
    this.thirdFormGroup = this._formBuilder.group({
      home_compliance_rate: new FormControl(this.homeVisitObj.home_compliance_rate,[]),
      comp_reason:new FormControl(this.homeVisitObj.comp_reason,[]),
      medFormGroup:new FormGroup({
      med_supervised: new FormControl(this.homeVisitObj.med_supervised,[Validators.required]),
      med_supervisor: new FormControl(this.homeVisitObj.med_supervisor,[]),
      }),
      // symptom: new FormControl(this.homeVisitObj.symptom,[Validators.required]),
      missed_visit_reason: new FormControl(this.homeVisitObj.missed_visit_reason,[]),
      next_visit_plan: new FormControl(this.homeVisitObj.next_visit_plan,[Validators.required]),
      next_visit_place_other: new FormControl(this.homeVisitObj.next_visit_place_other,[]),
      next_visit_date: new FormControl(this.homeVisitObj.next_visit_date,[Validators.required]),
      medicine_plan:new FormControl(this.homeVisitObj.medicine_plan,[Validators.required]),
      medicine_plan_other_date:new FormControl(this.homeVisitObj.medicine_plan_other_date,[]),
      medicine_plan_other_remark:new FormControl(this.homeVisitObj.medicine_plan_other_remark,[]),
      medicine_plan_remark:new FormControl(this.homeVisitObj.medicine_plan_remark,[Validators.required]),
     
    })
  }

  ionViewWillEnter() {
    this.firstFormGroup = this._formBuilder.group({
      missed_visit_date: new FormControl(this.homeVisitObj.missed_visit_date,[]),
      last_phone_date: new FormControl(this.homeVisitObj.last_phone_date,[]),
      home_visit_date: new FormControl(this.homeVisitObj.home_visit_date,[Validators.required]),
      seen_patient: new FormControl(this.homeVisitObj.seen_patient,[Validators.required]),
      caregiverFormGroup:new FormGroup({
      seen_caregiver: new FormControl(this.homeVisitObj.seen_caregiver,[Validators.required]),
      caregiver_name_relation: new FormControl(this.homeVisitObj.caregiver_name_relation,[]),
      }),
      othersFormGroup:new FormGroup({
      seen_others: new FormControl(this.homeVisitObj.seen_others,[Validators.required]),
      others_name_relation: new FormControl(this.homeVisitObj.others_name_relation,[]),
      })
    })
    this.secondFormGroup = this._formBuilder.group({
      symptom: new FormControl(this.homeVisitObj.symptom,[]),
      suspicious_rate: new FormControl(this.homeVisitObj.suspicious_rate,[]),
      hallucinatory_rate: new FormControl(this.homeVisitObj.hallucinatory_rate,[]),
      verbal_rate: new FormControl(this.homeVisitObj.verbal_rate,[]),
      social_rate: new FormControl(this.homeVisitObj.social_rate,[]),
      selfcare_rate: new FormControl(this.homeVisitObj.selfcare_rate,[]),
      occupation_rate: new FormControl(this.homeVisitObj.occupation_rate,[]),
      sleep_rate: new FormControl(this.homeVisitObj.sleep_rate,[]),
      work: new FormControl(this.homeVisitObj.work,[]),
      test_reason:new FormControl(this.homeVisitObj.test_reason,[]),
      tobaccoFormGroup:new FormGroup({
      tobacco: new FormControl(this.homeVisitObj.tobacco,[Validators.required]),
      tobocco_amount: new FormControl(this.homeVisitObj.tobocco_amount,[]),
      tobacco_remark: new FormControl(this.homeVisitObj.tobacco_remark,[]),
      }),
      alcoholFormGroup:new FormGroup({
      alcohol: new FormControl(this.homeVisitObj.alcohol,[Validators.required]),
      alcohol_amount: new FormControl(this.homeVisitObj.alcohol_amount,[]),
      alcohol_remark: new FormControl(this.homeVisitObj.alcohol_remark,[]),
      }),
      OtherUseFormGroup:new FormGroup({
      others: new FormControl(this.homeVisitObj.others,[Validators.required]),
      other_amount: new FormControl(this.homeVisitObj.other_amount,[]),
      others_remark: new FormControl(this.homeVisitObj.others_remark,[]),
      })
    })
    this.thirdFormGroup = this._formBuilder.group({
      home_compliance_rate: new FormControl(this.homeVisitObj.home_compliance_rate,[]),
      comp_reason:new FormControl(this.homeVisitObj.comp_reason,[]),
      medFormGroup:new FormGroup({
      med_supervised: new FormControl(this.homeVisitObj.med_supervised,[Validators.required]),
      med_supervisor: new FormControl(this.homeVisitObj.med_supervisor,[]),
      }),
      // symptom: new FormControl(this.homeVisitObj.symptom,[Validators.required]),
      missed_visit_reason: new FormControl(this.homeVisitObj.missed_visit_reason,[]),
      next_visit_plan: new FormControl(this.homeVisitObj.next_visit_plan,[Validators.required]),
      next_visit_place_other: new FormControl(this.homeVisitObj.next_visit_place_other,[]),
      next_visit_date: new FormControl(this.homeVisitObj.next_visit_date,[Validators.required]),
      medicine_plan:new FormControl(this.homeVisitObj.medicine_plan,[Validators.required]),
      medicine_plan_other_date:new FormControl(this.homeVisitObj.medicine_plan_other_date,[]),
      medicine_plan_other_remark:new FormControl(this.homeVisitObj.medicine_plan_other_remark,[]),
      medicine_plan_remark:new FormControl(this.homeVisitObj.medicine_plan_remark,[Validators.required]),
     
    })
    this.user_name = sessionStorage.getItem("user_name");
    this.rate1 = "Unable to rate";
    this.rate2 = "Unable to rate";
    this.homeVisitObj.symptom='';
    this.homeVisitObj.home_compliance_rate='';
    this.isDisabled = false;
   
    this.user_name = sessionStorage.getItem("user_name");
    this.sw_id1 = sessionStorage.getItem("sw_id");
    this.sw_id = parseInt(this.sw_id1);
    this.patient_id =  sessionStorage.getItem('patient_id');
    this.patient_uuid = sessionStorage.getItem('patient_uuid');
    this.firstFormGroup.get('home_visit_date').setValue(new Date());
    this.getPatient();
    this.getPreviousVisitDetails();
    this.getMedTask();
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
  
  
  }
  
  async getPreviousVisitDetails(){
    let notes_array;
    let date_array = [];
  

    let history_array_first :any;
    let test = await this.patientService.getVisitHistory(this.patient_uuid).then(result2 => {
     
      history_array_first=result2;

   });

    for(var i = 0;i <history_array_first[0].history_data.length;i++){
    
        
        let check_type =JSON.parse(history_array_first[0].history_data[i].visit_details);
        
       
        if (!('clinicalData' in check_type) && !('step1Data' in check_type)){
        
          history_array_first[0].history_data[i].visit_type = "Phone";
         
          
        }else if(('step1Data' in check_type)){
          history_array_first[0].history_data[i].visit_type = "Home";
         
         }else{
          history_array_first[0].history_data[i].visit_type =  "PHC"
          
         }
         
      if(history_array_first[0].history_data[i].visit_type == "PHC" || history_array_first[0].history_data[i].visit_type=="Manochaithanya"){
        
        let phc_data = JSON.parse(history_array_first[0].history_data[i].visit_details);
       
        if(phc_data.clinicalData){
      
        let mat_data = JSON.parse(phc_data.clinicalData);
      
        if(typeof phc_data.consentObj1 !='object'){
       
        //let phc_data = JSON.parse(history_array_first[0].history_data[i].visit_details);
        
        if(phc_data.consentObj1.next_visit_place == "PHC" ){
        let follow_date =new Date(history_array_first[0].history_data[i].followup_date);
         this.firstFormGroup.get('missed_visit_date').setValue(follow_date);
            
        }
       
        let array2 = JSON.parse(phc_data.clinicalData);
       
       if(array2.tobocco_amount == "Same level as last time"){
        
        this.amount1="Same level as last time";
  
      }else if(array2.tobocco_amount == "Reduced amount"){
        
        this.amount1="Reduced amount";
      }else if(array2.tobocco_amount == "Abstinent"){
        
        this.amount1="Abstinent";
      }else if(array2.tobocco_amount == "Increased use"){
        
        this.amount1="Increased use";
      }else{
        
        this.amount1= array2.tobocco_amount;
      }

      if(array2.alcohol_amount == "Same level as last time"){
        this.amount2="Same level as last time";
      }else if(array2.alcohol_amount == "Reduced amount"){
        this.amount2="Reduced amount";
      }else if(array2.alcohol_amount == "Abstinent"){
        this.amount2="Abstinent";
      }else if(array2.alcohol_amount == "Increased use"){
        this.amount2="Increased use";
      }else{
        this.amount2= array2.alcohol_amount;
      }
      
       if(array2.other_amount == "1"){
        this.amount3="Same level as last time";
      }else if(array2.other_amount == "2"){
        this.amount3="Reduced amount";
      }else if(array2.other_amount == "3"){
        this.amount3="Abstinent";
      }else if(array2.other_amount == "4"){
        this.amount3="Increased use";
      }else{
        this.amount3= array2.other_amount;
      }
        
         
          
          }else{
           
            // let follow_date =new Date(history_array_first[0].history_data[i].followup_date);
            // this.firstFormGroup.get('missed_visit_date').setValue(follow_date);
            //commented recently
             if(check_type.consentObj1.phc == 1){
            let follow_date =new Date(history_array_first[0].history_data[i].followup_date);
            this.firstFormGroup.get('missed_visit_date').setValue(follow_date);
           }
           else{
            this.firstFormGroup.get('missed_visit_date').setValue('');
           }
             
            let phc_data = JSON.parse(history_array_first[0].history_data[i].visit_details);
          
            //substance used data from add patient clinical data
            let array2 = JSON.parse(phc_data.clinicalData);
            this.amount1 = array2.tobocco_amount;
            this.amount2 = array2.alcohol_amount;
            this.amount3 = array2.other_amount;
         
          }

      }

      }else if(history_array_first[0].history_data[i].visit_type == "Phone"){
       
        let next = JSON.parse(history_array_first[0].history_data[i].visit_details);
  
       if(next.next_visit_place == 2){
      
        let follow_date =new Date(history_array_first[0].history_data[i].followup_date);
        this.firstFormGroup.get('missed_visit_date').setValue(follow_date);
       }
       
        let phone_date =new Date(history_array_first[0].history_data[i].created_at);
        this.firstFormGroup.get('last_phone_date').setValue(phone_date);
       

      }else if(history_array_first[0].history_data[i].visit_type == "Home"){
        let next = JSON.parse(history_array_first[0].history_data[i].visit_details);
       if(next.step3Obj.next_visit_place == 2){
        let follow_date =new Date(history_array_first[0].history_data[i].followup_date);
        this.firstFormGroup.get('missed_visit_date').setValue(follow_date);
       }
       
        let phc_data = JSON.parse(history_array_first[0].history_data[i].visit_details);
       
       
          let array2 = JSON.parse(phc_data.step2Data);
         
         if(array2.tobocco_amount == "1"){
          
          this.amount1="Same level as last time";
    
        }else if(array2.tobocco_amount == "2"){
          
          this.amount1="Reduced amount";
        }else if(array2.tobocco_amount == "3"){
          
          this.amount1="Abstinent";
        }else if(array2.tobocco_amount == "4"){
          
          this.amount1="Increased use";
        }else{
          
          this.amount1= array2.tobocco_amount;
        }
        if(array2.alcohol_amount == "1"){
          this.amount2="Same level as last time";
        }else if(array2.alcohol_amount == "2"){
          this.amount2="Reduced amount";
        }else if(array2.alcohol_amount == "3"){
          this.amount2="Abstinent";
        }else if(array2.alcohol_amount == "4"){
          this.amount2="Increased use";
        }else{
          this.amount2= array2.alcohol_amount;
        }
        
         if(array2.other_amount == "1"){
          this.amount3="Same level as last time";
        }else if(array2.other_amount == "2"){
          this.amount3="Reduced amount";
        }else if(array2.other_amount == "3"){
          this.amount3="Abstinent";
        }else if(array2.other_amount == "4"){
          this.amount3="Increased use";
        }else{
          this.amount3= array2.other_amount;
        }
       
       
      }
    }
  
  }
 

  async getMedTask(){
    let med_array_first :any;
    let test = await this.patientService.getPatientMedTasks(this.patient_uuid).then(result3 => {
     
      med_array_first=result3;
     
     

   });
   this.med_tasks_uuid = med_array_first[0].tasks_uuid;
     // if(med_array_first[0].status == "pending"){
      if(med_array_first[0].status != ""){
        this.medDisplay = true;
        this.medicine_refill_date = new Date(med_array_first[0].task_due_date);
        this.thirdFormGroup.get('medicine_plan_other_date').setValue(this.medicine_refill_date);
     
      }else{
        this.medDisplay = false;
        this.medicine_refill_date = "";
      }
 
  }

  home(){
    this.router.navigate(['dashboard']);
  }

  redirectTo(x){
    if(x==1){
      this.router.navigate(['history']);
    }else{
      this.router.navigate(['edit-patient']);
    }
  }

  addmanoProgramme(){
    this.symptomArray.push(this.newSymptom);
    this.newSymptom = {};
    
   
  }
 
  logout(){
    this.router.navigate(['']);
  }


  toggle1(x) { 
    if(x == 1){
      this.place_array = [];
      this.isValue = 1;
      this.place_array.push(this.isValue);
      this.others_selected =  false;
      this.thirdFormGroup.get('next_visit_place_other').clearValidators();
      this.thirdFormGroup.get('next_visit_place_other').setValue('');
    }else if(x==2){
      this.place_array = [];
      this.isValue = 2;
      this.place_array.push(this.isValue);
      this.others_selected =  false;
      this.thirdFormGroup.get('next_visit_place_other').clearValidators();
      this.thirdFormGroup.get('next_visit_place_other').setValue('');
      
    }else if(x==3){
      this.place_array = [];
      this.isValue = 3;
      this.place_array.push(this.isValue);
      this.others_selected =  false;
      this.thirdFormGroup.get('next_visit_place_other').clearValidators();
      this.thirdFormGroup.get('next_visit_place_other').setValue('');
    }else if(x==4){
      this.place_array = [];
      this.isValue = 4;
      this.place_array.push(this.isValue);
      this.others_selected =  false;
      this.thirdFormGroup.get('next_visit_place_other').clearValidators();
      this.thirdFormGroup.get('next_visit_place_other').setValue('');
    }else{
      this.place_array = [];
      this.isValue = 5;
      this.place_array.push(this.isValue);
      this.others_selected =  true;
      this.thirdFormGroup.get('next_visit_place_other').setValidators(Validators.required);
      
    }
   
   }


  previous(){
    this.stepper.previous();
  }

  caregiverClicked($event:MatRadioChange){
    if ($event.value ==='Yes') {
      this.caregiverYesClicked = true;
      this.firstFormGroup.controls.caregiverFormGroup.get('caregiver_name_relation').setValidators(Validators.required);
      this.firstFormGroup.controls.caregiverFormGroup.get('caregiver_name_relation').updateValueAndValidity();
     
    
    } else {
      this.caregiverYesClicked = false;
      this.firstFormGroup.controls.caregiverFormGroup.get('caregiver_name_relation').setValue('');
      this.firstFormGroup.controls.caregiverFormGroup.get('caregiver_name_relation').clearValidators();
      this.firstFormGroup.controls.caregiverFormGroup.get('caregiver_name_relation').updateValueAndValidity();
     
      
      
    }
  }

  othersClicked($event:MatRadioChange){
    if ($event.value ==='Yes') {
      this.otherPersonYesClicked = true;
      this.firstFormGroup.controls.othersFormGroup.get('others_name_relation').setValidators(Validators.required);
      this.firstFormGroup.controls.othersFormGroup.get('others_name_relation').updateValueAndValidity();
     
    
    } else {
      this.otherPersonYesClicked = false;
      this.firstFormGroup.controls.othersFormGroup.get('others_name_relation').setValue('');
      this.firstFormGroup.controls.othersFormGroup.get('others_name_relation').clearValidators();
      this.firstFormGroup.controls.othersFormGroup.get('others_name_relation').updateValueAndValidity();
     
      
      
    }
  }

  submitStep1(firstFormGroup){
    
    let missed_visit;
    let phone_visit;
    let home_visit ;
if(this.firstFormGroup.get('missed_visit_date').value){
      missed_visit = this.firstFormGroup.get('missed_visit_date').value;
      
}

if(this.firstFormGroup.get('last_phone_date').value){

      phone_visit = this.firstFormGroup.get('last_phone_date').value;
     
}else{
  phone_visit = null;
}

if(this.firstFormGroup.get('home_visit_date').value){

       home_visit = this.firstFormGroup.get('home_visit_date').value;
}

      let step1Obj = {
        missed_visit_date:missed_visit,
        last_phone_date:phone_visit,
        home_visit_date:home_visit,
        seen_patient: this.firstFormGroup.get('seen_patient').value,
        seen_caregiver: this.firstFormGroup.controls.caregiverFormGroup.get('seen_caregiver').value,
        caregiver_name_relation: this.firstFormGroup.controls.caregiverFormGroup.get('caregiver_name_relation').value,
        seen_others:this.firstFormGroup.controls.othersFormGroup.get('seen_others').value,
        others_name_relation: this.firstFormGroup.controls.othersFormGroup.get('others_name_relation').value,
      
      }
    
      sessionStorage.setItem("step1Home", JSON.stringify(step1Obj));
    
      this.stepper.next();
  }


  addSymptom(){
    this.symptomArray.push(this.newSymptom);
    this.newSymptom = {};
   
  }

  changeMedRefill(value){
    if(value == "Others"){
     this.med_task_array = [];
     this.med_plan = "Others";
      this.med_refill_others = true;
      //this.med_refill_others = false;
     // this.thirdFormGroup.get('medicine_plan_other_date').setValidators(Validators.required);
      this.thirdFormGroup.get('medicine_plan_other_remark').setValidators(Validators.required);
      this.medObj = {
        // check1:"",
        // option:45,
        task_remark:"medicine refill",
        task_date:this.medicine_refill_date,
        task_status:"pending",
        tasks_uuid: this.med_tasks_uuid
      }
    }else if(value == "Sourced by self"){
      this.med_task_array = [];
      this.med_refill_others = false;
      this.med_plan = "Sourced by self";
      this.thirdFormGroup.get('medicine_plan_other_date').clearValidators();
      this.thirdFormGroup.get('medicine_plan_other_remark').clearValidators();
      this.thirdFormGroup.get('medicine_plan_other_remark').setValue('');
      //this.thirdFormGroup.get('medicine_plan_other_date').setValue('');
      this.medObj = {
        // check1:"",
        // option:45,
        task_remark:"medicine refill",
        task_date:this.medicine_refill_date,
        task_status:"pending",
        tasks_uuid: this.med_tasks_uuid
      }
    }else{
      this.med_refill_others = false;
      this.med_plan = "Clinic Consultation";
      this.thirdFormGroup.get('medicine_plan_other_date').clearValidators();
      this.thirdFormGroup.get('medicine_plan_other_remark').clearValidators();
      this.thirdFormGroup.get('medicine_plan_other_remark').setValue('');
      //this.thirdFormGroup.get('medicine_plan_other_date').setValue('');
      this.med_task_array = [];
      this.medObj = {
        // check1:"",
        // option:45,
        task_remark:"medicine refill",
        task_date:"",
        task_status:"pending",
        tasks_uuid: this.med_tasks_uuid
      }
    }
    
   }

   home_pitch_comp(event: any) {
 
    this.homeVisitObj.home_compliance_rate = event.value;
    this.rate1 = this.homeVisitObj.home_compliance_rate + "%";
    this.compRate= true;
    this.comp_reason_visible = false;
    
  }


  home_pitch_symptom(event: any) {
   
    this.homeVisitObj.symptom = event.value;
    this.rate2 = this.homeVisitObj.symptom + "%";
    this.rateSymptom = true;
    this.symp_reason_visible = false;

  }

  suspiciousClicked(){
  
    this.domainArray.push(1);
    if(this.domainArray.length == 7){
      this.domainValid = true;
    }
    this.symp_reason_visible = false;
  }
  
    hallucinatoryClicked(){
      this.domainArray.push(2);
    if(this.domainArray.length == 7){
      this.domainValid = true;
    }
      this.symp_reason_visible = false;
    }
    verbalClicked(){
      this.domainArray.push(3);
      if(this.domainArray.length == 7){
        this.domainValid = true;
      }
      this.symp_reason_visible = false;
    }

    socialClicked(){
      this.domainArray.push(4);
    if(this.domainArray.length == 7){
      this.domainValid = true;
    }
      this.symp_reason_visible = false;
    }

    selfcareClicked(){
      this.domainArray.push(5);
      if(this.domainArray.length == 7){
        this.domainValid = true;
      }
      this.symp_reason_visible = false;
    }

    
    // occupClicked(){
    //   this.domainArray.push(6);
    //   if(this.domainArray.length == 8){
    //     this.domainValid = true;
    //   }
    //   this.symp_reason_visible = false;
    // }

    sleepClicked(){
      this.domainArray.push(7);
    if(this.domainArray.length == 7){
      this.domainValid = true;
    }
      this.symp_reason_visible = false;
    }
   workClicked(){
      this.domainArray.push(8);
    if(this.domainArray.length == 7){
      this.domainValid = true;
    }
      this.symp_reason_visible = false;
    }
    onKey2(event) {
      const inputValue = event.target.value;
      if(inputValue.length > 1){
        this.rateSymptom = true;
        }else{
          this.rateSymptom = false;
        }
    }

    checkTobChange1($event:MatRadioChange){
  
      if ($event.value ==='Yes') {
      this.tobaccoYesClicked = true;
      this.secondFormGroup.controls.tobaccoFormGroup.get('tobocco_amount').setValidators(Validators.required);
      this.secondFormGroup.controls.tobaccoFormGroup.get('tobocco_amount').updateValueAndValidity();
      this.secondFormGroup.controls.tobaccoFormGroup.get('tobacco_remark').setValidators(Validators.required);
      this.secondFormGroup.controls.tobaccoFormGroup.get('tobacco_remark').updateValueAndValidity();
    
    } else {
      this.tobaccoYesClicked = false;
      this.secondFormGroup.controls.tobaccoFormGroup.get('tobocco_amount').setValue('');
      this.secondFormGroup.controls.tobaccoFormGroup.get('tobocco_amount').clearValidators();
      this.secondFormGroup.controls.tobaccoFormGroup.get('tobocco_amount').updateValueAndValidity();
      this.secondFormGroup.controls.tobaccoFormGroup.get('tobacco_remark').setValue('');
      this.secondFormGroup.controls.tobaccoFormGroup.get('tobacco_remark').clearValidators();
      this.secondFormGroup.controls.tobaccoFormGroup.get('tobacco_remark').updateValueAndValidity();
      
      
    }
  
  }
  checkTobChange2($event:MatRadioChange){
     
    if ($event.value ==='Yes') {
    this.alcoholYesClicked = true;
    this.secondFormGroup.controls.alcoholFormGroup.get('alcohol_amount').setValidators(Validators.required);
    this.secondFormGroup.controls.alcoholFormGroup.get('alcohol_amount').updateValueAndValidity();
    this.secondFormGroup.controls.alcoholFormGroup.get('alcohol_remark').setValidators(Validators.required);
    this.secondFormGroup.controls.alcoholFormGroup.get('alcohol_remark').updateValueAndValidity();
    } else {
      this.alcoholYesClicked = false;
      this.secondFormGroup.controls.alcoholFormGroup.get('alcohol_amount').setValue('');
      this.secondFormGroup.controls.alcoholFormGroup.get('alcohol_amount').clearValidators();
      this.secondFormGroup.controls.alcoholFormGroup.get('alcohol_amount').updateValueAndValidity();
      this.secondFormGroup.controls.alcoholFormGroup.get('alcohol_remark').setValue('');
      this.secondFormGroup.controls.alcoholFormGroup.get('alcohol_remark').clearValidators();
      this.secondFormGroup.controls.alcoholFormGroup.get('alcohol_remark').updateValueAndValidity();
    
  }
  
  }
  
  checkTobChange3($event:MatRadioChange){
   
  if ($event.value ==='Yes') {
    this.otherSubYesClicked = true;
    this.secondFormGroup.controls.OtherUseFormGroup.get('other_amount').setValidators(Validators.required);
    this.secondFormGroup.controls.OtherUseFormGroup.get('other_amount').updateValueAndValidity();
    this.secondFormGroup.controls.OtherUseFormGroup.get('others_remark').setValidators(Validators.required);
    this.secondFormGroup.controls.OtherUseFormGroup.get('others_remark').updateValueAndValidity();
    } else {
      this.otherSubYesClicked =false;
    this.secondFormGroup.controls.OtherUseFormGroup.get('other_amount').setValue('');
    this.secondFormGroup.controls.OtherUseFormGroup.get('other_amount').clearValidators();
    this.secondFormGroup.controls.OtherUseFormGroup.get('other_amount').updateValueAndValidity();
    this.secondFormGroup.controls.OtherUseFormGroup.get('others_remark').setValue('');
    this.secondFormGroup.controls.OtherUseFormGroup.get('others_remark').clearValidators();
    this.secondFormGroup.controls.OtherUseFormGroup.get('others_remark').updateValueAndValidity();
  
  
  }
  
  }

  submitStep2(secondFormGroup){
    this.secondFormGroup.value.symtom = this.symptomArray;
    
    let step2Obj = {
     
      symptom_rate:this.secondFormGroup.get('symptom').value,
      verbal_rate: this.secondFormGroup.get('verbal_rate').value,
      hallucinatory_rate:this.secondFormGroup.get('hallucinatory_rate').value,
      occupation_rate: this.secondFormGroup.get('occupation_rate').value,
      selfcare_rate: this.secondFormGroup.get('selfcare_rate').value,
      sleep_rate: this.secondFormGroup.get('sleep_rate').value,
      work:this.secondFormGroup.get('work').value,
      social_rate: this.secondFormGroup.get('social_rate').value,
      suspicious_rate: this.secondFormGroup.get('suspicious_rate').value,
      symtom: this.secondFormGroup.value.symtom,
      test_reason:this.secondFormGroup.get('test_reason').value,
      alcohol: this.secondFormGroup.controls.alcoholFormGroup.get('alcohol').value,
      alcohol_amount: this.secondFormGroup.controls.alcoholFormGroup.get('alcohol_amount').value,
      alcohol_remark: this.secondFormGroup.controls.alcoholFormGroup.get('alcohol_remark').value,
      tobacco: this.secondFormGroup.controls.tobaccoFormGroup.get('tobacco').value,
      tobocco_amount: this.secondFormGroup.controls.tobaccoFormGroup.get('tobocco_amount').value,
      tobacco_remark: this.secondFormGroup.controls.tobaccoFormGroup.get('tobacco_remark').value,
      others:this.secondFormGroup.controls.OtherUseFormGroup.get('others').value,
      other_amount: this.secondFormGroup.controls.OtherUseFormGroup.get('other_amount').value,
      others_remark: this.secondFormGroup.controls.OtherUseFormGroup.get('others_remark').value,
      
    }
   
   
    sessionStorage.setItem("step2Home", JSON.stringify(step2Obj));
    this.stepper.next();
  }

  onKey3(event) {
    const inputValue = event.target.value;
    if(inputValue.length > 1){
      this.compRate= true;
      }else{
        this.compRate= false;
      }
    
    
  }

  medChange1($event:MatRadioChange){
    if ($event.value ==='Yes') {
      this.medHelpYesClicked = true;
      this.thirdFormGroup.controls.medFormGroup.get('med_supervisor').setValidators(Validators.required);
      this.thirdFormGroup.controls.medFormGroup.get('med_supervisor').updateValueAndValidity();
     
      } else {
        this.medHelpYesClicked = false;
      this.thirdFormGroup.controls.medFormGroup.get('med_supervisor').setValue('');
      this.thirdFormGroup.controls.medFormGroup.get('med_supervisor').clearValidators();
      this.thirdFormGroup.controls.medFormGroup.get('med_supervisor').updateValueAndValidity();
      
      
      
      }
  }

  submitStep3(thirdFormGroup){
    this.isDisabled = true;
    let next_visit = "";
    if(this.place_array.length<1){
      next_visit = "Home";
        this.isValue = 1;
        this.place_array.push(this.isValue)
      
     }else{
        if(this.place_array[0] == 1){
      next_visit = "Home"

    }else if(this.place_array[0] == 2){
      next_visit = "PHC"

    }else if(this.place_array[0] == 3){
      next_visit = "Manochaithanya"

    }else if(this.place_array[0] == 4){
      next_visit = "Phone"

    }else{
      next_visit = this.thirdFormGroup.get('next_visit_place_other').value
    }
  }
    this.thirdFormGroup.value.next_visit_place = this.place_array;
  
    let follow_up_date;
    

    let step3Obj = {
      home_compliance_rate:this.thirdFormGroup.get('home_compliance_rate').value,
      comp_reason:this.thirdFormGroup.get('comp_reason').value,
      med_supervised: this.thirdFormGroup.controls.medFormGroup.get('med_supervised').value,
      med_supervisor:this.thirdFormGroup.controls.medFormGroup.get('med_supervisor').value,
      missed_visit_reason:this.thirdFormGroup.get('missed_visit_reason').value,
      next_visit_plan:this.thirdFormGroup.get('next_visit_plan').value,
      next_visit_place:this.place_array[0],
      next_visit_place_other:this.thirdFormGroup.get('next_visit_place_other').value,
      medicine_plan_other_remark:this.thirdFormGroup.get('medicine_plan_other_remark').value,
      medicine_plan_remark:this.thirdFormGroup.get('medicine_plan_remark').value,
      med_plan:this.med_plan
    
    }
    
   
    if(this.thirdFormGroup.get('next_visit_date').value){
      
      follow_up_date = this.thirdFormGroup.get('next_visit_date').value;
    }


    if(this.thirdFormGroup.get('medicine_plan_other_date').value != ""){
      
      this.medObj.task_date = this.thirdFormGroup.get('medicine_plan_other_date').value;
    }else{
       //for completed medicine refill task there is no next due date, so in the dashboard under completed tasks,
      //medicine refill task due date shows a date by default(like 01-01-1970)
      //this.medObj.task_date =new Date();
      this.medObj.task_date =this.medicine_refill_date;
    }
     
    this.med_task_array.push(this.medObj);
      let step1Data = sessionStorage.getItem('step1Home');
      let step2Data = sessionStorage.getItem('step2Home');
      
      //need to check next visit plan - update the patient consent column in patient table?

      //to merge the step1,step2 and step3 data into one object
      let homevisitData = {step1Data,step2Data,step3Obj};
    
      
       
        this.patientService.addNewHomeVisit(this.patient_uuid,homevisitData,follow_up_date,next_visit,this.sw_id,this.med_task_array).then(() => {
           
        
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
                this.router.navigate(['patient-details']);
               }, 5000);
                     
           
                  
                  
                }
              
              }
            ]
          }).then(res => {
            res.present();
          });
         
            
          },err => {
            console.log("No Internet Connection! Data added to the Request List");
            //loadingEl.dismiss();
           
          });
     // });

  }


  previous1(){
  
    this.router.navigate(['patient-details']);

}

  ratingArray: rating_options[] = [
    {value: '1', viewValue_rating: '1'},
    {value: '2', viewValue_rating: '2'},
    {value: '3', viewValue_rating: '3'},
    {value: '4', viewValue_rating: '4'},
    {value: '5', viewValue_rating: '5'}
   
  ];
  tobaccooptionsArray: tobacco_options[] = [
    {value: '1', viewValue: 'Yes'},
    {value: '2', viewValue: 'No'}
   
  ];
  Amount: amount_options[] = [
    {value: '1', viewValue_amount: 'Same level as last time'},
    {value: '2', viewValue_amount: 'Reduced amount'},
    {value: '3', viewValue_amount: 'Abstinent'},
    {value: '4', viewValue_amount: 'Increased use'}
    
  ]
  Medicine: med_options[] = [
    {value: '1', viewValue_amount: 'Clinic Consultation'},
    {value: '2', viewValue_amount: 'Sourced by self'},
    {value: '3', viewValue_amount: 'Others'}
   
    
  ]

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
}
