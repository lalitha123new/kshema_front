import { Component, OnInit } from '@angular/core';
import {FormBuilder,FormControl,FormGroupDirective,NgForm, FormGroup, Validators,ValidatorFn} from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PatientService } from 'src/app/services/patient.service';
import { Router } from '@angular/router';
import { MatRadioChange } from '@angular/material/radio';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

import { LoadingController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { OfflineManagerService } from '../../services/offline-manager.service';

interface tobacco_options{
  value: string;
  viewValue: string;
  checked:boolean
}

@Component({
  selector: 'app-assessment-needs',
  templateUrl: './assessment-needs.page.html',
  styleUrls: ['./assessment-needs.page.scss'],
})
export class AssessmentNeedsPage implements OnInit {
  dataReturned: any;
 
  patient_id;
  patient_uuid;
  kshema_id;
  user_name;
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

  constructor(private _formBuilder: FormBuilder,private router: Router,
    private patientService: PatientService,private loadingCtrl: LoadingController,
    public alertController: AlertController,private offlineManager : OfflineManagerService) { }

  assessmentFormGroup: any;
  skillFormGroup:any;
  skillYesSelected: Boolean = false;
  jobFormGroup:any;
  jobYesSelected: Boolean = false;
  interestActFormGroup:any;
  interestActYesSelected: Boolean = false;
  communityFormGroup:any;
  communityYesSelected: Boolean = false;
  dailyFormGroup:any;
  houseFormGroup:any;
  financeFormGroup:any;
  otherHelpFormGroup:any;

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

  
  

  ngOnInit() {

    this.assessmentFormGroup = this._formBuilder.group({
      description:new FormControl(this.patObject.description,[]),
      skillFormGroup:new FormGroup({
      skill:new FormControl(this.patObject.skill,[] ),
      skill_yes:new FormControl(this.patObject.skill_yes),
    }),
    jobFormGroup:new FormGroup({
      job:new FormControl(this.patObject.job,[]),
      job_yes:new FormControl(this.patObject.job_yes),
    }),
    interestActFormGroup:new FormGroup({
      interest_act:new FormControl(this.patObject.interest_act, []),
      interest_act_yes:new FormControl(this.patObject.interest_act_yes),
    }),
    communityFormGroup:new FormGroup({
      community:new FormControl(this.patObject.community, []),
      community_yes:new FormControl(this.patObject.community_yes),
    }),
  
    dailyFormGroup:new FormGroup({
      daily:new FormControl(this.patObject.daily, []),
      daily_yes:new FormControl(this.patObject.daily_yes),
    }),
    houseFormGroup:new FormGroup({
      house:new FormControl(this.patObject.house, []),
      house_yes:new FormControl(this.patObject.house_yes),
    }),
    financeFormGroup:new FormGroup({
      finance:new FormControl(this.patObject.finance, []),
      finance_yes:new FormControl(this.patObject.finance_yes),
    }),
    otherHelpFormGroup:new FormGroup({
      other_help:new FormControl(this.patObject.other_help, []),
      other_help_yes:new FormControl(this.patObject.other_help_yes),
    }),
    })
  }


  ionViewWillEnter() {

    this.user_name = sessionStorage.getItem("user_name");
    this.patient_id =  sessionStorage.getItem('patient_id');
    this.patient_uuid =  sessionStorage.getItem('patient_uuid');
    this.getPatientAssessment();
  
  }

  getPatientAssessment(){

    this.patientService.fetchPatient(this.patient_uuid).then((res) => {

      this.kshema_id = res[0].kshema_id;
      this.name = res[0].name;
      this.demo = JSON.parse(res[0].demographic_info);
    
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
    
    let assessData = JSON.parse(res[0].needs_assessment);
    
    this.assessmentFormGroup.get('description').setValue(assessData.add_help);
    if(assessData.skill == "Yes"){
      this.tobaccooptionsArray1[0].checked = true;
      this.assessmentFormGroup.controls.skillFormGroup.get('skill').setValue(assessData.skill);
      this.assessmentFormGroup.controls.skillFormGroup.get('skill_yes').setValue(assessData.skill_yes);
    }else if(assessData.skill == "No"){
      this.tobaccooptionsArray1[1].checked = true;
      this.assessmentFormGroup.controls.skillFormGroup.get('skill').setValue(assessData.skill);
      this.assessmentFormGroup.controls.skillFormGroup.get('skill_yes').setValue(assessData.skill_yes);
    }else{
      this.tobaccooptionsArray1[0].checked = false;
      this.tobaccooptionsArray1[1].checked = false;
    }

    if(assessData.job == "Yes"){
      this.tobaccooptionsArray2[0].checked = true;
      this.assessmentFormGroup.controls.jobFormGroup.get('job').setValue(assessData.job);
      this.assessmentFormGroup.controls.jobFormGroup.get('job_yes').setValue(assessData.job_yes);
    }else if(assessData.job == "No"){
      this.tobaccooptionsArray2[1].checked = true;
      this.assessmentFormGroup.controls.jobFormGroup.get('job').setValue(assessData.job);
      this.assessmentFormGroup.controls.jobFormGroup.get('job_yes').setValue(assessData.job_yes);
    }else{
      this.tobaccooptionsArray2[0].checked = false;
      this.tobaccooptionsArray2[1].checked = false;
    }

    if(assessData.interest_act == "Yes"){
    
      this.tobaccooptionsArray3[0].checked = true;
      this.assessmentFormGroup.controls.interestActFormGroup.get('interest_act').setValue(assessData.interest_act);
      this.assessmentFormGroup.controls.interestActFormGroup.get('interest_act_yes').setValue(assessData.interest_act_yes);
    }else if(assessData.interest_act == "No"){
      this.tobaccooptionsArray3[1].checked = true;
      this.assessmentFormGroup.controls.interestActFormGroup.get('interest_act').setValue(assessData.interest_act);
      this.assessmentFormGroup.controls.interestActFormGroup.get('interest_act_yes').setValue(assessData.interest_act_yes);
    }else{
      this.tobaccooptionsArray3[0].checked = false;
      this.tobaccooptionsArray3[1].checked = false;
    }
    if(assessData.community == "Yes"){
      this.tobaccooptionsArray4[0].checked = true;
      this.assessmentFormGroup.controls.communityFormGroup.get('community').setValue(assessData.community);
      this.assessmentFormGroup.controls.communityFormGroup.get('community_yes').setValue(assessData.community_yes);
    }else if(assessData.community == "No"){
      this.tobaccooptionsArray4[1].checked = true;
      this.assessmentFormGroup.controls.communityFormGroup.get('community').setValue(assessData.community);
      this.assessmentFormGroup.controls.communityFormGroup.get('community_yes').setValue(assessData.community_yes);
    }else{
      this.tobaccooptionsArray4[0].checked = false;
      this.tobaccooptionsArray4[1].checked = false;
    }

    if(assessData.daily == "Yes"){
      this.tobaccooptionsArray5[0].checked = true;
      this.assessmentFormGroup.controls.dailyFormGroup.get('daily').setValue(assessData.daily);
      this.assessmentFormGroup.controls.dailyFormGroup.get('daily_yes').setValue(assessData.daily_yes);
    }else if(assessData.daily == "No"){
      this.tobaccooptionsArray5[1].checked = true;
      this.assessmentFormGroup.controls.dailyFormGroup.get('daily').setValue(assessData.daily);
      this.assessmentFormGroup.controls.dailyFormGroup.get('daily_yes').setValue(assessData.daily_yes);
    }else{
      this.tobaccooptionsArray5[0].checked = false;
      this.tobaccooptionsArray5[1].checked = false;
    }

    if(assessData.house == "Yes"){
      this.tobaccooptionsArray6[0].checked = true;
      this.assessmentFormGroup.controls.houseFormGroup.get('house').setValue(assessData.house);
      this.assessmentFormGroup.controls.houseFormGroup.get('house_yes').setValue(assessData.house_yes);
    }else if(assessData.house == "No"){
      this.tobaccooptionsArray6[1].checked = true;
      this.assessmentFormGroup.controls.houseFormGroup.get('house').setValue(assessData.house);
      this.assessmentFormGroup.controls.houseFormGroup.get('house_yes').setValue(assessData.house_yes);
    }else{
      this.tobaccooptionsArray6[0].checked = false;
      this.tobaccooptionsArray6[1].checked = false;
    }

    if(assessData.finance == "Yes"){
      this.tobaccooptionsArray7[0].checked = true;
      this.assessmentFormGroup.controls.financeFormGroup.get('finance').setValue(assessData.finance);
      this.assessmentFormGroup.controls.financeFormGroup.get('finance_yes').setValue(assessData.finance_yes);
    }else if(assessData.finance == "No"){
      this.tobaccooptionsArray7[1].checked = true;
      this.assessmentFormGroup.controls.financeFormGroup.get('finance').setValue(assessData.finance);
      this.assessmentFormGroup.controls.financeFormGroup.get('finance_yes').setValue(assessData.finance_yes);
    }else{
      this.tobaccooptionsArray7[0].checked = false;
      this.tobaccooptionsArray7[1].checked = false;
    }

    if(assessData.other_help == "Yes"){
      this.tobaccooptionsArray8[0].checked = true;
      this.assessmentFormGroup.controls.otherHelpFormGroup.get('other_help').setValue(assessData.other_help);
      this.assessmentFormGroup.controls.otherHelpFormGroup.get('other_help_yes').setValue(assessData.other_help_yes);
    }else if(assessData.other_help == "No"){
      this.tobaccooptionsArray8[1].checked = true;
      this.assessmentFormGroup.controls.otherHelpFormGroup.get('other_help').setValue(assessData.other_help);
      this.assessmentFormGroup.controls.otherHelpFormGroup.get('other_help_yes').setValue(assessData.other_help_yes);
    }else{
      this.tobaccooptionsArray8[0].checked = false;
      this.tobaccooptionsArray8[1].checked = false;
    }
    
  
  },err => {
    console.log(err);
  
  });
  }


redirectTo(x){
  if(x==1){
    this.router.navigate(['history']);
  }else{
    this.router.navigate(['edit-patient']);
  }
}


  home(){
    
    this.router.navigate(['dashboard']);
  }


  logout(){
    this.router.navigate(['']);
  }


  previous(){
   
    this.router.navigate(['patient-details']);
  }


  submitAssessment(assessmentFormGroup){
   
    let thirdObj = {
    
      add_help:this.assessmentFormGroup.get('description').value,
      skill:this.assessmentFormGroup.controls.skillFormGroup.get('skill').value,
      skill_yes:this.assessmentFormGroup.controls.skillFormGroup.get('skill_yes').value,
      job:this.assessmentFormGroup.controls.jobFormGroup.get('job').value,
      job_yes:this.assessmentFormGroup.controls.jobFormGroup.get('job_yes').value,
      interest_act:this.assessmentFormGroup.controls.interestActFormGroup.get('interest_act').value,
      interest_act_yes:this.assessmentFormGroup.controls.interestActFormGroup.get('interest_act_yes').value,
      community:this.assessmentFormGroup.controls.communityFormGroup.get('community').value,
      community_yes:this.assessmentFormGroup.controls.communityFormGroup.get('community_yes').value,
      daily:this.assessmentFormGroup.controls.dailyFormGroup.get('daily').value,
      daily_yes:this.assessmentFormGroup.controls.dailyFormGroup.get('daily_yes').value,
      house:this.assessmentFormGroup.controls.houseFormGroup.get('house').value,
      house_yes:this.assessmentFormGroup.controls.houseFormGroup.get('house_yes').value,
      finance:this.assessmentFormGroup.controls.financeFormGroup.get('finance').value,
      finance_yes:this.assessmentFormGroup.controls.financeFormGroup.get('finance_yes').value,
      other_help:this.assessmentFormGroup.controls.otherHelpFormGroup.get('other_help').value,
      other_help_yes:this.assessmentFormGroup.controls.otherHelpFormGroup.get('other_help_yes').value,
    

    }
   
      this.patientService.updateAssessment(this.patient_uuid,thirdObj).then(() => {
         
       
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
           
             this.offlineManager.checkForEvents().subscribe();
             //this.router.navigate(['patient-details']);
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


 

  
  tobaccooptionsArray1: tobacco_options[] = [
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
  
  checkSkillChange($event:MatRadioChange){
    if ($event.value ==='Yes') {
      this.skillYesSelected = true;
     this.assessmentFormGroup.controls.skillFormGroup.get('skill_yes').setValidators(Validators.required);
     this.assessmentFormGroup.controls.skillFormGroup.get('skill_yes').updateValueAndValidity();
    } else {
      this.skillYesSelected = false;
      this.assessmentFormGroup.controls.skillFormGroup.get('skill_yes').setValue('');
      this.assessmentFormGroup.controls.skillFormGroup.get('skill_yes').clearValidators();
      this.assessmentFormGroup.controls.skillFormGroup.get('skill_yes').updateValueAndValidity();
      
    }

  }
  checkJobChange($event:MatRadioChange){
    if ($event.value ==='Yes') {
      this.jobYesSelected = true;
     this.assessmentFormGroup.controls.jobFormGroup.get('job_yes').setValidators(Validators.required);
     this.assessmentFormGroup.controls.jobFormGroup.get('job_yes').updateValueAndValidity();
    } else {
      this.jobYesSelected = false;
      this.assessmentFormGroup.controls.jobFormGroup.get('job_yes').setValue('');
      this.assessmentFormGroup.controls.jobFormGroup.get('job_yes').clearValidators();
      this.assessmentFormGroup.controls.jobFormGroup.get('job_yes').updateValueAndValidity();
      
    }

  }

  checkInterestActChange($event:MatRadioChange){
    if ($event.value ==='Yes') {
      this.interestActYesSelected = true;
     this.assessmentFormGroup.controls.interestActFormGroup.get('interest_act_yes').setValidators(Validators.required);
     this.assessmentFormGroup.controls.interestActFormGroup.get('interest_act_yes').updateValueAndValidity();
    } else {
      this.interestActYesSelected = false;
      this.assessmentFormGroup.controls.interestActFormGroup.get('interest_act_yes').setValue('');
      this.assessmentFormGroup.controls.interestActFormGroup.get('interest_act_yes').clearValidators();
      this.assessmentFormGroup.controls.interestActFormGroup.get('interest_act_yes').updateValueAndValidity();
      
    }

  }

  checkCommunityChange($event:MatRadioChange){
    if ($event.value ==='Yes') {
      this.communityYesSelected = true;
     this.assessmentFormGroup.controls.communityFormGroup.get('community_yes').setValidators(Validators.required);
     this.assessmentFormGroup.controls.communityFormGroup.get('community_yes').updateValueAndValidity();
    } else {
      this.communityYesSelected = false;
      this.assessmentFormGroup.controls.communityFormGroup.get('community_yes').setValue('');
      this.assessmentFormGroup.controls.communityFormGroup.get('community_yes').clearValidators();
      this.assessmentFormGroup.controls.communityFormGroup.get('community_yes').updateValueAndValidity();
      
    }

  }

  checkDailyChange($event:MatRadioChange){
    if ($event.value ==='Yes') {
     // this.communityYesSelected = true;
     this.assessmentFormGroup.controls.dailyFormGroup.get('daily_yes').setValidators(Validators.required);
     this.assessmentFormGroup.controls.dailyFormGroup.get('daily_yes').updateValueAndValidity();
    } else {
     // this.communityYesSelected = false;
     this.assessmentFormGroup.controls.dailyFormGroup.get('daily_yes').setValue('');
      this.assessmentFormGroup.controls.dailyFormGroup.get('daily_yes').clearValidators();
      this.assessmentFormGroup.controls.dailyFormGroup.get('daily_yes').updateValueAndValidity();
      
    }

  }

  checkHouseChange($event:MatRadioChange){
    if ($event.value ==='Yes') {
     // this.communityYesSelected = true;
     this.assessmentFormGroup.controls.houseFormGroup.get('house_yes').setValidators(Validators.required);
     this.assessmentFormGroup.controls.houseFormGroup.get('house_yes').updateValueAndValidity();
    } else {
     // this.communityYesSelected = false;
     this.assessmentFormGroup.controls.houseFormGroup.get('house_yes').setValue('');
      this.assessmentFormGroup.controls.houseFormGroup.get('house_yes').clearValidators();
      this.assessmentFormGroup.controls.houseFormGroup.get('house_yes').updateValueAndValidity();
      
    }

  }

  checkFinanceChange($event:MatRadioChange){
    if ($event.value ==='Yes') {
     // this.communityYesSelected = true;
     this.assessmentFormGroup.controls.financeFormGroup.get('finance_yes').setValidators(Validators.required);
     this.assessmentFormGroup.controls.financeFormGroup.get('finance_yes').updateValueAndValidity();
    } else {
     // this.communityYesSelected = false;
     this.assessmentFormGroup.controls.financeFormGroup.get('finance_yes').setValue('');
      this.assessmentFormGroup.controls.financeFormGroup.get('finance_yes').clearValidators();
      this.assessmentFormGroup.controls.financeFormGroup.get('finance_yes').updateValueAndValidity();
      
    }

  }
  checkOtherChange($event:MatRadioChange){
    if ($event.value ==='Yes') {
     // this.communityYesSelected = true;
     this.assessmentFormGroup.controls.otherHelpFormGroup.get('other_help_yes').setValidators(Validators.required);
     this.assessmentFormGroup.controls.otherHelpFormGroup.get('other_help_yes').updateValueAndValidity();
    } else {
     // this.communityYesSelected = false;
     this.assessmentFormGroup.controls.otherHelpFormGroup.get('other_help_yes').setValue('');
      this.assessmentFormGroup.controls.otherHelpFormGroup.get('other_help_yes').clearValidators();
      this.assessmentFormGroup.controls.otherHelpFormGroup.get('other_help_yes').updateValueAndValidity();
      
    }

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
