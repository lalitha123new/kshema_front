import { Component, OnInit } from '@angular/core';
import {MatStepperModule} from '@angular/material/stepper';
import {FormBuilder,FormControl,FormGroupDirective,NgForm, FormGroup, Validators} from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import {Location} from '@angular/common';
import {  MatStepper} from '@angular/material/stepper';
import { Router } from '@angular/router';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { MatRadioChange } from '@angular/material/radio';
import { ModalController } from '@ionic/angular';
import { PatientService } from 'src/app/services/patient.service';
import { LoadingController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { OfflineManagerService } from '../../services/offline-manager.service';

interface tobacco_options{
  value: string;
  viewValue: string;
}
interface med_options{
  value: string;
  viewValue_amount: string;
}
@Component({
  selector: 'app-phone-call',
  templateUrl: './phone-call.page.html',
  styleUrls: ['./phone-call.page.scss'],
})

export class PhoneCallPage implements OnInit {
 

  constructor(
    private router: Router,
    private dialogModel: MatDialog,
    public modalController : ModalController,
    private patientService: PatientService,
    private loadingCtrl: LoadingController,
    private alertController: AlertController,
    private offlineManager : OfflineManagerService) { }

    isValue = 4;
    others_selected = false;
    med_refill_others =  false;
    phoneCallForm : any;
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
  rate1 = "Unable to rate";
  rate2 = "Unable to rate";
  symp_reason_visible = true;
  comp_reason_visible = true;
  compRate = false;
  rateSymptom = false;
  missed_phc_date;
  med_plan;

  phoneObj = {
    missed_visit_date:'',
    follow_up_date:'',
    patient:'',
    caregiver:'',
    caregiver_relation:'',
    others:'',
    others_relation:'',
    med_supervised:'',
    med_supervised_yes:'',
    compliance_rate:'',
    comp_reason:'',
    symptom_rate:'',
    test_reason:'',
    reason_missed_visit:'',
    plan_support_visit:'',
    next_visit_place:'',
    next_visit_place_other:'',
    next_visit_date:'',
    medicine_plan:'',
    medicine_plan_other_date:'',
    medicine_plan_other_remark:'',
    medicine_plan_remark:''
  
  }

  dateToday;
  dateMissed;
  follow_date;
  med_task_array:any = [];
  medObj:any = {};
  med_tasks_uuid;
  medFormGroup:any;
  caregiverFormGroup:any;
  othersFormGroup:any;
  caregiverYesClicked:Boolean = false;
  otherPersonYesClicked:Boolean = false;
  medHelpYesClicked:Boolean = false;
  medDisplay = true;
  medicine_refill_date;
  isDisabled = false;

  ngOnInit() {

    this.phoneCallForm = new FormGroup({
      missed_visit_date: new FormControl(this.phoneObj.missed_visit_date,[]),
      follow_up_date: new FormControl(this.phoneObj.follow_up_date,[Validators.required]),
      patient: new FormControl(this.phoneObj.patient,[Validators.required]),
      caregiverFormGroup:new FormGroup({
      caregiver: new FormControl(this.phoneObj.patient,[Validators.required]),
      caregiver_relation: new FormControl(this.phoneObj.caregiver_relation,[]),
      }),
      othersFormGroup:new FormGroup({
      others: new FormControl(this.phoneObj.others,[Validators.required]),
      others_relation: new FormControl(this.phoneObj.others_relation,[]),
      }),
      medFormGroup:new FormGroup({
      med_supervised: new FormControl(this.phoneObj.med_supervised,[Validators.required]),
      med_supervised_yes: new FormControl(this.phoneObj.med_supervised_yes,[]),
      }),
      compliance_rate: new FormControl(this.phoneObj.compliance_rate,[]),
      comp_reason:new FormControl(this.phoneObj.comp_reason,[]),
      symptom_rate: new FormControl(this.phoneObj.symptom_rate,[]),
      test_reason:new FormControl(this.phoneObj.test_reason,[]),
      reason_missed_visit: new FormControl(this.phoneObj.reason_missed_visit,[]),
      plan_support_visit: new FormControl(this.phoneObj.plan_support_visit,[Validators.required]),
      next_visit_place: new FormControl(this.phoneObj.next_visit_place,[]),
      next_visit_place_other: new FormControl(this.phoneObj.next_visit_place_other,[]),
      next_visit_date:  new FormControl(this.phoneObj.next_visit_date,[Validators.required]),
      medicine_plan:new FormControl(this.phoneObj.medicine_plan,[Validators.required]),
      medicine_plan_other_date:new FormControl(this.phoneObj.medicine_plan_other_date,[]),
      medicine_plan_other_remark:new FormControl(this.phoneObj.medicine_plan_other_remark,[]),
      medicine_plan_remark:new FormControl(this.phoneObj.medicine_plan_remark,[Validators.required]),
     
     
  })
  }

  checkMedChange1($event:MatRadioChange){
    if ($event.value ==='Yes') {
      this.medHelpYesClicked = true;
      this.phoneCallForm.controls.medFormGroup.get('med_supervised_yes').setValidators(Validators.required);
      this.phoneCallForm.controls.medFormGroup.get('med_supervised_yes').updateValueAndValidity();
     
      } else {
        this.medHelpYesClicked = false;
      this.phoneCallForm.controls.medFormGroup.get('med_supervised_yes').setValue('');
      this.phoneCallForm.controls.medFormGroup.get('med_supervised_yes').clearValidators();
      this.phoneCallForm.controls.medFormGroup.get('med_supervised_yes').updateValueAndValidity();
     
      
      
      }
  }
  caregiverClicked($event:MatRadioChange){
    if ($event.value ==='Yes') {
      this.caregiverYesClicked = true;
      this.phoneCallForm.controls.caregiverFormGroup.get('caregiver_relation').setValidators(Validators.required);
      this.phoneCallForm.controls.caregiverFormGroup.get('caregiver_relation').updateValueAndValidity();
     
      } else {
        this.caregiverYesClicked = false;
      this.phoneCallForm.controls.caregiverFormGroup.get('caregiver_relation').setValue('');
      this.phoneCallForm.controls.caregiverFormGroup.get('caregiver_relation').clearValidators();
      this.phoneCallForm.controls.caregiverFormGroup.get('caregiver_relation').updateValueAndValidity();
     
      
      
      }
  }
  othersClicked($event:MatRadioChange){
    if ($event.value ==='Yes') {
    this.otherPersonYesClicked = true;
      this.phoneCallForm.controls.othersFormGroup.get('others_relation').setValidators(Validators.required);
      this.phoneCallForm.controls.othersFormGroup.get('others_relation').updateValueAndValidity();
     
      } else {
        this.otherPersonYesClicked = false;
      this.phoneCallForm.controls.othersFormGroup.get('others_relation').setValue('');
      this.phoneCallForm.controls.othersFormGroup.get('others_relation').clearValidators();
      this.phoneCallForm.controls.othersFormGroup.get('others_relation').updateValueAndValidity();
     
      
      
      }
  }
  home(){
    this.router.navigate(['dashboard']);
  }
  
ionViewWillEnter() {
  this.user_name = sessionStorage.getItem("user_name");
  this.rate1 = "Unable to rate";
  this.rate2 = "Unable to rate";
  this.phoneObj.symptom_rate='';
  this.phoneObj.compliance_rate='';
  this.isDisabled = false;
  this.med_plan = "";
  this.user_name = sessionStorage.getItem("user_name");
  this.sw_id1 = sessionStorage.getItem("sw_id");
  this.sw_id = parseInt(this.sw_id1);
  this.patient_id =  sessionStorage.getItem('patient_id');
  this.patient_uuid = sessionStorage.getItem('patient_uuid');
  
  this.getPatient();
  this.getPreviousVisitDetails();
  this.getMedTask();
  this.phoneCallForm = new FormGroup({
    missed_visit_date: new FormControl(this.phoneObj.missed_visit_date,[]),
    follow_up_date: new FormControl(this.phoneObj.follow_up_date,[Validators.required]),
    patient: new FormControl(this.phoneObj.patient,[Validators.required]),
    caregiverFormGroup:new FormGroup({
    caregiver: new FormControl(this.phoneObj.patient,[Validators.required]),
    caregiver_relation: new FormControl(this.phoneObj.caregiver_relation,[]),
    }),
    othersFormGroup:new FormGroup({
    others: new FormControl(this.phoneObj.others,[Validators.required]),
    others_relation: new FormControl(this.phoneObj.others_relation,[]),
    }),
    medFormGroup:new FormGroup({
    med_supervised: new FormControl(this.phoneObj.med_supervised,[Validators.required]),
    med_supervised_yes: new FormControl(this.phoneObj.med_supervised_yes,[]),
    }),
    compliance_rate: new FormControl(this.phoneObj.compliance_rate,[]),
    comp_reason:new FormControl(this.phoneObj.comp_reason,[]),
    symptom_rate: new FormControl(this.phoneObj.symptom_rate,[]),
    test_reason:new FormControl(this.phoneObj.test_reason,[]),
    reason_missed_visit: new FormControl(this.phoneObj.reason_missed_visit,[]),
    plan_support_visit: new FormControl(this.phoneObj.plan_support_visit,[Validators.required]),
    next_visit_place: new FormControl(this.phoneObj.next_visit_place,[]),
    next_visit_place_other: new FormControl(this.phoneObj.next_visit_place_other,[]),
    next_visit_date:  new FormControl(this.phoneObj.next_visit_date,[Validators.required]),
    medicine_plan:new FormControl(this.phoneObj.medicine_plan,[Validators.required]),
    medicine_plan_other_date:new FormControl(this.phoneObj.medicine_plan_other_date,[]),
    medicine_plan_other_remark:new FormControl(this.phoneObj.medicine_plan_other_remark,[]),
    medicine_plan_remark:new FormControl(this.phoneObj.medicine_plan_remark,[Validators.required]),
   
   
})
this.phoneCallForm.get('follow_up_date').setValue(new Date());
  
 
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
    if(this.demo.taluka_psw_incharge){
      this.psw_incharge = this.demo.taluka_psw_incharge;
    }else{
        this.psw_incharge = this.user_name;
    }


}


//to get the missed phc consultation date
async getPreviousVisitDetails(){
  
  let prev_visit_array_first :any;
  let test = await this.patientService.getPreviousVisitPhone(this.patient_uuid).then(result2 => {
   
    prev_visit_array_first=result2;

 });
 
 
    let array1 = JSON.parse(prev_visit_array_first[0].visit_details);
    let array2:any;
    if(array1.clinicalData){
      if(typeof array1.consentObj1 != 'object'){
      array2 = JSON.parse(array1.consentObj1);
      }else{
        array2 = array1.consentObj1;
      }

      
      if(array2.next_visit_place == "PHC"){
   
        let missed_phc_date1 = new Date(array2.follow_up_date_new);
          let date = ("0" + missed_phc_date1.getDate()).slice(-2);
          let month = ("0" + (missed_phc_date1.getMonth() + 1)).slice(-2);
          let year =missed_phc_date1.getFullYear();
          this.missed_phc_date = date + "-" + month + "-" + year;
          this.phoneCallForm.get('missed_visit_date').setValue(missed_phc_date1);
          
        
        
      }else if(prev_visit_array_first[0].visit_type == "PHC"){
     
        let missed_phc_date1 = new Date(prev_visit_array_first[0].followup_date);
      
          let date = ("0" + missed_phc_date1.getDate()).slice(-2);
          let month = ("0" + (missed_phc_date1.getMonth() + 1)).slice(-2);
          let year =missed_phc_date1.getFullYear();
          this.missed_phc_date = date + "-" + month + "-" + year;
          this.phoneCallForm.get('missed_visit_date').setValue(missed_phc_date1);
    }
  }else{
  
    let missed_phc_date1 = new Date(prev_visit_array_first[0].followup_date);
      let date = ("0" + missed_phc_date1.getDate()).slice(-2);
      let month = ("0" + (missed_phc_date1.getMonth() + 1)).slice(-2);
      let year =missed_phc_date1.getFullYear();
      this.missed_phc_date = date + "-" + month + "-" + year;
      this.phoneCallForm.get('missed_visit_date').setValue(missed_phc_date1);
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
  this.phoneCallForm.get('medicine_plan_other_date').setValue(this.medicine_refill_date);
  

}else{
  this.medDisplay = false;
  this.medicine_refill_date = "";
}
 
}

redirectTo(x){
  if(x==1){
    this.router.navigate(['history']);
  }else{
    this.router.navigate(['edit-patient']);
  }
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
    this.phoneCallForm.get('next_visit_place_other').clearValidators();
    this.phoneCallForm.get('next_visit_place_other').setValue('');
  }else if(x==2){
    this.place_array = [];
    this.isValue = 2;
    this.place_array.push(this.isValue);
    this.others_selected =  false;
    this.phoneCallForm.get('next_visit_place_other').clearValidators();
    this.phoneCallForm.get('next_visit_place_other').setValue('');
    
  }else if(x==3){
    this.place_array = [];
    this.isValue = 3;
    this.place_array.push(this.isValue);
    this.others_selected =  false;
    this.phoneCallForm.get('next_visit_place_other').clearValidators();
    this.phoneCallForm.get('next_visit_place_other').setValue('');
  }else if(x==4){
    this.place_array = [];
    this.isValue = 4;
    this.place_array.push(this.isValue);
    this.others_selected =  false;
    this.phoneCallForm.get('next_visit_place_other').clearValidators();
    this.phoneCallForm.get('next_visit_place_other').setValue('');
  }else{
    this.place_array = [];
    this.isValue = 5;
    this.place_array.push(this.isValue);
    this.others_selected =  true;
    this.phoneCallForm.get('next_visit_place_other').setValidators(Validators.required);
  }
 
 }
 onKey1(event) {
 
  const inputValue = event.target.value;
  if(inputValue.length > 1){
    this.compRate= true;
    }else{
      this.compRate= false;
    }
}
 onKey2(event) {
  
  const inputValue = event.target.value;
  if(inputValue.length > 1){
    this.rateSymptom = true;
    }else{
      this.rateSymptom = false;
    }
}

 changeMedRefill(value){
  if(value == "Others"){
    this.med_plan = "Others"
   this.med_task_array = [];
    this.med_refill_others = true;
   // this.phoneCallForm.get('medicine_plan_other_date').setValidators(Validators.required);
    this.phoneCallForm.get('medicine_plan_other_remark').setValidators(Validators.required);
    this.medObj = {
      task_remark:"medicine refill",
      task_date:"",
      task_status:"pending",
      tasks_uuid: this.med_tasks_uuid
    }
  }else if(value == "Sourced by self"){
    this.med_plan = "Sourced by self"
    this.med_task_array = [];
    this.med_refill_others = false;
    this.phoneCallForm.get('medicine_plan_other_date').clearValidators();
    this.phoneCallForm.get('medicine_plan_other_remark').clearValidators();
    this.phoneCallForm.get('medicine_plan_other_remark').setValue('');
   // this.phoneCallForm.get('medicine_plan_other_date').setValue('');
    this.medObj = {
      task_remark:"medicine refill",
      task_date:this.medicine_refill_date,
      task_status:"pending",
      tasks_uuid: this.med_tasks_uuid
    }
  }else{
    this.med_refill_others = false;
    this.med_plan = "Clinic Consultation"
    this.phoneCallForm.get('medicine_plan_other_date').clearValidators();
    this.phoneCallForm.get('medicine_plan_other_remark').clearValidators();
    this.phoneCallForm.get('medicine_plan_other_remark').setValue('');
    //this.phoneCallForm.get('medicine_plan_other_date').setValue('');
    this.med_task_array = [];
    this.medObj = {
      task_remark:"medicine refill",
      task_date:this.medicine_refill_date,
      task_status:"pending",
      tasks_uuid: this.med_tasks_uuid
    }
  }
  
 }
  
previous(){
  
  this.router.navigate(['patient-details']);
}

pitch_comp(event: any) {
  
  this.phoneObj.compliance_rate = event.value;
  this.rate1 =  this.phoneObj.compliance_rate +"%";
  this.compRate = true;
  this.comp_reason_visible = false;
}

pitch_symptom(event: any){
  this.phoneObj.symptom_rate = event.value;
  this.rate2 =  this.phoneObj.symptom_rate +"%" ;
  this.rateSymptom = true;
  this.symp_reason_visible = false;
}

   submit_phone_call(phoneCallForm){
    this.isDisabled = true;
    let next_visit = "";
    if(this.place_array.length<1){
      next_visit = "Phone";
      this.isValue = 4;
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
     
      next_visit = this.phoneCallForm.get('next_visit_place_other').value
    }
  }
   
     let follow_visit;
     let missed_visit;
     
     if(this.phoneCallForm.get('follow_up_date').value){
    
    follow_visit = this.phoneCallForm.get('follow_up_date').value;
     }

     if(this.phoneCallForm.get('missed_visit_date').value){
    
      missed_visit = this.phoneCallForm.get('missed_visit_date').value;
     }
   
    if(this.phoneCallForm.get('medicine_plan_other_date').value != ""){
      
      this.medObj.task_date = this.phoneCallForm.get('medicine_plan_other_date').value;
    }else{
      //for completed medicine refill task there is no next due date, so in the dashboard under completed tasks,
      //medicine refill task due date shows a date by default(like 01-01-1970)
      //this.medObj.task_date =new Date();
      this.medObj.task_date = this.medicine_refill_date;
    }
     
    this.med_task_array.push(this.medObj);
    
     let phonecallData = {
      missed_visit_date: missed_visit,
      follow_up_date:  follow_visit,
      compliance_rate: this.phoneCallForm.get('compliance_rate').value,
      comp_reason:this.phoneCallForm.get('comp_reason').value,
      med_supervised: this.phoneCallForm.controls.medFormGroup.get('med_supervised').value,
      med_supervised_yes:this.phoneCallForm.controls.medFormGroup.get('med_supervised_yes').value,
      patient: this.phoneCallForm.get('patient').value,
      caregiver: this.phoneCallForm.controls.caregiverFormGroup.get('caregiver').value,
      caregiver_relation: this.phoneCallForm.controls.caregiverFormGroup.get('caregiver_relation').value,
      others:this.phoneCallForm.controls.othersFormGroup.get('others').value,
      others_relation: this.phoneCallForm.controls.othersFormGroup.get('others_relation').value,
      symptom_rate: this.phoneCallForm.get('symptom_rate').value,
      test_reason:this.phoneCallForm.get('test_reason').value,
      plan_support_visit: this.phoneCallForm.get('plan_support_visit').value,
      reason_missed_visit: this.phoneCallForm.get('reason_missed_visit').value,
      next_visit_place: this.place_array[0],
      next_visit_place_other:this.phoneCallForm.get('next_visit_place_other').value,
      medicine_plan_other_remark:this.phoneCallForm.get('medicine_plan_other_remark').value,
      medicine_plan_remark:this.phoneCallForm.get('medicine_plan_remark').value,
      med_plan:this.med_plan
     }

     
      let follow_up_date = this.phoneCallForm.get('next_visit_date').value;
     
        this.patientService.addNewPhoneCall(this.patient_uuid,phonecallData,follow_up_date,next_visit,this.sw_id,this.med_task_array).then(() => {
           
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
          
           
          });
     
  }
    
  

  tobaccooptionsArray: tobacco_options[] = [
    {value: '1', viewValue: 'Yes'},
    {value: '2', viewValue: 'No'}
   
  ];

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
