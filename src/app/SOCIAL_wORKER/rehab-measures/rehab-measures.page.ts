import { Component, OnInit,ViewChild } from '@angular/core';
import {MatStepperModule} from '@angular/material/stepper';
import {FormBuilder,FormControl,FormGroupDirective,NgForm, FormGroup, Validators} from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import {Location} from '@angular/common';
import {  MatStepper} from '@angular/material/stepper';
import { Router } from '@angular/router';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

import { PatientService } from 'src/app/services/patient.service';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { LoadingController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { OfflineManagerService } from '../../services/offline-manager.service';

interface status_options{
  value: string;
  viewValue_status: string;
  checked:boolean;
}
@Component({
  selector: 'app-rehab-measures',
  templateUrl: './rehab-measures.page.html',
  styleUrls: ['./rehab-measures.page.scss'],
})
export class RehabMeasuresPage implements OnInit {

 

  constructor(private _location: Location,private router: Router,
    private _formBuilder: FormBuilder,private dialogModel: MatDialog,
    private patientService: PatientService,private loadingCtrl: LoadingController,public alertController: AlertController,
    private offlineManager : OfflineManagerService) { }
    rehabFormGroup: any;
    noneAboveFormGroup:any;

  patient_id;
  patient_uuid
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

  patObject = {
    
    local_resource:'',
    local_resource_yes:'',
    local_resource_date:'',
    different_needs:'',
    different_needs_yes:'',
    different_needs_date:'',
    local_industries:'',
    local_industries_yes:'',
    local_industries_date:'',
    skill_dev:'',
    skill_dev_yes:'',
    skill_dev_date:'',
    self_employ:'',
    self_employ_yes:'',
    self_employ_date:'',
    income_generation:'',
    income_generation_yes:'',
    income_generation_date:'',
    minerga:'',
    minerga_yes:'',
    minerga_date:'',
    daycare:'',
    daycare_yes:'',
    cultural_event:'',
    cultural_event_yes:'',
    education:'',
    education_yes:'',
    education_date:'',
    id_proof:'',
    id_proof_yes:'',
    id_proof_date:'',
   
    ins_claim_yes:'',
    ins_claim_date:'',
    physician_yes:'',
    physician_date:'',
    legal_yes:'',
    legal_date:'',
    liase_yes:'',
    liase_date:'',
    consult_legal_yes:'',
    consult_legal_date:'',
    bank_account_yes:'',
    bank_account_date:'',
    offer_help_yes:'',
    offer_help_date:'',
    review_date:'',
   

    check1:false,
    check2:false,
    check3:false,
    check4:false,
    check5:false,
    check6:false,
    check7:false,
    check8:false,
    check9:false,
    check10:false,
    check11:false,
    check12:false,
    check13:false,
    check14:false,
    check15:false,
    check16:false,
    check17:false,
    check18:false,
    check19:false,
    none_reason:'',

    opt1:'',
    opt1_remark:'',
    opt1_date:'',
    opt2:'',
    opt2_remark:'',
    opt2_date:'',
    opt3:'',
    opt3_remark:'',
    opt3_date:'',
    opt4:'',
    opt4_remark:'',
    opt4_date:'',
    opt5:'',
    opt5_remark:'',
    opt5_date:'',
    opt6:'',
    opt6_remark:'',
    opt6_date:'',
    opt7:'',
    opt7_remark:'',
    opt7_date:'',
    opt8:'',
    opt8_remark:'',
    opt8_date:'',
    opt9:'',
    opt9_remark:'',
    opt9_date:'',
    opt10:'',
    opt10_remark:'',
    opt10_date:'',
    opt11:'',
    opt11_remark:'',
    opt11_date:'',
    opt12:'',
    opt12_remark:'',
    opt12_date:'',
    opt13:'',
    opt13_remark:'',
    opt13_date:'',
    opt14:'',
    opt14_remark:'',
    opt14_date:'',
    opt15:'',
    opt15_remark:'',
    opt15_date:'',
    opt16:'',
    opt16_remark:'',
    opt16_date:'',
    opt17:'',
    opt17_remark:'',
    opt17_date:'',
    opt18:'',
    opt18_remark:'',
    opt18_date:'',
    opt19:'',
    opt19_remark:'',
    opt19_date:''
  };
  dateToday;
  
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
  check1_uuid;
  check1_status;
  check2_uuid;
  check2_status;
  check3_uuid;
  check3_status;
  check4_uuid;
  check4_status;
  check5_uuid;
  check5_status;
  check6_uuid;
  check6_status;
  check7_uuid;
  check7_status;
  check8_uuid;
  check8_status;
  check9_uuid;
  check9_status;
  check10_uuid;
  check10_status;
  check11_uuid;
  check11_status;
  check12_uuid;
  check12_status;
  check13_uuid;
  check13_status;
  check14_uuid;
  check14_status;
  check15_uuid;
  check15_status;
  check16_uuid;
  check16_status;
  check17_uuid;
  check17_status;
  check18_uuid;
  check18_status;
  check19_uuid;
  check19_status;
  user_name;
tasks_array :any;
noneChecked = false;
none_visible = true;
taskValidationArray = [];
  

  ngOnInit() {
    this.rehabFormGroup = this._formBuilder.group({

      options1FormGroup:new FormGroup({
        opt1:new FormControl(this.patObject.opt1),
        opt1_remark:new FormControl(this.patObject.opt1_remark),
        opt1_date:new FormControl(this.patObject.opt1_date)
      }), 
      options2FormGroup:new FormGroup({
        opt2:new FormControl(this.patObject.opt2),
        opt2_remark:new FormControl(this.patObject.opt2_remark),
        opt2_date:new FormControl(this.patObject.opt2_date)
      }), 
      options3FormGroup:new FormGroup({
        opt3:new FormControl(this.patObject.opt3),
        opt3_remark:new FormControl(this.patObject.opt3_remark),
        opt3_date:new FormControl(this.patObject.opt3_date)
      }), 
      options4FormGroup:new FormGroup({
        opt4:new FormControl(this.patObject.opt4),
        opt4_remark:new FormControl(this.patObject.opt4_remark),
        opt4_date:new FormControl(this.patObject.opt4_date)
      }),
      options5FormGroup:new FormGroup({
        opt5:new FormControl(this.patObject.opt5),
        opt5_remark:new FormControl(this.patObject.opt5_remark),
        opt5_date:new FormControl(this.patObject.opt5_date)
      }), 
      options6FormGroup:new FormGroup({
        opt6:new FormControl(this.patObject.opt6),
        opt6_remark:new FormControl(this.patObject.opt6_remark),
        opt6_date:new FormControl(this.patObject.opt6_date)
      }), 
      options7FormGroup:new FormGroup({
        opt7:new FormControl(this.patObject.opt7),
        opt7_remark:new FormControl(this.patObject.opt7_remark),
        opt7_date:new FormControl(this.patObject.opt7_date)
      }), 
      options8FormGroup:new FormGroup({
        opt8:new FormControl(this.patObject.opt8),
        opt8_remark:new FormControl(this.patObject.opt8_remark),
        opt8_date:new FormControl(this.patObject.opt8_date)
      }), 
      options9FormGroup:new FormGroup({
        opt9:new FormControl(this.patObject.opt9),
        opt9_remark:new FormControl(this.patObject.opt9_remark),
        opt9_date:new FormControl(this.patObject.opt9_date)
      }), 

      options10FormGroup:new FormGroup({
        opt10:new FormControl(this.patObject.opt10),
        opt10_remark:new FormControl(this.patObject.opt10_remark),
        opt10_date:new FormControl(this.patObject.opt10_date)
      }), 

      options11FormGroup:new FormGroup({
        opt11:new FormControl(this.patObject.opt11),
        opt11_remark:new FormControl(this.patObject.opt11_remark),
        opt11_date:new FormControl(this.patObject.opt11_date)
      }),
      
      options12FormGroup:new FormGroup({
        opt12:new FormControl(this.patObject.opt12),
        opt12_remark:new FormControl(this.patObject.opt12_remark),
        opt12_date:new FormControl(this.patObject.opt12_date)
      }),

      options13FormGroup:new FormGroup({
        opt13:new FormControl(this.patObject.opt13),
        opt13_remark:new FormControl(this.patObject.opt13_remark),
        opt13_date:new FormControl(this.patObject.opt13_date)
      }),

      options14FormGroup:new FormGroup({
        opt14:new FormControl(this.patObject.opt14),
        opt14_remark:new FormControl(this.patObject.opt14_remark),
        opt14_date:new FormControl(this.patObject.opt14_date)
      }),

      options15FormGroup:new FormGroup({
        opt15:new FormControl(this.patObject.opt15),
        opt15_remark:new FormControl(this.patObject.opt15_remark),
        opt15_date:new FormControl(this.patObject.opt15_date)
      }),

      options16FormGroup:new FormGroup({
        opt16:new FormControl(this.patObject.opt16),
        opt16_remark:new FormControl(this.patObject.opt16_remark),
        opt16_date:new FormControl(this.patObject.opt16_date)
      }),

      options17FormGroup:new FormGroup({
        opt17:new FormControl(this.patObject.opt17),
        opt17_remark:new FormControl(this.patObject.opt17_remark),
        opt17_date:new FormControl(this.patObject.opt17_date)
      }),

      
      options18FormGroup:new FormGroup({
        opt18:new FormControl(this.patObject.opt18),
        opt18_remark:new FormControl(this.patObject.opt18_remark),
        opt18_date:new FormControl(this.patObject.opt18_date)
      }),
      options19FormGroup:new FormGroup({
        opt19:new FormControl(this.patObject.opt19),
        opt19_remark:new FormControl(this.patObject.opt19_remark),
        opt19_date:new FormControl(this.patObject.opt19_date)
      }),

    localResourceFormGroup:new FormGroup({
      check1:new FormControl(this.patObject.check1),
      local_resource_yes:new FormControl(this.patObject.local_resource_yes),
      local_resource_date:new FormControl(this.patObject.local_resource_date)
    }),
    differentNeedsFormGroup:new FormGroup({
      check2:new FormControl(this.patObject.check2),
      different_needs_yes:new FormControl(this.patObject.different_needs_yes),
      different_needs_date:new FormControl(this.patObject.different_needs_date),
    }),
  
    localFormGroup:new FormGroup({
      check3:new FormControl(this.patObject.check3),
      local_industries_yes:new FormControl(this.patObject.local_industries_yes),
      local_industries_date:new FormControl(this.patObject.local_industries_date),
    }),
  
    skillDevFormGroup:new FormGroup({
      check4:new FormControl(this.patObject.check4),
      skill_dev_yes:new FormControl(this.patObject.skill_dev_yes),
      skill_dev_date:new FormControl(this.patObject.skill_dev_date),
    }),
  
    selfEmployFormGroup:new FormGroup({
      check5:new FormControl(this.patObject.check5),
      self_employ_yes:new FormControl(this.patObject.self_employ_yes),
      self_employ_date:new FormControl(this.patObject.self_employ_date),
    }),
    incomeGroup:new FormGroup({
      check6:new FormControl(this.patObject.check6),
      income_generation_yes:new FormControl(this.patObject.income_generation_yes),
      income_generation_date:new FormControl(this.patObject.income_generation_date),
    }),
    minergaGroup:new FormGroup({
        check7:new FormControl(this.patObject.check7),
        minerga_yes:new FormControl(this.patObject.minerga_yes),
        minerga_date:new FormControl(this.patObject.minerga_date),
    }),
    daycareFormGroup:new FormGroup({
      check8:new FormControl(this.patObject.check8),
      daycare:new FormControl(this.patObject.daycare),
      daycare_yes:new FormControl(this.patObject.daycare_yes),
      
    }),
    cultutalEventFormGroup:new FormGroup({
      check9:new FormControl(this.patObject.check9),
        cultural_event:new FormControl(this.patObject.cultural_event),
        cultural_event_yes:new FormControl(this.patObject.cultural_event_yes),
    }),
    educationFormGroup:new FormGroup({
      check10:new FormControl(this.patObject.check10),
      education_yes:new FormControl(this.patObject.education_yes),
      education_date:new FormControl(this.patObject.education_date),
    }),
    idProofFormGroup:new FormGroup({
      check11:new FormControl(this.patObject.check11),
      id_proof_yes:new FormControl(this.patObject.id_proof_yes),
      id_proof_date:new FormControl(this.patObject.id_proof_date),
    }),
    insClaimFormGroup:new FormGroup({
      check12:new FormControl(this.patObject.check12),
      ins_claim_yes:new FormControl(this.patObject.ins_claim_yes),
      ins_claim_date:new FormControl(this.patObject.ins_claim_date),
    }),
    physicianFormGroup:new FormGroup({
      check13:new FormControl(this.patObject.check13),
      physician_yes:new FormControl(this.patObject.physician_yes),
      physician_date:new FormControl(this.patObject.physician_date),
    }),
    legalFormGroup:new FormGroup({
      check14:new FormControl(this.patObject.check14),
      legal_yes:new FormControl(this.patObject.legal_yes),
      legal_date:new FormControl(this.patObject.legal_date),
    }),
    liaiseFormGroup:new FormGroup({
      check15:new FormControl(this.patObject.check15),
      liase_yes:new FormControl(this.patObject.liase_yes),
      liase_date:new FormControl(this.patObject.liase_date),
    }),
    consultLegalFormGroup:new FormGroup({
      check16:new FormControl(this.patObject.check16),
      consult_legal_yes:new FormControl(this.patObject.consult_legal_yes),
      consult_legal_date:new FormControl(this.patObject.consult_legal_date),
    }),
    bankAccountFormGroup:new FormGroup({
      check17:new FormControl(this.patObject.check17),
      bank_account_yes:new FormControl(this.patObject.bank_account_yes),
      bank_account_date:new FormControl(this.patObject.bank_account_date),
    }),
    offerHelpFormGroup:new FormGroup({
      check18:new FormControl(this.patObject.check18),
      offer_help_yes:new FormControl(this.patObject.offer_help_yes),
      offer_help_date:new FormControl(this.patObject.offer_help_date),
    }),
    noneAboveFormGroup:new FormGroup({
      check19:new FormControl(this.patObject.check19),
      none_reason:new FormControl(this.patObject.none_reason),
    
    }),
    review_date: new FormControl(this.patObject.review_date,[]),
  
   
    })
   
  }


  ionViewWillEnter() {
    this.check1_remark ="";
    this.check2_remark ="";
    this.check3_remark ="";
    this.check4_remark ="";
    this.check5_remark ="";
    this.check6_remark ="";
    this.check7_remark ="";
    this.check8_remark ="";
    this.check9_remark ="";
    this.check10_remark ="";
    this.check11_remark ="";
    this.check12_remark ="";
    this.check13_remark ="";
    this.check14_remark ="";
    this.check15_remark ="";
    this.check16_remark ="";
    this.check17_remark ="";
    this.check18_remark ="";
    this.check19_remark ="";

    this.check1_date;
    this.check2_date;
    this.check3_date;
    this.check4_date;
    this.check5_date;
    this.check6_date;
    this.check7_date;
    this.check8_date;
    this.check9_date;
    this.check10_date;
    this.check11_date;
    this.check12_date;
    this.check13_date;
    this.check14_date;
    this.check15_date;
    this.check16_date;
    this.check17_date;
    this.check18_date;
    this.check19_date;

    this.check1_date1;
    this.check2_date1;
    this.check3_date1;
    this.check4_date1;
    this.check5_date1;
    this.check6_date1;
    this.check7_date1;
    this.check8_date1;
    this.check9_date1;
    this.check10_date1;
    this.check11_date1;
    this.check12_date1;
    this.check13_date1;
    this.check14_date1;
    this.check15_date1;
    this.check16_date1;
    this.check17_date1;
    this.check18_date1;
    this.check19_date1;

    this.optionCheck1 = false;
    this.optionCheck2 = false;
    this.optionCheck3 = false;
    this.optionCheck4 = false;
    this.optionCheck5 = false;
    this.optionCheck6 = false;
    this.optionCheck7 = false;
    this.optionCheck8 = false;
    this.optionCheck9 = false;
    this.optionCheck10 = false;
    this.optionCheck11= false;
    this.optionCheck12 = false;
    this.optionCheck13 = false;
    this.optionCheck14 = false;
    this.optionCheck15 = false;
    this.optionCheck16 = false;
    this.optionCheck17 = false;
    this.optionCheck18 = false; 
    this.optionCheck19 = false; 

    this.check1_uuid;
    this.check1_status;
    this.check2_uuid;
    this.check2_status;
    this.check3_uuid;
    this.check3_status;
    this.check4_uuid;
    this.check4_status;
    this.check5_uuid;
    this.check5_status;
    this.check6_uuid;
    this.check6_status;
    this.check7_uuid;
    this.check7_status;
    this.check8_uuid;
    this.check8_status;
    this.check9_uuid;
    this.check9_status;
    this.check10_uuid;
    this.check10_status;
    this.check11_uuid;
    this.check11_status;
    this.check12_uuid;
    this.check12_status;
    this.check13_uuid;
    this.check13_status;
    this.check14_uuid;
    this.check14_status;
    this.check15_uuid;
    this.check15_status;
    this.check16_uuid;
    this.check16_status;
    this.check17_uuid;
    this.check17_status;
    this.check18_uuid;
    this.check18_status;
    this.check19_uuid;
    this.check19_status;
    this.user_name = sessionStorage.getItem("user_name");
    this.patient_id =  sessionStorage.getItem('patient_id');
    this.patient_uuid =  sessionStorage.getItem('patient_uuid');
    this.getPatient();
    this.getTasks();
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
  
taskCheck1($event:MatCheckboxChange){
  if ($event.checked == true) {
    this.taskValidationArray.push(1);
    this.none_visible = false;
    this.rehabFormGroup.controls.noneAboveFormGroup.get('check19').setValue(false);
    this.rehabFormGroup.controls.noneAboveFormGroup.get('none_reason').setValue('');
    this.rehabFormGroup.controls.noneAboveFormGroup.get('none_reason').clearValidators();
    this.rehabFormGroup.controls.noneAboveFormGroup.get('none_reason').updateValueAndValidity();
    this.rehabFormGroup.get('review_date').setValue('');
    this.rehabFormGroup.get('review_date').clearValidators();
    this.rehabFormGroup.get('review_date').updateValueAndValidity();
    this.rehabFormGroup.controls.localResourceFormGroup.get('local_resource_yes').setValidators(Validators.required);
    this.rehabFormGroup.controls.localResourceFormGroup.get('local_resource_yes').updateValueAndValidity();
    this.rehabFormGroup.controls.localResourceFormGroup.get('local_resource_date').setValidators(Validators.required);
    this.rehabFormGroup.controls.localResourceFormGroup.get('local_resource_date').updateValueAndValidity();
  } else {

   const index = this.taskValidationArray.indexOf(1);
      if (index > -1) {
        this.taskValidationArray.splice(index, 1);
      }
      if(this.taskValidationArray.length < 1){
      
        this.none_visible = true;
        this.noneChecked = false;
      
    }

    this.rehabFormGroup.controls.localResourceFormGroup.get('local_resource_yes').setValue('');
    this.rehabFormGroup.controls.localResourceFormGroup.get('local_resource_yes').clearValidators();
    this.rehabFormGroup.controls.localResourceFormGroup.get('local_resource_yes').updateValueAndValidity();
    this.rehabFormGroup.controls.localResourceFormGroup.get('local_resource_date').setValue('');
    this.rehabFormGroup.controls.localResourceFormGroup.get('local_resource_date').clearValidators();
    this.rehabFormGroup.controls.localResourceFormGroup.get('local_resource_date').updateValueAndValidity();
    
  }

}

taskCheck2($event:MatCheckboxChange){
  if ($event.checked == true) {
    this.taskValidationArray.push(2);
    this.none_visible = false;
    this.rehabFormGroup.controls.noneAboveFormGroup.get('check19').setValue(false);
    this.rehabFormGroup.controls.noneAboveFormGroup.get('none_reason').setValue('');
    this.rehabFormGroup.controls.noneAboveFormGroup.get('none_reason').clearValidators();
    this.rehabFormGroup.controls.noneAboveFormGroup.get('none_reason').updateValueAndValidity();
    this.rehabFormGroup.get('review_date').setValue('');
    this.rehabFormGroup.get('review_date').clearValidators();
    this.rehabFormGroup.get('review_date').updateValueAndValidity();
    this.rehabFormGroup.controls.differentNeedsFormGroup.get('different_needs_yes').setValidators(Validators.required);
    this.rehabFormGroup.controls.differentNeedsFormGroup.get('different_needs_yes').updateValueAndValidity();
    this.rehabFormGroup.controls.differentNeedsFormGroup.get('different_needs_date').setValidators(Validators.required);
    this.rehabFormGroup.controls.differentNeedsFormGroup.get('different_needs_date').updateValueAndValidity();
  } else {
    const index = this.taskValidationArray.indexOf(2);
    if (index > -1) {
      this.taskValidationArray.splice(index, 1);
    }
    if(this.taskValidationArray.length < 1){
    
      this.none_visible = true;
      this.noneChecked = false;
    
  }
    this.rehabFormGroup.controls.differentNeedsFormGroup.get('different_needs_yes').setValue('');
    this.rehabFormGroup.controls.differentNeedsFormGroup.get('different_needs_yes').clearValidators();
    this.rehabFormGroup.controls.differentNeedsFormGroup.get('different_needs_yes').updateValueAndValidity();
    this.rehabFormGroup.controls.differentNeedsFormGroup.get('different_needs_date').setValue('');
    this.rehabFormGroup.controls.differentNeedsFormGroup.get('different_needs_date').clearValidators();
    this.rehabFormGroup.controls.differentNeedsFormGroup.get('different_needs_date').updateValueAndValidity();
    
  }

}

taskCheck3($event:MatCheckboxChange){
  if ($event.checked == true) {
    this.taskValidationArray.push(3);
    this.none_visible = false;
    this.rehabFormGroup.controls.noneAboveFormGroup.get('check19').setValue(false);
    this.rehabFormGroup.controls.noneAboveFormGroup.get('none_reason').setValue('');
    this.rehabFormGroup.controls.noneAboveFormGroup.get('none_reason').clearValidators();
    this.rehabFormGroup.controls.noneAboveFormGroup.get('none_reason').updateValueAndValidity();
    this.rehabFormGroup.get('review_date').setValue('');
    this.rehabFormGroup.get('review_date').clearValidators();
    this.rehabFormGroup.get('review_date').updateValueAndValidity();
    this.rehabFormGroup.controls.localFormGroup.get('local_industries_yes').setValidators(Validators.required);
    this.rehabFormGroup.controls.localFormGroup.get('local_industries_yes').updateValueAndValidity();
    this.rehabFormGroup.controls.localFormGroup.get('local_industries_date').setValidators(Validators.required);
    this.rehabFormGroup.controls.localFormGroup.get('local_industries_date').updateValueAndValidity();
  } else {
    const index = this.taskValidationArray.indexOf(3);
    if (index > -1) {
      this.taskValidationArray.splice(index, 1);
    }
    if(this.taskValidationArray.length < 1){
    
      this.none_visible = true;
      this.noneChecked = false;
    
  }
    this.rehabFormGroup.controls.localFormGroup.get('local_industries_yes').setValue('');
    this.rehabFormGroup.controls.localFormGroup.get('local_industries_yes').clearValidators();
    this.rehabFormGroup.controls.localFormGroup.get('local_industries_yes').updateValueAndValidity();
    this.rehabFormGroup.controls.localFormGroup.get('local_industries_date').setValue('');
    this.rehabFormGroup.controls.localFormGroup.get('local_industries_date').clearValidators();
    this.rehabFormGroup.controls.localFormGroup.get('local_industries_date').updateValueAndValidity();
    
  }

}

taskCheck4($event:MatCheckboxChange){
  if ($event.checked == true) {
    this.taskValidationArray.push(4);
    this.none_visible = false;
    this.rehabFormGroup.controls.noneAboveFormGroup.get('check19').setValue(false);
    this.rehabFormGroup.controls.noneAboveFormGroup.get('none_reason').setValue('');
    this.rehabFormGroup.controls.noneAboveFormGroup.get('none_reason').clearValidators();
    this.rehabFormGroup.controls.noneAboveFormGroup.get('none_reason').updateValueAndValidity();
    this.rehabFormGroup.get('review_date').setValue('');
    this.rehabFormGroup.get('review_date').clearValidators();
    this.rehabFormGroup.get('review_date').updateValueAndValidity();
    this.rehabFormGroup.controls.skillDevFormGroup.get('skill_dev_yes').setValidators(Validators.required);
    this.rehabFormGroup.controls.skillDevFormGroup.get('skill_dev_yes').updateValueAndValidity();
    this.rehabFormGroup.controls.skillDevFormGroup.get('skill_dev_date').setValidators(Validators.required);
    this.rehabFormGroup.controls.skillDevFormGroup.get('skill_dev_date').updateValueAndValidity();
  } else {
    const index = this.taskValidationArray.indexOf(4);
    if (index > -1) {
      this.taskValidationArray.splice(index, 1);
    }
    if(this.taskValidationArray.length < 1){
    
      this.none_visible = true;
      this.noneChecked = false;
    
  }
    this.rehabFormGroup.controls.skillDevFormGroup.get('skill_dev_yes').setValue('');
    this.rehabFormGroup.controls.skillDevFormGroup.get('skill_dev_yes').clearValidators();
    this.rehabFormGroup.controls.skillDevFormGroup.get('skill_dev_yes').updateValueAndValidity();
    this.rehabFormGroup.controls.skillDevFormGroup.get('skill_dev_date').setValue('');
    this.rehabFormGroup.controls.skillDevFormGroup.get('skill_dev_date').clearValidators();
    this.rehabFormGroup.controls.skillDevFormGroup.get('skill_dev_date').updateValueAndValidity();
    
  }

}

taskCheck5($event:MatCheckboxChange){
  if ($event.checked == true) {
    this.taskValidationArray.push(5);
    this.none_visible = false;
    this.rehabFormGroup.controls.noneAboveFormGroup.get('check19').setValue(false);
    this.rehabFormGroup.controls.noneAboveFormGroup.get('none_reason').setValue('');
    this.rehabFormGroup.controls.noneAboveFormGroup.get('none_reason').clearValidators();
    this.rehabFormGroup.controls.noneAboveFormGroup.get('none_reason').updateValueAndValidity();
    this.rehabFormGroup.get('review_date').setValue('');
    this.rehabFormGroup.get('review_date').clearValidators();
    this.rehabFormGroup.get('review_date').updateValueAndValidity();
    this.rehabFormGroup.controls.selfEmployFormGroup.get('self_employ_yes').setValidators(Validators.required);
    this.rehabFormGroup.controls.selfEmployFormGroup.get('self_employ_yes').updateValueAndValidity();
    this.rehabFormGroup.controls.selfEmployFormGroup.get('self_employ_date').setValidators(Validators.required);
    this.rehabFormGroup.controls.selfEmployFormGroup.get('self_employ_date').updateValueAndValidity();
  } else {
    const index = this.taskValidationArray.indexOf(5);
    if (index > -1) {
      this.taskValidationArray.splice(index, 1);
    }
    if(this.taskValidationArray.length < 1){
    
      this.none_visible = true;
      this.noneChecked = false;
    
  }
    this.rehabFormGroup.controls.selfEmployFormGroup.get('self_employ_yes').setValue('');
    this.rehabFormGroup.controls.selfEmployFormGroup.get('self_employ_yes').clearValidators();
    this.rehabFormGroup.controls.selfEmployFormGroup.get('self_employ_yes').updateValueAndValidity();
    this.rehabFormGroup.controls.selfEmployFormGroup.get('self_employ_date').setValue('');
    this.rehabFormGroup.controls.selfEmployFormGroup.get('self_employ_date').clearValidators();
    this.rehabFormGroup.controls.selfEmployFormGroup.get('self_employ_date').updateValueAndValidity();
    
  }

}

taskCheck6($event:MatCheckboxChange){
  if ($event.checked == true) {
    this.taskValidationArray.push(6);
    this.none_visible = false;
    this.rehabFormGroup.controls.noneAboveFormGroup.get('check19').setValue(false);
    this.rehabFormGroup.controls.noneAboveFormGroup.get('none_reason').setValue('');
    this.rehabFormGroup.controls.noneAboveFormGroup.get('none_reason').clearValidators();
    this.rehabFormGroup.controls.noneAboveFormGroup.get('none_reason').updateValueAndValidity();
    this.rehabFormGroup.get('review_date').setValue('');
    this.rehabFormGroup.get('review_date').clearValidators();
    this.rehabFormGroup.get('review_date').updateValueAndValidity();
    this.rehabFormGroup.controls.incomeGroup.get('income_generation_yes').setValidators(Validators.required);
    this.rehabFormGroup.controls.incomeGroup.get('income_generation_yes').updateValueAndValidity();
    this.rehabFormGroup.controls.incomeGroup.get('income_generation_date').setValidators(Validators.required);
    this.rehabFormGroup.controls.incomeGroup.get('income_generation_date').updateValueAndValidity();
  } else {
    const index = this.taskValidationArray.indexOf(6);
    if (index > -1) {
      this.taskValidationArray.splice(index, 1);
    }
    if(this.taskValidationArray.length < 1){
    
      this.none_visible = true;
      this.noneChecked = false;
    
  }
    this.rehabFormGroup.controls.incomeGroup.get('income_generation_yes').setValue('');
    this.rehabFormGroup.controls.incomeGroup.get('income_generation_yes').clearValidators();
    this.rehabFormGroup.controls.incomeGroup.get('income_generation_yes').updateValueAndValidity();
    this.rehabFormGroup.controls.incomeGroup.get('income_generation_date').setValue('');
    this.rehabFormGroup.controls.incomeGroup.get('income_generation_date').clearValidators();
    this.rehabFormGroup.controls.incomeGroup.get('income_generation_date').updateValueAndValidity();
    
  }

}

taskCheck7($event:MatCheckboxChange){
  if ($event.checked == true) {
    this.taskValidationArray.push(7);
    this.none_visible = false;
    this.rehabFormGroup.controls.noneAboveFormGroup.get('check19').setValue(false);
    this.rehabFormGroup.controls.noneAboveFormGroup.get('none_reason').setValue('');
    this.rehabFormGroup.controls.noneAboveFormGroup.get('none_reason').clearValidators();
    this.rehabFormGroup.controls.noneAboveFormGroup.get('none_reason').updateValueAndValidity();
    this.rehabFormGroup.get('review_date').setValue('');
    this.rehabFormGroup.get('review_date').clearValidators();
    this.rehabFormGroup.get('review_date').updateValueAndValidity();
    this.rehabFormGroup.controls.minergaGroup.get('minerga_yes').setValidators(Validators.required);
    this.rehabFormGroup.controls.minergaGroup.get('minerga_yes').updateValueAndValidity();
    this.rehabFormGroup.controls.minergaGroup.get('minerga_date').setValidators(Validators.required);
    this.rehabFormGroup.controls.minergaGroup.get('minerga_date').updateValueAndValidity();
  } else {
    const index = this.taskValidationArray.indexOf(7);
    if (index > -1) {
      this.taskValidationArray.splice(index, 1);
    }
    if(this.taskValidationArray.length < 1){
    
      this.none_visible = true;
      this.noneChecked = false;
    
  }
    this.rehabFormGroup.controls.minergaGroup.get('minerga_yes').setValue('');
    this.rehabFormGroup.controls.minergaGroup.get('minerga_yes').clearValidators();
    this.rehabFormGroup.controls.minergaGroup.get('minerga_yes').updateValueAndValidity();
    this.rehabFormGroup.controls.minergaGroup.get('minerga_date').setValue('');
    this.rehabFormGroup.controls.minergaGroup.get('minerga_date').clearValidators();
    this.rehabFormGroup.controls.minergaGroup.get('minerga_date').updateValueAndValidity();
    
  }

}

taskCheck8($event:MatCheckboxChange){
  if ($event.checked == true) {
    this.taskValidationArray.push(8);
    this.none_visible = false;
    this.rehabFormGroup.controls.noneAboveFormGroup.get('check19').setValue(false);
    this.rehabFormGroup.controls.noneAboveFormGroup.get('none_reason').setValue('');
    this.rehabFormGroup.controls.noneAboveFormGroup.get('none_reason').clearValidators();
    this.rehabFormGroup.controls.noneAboveFormGroup.get('none_reason').updateValueAndValidity();
    this.rehabFormGroup.get('review_date').setValue('');
    this.rehabFormGroup.get('review_date').clearValidators();
    this.rehabFormGroup.get('review_date').updateValueAndValidity();
    this.rehabFormGroup.controls.daycareFormGroup.get('daycare').setValidators(Validators.required);
    this.rehabFormGroup.controls.daycareFormGroup.get('daycare').updateValueAndValidity();
    this.rehabFormGroup.controls.daycareFormGroup.get('daycare_yes').setValidators(Validators.required);
    this.rehabFormGroup.controls.daycareFormGroup.get('daycare_yes').updateValueAndValidity();
  } else {
    const index = this.taskValidationArray.indexOf(8);
    if (index > -1) {
      this.taskValidationArray.splice(index, 1);
    }
    if(this.taskValidationArray.length < 1){
    
      this.none_visible = true;
      this.noneChecked = false;
    
  }
    this.rehabFormGroup.controls.daycareFormGroup.get('daycare').setValue('');
    this.rehabFormGroup.controls.daycareFormGroup.get('daycare').clearValidators();
    this.rehabFormGroup.controls.daycareFormGroup.get('daycare').updateValueAndValidity();
    this.rehabFormGroup.controls.daycareFormGroup.get('daycare_yes').setValue('');
    this.rehabFormGroup.controls.daycareFormGroup.get('daycare_yes').clearValidators();
    this.rehabFormGroup.controls.daycareFormGroup.get('daycare_yes').updateValueAndValidity();
    
  }

}

taskCheck9($event:MatCheckboxChange){
  if ($event.checked == true) {
    this.taskValidationArray.push(9);
    this.none_visible = false;
    this.rehabFormGroup.controls.noneAboveFormGroup.get('check19').setValue(false);
    this.rehabFormGroup.controls.noneAboveFormGroup.get('none_reason').setValue('');
    this.rehabFormGroup.controls.noneAboveFormGroup.get('none_reason').clearValidators();
    this.rehabFormGroup.controls.noneAboveFormGroup.get('none_reason').updateValueAndValidity();
    this.rehabFormGroup.get('review_date').setValue('');
    this.rehabFormGroup.get('review_date').clearValidators();
    this.rehabFormGroup.get('review_date').updateValueAndValidity();
    this.rehabFormGroup.controls.cultutalEventFormGroup.get('cultural_event').setValidators(Validators.required);
    this.rehabFormGroup.controls.cultutalEventFormGroup.get('cultural_event').updateValueAndValidity();
    this.rehabFormGroup.controls.cultutalEventFormGroup.get('cultural_event_yes').setValidators(Validators.required);
    this.rehabFormGroup.controls.cultutalEventFormGroup.get('cultural_event_yes').updateValueAndValidity();
  } else {
    const index = this.taskValidationArray.indexOf(9);
    if (index > -1) {
      this.taskValidationArray.splice(index, 1);
    }
    if(this.taskValidationArray.length < 1){
    
      this.none_visible = true;
      this.noneChecked = false;
    
  }
    this.rehabFormGroup.controls.cultutalEventFormGroup.get('cultural_event').setValue('');
    this.rehabFormGroup.controls.cultutalEventFormGroup.get('cultural_event').clearValidators();
    this.rehabFormGroup.controls.cultutalEventFormGroup.get('cultural_event').updateValueAndValidity();
    this.rehabFormGroup.controls.cultutalEventFormGroup.get('cultural_event_yes').setValue('');
    this.rehabFormGroup.controls.cultutalEventFormGroup.get('cultural_event_yes').clearValidators();
    this.rehabFormGroup.controls.cultutalEventFormGroup.get('cultural_event_yes').updateValueAndValidity();
    
  }

}

taskCheck10($event:MatCheckboxChange){
  if ($event.checked == true) {
    this.taskValidationArray.push(10);
    this.none_visible = false;
    this.rehabFormGroup.controls.noneAboveFormGroup.get('check19').setValue(false);
    this.rehabFormGroup.controls.noneAboveFormGroup.get('none_reason').setValue('');
    this.rehabFormGroup.controls.noneAboveFormGroup.get('none_reason').clearValidators();
    this.rehabFormGroup.controls.noneAboveFormGroup.get('none_reason').updateValueAndValidity();
    this.rehabFormGroup.get('review_date').setValue('');
    this.rehabFormGroup.get('review_date').clearValidators();
    this.rehabFormGroup.get('review_date').updateValueAndValidity();
    this.rehabFormGroup.controls.educationFormGroup.get('education_yes').setValidators(Validators.required);
    this.rehabFormGroup.controls.educationFormGroup.get('education_yes').updateValueAndValidity();
    this.rehabFormGroup.controls.educationFormGroup.get('education_date').setValidators(Validators.required);
    this.rehabFormGroup.controls.educationFormGroup.get('education_date').updateValueAndValidity();
  } else {
    const index = this.taskValidationArray.indexOf(10);
    if (index > -1) {
      this.taskValidationArray.splice(index, 1);
    }
    if(this.taskValidationArray.length < 1){
    
      this.none_visible = true;
      this.noneChecked = false;
    
  }
    this.rehabFormGroup.controls.educationFormGroup.get('education_yes').setValue('');
    this.rehabFormGroup.controls.educationFormGroup.get('education_yes').clearValidators();
    this.rehabFormGroup.controls.educationFormGroup.get('education_yes').updateValueAndValidity();
    this.rehabFormGroup.controls.educationFormGroup.get('education_date').setValue('');
    this.rehabFormGroup.controls.educationFormGroup.get('education_date').clearValidators();
    this.rehabFormGroup.controls.educationFormGroup.get('education_date').updateValueAndValidity();
    
  }

}

taskCheck11($event:MatCheckboxChange){
  if ($event.checked == true) {
    this.taskValidationArray.push(11);
    this.none_visible = false;
    this.rehabFormGroup.controls.noneAboveFormGroup.get('check19').setValue(false);
    this.rehabFormGroup.controls.noneAboveFormGroup.get('none_reason').setValue('');
    this.rehabFormGroup.controls.noneAboveFormGroup.get('none_reason').clearValidators();
    this.rehabFormGroup.controls.noneAboveFormGroup.get('none_reason').updateValueAndValidity();
    this.rehabFormGroup.get('review_date').setValue('');
    this.rehabFormGroup.get('review_date').clearValidators();
    this.rehabFormGroup.get('review_date').updateValueAndValidity();
    this.rehabFormGroup.controls.idProofFormGroup.get('id_proof_yes').setValidators(Validators.required);
    this.rehabFormGroup.controls.idProofFormGroup.get('id_proof_yes').updateValueAndValidity();
    this.rehabFormGroup.controls.idProofFormGroup.get('id_proof_date').setValidators(Validators.required);
    this.rehabFormGroup.controls.idProofFormGroup.get('id_proof_date').updateValueAndValidity();
  } else {
    const index = this.taskValidationArray.indexOf(11);
    if (index > -1) {
      this.taskValidationArray.splice(index, 1);
    }
    if(this.taskValidationArray.length < 1){
    
      this.none_visible = true;
      this.noneChecked = false;
    
  }
    this.rehabFormGroup.controls.idProofFormGroup.get('id_proof_yes').setValue('');
    this.rehabFormGroup.controls.idProofFormGroup.get('id_proof_yes').clearValidators();
    this.rehabFormGroup.controls.idProofFormGroup.get('id_proof_yes').updateValueAndValidity();
    this.rehabFormGroup.controls.idProofFormGroup.get('id_proof_date').setValue('');
    this.rehabFormGroup.controls.idProofFormGroup.get('id_proof_date').clearValidators();
    this.rehabFormGroup.controls.idProofFormGroup.get('id_proof_date').updateValueAndValidity();
    
  }

}

taskCheck12($event:MatCheckboxChange){
  if ($event.checked == true) {
    this.taskValidationArray.push(12);
    this.none_visible = false;
    this.rehabFormGroup.controls.noneAboveFormGroup.get('check19').setValue(false);
    this.rehabFormGroup.controls.noneAboveFormGroup.get('none_reason').setValue('');
    this.rehabFormGroup.controls.noneAboveFormGroup.get('none_reason').clearValidators();
    this.rehabFormGroup.controls.noneAboveFormGroup.get('none_reason').updateValueAndValidity();
    this.rehabFormGroup.get('review_date').setValue('');
    this.rehabFormGroup.get('review_date').clearValidators();
    this.rehabFormGroup.get('review_date').updateValueAndValidity();
    this.rehabFormGroup.controls.insClaimFormGroup.get('ins_claim_yes').setValidators(Validators.required);
    this.rehabFormGroup.controls.insClaimFormGroup.get('ins_claim_yes').updateValueAndValidity();
    this.rehabFormGroup.controls.insClaimFormGroup.get('ins_claim_date').setValidators(Validators.required);
    this.rehabFormGroup.controls.insClaimFormGroup.get('ins_claim_date').updateValueAndValidity();
  } else {
    const index = this.taskValidationArray.indexOf(12);
    if (index > -1) {
      this.taskValidationArray.splice(index, 1);
    }
    if(this.taskValidationArray.length < 1){
    
      this.none_visible = true;
      this.noneChecked = false;
    
  }
    this.rehabFormGroup.controls.insClaimFormGroup.get('ins_claim_yes').setValue('');
    this.rehabFormGroup.controls.insClaimFormGroup.get('ins_claim_yes').clearValidators();
    this.rehabFormGroup.controls.insClaimFormGroup.get('ins_claim_yes').updateValueAndValidity();
    this.rehabFormGroup.controls.insClaimFormGroup.get('ins_claim_date').setValue('');
    this.rehabFormGroup.controls.insClaimFormGroup.get('ins_claim_date').clearValidators();
    this.rehabFormGroup.controls.insClaimFormGroup.get('ins_claim_date').updateValueAndValidity();
    
  }

}

taskCheck13($event:MatCheckboxChange){
  if ($event.checked == true) {
    this.taskValidationArray.push(13);
    this.none_visible = false;
    this.rehabFormGroup.controls.noneAboveFormGroup.get('check19').setValue(false);
    this.rehabFormGroup.controls.noneAboveFormGroup.get('none_reason').setValue('');
    this.rehabFormGroup.controls.noneAboveFormGroup.get('none_reason').clearValidators();
    this.rehabFormGroup.controls.noneAboveFormGroup.get('none_reason').updateValueAndValidity();
    this.rehabFormGroup.get('review_date').setValue('');
    this.rehabFormGroup.get('review_date').clearValidators();
    this.rehabFormGroup.get('review_date').updateValueAndValidity();
    this.rehabFormGroup.controls.physicianFormGroup.get('physician_yes').setValidators(Validators.required);
    this.rehabFormGroup.controls.physicianFormGroup.get('physician_yes').updateValueAndValidity();
    this.rehabFormGroup.controls.physicianFormGroup.get('physician_date').setValidators(Validators.required);
    this.rehabFormGroup.controls.physicianFormGroup.get('physician_date').updateValueAndValidity();
  } else {
    const index = this.taskValidationArray.indexOf(13);
    if (index > -1) {
      this.taskValidationArray.splice(index, 1);
    }
    if(this.taskValidationArray.length < 1){
    
      this.none_visible = true;
      this.noneChecked = false;
    
  }
    this.rehabFormGroup.controls.physicianFormGroup.get('physician_yes').setValue('');
    this.rehabFormGroup.controls.physicianFormGroup.get('physician_yes').clearValidators();
    this.rehabFormGroup.controls.physicianFormGroup.get('physician_yes').updateValueAndValidity();
    this.rehabFormGroup.controls.physicianFormGroup.get('physician_date').setValue('');
    this.rehabFormGroup.controls.physicianFormGroup.get('physician_date').clearValidators();
    this.rehabFormGroup.controls.physicianFormGroup.get('physician_date').updateValueAndValidity();
    
  }

}

taskCheck14($event:MatCheckboxChange){
  if ($event.checked == true) {
    this.taskValidationArray.push(14);
    this.none_visible = false;
    this.rehabFormGroup.controls.noneAboveFormGroup.get('check19').setValue(false);
    this.rehabFormGroup.controls.noneAboveFormGroup.get('none_reason').setValue('');
    this.rehabFormGroup.controls.noneAboveFormGroup.get('none_reason').clearValidators();
    this.rehabFormGroup.controls.noneAboveFormGroup.get('none_reason').updateValueAndValidity();
    this.rehabFormGroup.get('review_date').setValue('');
    this.rehabFormGroup.get('review_date').clearValidators();
    this.rehabFormGroup.get('review_date').updateValueAndValidity();
    this.rehabFormGroup.controls.legalFormGroup.get('legal_yes').setValidators(Validators.required);
    this.rehabFormGroup.controls.legalFormGroup.get('legal_yes').updateValueAndValidity();
    this.rehabFormGroup.controls.legalFormGroup.get('legal_date').setValidators(Validators.required);
    this.rehabFormGroup.controls.legalFormGroup.get('legal_date').updateValueAndValidity();
  } else {
    const index = this.taskValidationArray.indexOf(14);
    if (index > -1) {
      this.taskValidationArray.splice(index, 1);
    }
    if(this.taskValidationArray.length < 1){
    
      this.none_visible = true;
      this.noneChecked = false;
    
  }
    this.rehabFormGroup.controls.legalFormGroup.get('legal_yes').setValue('');
    this.rehabFormGroup.controls.legalFormGroup.get('legal_yes').clearValidators();
    this.rehabFormGroup.controls.legalFormGroup.get('legal_yes').updateValueAndValidity();
    this.rehabFormGroup.controls.legalFormGroup.get('legal_date').setValue('');
    this.rehabFormGroup.controls.legalFormGroup.get('legal_date').clearValidators();
    this.rehabFormGroup.controls.legalFormGroup.get('legal_date').updateValueAndValidity();
    
  }

}

taskCheck15($event:MatCheckboxChange){
  if ($event.checked == true) {
    this.taskValidationArray.push(15);
    this.none_visible = false;
    this.rehabFormGroup.controls.noneAboveFormGroup.get('check19').setValue(false);
    this.rehabFormGroup.controls.noneAboveFormGroup.get('none_reason').setValue('');
    this.rehabFormGroup.controls.noneAboveFormGroup.get('none_reason').clearValidators();
    this.rehabFormGroup.controls.noneAboveFormGroup.get('none_reason').updateValueAndValidity();
    this.rehabFormGroup.get('review_date').setValue('');
    this.rehabFormGroup.get('review_date').clearValidators();
    this.rehabFormGroup.get('review_date').updateValueAndValidity();
    this.rehabFormGroup.controls.liaiseFormGroup.get('liase_yes').setValidators(Validators.required);
    this.rehabFormGroup.controls.liaiseFormGroup.get('liase_yes').updateValueAndValidity();
    this.rehabFormGroup.controls.liaiseFormGroup.get('liase_date').setValidators(Validators.required);
    this.rehabFormGroup.controls.liaiseFormGroup.get('liase_date').updateValueAndValidity();
  } else {
    const index = this.taskValidationArray.indexOf(15);
    if (index > -1) {
      this.taskValidationArray.splice(index, 1);
    }
    if(this.taskValidationArray.length < 1){
    
      this.none_visible = true;
      this.noneChecked = false;
    
  }
    this.rehabFormGroup.controls.liaiseFormGroup.get('liase_yes').setValue('');
    this.rehabFormGroup.controls.liaiseFormGroup.get('liase_yes').clearValidators();
    this.rehabFormGroup.controls.liaiseFormGroup.get('liase_yes').updateValueAndValidity();
    this.rehabFormGroup.controls.liaiseFormGroup.get('liase_date').setValue('');
    this.rehabFormGroup.controls.liaiseFormGroup.get('liase_date').clearValidators();
    this.rehabFormGroup.controls.liaiseFormGroup.get('liase_date').updateValueAndValidity();
    
  }

}

taskCheck16($event:MatCheckboxChange){
  if ($event.checked == true) {
    this.taskValidationArray.push(16);
    this.none_visible = false;
    this.rehabFormGroup.controls.noneAboveFormGroup.get('check19').setValue(false);
    this.rehabFormGroup.controls.noneAboveFormGroup.get('none_reason').setValue('');
    this.rehabFormGroup.controls.noneAboveFormGroup.get('none_reason').clearValidators();
    this.rehabFormGroup.controls.noneAboveFormGroup.get('none_reason').updateValueAndValidity();
    this.rehabFormGroup.get('review_date').setValue('');
    this.rehabFormGroup.get('review_date').clearValidators();
    this.rehabFormGroup.get('review_date').updateValueAndValidity();
    this.rehabFormGroup.controls.consultLegalFormGroup.get('consult_legal_yes').setValidators(Validators.required);
    this.rehabFormGroup.controls.consultLegalFormGroup.get('consult_legal_yes').updateValueAndValidity();
    this.rehabFormGroup.controls.consultLegalFormGroup.get('consult_legal_date').setValidators(Validators.required);
    this.rehabFormGroup.controls.consultLegalFormGroup.get('consult_legal_date').updateValueAndValidity();
  } else {
    const index = this.taskValidationArray.indexOf(16);
    if (index > -1) {
      this.taskValidationArray.splice(index, 1);
    }
    if(this.taskValidationArray.length < 1){
    
      this.none_visible = true;
      this.noneChecked = false;
    
  }
    this.rehabFormGroup.controls.consultLegalFormGroup.get('consult_legal_yes').setValue('');
    this.rehabFormGroup.controls.consultLegalFormGroup.get('consult_legal_yes').clearValidators();
    this.rehabFormGroup.controls.consultLegalFormGroup.get('consult_legal_yes').updateValueAndValidity();
    this.rehabFormGroup.controls.consultLegalFormGroup.get('consult_legal_date').setValue('');
    this.rehabFormGroup.controls.consultLegalFormGroup.get('consult_legal_date').clearValidators();
    this.rehabFormGroup.controls.consultLegalFormGroup.get('consult_legal_date').updateValueAndValidity();
    
  }

}

taskCheck17($event:MatCheckboxChange){
  if ($event.checked == true) {
    this.taskValidationArray.push(17);
    this.none_visible = false;
    this.rehabFormGroup.controls.noneAboveFormGroup.get('check19').setValue(false);
    this.rehabFormGroup.controls.noneAboveFormGroup.get('none_reason').setValue('');
    this.rehabFormGroup.controls.noneAboveFormGroup.get('none_reason').clearValidators();
    this.rehabFormGroup.controls.noneAboveFormGroup.get('none_reason').updateValueAndValidity();
    this.rehabFormGroup.get('review_date').setValue('');
    this.rehabFormGroup.get('review_date').clearValidators();
    this.rehabFormGroup.get('review_date').updateValueAndValidity();
    this.rehabFormGroup.controls.bankAccountFormGroup.get('bank_account_yes').setValidators(Validators.required);
    this.rehabFormGroup.controls.bankAccountFormGroup.get('bank_account_yes').updateValueAndValidity();
    this.rehabFormGroup.controls.bankAccountFormGroup.get('bank_account_date').setValidators(Validators.required);
    this.rehabFormGroup.controls.bankAccountFormGroup.get('bank_account_date').updateValueAndValidity();
  } else {
    const index = this.taskValidationArray.indexOf(17);
    if (index > -1) {
      this.taskValidationArray.splice(index, 1);
    }
    if(this.taskValidationArray.length < 1){
    
      this.none_visible = true;
      this.noneChecked = false;
    
  }
    this.rehabFormGroup.controls.bankAccountFormGroup.get('bank_account_yes').setValue('');
    this.rehabFormGroup.controls.bankAccountFormGroup.get('bank_account_yes').clearValidators();
    this.rehabFormGroup.controls.bankAccountFormGroup.get('bank_account_yes').updateValueAndValidity();
    this.rehabFormGroup.controls.bankAccountFormGroup.get('bank_account_date').setValue('');
    this.rehabFormGroup.controls.bankAccountFormGroup.get('bank_account_date').clearValidators();
    this.rehabFormGroup.controls.bankAccountFormGroup.get('bank_account_date').updateValueAndValidity();
    
  }

}

taskCheck18($event:MatCheckboxChange){
  if ($event.checked == true) {
    this.taskValidationArray.push(18);
    this.none_visible = false;
    this.rehabFormGroup.controls.noneAboveFormGroup.get('check19').setValue(false);
    this.rehabFormGroup.controls.noneAboveFormGroup.get('none_reason').setValue('');
    this.rehabFormGroup.controls.noneAboveFormGroup.get('none_reason').clearValidators();
    this.rehabFormGroup.controls.noneAboveFormGroup.get('none_reason').updateValueAndValidity();
    this.rehabFormGroup.get('review_date').setValue('');
    this.rehabFormGroup.get('review_date').clearValidators();
    this.rehabFormGroup.get('review_date').updateValueAndValidity();
    this.rehabFormGroup.controls.offerHelpFormGroup.get('offer_help_yes').setValidators(Validators.required);
    this.rehabFormGroup.controls.offerHelpFormGroup.get('offer_help_yes').updateValueAndValidity();
    this.rehabFormGroup.controls.offerHelpFormGroup.get('offer_help_date').setValidators(Validators.required);
    this.rehabFormGroup.controls.offerHelpFormGroup.get('offer_help_date').updateValueAndValidity();
  } else {
    const index = this.taskValidationArray.indexOf(18);
    if (index > -1) {
      this.taskValidationArray.splice(index, 1);
    }
    if(this.taskValidationArray.length < 1){
    
      this.none_visible = true;
      this.noneChecked = false;
    
  }
    this.rehabFormGroup.controls.offerHelpFormGroup.get('offer_help_yes').setValue('');
    this.rehabFormGroup.controls.offerHelpFormGroup.get('offer_help_yes').clearValidators();
    this.rehabFormGroup.controls.offerHelpFormGroup.get('offer_help_yes').updateValueAndValidity();
    this.rehabFormGroup.controls.offerHelpFormGroup.get('offer_help_date').setValue('');
    this.rehabFormGroup.controls.offerHelpFormGroup.get('offer_help_date').clearValidators();
    this.rehabFormGroup.controls.offerHelpFormGroup.get('offer_help_date').updateValueAndValidity();
    
  }

}

taskCheck19($event:MatCheckboxChange){
  if ($event.checked == true) {
    
    this.noneChecked = true;
    this.rehabFormGroup.controls.noneAboveFormGroup.get('none_reason').setValidators(Validators.required);
    this.rehabFormGroup.controls.noneAboveFormGroup.get('none_reason').updateValueAndValidity();
    this.rehabFormGroup.get('review_date').setValidators(Validators.required);
    this.rehabFormGroup.get('review_date').updateValueAndValidity();
    
  } else {
    this.noneChecked = false;
    this.rehabFormGroup.controls.noneAboveFormGroup.get('none_reason').setValue('');
    this.rehabFormGroup.controls.noneAboveFormGroup.get('none_reason').clearValidators();
    this.rehabFormGroup.controls.noneAboveFormGroup.get('none_reason').updateValueAndValidity();
    this.rehabFormGroup.get('review_date').setValue('');
    this.rehabFormGroup.get('review_date').clearValidators();
    this.rehabFormGroup.get('review_date').updateValueAndValidity();
    
  }

}

async getTasks(){
  let tasks_array_first :any;
  this.tasks_array = [];
  let test = await this.patientService.getPatientTasks(this.patient_uuid).then(result2 => {
   
    tasks_array_first=result2;

 });

 
    for(var i = 0; i<tasks_array_first.length;i++){
    
      if(tasks_array_first[i].task_type == 1){
     
       this.check1_uuid = tasks_array_first[i].tasks_uuid;
       this.check1_status = tasks_array_first[i].status;
        this.optionCheck1 = true;
        this.check1_remark = tasks_array_first[i].task_details;
        this.check1_date1 = tasks_array_first[i].task_due_date; 
        this.check1_date = new Date(tasks_array_first[i].task_due_date); 

        let date = ("0" + this.check1_date.getDate()).slice(-2);
      let month = ("0" + (this.check1_date.getMonth() + 1)).slice(-2);
      let year =this.check1_date.getFullYear();
      this.check1_date = date + "-" + month + "-" + year;
       
        if(tasks_array_first[i].status == "pending" || tasks_array_first[i].status == "In Progress"){
          this.statusArray1[0].checked = true;
        }else if(tasks_array_first[i].status == "Completed"){
          this.statusArray1[1].checked = true;

        }else{
          this.statusArray1[2].checked = true;
        }
      }
      if(tasks_array_first[i].task_type == 2){
        this.check2_uuid = tasks_array_first[i].tasks_uuid;
        this.check2_status = tasks_array_first[i].status;
        this.optionCheck2 = true;
        this.check2_remark = tasks_array_first[i].task_details; 
        this.check2_date1 = tasks_array_first[i].task_due_date; 
        this.check2_date = new Date(tasks_array_first[i].task_due_date); 

        let date = ("0" + this.check2_date.getDate()).slice(-2);
        let month = ("0" + (this.check2_date.getMonth() + 1)).slice(-2);
        let year =this.check2_date.getFullYear();
        this.check2_date = date + "-" + month + "-" + year;
        if(tasks_array_first[i].status == "pending" || tasks_array_first[i].status == "In Progress"){
          this.statusArray2[0].checked = true;
        }else if(tasks_array_first[i].status == "Completed"){
          this.statusArray2[1].checked = true;

        }else{
          this.statusArray2[2].checked = true;
        }
      }
      if(tasks_array_first[i].task_type == 3){
        this.check3_uuid = tasks_array_first[i].tasks_uuid;
        this.check3_status = tasks_array_first[i].status;
        this.optionCheck3 = true;
        this.check3_remark = tasks_array_first[i].task_details;
        this.check3_date1 = tasks_array_first[i].task_due_date; 
        this.check3_date = new Date(tasks_array_first[i].task_due_date); 
        let date = ("0" + this.check3_date.getDate()).slice(-2);
        let month = ("0" + (this.check3_date.getMonth() + 1)).slice(-2);
        let year =this.check3_date.getFullYear();
        this.check3_date = date + "-" + month + "-" + year;
        if(tasks_array_first[i].status == "pending" || tasks_array_first[i].status == "In Progress"){
          this.statusArray3[0].checked = true;
        }else if(tasks_array_first[i].status == "Completed"){
          this.statusArray3[1].checked = true;

        }else{
          this.statusArray3[2].checked = true;
        } 
      }
      if(tasks_array_first[i].task_type == 4){
        this.check4_uuid = tasks_array_first[i].tasks_uuid;
        this.check4_status = tasks_array_first[i].status;
        this.optionCheck4 = true;
        this.check4_remark = tasks_array_first[i].task_details; 
        this.check4_date1 = tasks_array_first[i].task_due_date; 
        this.check4_date = new Date(tasks_array_first[i].task_due_date); 
        let date = ("0" + this.check4_date.getDate()).slice(-2);
        let month = ("0" + (this.check4_date.getMonth() + 1)).slice(-2);
        let year =this.check4_date.getFullYear();
        this.check4_date = date + "-" + month + "-" + year;
        if(tasks_array_first[i].status == "pending" || tasks_array_first[i].status == "In Progress"){
          this.statusArray4[0].checked = true;
        }else if(tasks_array_first[i].status == "Completed"){
          this.statusArray4[1].checked = true;

        }else{
          this.statusArray4[2].checked = true;
        }
      }
      if(tasks_array_first[i].task_type == 5){
        this.check5_uuid = tasks_array_first[i].tasks_uuid;
        this.check5_status = tasks_array_first[i].status;
        this.optionCheck5 = true;
        this.check5_remark = tasks_array_first[i].task_details; 
        this.check5_date1 = tasks_array_first[i].task_due_date; 
        this.check5_date = new Date(tasks_array_first[i].task_due_date); 
        let date = ("0" + this.check5_date.getDate()).slice(-2);
        let month = ("0" + (this.check5_date.getMonth() + 1)).slice(-2);
        let year =this.check5_date.getFullYear();
        this.check5_date = date + "-" + month + "-" + year;
        if(tasks_array_first[i].status == "pending" || tasks_array_first[i].status == "In Progress"){
          this.statusArray5[0].checked = true;
        }else if(tasks_array_first[i].status == "Completed"){
          this.statusArray5[1].checked = true;

        }else{
          this.statusArray5[2].checked = true;
        }
      }
      if(tasks_array_first[i].task_type == 6){
        this.check6_uuid = tasks_array_first[i].tasks_uuid;
        this.check6_status = tasks_array_first[i].status;
        this.optionCheck6 = true;
        this.check6_remark = tasks_array_first[i].task_details; 
        this.check6_date1 = tasks_array_first[i].task_due_date; 
        this.check6_date = new Date(tasks_array_first[i].task_due_date); 
        let date = ("0" + this.check6_date.getDate()).slice(-2);
        let month = ("0" + (this.check6_date.getMonth() + 1)).slice(-2);
        let year =this.check6_date.getFullYear();
        this.check6_date = date + "-" + month + "-" + year;
        if(tasks_array_first[i].status == "pending" || tasks_array_first[i].status == "In Progress"){
          this.statusArray6[0].checked = true;
        }else if(tasks_array_first[i].status == "Completed"){
          this.statusArray6[1].checked = true;

        }else{
          this.statusArray6[2].checked = true;
        }
      }
      if(tasks_array_first[i].task_type == 7){
        this.check7_uuid = tasks_array_first[i].tasks_uuid;
        this.check7_status = tasks_array_first[i].status;
        this.optionCheck7 = true;
        this.check7_remark = tasks_array_first[i].task_details; 
        this.check7_date1 = tasks_array_first[i].task_due_date;
        this.check7_date = new Date(tasks_array_first[i].task_due_date); 
        let date = ("0" + this.check7_date.getDate()).slice(-2);
        let month = ("0" + (this.check7_date.getMonth() + 1)).slice(-2);
        let year =this.check7_date.getFullYear();
        this.check7_date = date + "-" + month + "-" + year;
        if(tasks_array_first[i].status == "pending" || tasks_array_first[i].status == "In Progress"){
          this.statusArray7[0].checked = true;
        }else if(tasks_array_first[i].status == "Completed"){
          this.statusArray7[1].checked = true;

        }else{
          this.statusArray7[2].checked = true;
        } 
      }
      if(tasks_array_first[i].task_type == 8){
        this.check8_uuid = tasks_array_first[i].tasks_uuid;
        this.check8_status = tasks_array_first[i].status;
        this.optionCheck8 = true;
        this.check8_remark = tasks_array_first[i].task_details; 
        this.check8_date1 = tasks_array_first[i].task_due_date; 
        this.check8_date = new Date(tasks_array_first[i].task_due_date); 
        let date = ("0" + this.check8_date.getDate()).slice(-2);
        let month = ("0" + (this.check8_date.getMonth() + 1)).slice(-2);
        let year =this.check8_date.getFullYear();
        this.check8_date = date + "-" + month + "-" + year;
        if(tasks_array_first[i].status == "pending" || tasks_array_first[i].status == "In Progress"){
          this.statusArray8[0].checked = true;
        }else if(tasks_array_first[i].status == "Completed"){
          this.statusArray8[1].checked = true;

        }else{
          this.statusArray8[2].checked = true;
        }
      }
      if(tasks_array_first[i].task_type == 9){
        this.check9_uuid = tasks_array_first[i].tasks_uuid;
        this.check9_status = tasks_array_first[i].status;
        this.optionCheck9 = true;
        this.check9_remark = tasks_array_first[i].task_details; 
        this.check9_date1 = tasks_array_first[i].task_due_date; 
        this.check9_date = new Date(tasks_array_first[i].task_due_date); 
        let date = ("0" + this.check9_date.getDate()).slice(-2);
        let month = ("0" + (this.check9_date.getMonth() + 1)).slice(-2);
        let year =this.check9_date.getFullYear();
        this.check9_date = date + "-" + month + "-" + year;
        if(tasks_array_first[i].status == "pending" || tasks_array_first[i].status == "In Progress"){
          this.statusArray9[0].checked = true;
        }else if(tasks_array_first[i].status == "Completed"){
          this.statusArray9[1].checked = true;

        }else{
          this.statusArray9[2].checked = true;
        }
      }
      if(tasks_array_first[i].task_type == 10){
        this.check10_uuid = tasks_array_first[i].tasks_uuid;
        this.check10_status = tasks_array_first[i].status;
        this.optionCheck10 = true;
        this.check10_remark = tasks_array_first[i].task_details; 
        this.check10_date1 = tasks_array_first[i].task_due_date; 
        this.check10_date = new Date(tasks_array_first[i].task_due_date); 
        let date = ("0" + this.check10_date.getDate()).slice(-2);
        let month = ("0" + (this.check10_date.getMonth() + 1)).slice(-2);
        let year =this.check10_date.getFullYear();
        this.check10_date = date + "-" + month + "-" + year;
        if(tasks_array_first[i].status == "pending" || tasks_array_first[i].status == "In Progress"){
          this.statusArray10[0].checked = true;
        }else if(tasks_array_first[i].status == "Completed"){
          this.statusArray10[1].checked = true;

        }else{
          this.statusArray10[2].checked = true;
        }
      }
      if(tasks_array_first[i].task_type == 11){
        this.check11_uuid = tasks_array_first[i].tasks_uuid;
        this.check11_status = tasks_array_first[i].status;
        this.optionCheck11 = true;
        this.check11_remark = tasks_array_first[i].task_details; 
        this.check11_date1 = tasks_array_first[i].task_due_date;
        this.check11_date = new Date(tasks_array_first[i].task_due_date); 
        let date = ("0" + this.check11_date.getDate()).slice(-2);
        let month = ("0" + (this.check11_date.getMonth() + 1)).slice(-2);
        let year =this.check11_date.getFullYear();
        this.check11_date = date + "-" + month + "-" + year;
        if(tasks_array_first[i].status == "pending" || tasks_array_first[i].status == "In Progress"){
          this.statusArray11[0].checked = true;
        }else if(tasks_array_first[i].status == "Completed"){
          this.statusArray11[1].checked = true;

        }else{
          this.statusArray11[2].checked = true;
        }
      }
      if(tasks_array_first[i].task_type == 12){
        this.check12_uuid = tasks_array_first[i].tasks_uuid;
        this.check12_status = tasks_array_first[i].status;
        this.optionCheck12 = true;
        this.check12_remark = tasks_array_first[i].task_details; 
        this.check12_date1 = tasks_array_first[i].task_due_date;
        this.check12_date = new Date(tasks_array_first[i].task_due_date); 
        let date = ("0" + this.check12_date.getDate()).slice(-2);
        let month = ("0" + (this.check12_date.getMonth() + 1)).slice(-2);
        let year =this.check12_date.getFullYear();
        this.check12_date = date + "-" + month + "-" + year;
        if(tasks_array_first[i].status == "pending" || tasks_array_first[i].status == "In Progress"){
          this.statusArray12[0].checked = true;
        }else if(tasks_array_first[i].status == "Completed"){
          this.statusArray12[1].checked = true;

        }else{
          this.statusArray12[2].checked = true;
        }
      }
      if(tasks_array_first[i].task_type == 13){
        this.check13_uuid = tasks_array_first[i].tasks_uuid;
        this.check13_status = tasks_array_first[i].status;
        this.optionCheck13 = true;
        this.check13_remark = tasks_array_first[i].task_details; 
        this.check13_date1 = tasks_array_first[i].task_due_date;
        this.check13_date = new Date(tasks_array_first[i].task_due_date); 
        let date = ("0" + this.check13_date.getDate()).slice(-2);
        let month = ("0" + (this.check13_date.getMonth() + 1)).slice(-2);
        let year =this.check13_date.getFullYear();
        this.check13_date = date + "-" + month + "-" + year;
        if(tasks_array_first[i].status == "pending" || tasks_array_first[i].status == "In Progress"){
          this.statusArray13[0].checked = true;
        }else if(tasks_array_first[i].status == "Completed"){
          this.statusArray13[1].checked = true;

        }else{
          this.statusArray13[2].checked = true;
        }
      }
      if(tasks_array_first[i].task_type == 14){
        this.check14_uuid = tasks_array_first[i].tasks_uuid;
        this.check14_status = tasks_array_first[i].status;
        this.optionCheck14 = true;
        this.check14_remark = tasks_array_first[i].task_details; 
        this.check14_date1 = tasks_array_first[i].task_due_date;
        this.check14_date = new Date(tasks_array_first[i].task_due_date); 
        let date = ("0" + this.check14_date.getDate()).slice(-2);
        let month = ("0" + (this.check14_date.getMonth() + 1)).slice(-2);
        let year =this.check14_date.getFullYear();
        this.check14_date = date + "-" + month + "-" + year;
        if(tasks_array_first[i].status == "pending" || tasks_array_first[i].status == "In Progress"){
          this.statusArray14[0].checked = true;
        }else if(tasks_array_first[i].status == "Completed"){
          this.statusArray14[1].checked = true;

        }else{
          this.statusArray14[2].checked = true;
        }
      }
      if(tasks_array_first[i].task_type == 15){
        this.check15_uuid = tasks_array_first[i].tasks_uuid;
        this.check15_status = tasks_array_first[i].status;
        this.optionCheck15 = true;
        this.check15_remark = tasks_array_first[i].task_details; 
        this.check15_date1 = tasks_array_first[i].task_due_date;
        this.check15_date = new Date(tasks_array_first[i].task_due_date); 
        let date = ("0" + this.check15_date.getDate()).slice(-2);
        let month = ("0" + (this.check15_date.getMonth() + 1)).slice(-2);
        let year =this.check15_date.getFullYear();
        this.check15_date = date + "-" + month + "-" + year;
        if(tasks_array_first[i].status == "pending" || tasks_array_first[i].status == "In Progress"){
          this.statusArray15[0].checked = true;
        }else if(tasks_array_first[i].status == "Completed"){
          this.statusArray15[1].checked = true;

        }else{
          this.statusArray15[2].checked = true;
        }
      }
      if(tasks_array_first[i].task_type == 16){
        this.check16_uuid = tasks_array_first[i].tasks_uuid;
        this.check16_status = tasks_array_first[i].status;
        this.optionCheck16 = true;
        this.check16_remark = tasks_array_first[i].task_details; 
        this.check16_date1 = tasks_array_first[i].task_due_date;
        this.check16_date = new Date(tasks_array_first[i].task_due_date); 
        let date = ("0" + this.check16_date.getDate()).slice(-2);
        let month = ("0" + (this.check16_date.getMonth() + 1)).slice(-2);
        let year =this.check16_date.getFullYear();
        this.check16_date = date + "-" + month + "-" + year;
        if(tasks_array_first[i].status == "pending" || tasks_array_first[i].status == "In Progress"){
          this.statusArray16[0].checked = true;
        }else if(tasks_array_first[i].status == "Completed"){
          this.statusArray16[1].checked = true;

        }else{
          this.statusArray16[2].checked = true;
        }
      }
      if(tasks_array_first[i].task_type == 17){
        this.check17_uuid = tasks_array_first[i].tasks_uuid;
        this.check17_status = tasks_array_first[i].status;
        this.optionCheck17 = true;
        this.check17_remark = tasks_array_first[i].task_details; 
        this.check17_date1 = tasks_array_first[i].task_due_date;
       
        this.check17_date = new Date(tasks_array_first[i].task_due_date); 
        let date = ("0" + this.check17_date.getDate()).slice(-2);
        let month = ("0" + (this.check17_date.getMonth() + 1)).slice(-2);
        let year =this.check17_date.getFullYear();
        this.check17_date = date + "-" + month + "-" + year;
        if(tasks_array_first[i].status == "pending" || tasks_array_first[i].status == "In Progress"){
          this.statusArray17[0].checked = true;
        }else if(tasks_array_first[i].status == "Completed"){
          this.statusArray17[1].checked = true;

        }else{
          this.statusArray17[2].checked = true;
        }
      }
      if(tasks_array_first[i].task_type == 18){
        this.check18_uuid = tasks_array_first[i].tasks_uuid;
        this.check18_status = tasks_array_first[i].status;
        this.optionCheck18 = true;
        this.check18_remark = tasks_array_first[i].task_details; 
        this.check18_date1 = tasks_array_first[i].task_due_date;
        this.check18_date = new Date(tasks_array_first[i].task_due_date); 
        let date = ("0" + this.check18_date.getDate()).slice(-2);
        let month = ("0" + (this.check18_date.getMonth() + 1)).slice(-2);
        let year =this.check18_date.getFullYear();
        this.check18_date = date + "-" + month + "-" + year;
        if(tasks_array_first[i].status == "pending" || tasks_array_first[i].status == "In Progress"){
          this.statusArray18[0].checked = true;
        }else if(tasks_array_first[i].status == "Completed"){
          this.statusArray18[1].checked = true;

        }else{
          this.statusArray18[2].checked = true;
        }
      }
      if(tasks_array_first[i].task_type == 19){
      
        this.check19_uuid = tasks_array_first[i].tasks_uuid;
        this.check19_status = tasks_array_first[i].status;
        this.optionCheck19 = true;
        this.check19_remark = tasks_array_first[i].task_details; 
        this.check19_date1 = tasks_array_first[i].task_due_date;
        this.check19_date = new Date(tasks_array_first[i].task_due_date); 
        let date = ("0" + this.check19_date.getDate()).slice(-2);
        let month = ("0" + (this.check19_date.getMonth() + 1)).slice(-2);
        let year =this.check19_date.getFullYear();
        this.check19_date = date + "-" + month + "-" + year;
      
        if(tasks_array_first[i].status == "pending" || tasks_array_first[i].status == "In Progress"){
          this.statusArray19[0].checked = true;
        }else if(tasks_array_first[i].status == "Completed"){
          this.statusArray19[1].checked = true;

        }else{
          this.statusArray19[2].checked = true;
        }
      }
      
    }
    
    
  
}


  submitRehab(rehabFormGroup){

    let statusAyyay = [];
    let statusObj1 = {};
    let statusObj2 = {};
    let statusObj3 = {};
    let statusObj4 = {};
    let statusObj5 = {};
    let statusObj6 = {};
    let statusObj7 = {};
    let statusObj8 = {};
    let statusObj9 = {};
    let statusObj10 = {};
    let statusObj11 = {};
    let statusObj12 = {};
    let statusObj13 = {};
    let statusObj14 = {};
    let statusObj15 = {};
    let statusObj16 = {};
    let statusObj17 = {};
    let statusObj18 = {};
    let statusObj19 = {};

    if(this.optionCheck1){
      if(this.rehabFormGroup.controls.options1FormGroup.get('opt1').value != ""){
        this.check1_status = this.rehabFormGroup.controls.options1FormGroup.get('opt1').value
      }else{
        this.check1_status = this.check1_status;
      }

      if(this.rehabFormGroup.controls.options1FormGroup.get('opt1_remark').value != ""){
      
        this.check1_remark = this.rehabFormGroup.controls.options1FormGroup.get('opt1_remark').value;
      }else{
      
        this.check1_remark =this.check1_remark ;
      }

      if(this.rehabFormGroup.controls.options1FormGroup.get('opt1_date').value != ""){
       
      let follow_up_date1 = this.rehabFormGroup.controls.options1FormGroup.get('opt1_date').value;
     
      this.check1_date = follow_up_date1;
      }else{
       
        this.check1_date = this.check1_date1 ;
      }

      statusObj1 = {
        uuid:this.check1_uuid,
        task_status:this.check1_status,
        task_remark:this.check1_remark,
        task_date:this.check1_date,

      }
      
      statusAyyay.push(statusObj1);
    }

    if(this.optionCheck2){
      
      if(this.rehabFormGroup.controls.options2FormGroup.get('opt2').value != ""){
        this.check2_status = this.rehabFormGroup.controls.options2FormGroup.get('opt2').value
      }else{
        this.check2_status = this.check2_status;
      }

      if(this.rehabFormGroup.controls.options2FormGroup.get('opt2_remark').value != ""){
        this.check2_remark = this.rehabFormGroup.controls.options2FormGroup.get('opt2_remark').value;
      }else{
      
        this.check2_remark =this.check2_remark ;
      }

      if(this.rehabFormGroup.controls.options2FormGroup.get('opt2_date').value != ""){
      let follow_up_date1 = this.rehabFormGroup.controls.options2FormGroup.get('opt2_date').value;
     
      this.check2_date = follow_up_date1;
      }else{
       
        this.check2_date = this.check2_date1 ;
      }

      statusObj2 = {
        uuid:this.check2_uuid,
        task_status:this.check2_status,
        task_remark:this.check2_remark,
        task_date:this.check2_date,

      }
     
      statusAyyay.push(statusObj2);
    }
    if(this.optionCheck3){
      if(this.rehabFormGroup.controls.options3FormGroup.get('opt3').value != ""){
        this.check3_status = this.rehabFormGroup.controls.options3FormGroup.get('opt3').value;
      }else{
       
        this.check3_status = this.check3_status;
      }

      if(this.rehabFormGroup.controls.options3FormGroup.get('opt3_remark').value != ""){
        this.check3_remark = this.rehabFormGroup.controls.options3FormGroup.get('opt3_remark').value;
      }else{
       
        this.check3_remark =this.check3_remark ;
      }

      if(this.rehabFormGroup.controls.options3FormGroup.get('opt3_date').value != ""){
      let follow_up_date1 = this.rehabFormGroup.controls.options3FormGroup.get('opt3_date').value;
      
      this.check3_date = follow_up_date1;
      }else{
       
        this.check3_date = this.check3_date1 ;
      }

      statusObj3 = {
        uuid:this.check3_uuid,
        task_status:this.check3_status,
        task_remark:this.check3_remark,
        task_date:this.check3_date,

      }
     
      statusAyyay.push(statusObj3);
    }

    if(this.optionCheck4){
      if(this.rehabFormGroup.controls.options4FormGroup.get('opt4').value != ""){
        this.check4_status = this.rehabFormGroup.controls.options4FormGroup.get('opt4').value
      }else{
        this.check4_status = this.check4_status;
      }

      if(this.rehabFormGroup.controls.options4FormGroup.get('opt4_remark').value != ""){
        this.check4_remark = this.rehabFormGroup.controls.options4FormGroup.get('opt4_remark').value;
      }else{
        this.check4_remark =this.check4_remark ;
      }

      if(this.rehabFormGroup.controls.options4FormGroup.get('opt4_date').value != ""){
      let follow_up_date1 = this.rehabFormGroup.controls.options4FormGroup.get('opt4_date').value;
     
      this.check4_date = follow_up_date1;
      }else{
        this.check4_date = this.check4_date1 ;
      }

      statusObj4 = {
        uuid:this.check4_uuid,
        task_status:this.check4_status,
        task_remark:this.check4_remark,
        task_date:this.check4_date,

      }
     
      statusAyyay.push(statusObj4);
    }

    if(this.optionCheck5){
      if(this.rehabFormGroup.controls.options5FormGroup.get('opt5').value != ""){
        this.check5_status = this.rehabFormGroup.controls.options5FormGroup.get('opt5').value
      }else{
        this.check5_status = this.check5_status;
      }

      if(this.rehabFormGroup.controls.options5FormGroup.get('opt5_remark').value != ""){
        this.check5_remark = this.rehabFormGroup.controls.options5FormGroup.get('opt5_remark').value;
      }else{
        this.check5_remark =this.check5_remark ;
      }

      if(this.rehabFormGroup.controls.options5FormGroup.get('opt5_date').value != ""){
      let follow_up_date1 = this.rehabFormGroup.controls.options5FormGroup.get('opt5_date').value;
     
      this.check5_date = follow_up_date1;
      }else{
        this.check5_date = this.check5_date1 ;
      }

      statusObj5 = {
        uuid:this.check5_uuid,
        task_status:this.check5_status,
        task_remark:this.check5_remark,
        task_date:this.check5_date,

      }
      
      statusAyyay.push(statusObj5);
    }

    if(this.optionCheck6){
      if(this.rehabFormGroup.controls.options6FormGroup.get('opt6').value != ""){
        this.check6_status = this.rehabFormGroup.controls.options6FormGroup.get('opt6').value
      }else{
        this.check6_status = this.check6_status;
      }

      if(this.rehabFormGroup.controls.options6FormGroup.get('opt6_remark').value != ""){
        this.check6_remark = this.rehabFormGroup.controls.options6FormGroup.get('opt6_remark').value;
      }else{
        this.check6_remark =this.check6_remark ;
      }

      if(this.rehabFormGroup.controls.options6FormGroup.get('opt6_date').value != ""){
      let follow_up_date1 = this.rehabFormGroup.controls.options6FormGroup.get('opt6_date').value;
      
      this.check6_date = follow_up_date1;
      }else{
        this.check6_date = this.check6_date1 ;
      }

      statusObj6 = {
        uuid:this.check6_uuid,
        task_status:this.check6_status,
        task_remark:this.check6_remark,
        task_date:this.check6_date,

      }
      
      statusAyyay.push(statusObj6);
    }

    if(this.optionCheck7){
      if(this.rehabFormGroup.controls.options7FormGroup.get('opt7').value != ""){
        this.check7_status = this.rehabFormGroup.controls.options7FormGroup.get('opt7').value
      }else{
        this.check7_status = this.check7_status;
      }

      if(this.rehabFormGroup.controls.options7FormGroup.get('opt7_remark').value != ""){
        this.check7_remark = this.rehabFormGroup.controls.options7FormGroup.get('opt7_remark').value;
      }else{
        this.check7_remark =this.check7_remark ;
      }

      if(this.rehabFormGroup.controls.options7FormGroup.get('opt7_date').value != ""){
      let follow_up_date1 = this.rehabFormGroup.controls.options7FormGroup.get('opt7_date').value;
      
      this.check7_date = follow_up_date1;
      }else{
        this.check7_date = this.check7_date1 ;
      }

      statusObj7 = {
        uuid:this.check7_uuid,
        task_status:this.check7_status,
        task_remark:this.check7_remark,
        task_date:this.check7_date,

      }
     
      statusAyyay.push(statusObj7);
    }

    if(this.optionCheck8){
      if(this.rehabFormGroup.controls.options8FormGroup.get('opt8').value != ""){
        this.check8_status = this.rehabFormGroup.controls.options8FormGroup.get('opt8').value
      }else{
        this.check8_status = this.check8_status;
      }

      if(this.rehabFormGroup.controls.options8FormGroup.get('opt8_remark').value != ""){
        this.check8_remark = this.rehabFormGroup.controls.options8FormGroup.get('opt8_remark').value;
      }else{
        this.check8_remark =this.check8_remark ;
      }

      if(this.rehabFormGroup.controls.options8FormGroup.get('opt8_date').value != ""){
      let follow_up_date1 = this.rehabFormGroup.controls.options8FormGroup.get('opt8_date').value;
     
      this.check8_date = follow_up_date1;
      }else{
        this.check8_date = this.check8_date1 ;
      }

      statusObj8 = {
        uuid:this.check8_uuid,
        task_status:this.check8_status,
        task_remark:this.check8_remark,
        task_date:this.check8_date,

      }
     
      statusAyyay.push(statusObj8);
    }

    if(this.optionCheck9){
      if(this.rehabFormGroup.controls.options9FormGroup.get('opt9').value != ""){
        this.check9_status = this.rehabFormGroup.controls.options9FormGroup.get('opt9').value
      }else{
        this.check9_status = this.check9_status;
      }

      if(this.rehabFormGroup.controls.options9FormGroup.get('opt9_remark').value != ""){
        this.check9_remark = this.rehabFormGroup.controls.options9FormGroup.get('opt9_remark').value;
      }else{
        this.check9_remark =this.check9_remark ;
      }

      if(this.rehabFormGroup.controls.options9FormGroup.get('opt9_date').value != ""){
      let follow_up_date1 = this.rehabFormGroup.controls.options9FormGroup.get('opt9_date').value;
      
      this.check9_date = follow_up_date1;
      }else{
        this.check9_date = this.check9_date1 ;
      }

      statusObj9 = {
        uuid:this.check9_uuid,
        task_status:this.check9_status,
        task_remark:this.check9_remark,
        task_date:this.check9_date,

      }
     
      statusAyyay.push(statusObj9);
    }

    if(this.optionCheck10){
      if(this.rehabFormGroup.controls.options10FormGroup.get('opt10').value != ""){
        this.check10_status = this.rehabFormGroup.controls.options10FormGroup.get('opt10').value
      }else{
        this.check10_status = this.check10_status;
      }

      if(this.rehabFormGroup.controls.options10FormGroup.get('opt10_remark').value != ""){
        this.check10_remark = this.rehabFormGroup.controls.options10FormGroup.get('opt10_remark').value;
      }else{
        this.check10_remark =this.check10_remark ;
      }

      if(this.rehabFormGroup.controls.options10FormGroup.get('opt10_date').value != ""){
      let follow_up_date1 = this.rehabFormGroup.controls.options10FormGroup.get('opt10_date').value;
     
      this.check10_date = follow_up_date1;
      }else{
        this.check10_date = this.check10_date1 ;
      }

      statusObj10 = {
        uuid:this.check10_uuid,
        task_status:this.check10_status,
        task_remark:this.check10_remark,
        task_date:this.check10_date,

      }
     
      statusAyyay.push(statusObj10);
    }

    if(this.optionCheck11){
      if(this.rehabFormGroup.controls.options11FormGroup.get('opt11').value != ""){
        this.check11_status = this.rehabFormGroup.controls.options11FormGroup.get('opt11').value
      }else{
        this.check11_status = this.check11_status;
      }

      if(this.rehabFormGroup.controls.options11FormGroup.get('opt11_remark').value != ""){
        this.check11_remark = this.rehabFormGroup.controls.options11FormGroup.get('opt11_remark').value;
      }else{
        this.check11_remark =this.check11_remark ;
      }

      if(this.rehabFormGroup.controls.options11FormGroup.get('opt11_date').value != ""){
      let follow_up_date1 = this.rehabFormGroup.controls.options11FormGroup.get('opt11_date').value;
      
      this.check11_date = follow_up_date1;
      }else{
        this.check11_date = this.check11_date1 ;
      }

      statusObj11 = {
        uuid:this.check11_uuid,
        task_status:this.check11_status,
        task_remark:this.check11_remark,
        task_date:this.check11_date,

      }
     
      statusAyyay.push(statusObj11);
    }

    if(this.optionCheck12){
      if(this.rehabFormGroup.controls.options12FormGroup.get('opt12').value != ""){
        this.check12_status = this.rehabFormGroup.controls.options12FormGroup.get('opt12').value
      }else{
        this.check12_status = this.check12_status;
      }

      if(this.rehabFormGroup.controls.options12FormGroup.get('opt12_remark').value != ""){
        this.check12_remark = this.rehabFormGroup.controls.options12FormGroup.get('opt12_remark').value;
      }else{
        this.check12_remark =this.check12_remark ;
      }

      if(this.rehabFormGroup.controls.options12FormGroup.get('opt12_date').value != ""){
      let follow_up_date1 = this.rehabFormGroup.controls.options12FormGroup.get('opt12_date').value;
     
      this.check12_date = follow_up_date1;
      }else{
        this.check12_date = this.check12_date1 ;
      }

      statusObj12 = {
        uuid:this.check12_uuid,
        task_status:this.check12_status,
        task_remark:this.check12_remark,
        task_date:this.check12_date,

      }
      
      statusAyyay.push(statusObj12);
    }

    if(this.optionCheck13){
      if(this.rehabFormGroup.controls.options13FormGroup.get('opt13').value != ""){
        this.check13_status = this.rehabFormGroup.controls.options13FormGroup.get('opt13').value
      }else{
        this.check13_status = this.check13_status;
      }

      if(this.rehabFormGroup.controls.options13FormGroup.get('opt13_remark').value != ""){
        this.check13_remark = this.rehabFormGroup.controls.options13FormGroup.get('opt13_remark').value;
      }else{
        this.check13_remark =this.check13_remark ;
      }

      if(this.rehabFormGroup.controls.options13FormGroup.get('opt13_date').value != ""){
      let follow_up_date1 = this.rehabFormGroup.controls.options13FormGroup.get('opt13_date').value;
    
      this.check13_date = follow_up_date1;
      }else{
        this.check13_date = this.check13_date1 ;
      }

      statusObj13 = {
        uuid:this.check13_uuid,
        task_status:this.check13_status,
        task_remark:this.check13_remark,
        task_date:this.check13_date,

      }
     
      statusAyyay.push(statusObj13);
    }
    
    if(this.optionCheck14){
      if(this.rehabFormGroup.controls.options14FormGroup.get('opt14').value != ""){
        this.check14_status = this.rehabFormGroup.controls.options14FormGroup.get('opt14').value
      }else{
        this.check14_status = this.check14_status;
      }

      if(this.rehabFormGroup.controls.options14FormGroup.get('opt14_remark').value != ""){
        this.check14_remark = this.rehabFormGroup.controls.options14FormGroup.get('opt14_remark').value;
      }else{
        this.check14_remark =this.check14_remark ;
      }

      if(this.rehabFormGroup.controls.options14FormGroup.get('opt14_date').value != ""){
      let follow_up_date1 = this.rehabFormGroup.controls.options14FormGroup.get('opt14_date').value;
     
      this.check14_date = follow_up_date1;
      }else{
        this.check14_date = this.check14_date1 ;
      }

      statusObj14 = {
        uuid:this.check14_uuid,
        task_status:this.check14_status,
        task_remark:this.check14_remark,
        task_date:this.check14_date,

      }
    
      statusAyyay.push(statusObj14);
    }

      
    if(this.optionCheck15){
      if(this.rehabFormGroup.controls.options15FormGroup.get('opt15').value != ""){
        this.check15_status = this.rehabFormGroup.controls.options15FormGroup.get('opt15').value
      }else{
        this.check15_status = this.check15_status;
      }

      if(this.rehabFormGroup.controls.options15FormGroup.get('opt15_remark').value != ""){
        this.check15_remark = this.rehabFormGroup.controls.options15FormGroup.get('opt15_remark').value;
      }else{
        this.check15_remark =this.check15_remark ;
      }

      if(this.rehabFormGroup.controls.options15FormGroup.get('opt15_date').value != ""){
      let follow_up_date1 = this.rehabFormGroup.controls.options15FormGroup.get('opt15_date').value;
     
      this.check15_date = follow_up_date1;
      }else{
       
        this.check15_date = this.check15_date1 ;
      }

      statusObj15 = {
        uuid:this.check15_uuid,
        task_status:this.check15_status,
        task_remark:this.check15_remark,
        task_date:this.check15_date,

      }
     
      statusAyyay.push(statusObj15);
    }

    if(this.optionCheck16){
      if(this.rehabFormGroup.controls.options16FormGroup.get('opt16').value != ""){
        this.check16_status = this.rehabFormGroup.controls.options16FormGroup.get('opt16').value
      }else{
        this.check16_status = this.check16_status;
      }

      if(this.rehabFormGroup.controls.options16FormGroup.get('opt16_remark').value != ""){
        this.check16_remark = this.rehabFormGroup.controls.options16FormGroup.get('opt16_remark').value;
      }else{
        this.check16_remark =this.check16_remark ;
      }

      if(this.rehabFormGroup.controls.options16FormGroup.get('opt16_date').value != ""){
      let follow_up_date1 = this.rehabFormGroup.controls.options16FormGroup.get('opt16_date').value;
     
      this.check16_date = follow_up_date1;
      }else{
        this.check16_date = this.check16_date1 ;
      }

      statusObj16 = {
        uuid:this.check16_uuid,
        task_status:this.check16_status,
        task_remark:this.check16_remark,
        task_date:this.check16_date,

      }
      
      statusAyyay.push(statusObj16);
    }

    if(this.optionCheck17){
      if(this.rehabFormGroup.controls.options17FormGroup.get('opt17').value != ""){
        this.check17_status = this.rehabFormGroup.controls.options17FormGroup.get('opt17').value
      }else{
        this.check17_status = this.check17_status;
      }

      if(this.rehabFormGroup.controls.options17FormGroup.get('opt17_remark').value != ""){
        this.check17_remark = this.rehabFormGroup.controls.options17FormGroup.get('opt17_remark').value;
      }else{
        this.check17_remark =this.check17_remark ;
      }

      if(this.rehabFormGroup.controls.options17FormGroup.get('opt17_date').value != ""){
      let follow_up_date1 = this.rehabFormGroup.controls.options17FormGroup.get('opt17_date').value;
      
      this.check17_date = follow_up_date1;
      }else{
        this.check17_date = this.check17_date1 ;
      }

      statusObj17 = {
        uuid:this.check17_uuid,
        task_status:this.check17_status,
        task_remark:this.check17_remark,
        task_date:this.check17_date,

      }
     
      statusAyyay.push(statusObj17);
    }

    if(this.optionCheck18){
      if(this.rehabFormGroup.controls.options18FormGroup.get('opt18').value != ""){
        this.check18_status = this.rehabFormGroup.controls.options18FormGroup.get('opt18').value
      }else{
        this.check18_status = this.check18_status;
      }

      if(this.rehabFormGroup.controls.options18FormGroup.get('opt18_remark').value != ""){
        this.check18_remark = this.rehabFormGroup.controls.options18FormGroup.get('opt18_remark').value;
      }else{
        this.check18_remark =this.check18_remark ;
      }

      if(this.rehabFormGroup.controls.options18FormGroup.get('opt18_date').value != ""){
      let follow_up_date1 = this.rehabFormGroup.controls.options18FormGroup.get('opt18_date').value;
     
      this.check18_date = follow_up_date1;
      }else{
        this.check18_date = this.check18_date1 ;
      }

      statusObj18 = {
        uuid:this.check18_uuid,
        task_status:this.check18_status,
        task_remark:this.check18_remark,
        task_date:this.check18_date,

      }
    
      statusAyyay.push(statusObj18);
    }
   
    if(this.optionCheck19){
      if(this.rehabFormGroup.controls.options19FormGroup.get('opt19').value != ""){
        this.check19_status = this.rehabFormGroup.controls.options19FormGroup.get('opt19').value
      }else{
        this.check19_status = this.check19_status;
      }

      if(this.rehabFormGroup.controls.options19FormGroup.get('opt19_remark').value != ""){
        this.check19_remark = this.rehabFormGroup.controls.options19FormGroup.get('opt19_remark').value;
      }else{
        this.check19_remark =this.check19_remark ;
      }

      if(this.rehabFormGroup.controls.options19FormGroup.get('opt19_date').value != ""){
      let follow_up_date1 = this.rehabFormGroup.controls.options19FormGroup.get('opt19_date').value;
     
      this.check19_date = follow_up_date1;
      }else{
        this.check19_date = this.check19_date1 ;
      }

      statusObj19 = {
        uuid:this.check19_uuid,
        task_status:this.check19_status,
        task_remark:this.check19_remark,
        task_date:this.check19_date,

      }
    
      statusAyyay.push(statusObj19);
    }
    let fourthArray = [];
    let fourthObj1 = {};
    let fourthObj2 = {};
    let fourthObj3 = {};
    let fourthObj4 = {};
    let fourthObj5 = {};
    let fourthObj6 = {};
    let fourthObj7 = {};
    let fourthObj8 = {};
    let fourthObj9 = {};
    let fourthObj10 = {};
    let fourthObj11 = {};
    let fourthObj12 = {};
    let fourthObj13 = {};
    let fourthObj14 = {};
    let fourthObj15 = {};
    let fourthObj16 = {};
    let fourthObj17 = {};
    let fourthObj18 = {};
    let fourthObj19 = {};
   
    
    if(!this.rehabFormGroup.controls.localResourceFormGroup.get('check1').value){
      this.rehabFormGroup.removeControl('localResourceFormGroup');
    }else{
    
      let follow_up_date1 = this.rehabFormGroup.controls.localResourceFormGroup.get('local_resource_date').value;
      
      let follow_up_date = follow_up_date1;
      
      fourthObj1 = {
        check1:this.rehabFormGroup.controls.localResourceFormGroup.get('check1').value,
        option:1,
        task_details:this.rehabFormGroup.controls.localResourceFormGroup.get('local_resource_yes').value,
        date:follow_up_date,
      }
      fourthArray.push(fourthObj1);
    }

    if(!this.rehabFormGroup.controls.differentNeedsFormGroup.get('check2').value){
      this.rehabFormGroup.removeControl('differentNeedsFormGroup');
    }else{
      let follow_up_date1 = this.rehabFormGroup.controls.differentNeedsFormGroup.get('different_needs_date').value;
     
      let follow_up_date = follow_up_date1;
      fourthObj2 = {
        check2:this.rehabFormGroup.controls.differentNeedsFormGroup.get('check2').value,
        option:2,
        task_details:this.rehabFormGroup.controls.differentNeedsFormGroup.get('different_needs_yes').value,
        date:follow_up_date

      }
      fourthArray.push(fourthObj2);
    }

    if(!this.rehabFormGroup.controls.localFormGroup.get('check3').value){
      this.rehabFormGroup.removeControl('localFormGroup');
    }else{
      let follow_up_date1 =this.rehabFormGroup.controls.localFormGroup.get('local_industries_date').value;
     
      let follow_up_date = follow_up_date1;
      fourthObj3 = {
        check3:this.rehabFormGroup.controls.localFormGroup.get('check3').value,
        option:3,
        task_details:this.rehabFormGroup.controls.localFormGroup.get('local_industries_yes').value,
        date:follow_up_date

      }
      fourthArray.push(fourthObj3);
    }

    if(!this.rehabFormGroup.controls.skillDevFormGroup.get('check4').value){
      this.rehabFormGroup.removeControl('skillDevFormGroup');
    }else{
      let follow_up_date1 =this.rehabFormGroup.controls.skillDevFormGroup.get('skill_dev_date').value;
     
      let follow_up_date = follow_up_date1;
      fourthObj4 = {
        check4:this.rehabFormGroup.controls.skillDevFormGroup.get('check4').value,
        option:4,
        task_details:this.rehabFormGroup.controls.skillDevFormGroup.get('skill_dev_yes').value,
        date:follow_up_date

      }
      fourthArray.push(fourthObj4);
    }

    if(!this.rehabFormGroup.controls.selfEmployFormGroup.get('check5').value){
      this.rehabFormGroup.removeControl('selfEmployFormGroup');
    }else{
      let follow_up_date1 =this.rehabFormGroup.controls.selfEmployFormGroup.get('self_employ_date').value;
     
      let follow_up_date = follow_up_date1;
      fourthObj5 = {
        check5:this.rehabFormGroup.controls.selfEmployFormGroup.get('check5').value,
        option:5,
        task_details:this.rehabFormGroup.controls.selfEmployFormGroup.get('self_employ_yes').value,
        date:follow_up_date

      }
      fourthArray.push(fourthObj5);
    }

    if(!this.rehabFormGroup.controls.incomeGroup.get('check6').value){
      this.rehabFormGroup.removeControl('incomeGroup');
    }else{
      let follow_up_date1 =this.rehabFormGroup.controls.incomeGroup.get('income_generation_date').value;
     
      let follow_up_date = follow_up_date1;
      fourthObj6 = {
        check6:this.rehabFormGroup.controls.incomeGroup.get('check6').value,
        option:6,
        task_details:this.rehabFormGroup.controls.incomeGroup.get('income_generation_yes').value,
        date:follow_up_date,

      }
      fourthArray.push(fourthObj6);
    }

    if(!this.rehabFormGroup.controls.minergaGroup.get('check7').value){
      this.rehabFormGroup.removeControl('minergaGroup');
    }else{
      let follow_up_date1 =this.rehabFormGroup.controls.minergaGroup.get('minerga_date').value;
     
      let follow_up_date = follow_up_date1;
      fourthObj7 = {
        check7:this.rehabFormGroup.controls.minergaGroup.get('check7').value,
        option:7,
        task_details:this.rehabFormGroup.controls.minergaGroup.get('minerga_yes').value,
        date:follow_up_date

      }
      fourthArray.push(fourthObj7);
    }

    if(!this.rehabFormGroup.controls.daycareFormGroup.get('check8').value){
      this.rehabFormGroup.removeControl('daycareFormGroup');
    }else{
      let follow_up_date1 =this.rehabFormGroup.controls.daycareFormGroup.get('daycare_yes').value;
     
      let follow_up_date = follow_up_date1;
      fourthObj8 = {
        check8:this.rehabFormGroup.controls.daycareFormGroup.get('check8').value,
        option:8,
        task_details:this.rehabFormGroup.controls.daycareFormGroup.get('daycare').value,
        date:follow_up_date,

      }
      fourthArray.push(fourthObj8);
    }

    if(!this.rehabFormGroup.controls.cultutalEventFormGroup.get('check9').value){
      this.rehabFormGroup.removeControl('cultutalEventFormGroup');
    }else{
      let follow_up_date1 =this.rehabFormGroup.controls.cultutalEventFormGroup.get('cultural_event_yes').value;
      
      let follow_up_date = follow_up_date1;
      fourthObj9 = {
        check9:this.rehabFormGroup.controls.cultutalEventFormGroup.get('check9').value,
        option:9,
        task_details:this.rehabFormGroup.controls.cultutalEventFormGroup.get('cultural_event').value,
        date:follow_up_date

      }
      fourthArray.push(fourthObj9);
    }

    if(!this.rehabFormGroup.controls.educationFormGroup.get('check10').value){
      this.rehabFormGroup.removeControl('educationFormGroup');
    }else{
      let follow_up_date1 =this.rehabFormGroup.controls.educationFormGroup.get('education_date').value;
     
      let follow_up_date = follow_up_date1;
      fourthObj10 = {
        check10:this.rehabFormGroup.controls.educationFormGroup.get('check10').value,
        option:10,
        task_details:this.rehabFormGroup.controls.educationFormGroup.get('education_yes').value,
        date:follow_up_date

      }
      fourthArray.push(fourthObj10);
    }

    if(!this.rehabFormGroup.controls.idProofFormGroup.get('check11').value){
      this.rehabFormGroup.removeControl('idProofFormGroup');
    }else{
      let follow_up_date1 =this.rehabFormGroup.controls.idProofFormGroup.get('id_proof_date').value;
     
      let follow_up_date = follow_up_date1;
      fourthObj11 = {
        check11:this.rehabFormGroup.controls.idProofFormGroup.get('check11').value,
        option:11,
        task_details:this.rehabFormGroup.controls.idProofFormGroup.get('id_proof_yes').value,
        date:follow_up_date

      }
      fourthArray.push(fourthObj11);
    }

    if(!this.rehabFormGroup.controls.insClaimFormGroup.get('check12').value){
      this.rehabFormGroup.removeControl('insClaimFormGroup');
    }else{
      let follow_up_date1 =this.rehabFormGroup.controls.insClaimFormGroup.get('ins_claim_date').value;
      
      let follow_up_date = follow_up_date1;
      fourthObj12 = {
        check12:this.rehabFormGroup.controls.insClaimFormGroup.get('check12').value,
        option:12,
        task_details:this.rehabFormGroup.controls.insClaimFormGroup.get('ins_claim_yes').value,
        date:follow_up_date

      }
      fourthArray.push(fourthObj12);
    }

    if(!this.rehabFormGroup.controls.physicianFormGroup.get('check13').value){
      this.rehabFormGroup.removeControl('physicianFormGroup');
    }else{
      let follow_up_date1 =this.rehabFormGroup.controls.physicianFormGroup.get('physician_date').value;
    
      let follow_up_date = follow_up_date1;
      fourthObj13 = {
        check13:this.rehabFormGroup.controls.physicianFormGroup.get('check13').value,
        option:13,
        task_details:this.rehabFormGroup.controls.physicianFormGroup.get('physician_yes').value,
        date:follow_up_date

      }
      fourthArray.push(fourthObj13);
    }

    if(!this.rehabFormGroup.controls.legalFormGroup.get('check14').value){
      this.rehabFormGroup.removeControl('legalFormGroup');
    }else{
      let follow_up_date1 =this.rehabFormGroup.controls.legalFormGroup.get('legal_date').value;
     
      let follow_up_date = follow_up_date1;
      fourthObj14 = {
        check14:this.rehabFormGroup.controls.legalFormGroup.get('check14').value,
        option:14,
        task_details:this.rehabFormGroup.controls.legalFormGroup.get('legal_yes').value,
        date:follow_up_date

      }
      fourthArray.push(fourthObj14);
    }

    if(!this.rehabFormGroup.controls.liaiseFormGroup.get('check15').value){
      this.rehabFormGroup.removeControl('liaiseFormGroup');
    }else{
      let follow_up_date1 =this.rehabFormGroup.controls.liaiseFormGroup.get('liase_date').value;
     
      let follow_up_date = follow_up_date1;
      fourthObj15 = {
        check15:this.rehabFormGroup.controls.liaiseFormGroup.get('check15').value,
        option:15,
        task_details:this.rehabFormGroup.controls.liaiseFormGroup.get('liase_yes').value,
        date:follow_up_date,

      }
      fourthArray.push(fourthObj15);
    }

    if(!this.rehabFormGroup.controls.consultLegalFormGroup.get('check16').value){
      this.rehabFormGroup.removeControl('consultLegalFormGroup');
    }else{
      let follow_up_date1 =this.rehabFormGroup.controls.consultLegalFormGroup.get('consult_legal_date').value;
     
      let follow_up_date = follow_up_date1;
      fourthObj16 = {
        check16:this.rehabFormGroup.controls.consultLegalFormGroup.get('check16').value,
        option:16,
        task_details:this.rehabFormGroup.controls.consultLegalFormGroup.get('consult_legal_yes').value,
        date:follow_up_date

      }
      fourthArray.push(fourthObj16);
    }

    if(!this.rehabFormGroup.controls.bankAccountFormGroup.get('check17').value){
      this.rehabFormGroup.removeControl('bankAccountFormGroup');
    }else{
      let follow_up_date1 =this.rehabFormGroup.controls.bankAccountFormGroup.get('bank_account_date').value;
      
      let follow_up_date = follow_up_date1;

      fourthObj17 = {
        check17:this.rehabFormGroup.controls.bankAccountFormGroup.get('check17').value,
        option:17,
        task_details:this.rehabFormGroup.controls.bankAccountFormGroup.get('bank_account_yes').value,
        date:follow_up_date

      }
      fourthArray.push(fourthObj17);
    }

    if(!this.rehabFormGroup.controls.offerHelpFormGroup.get('check18').value){
      this.rehabFormGroup.removeControl('offerHelpFormGroup');
    }else{
      let follow_up_date1 =this.rehabFormGroup.controls.offerHelpFormGroup.get('offer_help_date').value;
     
      let follow_up_date = follow_up_date1;

      fourthObj18 = {
        check18:this.rehabFormGroup.controls.offerHelpFormGroup.get('check18').value,
        option:18,
        task_details:this.rehabFormGroup.controls.offerHelpFormGroup.get('offer_help_yes').value,
        date:follow_up_date

      }
      fourthArray.push(fourthObj18);
     
    }

    if(!this.rehabFormGroup.controls.noneAboveFormGroup.get('check19').value){
      this.rehabFormGroup.removeControl('noneAboveFormGroup');
    }else{
      let follow_up_date1 =this.rehabFormGroup.get('review_date').value;
     
      let follow_up_date = follow_up_date1;

      fourthObj19 = {
        check19:this.rehabFormGroup.controls.noneAboveFormGroup.get('check19').value,
        option:19,
        task_details:this.rehabFormGroup.controls.noneAboveFormGroup.get('none_reason').value,
        date:follow_up_date

      }
      fourthArray.push(fourthObj19);
     
    }
    
     console.log(fourthArray)
      this.patientService.addNewTask(this.patient_uuid,fourthArray,statusAyyay).then(() => {
         
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


  previous(){
  
    this.router.navigate(['patient-details']);
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
