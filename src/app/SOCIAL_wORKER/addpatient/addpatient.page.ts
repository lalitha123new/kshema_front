import { Component, OnInit,ViewChild,Input, Output, EventEmitter, ViewEncapsulation  } from '@angular/core';
import {MatStepperModule} from '@angular/material/stepper';
import {FormBuilder,FormControl,FormGroupDirective,NgForm, FormGroup, Validators,ValidatorFn} from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import {Location} from '@angular/common';
import {  MatStepper} from '@angular/material/stepper';
import { Router } from '@angular/router';
import { MatRadioChange } from '@angular/material/radio';
import { MatCheckboxChange } from '@angular/material/checkbox';
import {MatSelectChange } from '@angular/material/select';
import { LoadingController } from '@ionic/angular';
import { PatientLocation } from 'src/app/location.model';
import { switchMap, take } from 'rxjs/operators';
import { PatientService } from 'src/app/services/patient.service';
import { NavController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { ServerService } from 'src/app/services/server.service';
import * as uuid from 'uuid';
import { UUID } from 'angular2-uuid';
import { AlertController } from '@ionic/angular';
import { DatePipe } from '@angular/common';
import { OfflineManagerService } from '../../services/offline-manager.service';





interface select_optons {
  value: string;
  viewValue: string;
}

interface language_optons {
  value: string;
  viewValue: string;
}

interface gender_optons {
  value: string;
  viewValue: string;
}

interface district_optons{
  value: number;
  viewValue: string;
}

interface taluk_optons{
  value_taluk: number;
  viewValue_taluk: string;
}

interface visit_place{
  value_visit: string;
  viewValue_visit: string;
}

interface alcohol_options{
  value: string;
  viewValue_alcohol: string;
}

interface tobacco_options{
  value: string;
  viewValue: string;
}
interface uuid_options{
  value: any;
  viewValue_uuid: any;
}
interface valid_options{
  value: any;
  viewValue_valid: any;
}

interface participant_options{
  value: string;
  viewValue_participant: string;
}

interface consent_options{
  value: string;
  viewValue_consent: string;
}

interface rating_options{
  value: string;
  viewValue_rating: string;
}

interface amount_options{
  value: string;
  viewValue_amount: string;
}

interface rateOptions{
  value: string;
  viewValue_rateoption: string;
}

@Component({
  selector: 'app-addpatient',
  templateUrl: './addpatient.page.html',
  styleUrls: ['./addpatient.page.scss'],
})
export class AddpatientPage implements OnInit {

  dataReturned: any;
  firstFormGroup: any;

  secondFormGroup: any;
  tobaccoFormGroup: any;
  tobaccoYesSelected: Boolean = false;
  alcoholFormGroup: any;
  alcoholYesSelected: Boolean = false;
  otherYesSelected: Boolean = false;
  otherFormGroup:any;
  public newSymptom: any = {};
  public symptomArray: Array<any> = [];

  thirdFormGroup: any;
  skillFormGroup:any;
  skillYesSelected: Boolean = false;
  jobFormGroup:any;
  jobYesSelected: Boolean = false;
  interestActFormGroup:any;
  interestActYesSelected: Boolean = false;
  communityFormGroup:any;
  communityYesSelected: Boolean = false;
  dailyYesSelected:Boolean = false;
  houseYesSelected:Boolean = false;
  financeYesSelected:Boolean = false;
  otherAssessYesSelected:Boolean = false;
  dailyFormGroup:any;
  houseFormGroup:any;
  financeFormGroup:any;
  otherHelpFormGroup:any;

  fourthFormGroup: any;
  localResourceFormGroup:any;
  differentNeedsFormGroup:any;
  differentNeedsYesSelected: Boolean = false;
  localFormGroup:any;
  localIndYesSelected: Boolean = false;
  skillDevFormGroup:any;
  selfEmployFormGroup:any;
  selfEmployYesSelected: Boolean = false;
  incomeGroup:any;
  minergaGroup:any;
  daycareFormGroup:any;
  daycareYesSelected: Boolean = false;
  cultutalEventFormGroup:any;
  cultutalEventYesSelected: Boolean = false;
  educationFormGroup:any;
  idProofFormGroup:any;
  insClaimFormGroup:any;
  physicianFormGroup:any;
  legalFormGroup:any;
  liaiseFormGroup:any;
  consultLegalFormGroup:any;
  bankAccountFormGroup:any;
  offerHelpFormGroup:any;
  noneAboveFormGroup:any;
  UUIDFormGroup:any;
  validUUIDFormGroup:any;
  renewUUIdFormGroup:any;
  benefitFormGroup:any;
  isYes = false;


  fifthFormGroup: any;
  meditationFormGroup:any;
  medicationHelpFormGroup:any;
  medYesSelected: Boolean = false;
  medHelpYesSelected:Boolean = false;
  counsellingFormGroup:any;
  counsellingYesSelected: Boolean = false;
  referralFormGroup:any;
  referralYesSelected: Boolean = false;
  psychoFormGroup:any;
  psychoYesSelected: Boolean = false;
  psychoInterFormGroup:any;
  psychoInterYesSelected: Boolean = false;
  participantFormGroup:any;
  consentFormGroup:any;
  participantsData:any;
  consentData:any;
  consent_array = [];
 
  isValue: number = 1; 

  today: any;
  patDob: any;
  dateToday;
  taluk_array :any;
  phc_array:any;
  district_array:any;
  follow_place_other = false;
  noneChecked = false;
  taskValidationArray = [];
  rateSymptom = false;
  compRate = false;
  domainArray = [];
  domainValid = false;

  patObject = {
    name : '',
    gender : '',
    dob : '',
    phone : '',
    caregiver_name: '',
    caregiver_phone: '',
    address1: '',
    method_reach: '',
    district_selected : '',
    taluk_selected: '',
    contact_patient: '',
    psw_incharge: '',

    
    phc_symptom_rate:'',
    test_reason:'',
    suspicious:'',
    hallucinatory:'',
    verbal:'',
    social_isolation:'',
    poor_selfcare:'',
    sleep:'',
    work:'',
    diagnosis: '',
    tobacco:'',
    tobacco_yes:'',
    tobocco_amount:'',
    alcohol:'',
    alcohol_yes:'',
    alcohol_amount:'',
    other:'',
    other_yes:'',
    other_amount:'',

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
    other_help_yes:'',
    uuid:'',
    uuid_valid:'',
    uuid_renew:'',
    uuid_renew_remark:'',
    uuid_renew_follow_up:'',
    dis_benefit:'',
    dis_benefit_remark:'',
    dis_benefit_follow_up:'',

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
    notebook:false,

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
    review_date:'',

    diagnosis_step5:'',
    pat_compliance_rate:'',
    comp_reason:'',
    meditation:'',
    meditation_yes:'',
    medication_help:'',
    medication_help_yes:'',
    counselling:'',
    counselling_yes:'',
    referral:'',
    referral_yes:'',
    follow_up_date:'',
    phc:'',
    phc_other:'',
    notes:'',
    psychoeducation:'',
    psychoeducation_yes:'',
    psychointervension:'',
    psychointervension_yes:'',
    med_refill_date:'',
    participant_details:'',
    file_upload:'',

  };

  show = false;
  task1Checked:Boolean = false;
  task2Checked:Boolean = false;
  task3Checked:Boolean = false;
  task4Checked:Boolean = false;
  task5Checked:Boolean = false;
  task6Checked:Boolean = false;
  task7Checked:Boolean = false;
  task8Checked:Boolean = false;
  task9Checked:Boolean = false;
  task10Checked:Boolean = false;
  task11Checked:Boolean = false;
  task12Checked:Boolean = false;
  task13Checked:Boolean = false;
  task14Checked:Boolean = false;
  task15Checked:Boolean = false;
  task16Checked:Boolean = false;
  task17Checked:Boolean = false;
  task18Checked:Boolean = false;
  reniewUUIDYesSelected:Boolean = false;
  needBenefitYesSelected:Boolean = false;
  
  constructor(private _formBuilder: FormBuilder,private _location: Location,private router: Router, private patientService: PatientService,
    private loadingCtrl: LoadingController, private route: ActivatedRoute,
    private navCtrl: NavController,private dialogModel: MatDialog,private serverService: ServerService,
    public alertController: AlertController,private datePipe: DatePipe,private offlineManager : OfflineManagerService) { }
  
    @ViewChild('stepper') stepper: MatStepper;

  user_name;
  sw_id1;
  sw_id;
  user_id1;
  user_id;
  taluk_id1;
  taluk_id;
  group_data_id1;
  group_data_id;
  rate1 = "Unable to rate";
  rate2 = "Unable to rate";
  symp_reason_visible = true;
  comp_reason_visible = true;
  none_visible = true;
  public fieldArray: Array<any> = [];
  public newAttribute: any = {};
  selectedFile: File[] = [];
  selectedFile1: File[] = [];
  x = 0;
  fileContent:any;
  filePath:any;
  isDisabled = false;


  ngOnInit() {
    
    this.today = new Date();
    this.patDob = new Date();
    this.patDob.setDate(this.today.getDate() - 6575);
   
    this.firstFormGroup = this._formBuilder.group({
      name: new FormControl(this.patObject.name, Validators.required),
      gender:new FormControl(this.patObject.gender, Validators.required),
      dob : new FormControl(this.patObject.dob, Validators.required),
      phone : new FormControl(this.patObject.phone, Validators.required),
      caregiver_name: new FormControl(this.patObject.caregiver_name, ),
      caregiver_phone: new FormControl(this.patObject.caregiver_phone, ),
      address1: new FormControl(this.patObject.address1, Validators.required),
      method_reach: new FormControl(this.patObject.method_reach, ),
      district_selected : new FormControl(this.patObject.district_selected, Validators.required),
      taluk_selected: new FormControl(this.patObject.taluk_selected, Validators.required),
      contact_patient: new FormControl(this.patObject.contact_patient, ),
    });

  this.secondFormGroup = this._formBuilder.group({
    phc_symptom_rate:new FormControl(this.patObject.phc_symptom_rate),
    suspicious:new FormControl(this.patObject.suspicious),
    hallucinatory:new FormControl(this.patObject.hallucinatory),
    verbal:new FormControl(this.patObject.verbal),
    social_isolation:new FormControl(this.patObject.social_isolation),
    poor_selfcare:new FormControl(this.patObject.poor_selfcare),
    sleep:new FormControl(this.patObject.sleep),
    work:new FormControl(this.patObject.work),
    test_reason:new FormControl(this.patObject.test_reason),
    diagnosis: new FormControl(this.patObject.diagnosis),
   

    tobaccoFormGroup: new FormGroup({
      tobacco:new FormControl(this.patObject.tobacco, Validators.required),
      tobacco_yes:new FormControl(this.patObject.tobacco),
      tobocco_amount:new FormControl(this.patObject.tobocco_amount)
    }),

    alcoholFormGroup:new FormGroup({
      alcohol:new FormControl(this.patObject.alcohol, Validators.required),
      alcohol_yes:new FormControl(this.patObject.alcohol_yes),
      alcohol_amount:new FormControl(this.patObject.alcohol_amount)
    }),

    otherFormGroup:new FormGroup({
      other:new FormControl(this.patObject.alcohol, Validators.required),
      other_yes:new FormControl(this.patObject.other_yes),
      other_amount:new FormControl(this.patObject.other_amount)
    }),
  })


  this.thirdFormGroup = this._formBuilder.group({
    description:new FormControl(this.patObject.description, Validators.required),
    skillFormGroup:new FormGroup({
    skill:new FormControl(this.patObject.skill, Validators.required),
    skill_yes:new FormControl(this.patObject.skill_yes),
  }),
  jobFormGroup:new FormGroup({
    job:new FormControl(this.patObject.job, Validators.required),
    job_yes:new FormControl(this.patObject.job_yes),
  }),
  interestActFormGroup:new FormGroup({
    interest_act:new FormControl(this.patObject.interest_act, Validators.required),
    interest_act_yes:new FormControl(this.patObject.interest_act_yes),
  }),
  communityFormGroup:new FormGroup({
    community:new FormControl(this.patObject.community, Validators.required),
    community_yes:new FormControl(this.patObject.community_yes),
  }),

  dailyFormGroup:new FormGroup({
    daily:new FormControl(this.patObject.daily, Validators.required),
    daily_yes:new FormControl(this.patObject.daily_yes),
  }),
  houseFormGroup:new FormGroup({
    house:new FormControl(this.patObject.house, Validators.required),
    house_yes:new FormControl(this.patObject.house_yes),
  }),
  financeFormGroup:new FormGroup({
    finance:new FormControl(this.patObject.finance, Validators.required),
    finance_yes:new FormControl(this.patObject.finance_yes),
  }),
  otherHelpFormGroup:new FormGroup({
    other_help:new FormControl(this.patObject.other_help, Validators.required),
    other_help_yes:new FormControl(this.patObject.other_help_yes),
  }),
  })


  this.fourthFormGroup = this._formBuilder.group({


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
  UUIDFormGroup:new FormGroup({
    uuid:new FormControl(this.patObject.uuid,Validators.required),
  }),
  validUUIDFormGroup:new FormGroup({
    uuid_valid:new FormControl(this.patObject.uuid_valid),
  }),
  renewUUIdFormGroup:new FormGroup({
    uuid_renew:new FormControl(this.patObject.uuid_renew,Validators.required),
    uuid_renew_remark:new FormControl(this.patObject.uuid_renew_remark),
    uuid_renew_follow_up:new FormControl(this.patObject.uuid_renew_follow_up),
  }),
  benefitFormGroup:new FormGroup({
    dis_benefit:new FormControl(this.patObject.dis_benefit,Validators.required),
    dis_benefit_remark:new FormControl(this.patObject.dis_benefit_remark),
    dis_benefit_follow_up:new FormControl(this.patObject.dis_benefit_follow_up),
  }),
  review_date: new FormControl(this.patObject.review_date,[]),
 
  })


this.fifthFormGroup = this._formBuilder.group({
  notebook:new FormControl(this.patObject.notebook),
  diagnosis_step5:new FormControl(this.patObject.diagnosis_step5, Validators.required),
  pat_compliance_rate:new FormControl(this.patObject.pat_compliance_rate),
  comp_reason:new FormControl(this.patObject.comp_reason),
      meditationFormGroup:new FormGroup({
      meditation:new FormControl(this.patObject.meditation,Validators.required),
      meditation_yes:new FormControl(this.patObject.meditation),
    }),
    medicationHelpFormGroup:new FormGroup({
      medication_help:new FormControl(this.patObject.medication_help,Validators.required),
      medication_help_yes:new FormControl(this.patObject.medication_help_yes),
    }),
 
  
    counsellingFormGroup:new FormGroup({
      counselling:new FormControl(this.patObject.counselling,Validators.required),
      counselling_yes:new FormControl(this.patObject.counselling_yes),
    }),
    referralFormGroup:new FormGroup({
      referral:new FormControl(this.patObject.referral,Validators.required),
      referral_yes:new FormControl(this.patObject.referral_yes),
    }),
     med_refill_date: new FormControl(this.patObject.med_refill_date,Validators.required),
    follow_up_date:new FormControl(this.patObject.follow_up_date, Validators.required),
    phc:new FormControl(this.patObject.phc, Validators.required),
    phc_other:new FormControl(this.patObject.phc_other),
    notes:new FormControl(this.patObject.notes),
    psychoFormGroup:new FormGroup({
      psychoeducation:new FormControl(this.patObject.psychoeducation,Validators.required),
      psychoeducation_yes:new FormControl(this.patObject.psychoeducation_yes),
    }),
    psychoInterFormGroup:new FormGroup({
      psychointervension:new FormControl(this.patObject.psychointervension,Validators.required),
      psychointervension_yes:new FormControl(this.patObject.psychointervension_yes),
    }),
    participantFormGroup: new FormGroup({
    },this.requireCheckboxesToBeCheckedValidator()),
    participant_details:new FormControl(this.patObject.participant_details,Validators.required),
   
    file_upload:new FormControl(this.patObject.file_upload)
  })
  this.setParticipantGroupControl();
 
  }

  ionViewWillEnter() {
    this.isDisabled = false;
    this.user_name = sessionStorage.getItem("user_name");
    this.sw_id1 = sessionStorage.getItem("sw_id");
    this.sw_id = parseInt(this.sw_id1);
    this.user_id1 = sessionStorage.getItem("users_id1");
    this.user_id = parseInt(this.user_id1);
    this.taluk_id1 = sessionStorage.getItem("taluk_id");
    this.taluk_id = parseInt(this.taluk_id1);
    this.group_data_id = sessionStorage.getItem("group_data_id");
    this.firstFormGroup = this._formBuilder.group({
      name: new FormControl(this.patObject.name, Validators.required),
      gender:new FormControl(this.patObject.gender, Validators.required),
      dob : new FormControl(this.patObject.dob, Validators.required),
      phone : new FormControl(this.patObject.phone, Validators.required),
      caregiver_name: new FormControl(this.patObject.caregiver_name, ),
      caregiver_phone: new FormControl(this.patObject.caregiver_phone, ),
      address1: new FormControl(this.patObject.address1, Validators.required),
      method_reach: new FormControl(this.patObject.method_reach, ),
      district_selected : new FormControl(this.patObject.district_selected, Validators.required),
      taluk_selected: new FormControl(this.patObject.taluk_selected, Validators.required),
      contact_patient: new FormControl(this.patObject.contact_patient, ),
     
    });

  this.secondFormGroup = this._formBuilder.group({
    phc_symptom_rate:new FormControl(this.patObject.phc_symptom_rate),
    suspicious:new FormControl(this.patObject.suspicious),
    hallucinatory:new FormControl(this.patObject.hallucinatory),
    verbal:new FormControl(this.patObject.verbal),
    social_isolation:new FormControl(this.patObject.social_isolation),
    poor_selfcare:new FormControl(this.patObject.poor_selfcare),
    sleep:new FormControl(this.patObject.sleep),
    work:new FormControl(this.patObject.work),
    test_reason:new FormControl(this.patObject.test_reason),
    diagnosis: new FormControl(this.patObject.diagnosis),
   

    tobaccoFormGroup: new FormGroup({
      tobacco:new FormControl(this.patObject.tobacco, Validators.required),
      tobacco_yes:new FormControl(this.patObject.tobacco),
      tobocco_amount:new FormControl(this.patObject.tobocco_amount)
    }),

    alcoholFormGroup:new FormGroup({
      alcohol:new FormControl(this.patObject.alcohol, Validators.required),
      alcohol_yes:new FormControl(this.patObject.alcohol_yes),
      alcohol_amount:new FormControl(this.patObject.alcohol_amount)
    }),

    otherFormGroup:new FormGroup({
      other:new FormControl(this.patObject.alcohol, Validators.required),
      other_yes:new FormControl(this.patObject.other_yes),
      other_amount:new FormControl(this.patObject.other_amount)
    }),
  })


  this.thirdFormGroup = this._formBuilder.group({
    description:new FormControl(this.patObject.description, Validators.required),
    skillFormGroup:new FormGroup({
    skill:new FormControl(this.patObject.skill, Validators.required),
    skill_yes:new FormControl(this.patObject.skill_yes),
  }),
  jobFormGroup:new FormGroup({
    job:new FormControl(this.patObject.job, Validators.required),
    job_yes:new FormControl(this.patObject.job_yes),
  }),
  interestActFormGroup:new FormGroup({
    interest_act:new FormControl(this.patObject.interest_act, Validators.required),
    interest_act_yes:new FormControl(this.patObject.interest_act_yes),
  }),
  communityFormGroup:new FormGroup({
    community:new FormControl(this.patObject.community, Validators.required),
    community_yes:new FormControl(this.patObject.community_yes),
  }),

  dailyFormGroup:new FormGroup({
    daily:new FormControl(this.patObject.daily, Validators.required),
    daily_yes:new FormControl(this.patObject.daily_yes),
  }),
  houseFormGroup:new FormGroup({
    house:new FormControl(this.patObject.house, Validators.required),
    house_yes:new FormControl(this.patObject.house_yes),
  }),
  financeFormGroup:new FormGroup({
    finance:new FormControl(this.patObject.finance, Validators.required),
    finance_yes:new FormControl(this.patObject.finance_yes),
  }),
  otherHelpFormGroup:new FormGroup({
    other_help:new FormControl(this.patObject.other_help, Validators.required),
    other_help_yes:new FormControl(this.patObject.other_help_yes),
  }),
  })


  this.fourthFormGroup = this._formBuilder.group({

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
  UUIDFormGroup:new FormGroup({
    uuid:new FormControl(this.patObject.uuid,Validators.required),
  }),
  validUUIDFormGroup:new FormGroup({
    uuid_valid:new FormControl(this.patObject.uuid_valid),
  }),
  renewUUIdFormGroup:new FormGroup({
    uuid_renew:new FormControl(this.patObject.uuid_renew,Validators.required),
    uuid_renew_remark:new FormControl(this.patObject.uuid_renew_remark),
    uuid_renew_follow_up:new FormControl(this.patObject.uuid_renew_follow_up),
  }),
  benefitFormGroup:new FormGroup({
    dis_benefit:new FormControl(this.patObject.dis_benefit,Validators.required),
    dis_benefit_remark:new FormControl(this.patObject.dis_benefit_remark),
    dis_benefit_follow_up:new FormControl(this.patObject.dis_benefit_follow_up),
  }),
  review_date: new FormControl(this.patObject.review_date,[]),
 
  })


this.fifthFormGroup = this._formBuilder.group({
  notebook:new FormControl(this.patObject.notebook),
  diagnosis_step5:new FormControl(this.patObject.diagnosis_step5, Validators.required),
  pat_compliance_rate:new FormControl(this.patObject.pat_compliance_rate),
  comp_reason:new FormControl(this.patObject.comp_reason),
      meditationFormGroup:new FormGroup({
      meditation:new FormControl(this.patObject.meditation,Validators.required),
      meditation_yes:new FormControl(this.patObject.meditation),
    }),
    medicationHelpFormGroup:new FormGroup({
      medication_help:new FormControl(this.patObject.medication_help,Validators.required),
      medication_help_yes:new FormControl(this.patObject.medication_help_yes),
    }),
 
  
    counsellingFormGroup:new FormGroup({
      counselling:new FormControl(this.patObject.counselling,Validators.required),
      counselling_yes:new FormControl(this.patObject.counselling_yes),
    }),
    referralFormGroup:new FormGroup({
      referral:new FormControl(this.patObject.referral,Validators.required),
      referral_yes:new FormControl(this.patObject.referral_yes),
    }),
    med_refill_date: new FormControl(this.patObject.med_refill_date,Validators.required),
    follow_up_date:new FormControl(this.patObject.follow_up_date, Validators.required),
    phc:new FormControl(this.patObject.phc, Validators.required),
    phc_other:new FormControl(this.patObject.phc_other),
    notes:new FormControl(this.patObject.notes),
    psychoFormGroup:new FormGroup({
      psychoeducation:new FormControl(this.patObject.psychoeducation,Validators.required),
      psychoeducation_yes:new FormControl(this.patObject.psychoeducation_yes),
    }),
    psychoInterFormGroup:new FormGroup({
      psychointervension:new FormControl(this.patObject.psychointervension,Validators.required),
      psychointervension_yes:new FormControl(this.patObject.psychointervension_yes),
    }),
    participantFormGroup: new FormGroup({
    },this.requireCheckboxesToBeCheckedValidator()),
    participant_details:new FormControl(this.patObject.participant_details,Validators.required),
   
    file_upload:new FormControl(this.patObject.file_upload)
  })
  this.setParticipantGroupControl();
   
  }

  getTaluks(){
   
    this.patientService.getTaluks().then((res) => {
    
      this.taluk_array = res;
   
    });
   
  }

  getPhcs(){
    this.patientService.getPhcs().then((res) => {
    
      this.phc_array = res;
     
   
    });
  }

  getDistricts(){
    this.patientService.getDistricts().then((res) => {
    
      this.district_array = res;
      
   
    });
  }


  logout(){
    this.router.navigate(['']);
  }

  setParticipantGroupControl(){
    this.participantArray.forEach((item, index) => {
      const control = new FormControl(false);
      (this.fifthFormGroup.controls.participantFormGroup as FormGroup).addControl(item.value, control);
    });

  }
  
 options: select_optons[] = [
  {value: '1', viewValue: 'Today'},
  {value: '2', viewValue: 'Tomorrow'},
  {value: '3', viewValue: 'Next week'}
];

languages: language_optons[] = [
  {value: '1', viewValue: 'English'},
  {value: '2', viewValue: 'Hindi'},
  {value: '3', viewValue: 'Kannada'}
];

gender: gender_optons[] = [
  {value: '1', viewValue: 'Male'},
  {value: '2', viewValue: 'Female'},
  {value: '3', viewValue: 'Others'}
];

district: district_optons[] = [
  {value: 1, viewValue: 'Koppala'},
  {value: 2, viewValue: 'Chikkaballapur'},
  {value: 3, viewValue: 'Tumkur'},
  {value: 4, viewValue: 'Uttara Kannada'},
  {value: 5, viewValue: 'Ballary'},
  {value: 6, viewValue: 'Gulbarga '},
  {value: 7, viewValue: 'Bijapur'},
  {value: 8, viewValue: 'Belgaum'},
  {value: 9, viewValue: 'Bidar'},
  {value: 10, viewValue: 'Bagalkote'}
];

taluk: taluk_optons[] = [
  {value_taluk: 1, viewValue_taluk: 'Gangavathi'},
  {value_taluk: 2, viewValue_taluk: 'Gauribidanur'},
  {value_taluk: 3, viewValue_taluk: 'Madhugiri'},
  {value_taluk: 4, viewValue_taluk: 'Sirsi'},
  {value_taluk: 5, viewValue_taluk: 'Hospete'},
  {value_taluk: 6, viewValue_taluk: 'Chitapur'},
  {value_taluk: 7, viewValue_taluk: 'Sindgi'},
  {value_taluk: 8, viewValue_taluk: 'Chikodi'},
  {value_taluk: 9, viewValue_taluk: 'Basavakalyan'},
  {value_taluk: 10, viewValue_taluk: 'Jamkhandi'},
 
];
visit_placenew: visit_place[] = [
  {value_visit: '1', viewValue_visit: 'PHC'},
  {value_visit: '2', viewValue_visit: 'Taluk Hospital'},
  {value_visit: '3', viewValue_visit: 'District Hospital'},
  {value_visit: '4', viewValue_visit: 'Others'},
  
];
tobaccooptionsArray: tobacco_options[] = [
  {value: '1', viewValue: 'Yes'},
  {value: '2', viewValue: 'No'}
 
];

uuidptionsArray: uuid_options[] = [
  {value: '1', viewValue_uuid: 'Yes'},
  {value: '2', viewValue_uuid: 'No'},
  {value: '3', viewValue_uuid: 'In progress'},
  {value: '4', viewValue_uuid: 'Yes, but has lost the UDID information'}
  
  
]

uuidValidptionsArray: valid_options[] = [
  {value: '1', viewValue_valid: 'Current and valid'},
  {value: '2', viewValue_valid: 'Needs Renewal'},
  {value: '3', viewValue_valid: 'Needs reassessment from medical board'},
  {value: '4', viewValue_valid: 'Not applicable'},
  {value: '5', viewValue_valid: 'Do not know'}
  
  
]

ratingArray: rating_options[] = [
  {value: '1', viewValue_rating: '1'},
  {value: '2', viewValue_rating: '2'},
  {value: '3', viewValue_rating: '3'},
  {value: '4', viewValue_rating: '4'},
  {value: '5', viewValue_rating: '5'}
 
];

Amount: amount_options[] = [
  {value: '1', viewValue_amount: 'Same level as last time'},
  {value: '2', viewValue_amount: 'Reduced amount'},
  {value: '3', viewValue_amount: 'Abstinent'},
  {value: '4', viewValue_amount: 'Increased use'}
  
]

alcoholoptionsArray: alcohol_options[] = [
  {value: '1', viewValue_alcohol: 'Yes'},
  {value: '2', viewValue_alcohol: 'No'}
 
];

participantArray: participant_options[] = [
  {value: '1', viewValue_participant: 'Patient'},
  {value: '2', viewValue_participant: 'Family'}
 
];

consentArray= [
  {value: "1", viewValue_consent: 'Phone Call'},
  {value: "2", viewValue_consent: 'Text Message'},
  {value: "3", viewValue_consent: 'Home Visit'}
 
];

rateOptionsArray:rateOptions[] = [
  {value: '1', viewValue_rateoption: 'Yes'},
  {value: '2', viewValue_rateoption: 'No'},
  {value: '3', viewValue_rateoption: 'Unable to rate'}
]

cancel(){
  this.router.navigate(['dashboard']);
}

backClick() {
  this._location.back();
  
}

home(){
  this.router.navigate(['dashboard']);
}
selectedDistrict(event: MatSelectChange){
  let selectedDist = {
    value: event.value,
    text: event.source.triggerValue
  };

 sessionStorage.setItem("district",selectedDist.text);
}
selectedTaluk(event: MatSelectChange){

  let selectedTaluk = {
    value: event.value,
    text: event.source.triggerValue
  };
 
 sessionStorage.setItem("taluk",selectedTaluk.text);
}

  //data from first tab of add patient form
  submitStep1(firstFormGroup){

    let firstObj = {
    
      gender:this.firstFormGroup.get('gender').value,
      dob:this.firstFormGroup.get('dob').value,
      address1:this.firstFormGroup.get('address1').value,
      caregiver_name:this.firstFormGroup.get('caregiver_name').value,
      caregiver_phone:this.firstFormGroup.get('caregiver_phone').value,
      district_selected:this.firstFormGroup.get('district_selected').value,
      method_reach:this.firstFormGroup.get('method_reach').value,
      phone:this.firstFormGroup.get('phone').value,
      taluk_selected:this.firstFormGroup.get('taluk_selected').value,
      contact_patient: this.firstFormGroup.get('contact_patient').value,

    }
    sessionStorage.setItem("name", this.firstFormGroup.get('name').value);
    sessionStorage.setItem("step1", JSON.stringify(firstObj));
    
    this.alertController.create({
      header: '',
      cssClass: 'my-custom-alert',
      subHeader: '',
      
      message: 'Are you sure, you want to add new Patient?',
      buttons: [
        {
          text: 'NO',
          cssClass: 'alertButton1',
          handler: () => {
            
          }
        },
        {
          text: 'Yes',
          cssClass: 'alertButton2',
          handler: () => {

            this.stepper.next();


            
           
            
          }
        
        }
      ]
    }).then(res => {
      res.present();
    });
    
  }

  pat_symptom_rate(event: any){
    this.secondFormGroup.phc_symptom_rate = event.value;
    this.rate2 =  this.secondFormGroup.phc_symptom_rate +"%" ;
    this.rateSymptom = true;
    this.symp_reason_visible = false;
  }

  addmanoProgramme(){
    this.symptomArray.push(this.newSymptom);
    this.newSymptom = {};
   
   
  }

  suspiciousClicked(){
   
    
    this.symp_reason_visible = false;
    this.domainArray.push(1);
    if(this.domainArray.length == 7){
      this.domainValid = true;
    }
  }

  hallucinatoryClicked(){
 
    this.symp_reason_visible = false;
    this.domainArray.push(2);
    if(this.domainArray.length == 7){
      this.domainValid = true;
    }
  }
  verbalClicked(){
    
    this.domainArray.push(3);
    if(this.domainArray.length == 7){
      this.domainValid = true;
    }
  }
  socialClicked(){
   
    this.symp_reason_visible = false;
    this.domainArray.push(4);
    if(this.domainArray.length == 7){
      this.domainValid = true;
    }
  }
  selfcareClicked(){
   
    this.symp_reason_visible = false;
    this.domainArray.push(5);
    if(this.domainArray.length == 7){
      this.domainValid = true;
    }
  }
  sleepClicked(){
   
    this.symp_reason_visible = false;
    this.domainArray.push(6);
    if(this.domainArray.length == 7){
     
      this.domainValid = true;
    }
  }
  workClicked(){
    this.symp_reason_visible = false;
    this.domainArray.push(7);
    if(this.domainArray.length == 7){
     
      this.domainValid = true;
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

  onKey5(event) {
    const inputValue = event.target.value;
    if(inputValue.length > 1){
      this.compRate= true;
      }else{
        this.compRate= false;
      }
  }

  submitStep2(secondFormGroup){

    this.secondFormGroup.value.symtom = this.symptomArray

    let clinicalObj = {
      phc_symptom_rate:this.secondFormGroup.get('phc_symptom_rate').value,
      test_reason:this.secondFormGroup.get('test_reason').value,
      diagnosis:  this.secondFormGroup.get('diagnosis').value,
      suspicious:this.secondFormGroup.get('suspicious').value,
      hallucinatory:this.secondFormGroup.get('hallucinatory').value,
      verbal:this.secondFormGroup.get('verbal').value,
      social_isolation:this.secondFormGroup.get('social_isolation').value,
      sleep:this.secondFormGroup.get('sleep').value,
      work:this.secondFormGroup.get('work').value,
      poor_selfcare:this.secondFormGroup.get('poor_selfcare').value,
      other_symptom:this.symptomArray,
      tobacco:this.secondFormGroup.controls.tobaccoFormGroup.get('tobacco').value,
      tobacco_yes:this.secondFormGroup.controls.tobaccoFormGroup.get('tobacco_yes').value,
      tobocco_amount:this.secondFormGroup.controls.tobaccoFormGroup.get('tobocco_amount').value,
      alcohol:this.secondFormGroup.controls.alcoholFormGroup.get('alcohol').value,
      alcohol_yes:this.secondFormGroup.controls.alcoholFormGroup.get('alcohol_yes').value,
      alcohol_amount:this.secondFormGroup.controls.alcoholFormGroup.get('alcohol_amount').value,
      other:this.secondFormGroup.controls.otherFormGroup.get('other').value,
      other_yes:this.secondFormGroup.controls.otherFormGroup.get('other_yes').value,
      other_amount:this.secondFormGroup.controls.otherFormGroup.get('other_amount').value,
      
    
    }

 
    sessionStorage.setItem("step2",JSON.stringify(clinicalObj));
    this.stepper.next();
    
  }

  requireCheckboxesToBeCheckedValidator(minRequired = 1): ValidatorFn {
    return function validate (formGroup: FormGroup) {
      let checked = 0;
  
      Object.keys(formGroup.controls).forEach(key => {
        const control = formGroup.controls[key];
  
        if (control.value === true) {
          checked ++;
        }
      });
  
      if (checked < minRequired) {
        return {
          requireOneCheckboxToBeChecked: true,
        };
      }
  
      return null;
    };
  }
  
  submitStep3(thirdFormGroup){

    let thirdObj = {
    
      add_help:this.thirdFormGroup.get('description').value,
      skill:this.thirdFormGroup.controls.skillFormGroup.get('skill').value,
      skill_yes:this.thirdFormGroup.controls.skillFormGroup.get('skill_yes').value,
      job:this.thirdFormGroup.controls.jobFormGroup.get('job').value,
      job_yes:this.thirdFormGroup.controls.jobFormGroup.get('job_yes').value,
      interest_act:this.thirdFormGroup.controls.interestActFormGroup.get('interest_act').value,
      job_interest_act_yesyes:this.thirdFormGroup.controls.interestActFormGroup.get('interest_act_yes').value,
      community:this.thirdFormGroup.controls.communityFormGroup.get('community').value,
      community_yes:this.thirdFormGroup.controls.communityFormGroup.get('community_yes').value,
      daily:this.thirdFormGroup.controls.dailyFormGroup.get('daily').value,
      daily_yes:this.thirdFormGroup.controls.dailyFormGroup.get('daily_yes').value,
      house:this.thirdFormGroup.controls.houseFormGroup.get('house').value,
      house_yes:this.thirdFormGroup.controls.houseFormGroup.get('house_yes').value,
      finance:this.thirdFormGroup.controls.financeFormGroup.get('finance').value,
      finance_yes:this.thirdFormGroup.controls.financeFormGroup.get('finance_yes').value,
      other_help:this.thirdFormGroup.controls.otherHelpFormGroup.get('other_help').value,
      other_help_yes:this.thirdFormGroup.controls.otherHelpFormGroup.get('other_help_yes').value,
    

    }
    sessionStorage.setItem("step3", JSON.stringify(thirdObj));
    this.stepper.next();
  }

  getPartDetails(participantFormGroup) {
    const tempInsCheckBox = [];
        this.participantArray.forEach((item, index) => {
            tempInsCheckBox.push({'name': item.viewValue_participant , 'value': item.value , 'checked': participantFormGroup.get(item.value).value});
           
       });
      return tempInsCheckBox;
  }

  getConsentDetails(consentFormGroup) {
    const tempInsCheckBox = [];
    this.consentArray.forEach((item, index) => {
      tempInsCheckBox.push({'name': item.viewValue_consent , 'value': item.value , 'checked': consentFormGroup.get(item.value).value});
     
  });  
      return tempInsCheckBox;
  }

  onFileChange1(file){
  
    this.patObject.file_upload = file.target.files;
  }
 
  submitStep4(fourthFormGroup){
    

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
    let fourthObj41 = {};
    let fourthObj42 = {};
   
    
    if(!this.fourthFormGroup.controls.localResourceFormGroup.get('check1').value){
      this.fourthFormGroup.removeControl('localResourceFormGroup');
    }else{
      
      let follow_up_date1 = this.fourthFormGroup.controls.localResourceFormGroup.get('local_resource_date').value;
     
      
      fourthObj1 = {
        check1:this.fourthFormGroup.controls.localResourceFormGroup.get('check1').value,
        option:1,
        task_details:this.fourthFormGroup.controls.localResourceFormGroup.get('local_resource_yes').value,
        date:follow_up_date1,
      }
      fourthArray.push(fourthObj1);
    }

    if(!this.fourthFormGroup.controls.differentNeedsFormGroup.get('check2').value){
      this.fourthFormGroup.removeControl('differentNeedsFormGroup');
    }else{
      let follow_up_date1 = this.fourthFormGroup.controls.differentNeedsFormGroup.get('different_needs_date').value;
     
      fourthObj2 = {
        check2:this.fourthFormGroup.controls.differentNeedsFormGroup.get('check2').value,
        option:2,
        task_details:this.fourthFormGroup.controls.differentNeedsFormGroup.get('different_needs_yes').value,
        date:follow_up_date1

      }
      fourthArray.push(fourthObj2);
    }

    if(!this.fourthFormGroup.controls.localFormGroup.get('check3').value){
      this.fourthFormGroup.removeControl('localFormGroup');
    }else{
      let follow_up_date1 =this.fourthFormGroup.controls.localFormGroup.get('local_industries_date').value;
      
      fourthObj3 = {
        check3:this.fourthFormGroup.controls.localFormGroup.get('check3').value,
        option:3,
        task_details:this.fourthFormGroup.controls.localFormGroup.get('local_industries_yes').value,
        date:follow_up_date1

      }
      fourthArray.push(fourthObj3);
    }

    if(!this.fourthFormGroup.controls.skillDevFormGroup.get('check4').value){
      this.fourthFormGroup.removeControl('skillDevFormGroup');
    }else{
      let follow_up_date1 =this.fourthFormGroup.controls.skillDevFormGroup.get('skill_dev_date').value;
      
      fourthObj4 = {
        check4:this.fourthFormGroup.controls.skillDevFormGroup.get('check4').value,
        option:4,
        task_details:this.fourthFormGroup.controls.skillDevFormGroup.get('skill_dev_yes').value,
        date:follow_up_date1

      }
      fourthArray.push(fourthObj4);
    }

    if(!this.fourthFormGroup.controls.selfEmployFormGroup.get('check5').value){
      this.fourthFormGroup.removeControl('selfEmployFormGroup');
    }else{
      let follow_up_date1 =this.fourthFormGroup.controls.selfEmployFormGroup.get('self_employ_date').value;
      
      fourthObj5 = {
        check5:this.fourthFormGroup.controls.selfEmployFormGroup.get('check5').value,
        option:5,
        task_details:this.fourthFormGroup.controls.selfEmployFormGroup.get('self_employ_yes').value,
        date:follow_up_date1

      }
      fourthArray.push(fourthObj5);
    }

    if(!this.fourthFormGroup.controls.incomeGroup.get('check6').value){
      this.fourthFormGroup.removeControl('incomeGroup');
    }else{
      let follow_up_date1 =this.fourthFormGroup.controls.incomeGroup.get('income_generation_date').value;
      
      fourthObj6 = {
        check6:this.fourthFormGroup.controls.incomeGroup.get('check6').value,
        option:6,
        task_details:this.fourthFormGroup.controls.incomeGroup.get('income_generation_yes').value,
        date:follow_up_date1,

      }
      fourthArray.push(fourthObj6);
    }

    if(!this.fourthFormGroup.controls.minergaGroup.get('check7').value){
      this.fourthFormGroup.removeControl('minergaGroup');
    }else{
      let follow_up_date1 =this.fourthFormGroup.controls.minergaGroup.get('minerga_date').value;
      
      fourthObj7 = {
        check7:this.fourthFormGroup.controls.minergaGroup.get('check7').value,
        option:7,
        task_details:this.fourthFormGroup.controls.minergaGroup.get('minerga_yes').value,
        date:follow_up_date1

      }
      fourthArray.push(fourthObj7);
    }

    if(!this.fourthFormGroup.controls.daycareFormGroup.get('check8').value){
      this.fourthFormGroup.removeControl('daycareFormGroup');
    }else{
      let follow_up_date1 =this.fourthFormGroup.controls.daycareFormGroup.get('daycare_yes').value;
      
      fourthObj8 = {
        check8:this.fourthFormGroup.controls.daycareFormGroup.get('check8').value,
        option:8,
        task_details:this.fourthFormGroup.controls.daycareFormGroup.get('daycare').value,
        date:follow_up_date1,

      }
      fourthArray.push(fourthObj8);
    }

    if(!this.fourthFormGroup.controls.cultutalEventFormGroup.get('check9').value){
      this.fourthFormGroup.removeControl('cultutalEventFormGroup');
    }else{
      let follow_up_date1 =this.fourthFormGroup.controls.cultutalEventFormGroup.get('cultural_event_yes').value;
      
      fourthObj9 = {
        check9:this.fourthFormGroup.controls.cultutalEventFormGroup.get('check9').value,
        option:9,
        task_details:this.fourthFormGroup.controls.cultutalEventFormGroup.get('cultural_event').value,
        date:follow_up_date1

      }
      fourthArray.push(fourthObj9);
    }

    if(!this.fourthFormGroup.controls.educationFormGroup.get('check10').value){
      this.fourthFormGroup.removeControl('educationFormGroup');
    }else{
      let follow_up_date1 =this.fourthFormGroup.controls.educationFormGroup.get('education_date').value;
     
      fourthObj10 = {
        check10:this.fourthFormGroup.controls.educationFormGroup.get('check10').value,
        option:10,
        task_details:this.fourthFormGroup.controls.educationFormGroup.get('education_yes').value,
        date:follow_up_date1

      }
      fourthArray.push(fourthObj10);
    }

    if(!this.fourthFormGroup.controls.idProofFormGroup.get('check11').value){
      this.fourthFormGroup.removeControl('idProofFormGroup');
    }else{
      let follow_up_date1 =this.fourthFormGroup.controls.idProofFormGroup.get('id_proof_date').value;
      
      fourthObj11 = {
        check11:this.fourthFormGroup.controls.idProofFormGroup.get('check11').value,
        option:11,
        task_details:this.fourthFormGroup.controls.idProofFormGroup.get('id_proof_yes').value,
        date:follow_up_date1

      }
      fourthArray.push(fourthObj11);
    }

    if(!this.fourthFormGroup.controls.insClaimFormGroup.get('check12').value){
      this.fourthFormGroup.removeControl('insClaimFormGroup');
    }else{
      let follow_up_date1 =this.fourthFormGroup.controls.insClaimFormGroup.get('ins_claim_date').value;
     
      fourthObj12 = {
        check12:this.fourthFormGroup.controls.insClaimFormGroup.get('check12').value,
        option:12,
        task_details:this.fourthFormGroup.controls.insClaimFormGroup.get('ins_claim_yes').value,
        date:follow_up_date1

      }
      fourthArray.push(fourthObj12);
    }

    if(!this.fourthFormGroup.controls.physicianFormGroup.get('check13').value){
      this.fourthFormGroup.removeControl('physicianFormGroup');
    }else{
      let follow_up_date1 =this.fourthFormGroup.controls.physicianFormGroup.get('physician_date').value;
     
      fourthObj13 = {
        check13:this.fourthFormGroup.controls.physicianFormGroup.get('check13').value,
        option:13,
        task_details:this.fourthFormGroup.controls.physicianFormGroup.get('physician_yes').value,
        date:follow_up_date1

      }
      fourthArray.push(fourthObj13);
    }

    if(!this.fourthFormGroup.controls.legalFormGroup.get('check14').value){
      this.fourthFormGroup.removeControl('legalFormGroup');
    }else{
      let follow_up_date1 =this.fourthFormGroup.controls.legalFormGroup.get('legal_date').value;
      
      fourthObj14 = {
        check14:this.fourthFormGroup.controls.legalFormGroup.get('check14').value,
        option:14,
        task_details:this.fourthFormGroup.controls.legalFormGroup.get('legal_yes').value,
        date:follow_up_date1

      }
      fourthArray.push(fourthObj14);
    }

    if(!this.fourthFormGroup.controls.liaiseFormGroup.get('check15').value){
      this.fourthFormGroup.removeControl('liaiseFormGroup');
    }else{
      let follow_up_date1 =this.fourthFormGroup.controls.liaiseFormGroup.get('liase_date').value;
      
      fourthObj15 = {
        check15:this.fourthFormGroup.controls.liaiseFormGroup.get('check15').value,
        option:15,
        task_details:this.fourthFormGroup.controls.liaiseFormGroup.get('liase_yes').value,
        date:follow_up_date1,

      }
      fourthArray.push(fourthObj15);
    }

    if(!this.fourthFormGroup.controls.consultLegalFormGroup.get('check16').value){
      this.fourthFormGroup.removeControl('consultLegalFormGroup');
    }else{
      let follow_up_date1 =this.fourthFormGroup.controls.consultLegalFormGroup.get('consult_legal_date').value;
     
      fourthObj16 = {
        check16:this.fourthFormGroup.controls.consultLegalFormGroup.get('check16').value,
        option:16,
        task_details:this.fourthFormGroup.controls.consultLegalFormGroup.get('consult_legal_yes').value,
        date:follow_up_date1

      }
      fourthArray.push(fourthObj16);
    }

    if(!this.fourthFormGroup.controls.bankAccountFormGroup.get('check17').value){
      this.fourthFormGroup.removeControl('bankAccountFormGroup');
    }else{
      let follow_up_date1 =this.fourthFormGroup.controls.bankAccountFormGroup.get('bank_account_date').value;
      

      fourthObj17 = {
        check17:this.fourthFormGroup.controls.bankAccountFormGroup.get('check17').value,
        option:17,
        task_details:this.fourthFormGroup.controls.bankAccountFormGroup.get('bank_account_yes').value,
        date:follow_up_date1

      }
      fourthArray.push(fourthObj17);
    }

    if(!this.fourthFormGroup.controls.offerHelpFormGroup.get('check18').value){
      this.fourthFormGroup.removeControl('offerHelpFormGroup');
    }else{
      let follow_up_date1 =this.fourthFormGroup.controls.offerHelpFormGroup.get('offer_help_date').value;
     

      fourthObj18 = {
        check18:this.fourthFormGroup.controls.offerHelpFormGroup.get('check18').value,
        option:18,
        task_details:this.fourthFormGroup.controls.offerHelpFormGroup.get('offer_help_yes').value,
        date:follow_up_date1

      }
      fourthArray.push(fourthObj18);
    }
    if(!this.fourthFormGroup.controls.noneAboveFormGroup.get('check19').value){
      this.fourthFormGroup.removeControl('noneAboveFormGroup');
    }else{
      let follow_up_date1 =this.fourthFormGroup.get('review_date').value;
      

      fourthObj19 = {
        check19:this.fourthFormGroup.controls.noneAboveFormGroup.get('check19').value,
        option:19,
        task_details:this.fourthFormGroup.controls.noneAboveFormGroup.get('none_reason').value,
        date:follow_up_date1

      }
      fourthArray.push(fourthObj19);
    }

    
    if(this.fourthFormGroup.controls.renewUUIdFormGroup.get('uuid_renew').value == "Yes"){
      let follow_up_date1 =this.fourthFormGroup.controls.renewUUIdFormGroup.get('uuid_renew_follow_up').value;
      
     
      fourthObj41= {
        check41:this.fourthFormGroup.controls.renewUUIdFormGroup.get('uuid_renew').value,
        option:41,
        task_details:this.fourthFormGroup.controls.renewUUIdFormGroup.get('uuid_renew_remark').value,
        date:follow_up_date1

      }
      fourthArray.push(fourthObj41);
    }
    if(this.fourthFormGroup.controls.benefitFormGroup.get('dis_benefit').value == "Yes"){
      let follow_up_date1 =this.fourthFormGroup.controls.benefitFormGroup.get('dis_benefit_follow_up').value;
     
      fourthObj42= {
        check42:this.fourthFormGroup.controls.benefitFormGroup.get('dis_benefit').value,
        option:35,
        task_details:this.fourthFormGroup.controls.benefitFormGroup.get('dis_benefit_remark').value,
        date:follow_up_date1

      }
      fourthArray.push(fourthObj42);
    }
  
    let follow_up_review;
    let follow_up_benefit;
  

 
    let uuidObj = {
      uuid:this.fourthFormGroup.controls.UUIDFormGroup.get('uuid').value,
      uuid_valid:this.fourthFormGroup.controls.validUUIDFormGroup.get('uuid_valid').value,
      uuid_renew:this.fourthFormGroup.controls.renewUUIdFormGroup.get('uuid_renew').value,
      uuid_renew_remark:this.fourthFormGroup.controls.renewUUIdFormGroup.get('uuid_renew_remark').value,
      uuid_renew_follow_up:this.fourthFormGroup.controls.renewUUIdFormGroup.get('uuid_renew_follow_up').value,
      dis_benefit:this.fourthFormGroup.controls.benefitFormGroup.get('dis_benefit').value,
      dis_benefit_remark:this.fourthFormGroup.controls.benefitFormGroup.get('dis_benefit_remark').value,
      dis_benefit_follow_up:this.fourthFormGroup.controls.benefitFormGroup.get('dis_benefit_follow_up').value,
    }
   
    sessionStorage.setItem("step4",JSON.stringify(uuidObj));
    sessionStorage.setItem("step4_data",JSON.stringify(fourthArray));
    this.stepper.next();
    
  }
  
  pat_pitch_comp(event: any) {
  
    this.fifthFormGroup.pat_compliance_rate = event.value;
    this.rate1 =  this.fifthFormGroup.pat_compliance_rate+"%";
    this.compRate = true;
    this.comp_reason_visible = false;
  }
  consentCheck1($event:MatCheckboxChange){
    if ($event.checked == true) {
      this.consent_array.push("Phone Call");
     
    }else{
      const index = this.consent_array.indexOf("Phone Call");
      if (index > -1) {
        this.consent_array.splice(index, 1);
      }
     
    }

  }

  consentCheck2($event:MatCheckboxChange){
    if ($event.checked == true) {
      this.consent_array.push("Text Message");
     
    }else{
      const index = this.consent_array.indexOf("Text Message");
      if (index > -1) {
        this.consent_array.splice(index, 1);
      }
     
    }

  }

  consentCheck3($event:MatCheckboxChange){
    if ($event.checked == true) {
      this.consent_array.push("Home Visit");
    
    }else{
      const index = this.consent_array.indexOf("Home Visit");
      if (index > -1) {
        this.consent_array.splice(index, 1);
      }
      
    }

  }
  selectedPlace(x){
    if(x == 1 || x ==2 || x == 3){
      this.follow_place_other = false;
      this.fifthFormGroup.get('phc_other').setValue('');
      this.fifthFormGroup.get('phc_other').clearValidators();
      this.fifthFormGroup.get('phc_other').updateValueAndValidity();
    }else{
      this.follow_place_other = true;
      this.fifthFormGroup.get('phc_other').setValidators(Validators.required);
      this.fifthFormGroup.get('phc_other').updateValueAndValidity();
    }
  }

  submitStep5(fifthFormGroup){
   this.isDisabled = true;
    const tempPartCheckBox = [];
    let consentObj = {
      consent:this.consent_array
    }
    let follow_up_date_med = this.fifthFormGroup.get('med_refill_date').value;
     
    let medObj = {
      check45:true,
      option:45,
      task_details:"",
      date:follow_up_date_med,

    }
    
   let consentObj1 = {
    diagnosis_step5:this.fifthFormGroup.get('diagnosis_step5').value,
    pat_compliance_rate:this.fifthFormGroup.get('pat_compliance_rate').value,
    comp_reason:this.fifthFormGroup.get('comp_reason').value,
    medication:this.fifthFormGroup.controls.meditationFormGroup.get('meditation').value,
    medication_yes:this.fifthFormGroup.controls.meditationFormGroup.get('meditation_yes').value,
    medication_help:this.fifthFormGroup.controls.medicationHelpFormGroup.get('medication_help').value,
    medication_help_yes:this.fifthFormGroup.controls.medicationHelpFormGroup.get('medication_help_yes').value,
    counselling:this.fifthFormGroup.controls.counsellingFormGroup.get('counselling').value,
    counselling_yes:this.fifthFormGroup.controls.counsellingFormGroup.get('counselling_yes').value,
    referral:this.fifthFormGroup.controls.referralFormGroup.get('referral').value,
    referral_yes:this.fifthFormGroup.controls.referralFormGroup.get('referral_yes').value,
     psychoeducation:this.fifthFormGroup.controls.psychoFormGroup.get('psychoeducation').value,
     psychoeducation_yes:this.fifthFormGroup.controls.psychoFormGroup.get('psychoeducation_yes').value,
     psychointervension:this.fifthFormGroup.controls.psychoInterFormGroup.get('psychointervension').value,
     psychointervension_yes:this.fifthFormGroup.controls.psychoInterFormGroup.get('psychointervension_yes').value,
     participant:this.getPartDetails(fifthFormGroup.controls['participantFormGroup']),
     participant_details:this.fifthFormGroup.get('participant_details').value,
     phc:this.fifthFormGroup.get('phc').value,
     phc_other:this.fifthFormGroup.get('phc_other').value,
    

   }

 
  
 
  this.consentData = this.consent_array;
 
  let follow_up_date = this.fifthFormGroup.get('follow_up_date').value;
 
    
 
  let name = sessionStorage.getItem('name');
  let demographicData = sessionStorage.getItem('step1');
  let clinicalData = sessionStorage.getItem('step2');
  let assessData = sessionStorage.getItem('step3');
  let uuidData = sessionStorage.getItem('step4');
 
  let taskData :any;
  taskData = sessionStorage.getItem('step4_data');
 
  let mergedObj = {clinicalData,consentObj1};
  let med_date = JSON.stringify(medObj);

        this.patientService.addPatient(name,demographicData,uuidData,assessData,consentObj,mergedObj,taskData,follow_up_date,this.sw_id,this.group_data_id,medObj).then(() => {
           
         
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
         
            
          },err => {
            console.log("No Internet Connection! Data added to the Request List");
           
           
          });
    
  }

previous(){
    this.stepper.previous();
}

previous4(){
  if(this.fourthFormGroup.controls.localResourceFormGroup){
  this.patObject.check1 = this.fourthFormGroup.controls.localResourceFormGroup.get('check1').value,
  this.patObject.local_resource_yes = this.fourthFormGroup.controls.localResourceFormGroup.get('local_resource_yes').value,
  this.patObject.local_resource_date = this.fourthFormGroup.controls.localResourceFormGroup.get('local_resource_date').value
  }
  if(this.fourthFormGroup.controls.differentNeedsFormGroup){
    this.patObject.check2 = this.fourthFormGroup.controls.differentNeedsFormGroup.get('check2').value,
    this.patObject.different_needs_yes =this.fourthFormGroup.controls.differentNeedsFormGroup.get('different_needs_yes').value,
    this.patObject.different_needs_date = this.fourthFormGroup.controls.differentNeedsFormGroup.get('different_needs_date').value
  }

  if(this.fourthFormGroup.controls.localFormGroup){
    this.patObject.check3 = this.fourthFormGroup.controls.localFormGroup.get('check3').value,
    this.patObject.local_industries_yes = this.fourthFormGroup.controls.localFormGroup.get('local_industries_yes').value,
    this.patObject.local_industries_date = this.fourthFormGroup.controls.localFormGroup.get('local_industries_date').value
  }
  if(this.fourthFormGroup.controls.skillDevFormGroup){
    this.patObject.check4 = this.fourthFormGroup.controls.skillDevFormGroup.get('check4').value,
    this.patObject.skill_dev_yes = this.fourthFormGroup.controls.skillDevFormGroup.get('skill_dev_yes').value,
    this.patObject.skill_dev_date = this.fourthFormGroup.controls.skillDevFormGroup.get('skill_dev_date').value
  }
  if(this.fourthFormGroup.controls.selfEmployFormGroup){
    this.patObject.check5 = this.fourthFormGroup.controls.selfEmployFormGroup.get('check5').value,
    this.patObject.self_employ_yes  =this.fourthFormGroup.controls.selfEmployFormGroup.get('self_employ_yes').value,
    this.patObject.self_employ_date = this.fourthFormGroup.controls.selfEmployFormGroup.get('self_employ_date').value
  }
  if(this.fourthFormGroup.controls.incomeGroup){
    this.patObject.check6 = this.fourthFormGroup.controls.incomeGroup.get('check6').value,
    this.patObject.income_generation_yes =this.fourthFormGroup.controls.incomeGroup.get('income_generation_yes').value,
    this.patObject.income_generation_date= this.fourthFormGroup.controls.incomeGroup.get('income_generation_date').valu
  }
  if(this.fourthFormGroup.controls.minergaGroup){
    this.patObject.check7 = this.fourthFormGroup.controls.minergaGroup.get('check7').value,
    this.patObject.minerga_yes  = this.fourthFormGroup.controls.minergaGroup.get('minerga_yes').value,
    this.patObject.minerga_date = this.fourthFormGroup.controls.minergaGroup.get('minerga_date').value
  }
  if(this.fourthFormGroup.controls.daycareFormGroup){
    this.patObject.check8 = this.fourthFormGroup.controls.daycareFormGroup.get('check8').value,
    this.patObject.daycare = this.fourthFormGroup.controls.daycareFormGroup.get('daycare').value,
    this.patObject.daycare_yes = this.fourthFormGroup.controls.daycareFormGroup.get('daycare_yes').value
  }
  if(this.fourthFormGroup.controls.cultutalEventFormGroup){
    this.patObject.check9 = this.fourthFormGroup.controls.cultutalEventFormGroup.get('check9').value,
    this.patObject.cultural_event = this.fourthFormGroup.controls.cultutalEventFormGroup.get('cultural_event').value,
    this.patObject.cultural_event_yes = this.fourthFormGroup.controls.cultutalEventFormGroup.get('cultural_event_yes').value
  }
  if(this.fourthFormGroup.controls.educationFormGroup){
    this.patObject.check10 = this.fourthFormGroup.controls.educationFormGroup.get('check10').value,
    this.patObject.education_yes =this.fourthFormGroup.controls.educationFormGroup.get('education_yes').value,
    this.patObject.education_date = this.fourthFormGroup.controls.educationFormGroup.get('education_date').value
  }
  if(this.fourthFormGroup.controls.idProofFormGroup){
    this.patObject.check11 = this.fourthFormGroup.controls.idProofFormGroup.get('check11').value,
    this.patObject.id_proof_yes = this.fourthFormGroup.controls.idProofFormGroup.get('id_proof_yes').value,
    this.patObject.id_proof_date = this.fourthFormGroup.controls.idProofFormGroup.get('id_proof_date').value

  }
  if(this.fourthFormGroup.controls.insClaimFormGroup){
    this.patObject.check12 = this.fourthFormGroup.controls.insClaimFormGroup.get('check12').value,
    this.patObject.ins_claim_yes  = this.fourthFormGroup.controls.insClaimFormGroup.get('ins_claim_yes').value,
    this.patObject.ins_claim_date = this.fourthFormGroup.controls.insClaimFormGroup.get('ins_claim_date').value
  }
  if(this.fourthFormGroup.controls.physicianFormGroup){
    this.patObject.check13 = this.fourthFormGroup.controls.physicianFormGroup.get('check13').value,
    this.patObject.physician_yes = this.fourthFormGroup.controls.physicianFormGroup.get('physician_yes').value,
    this.patObject.physician_date = this.fourthFormGroup.controls.physicianFormGroup.get('physician_date').value
  }
  if(this.fourthFormGroup.controls.legalFormGroup){
    this.patObject.check14 = this.fourthFormGroup.controls.legalFormGroup.get('check14').value,
    this.patObject.legal_yes = this.fourthFormGroup.controls.legalFormGroup.get('legal_yes').value,
    this.patObject.legal_date = this.fourthFormGroup.controls.legalFormGroup.get('legal_date').value
  }
  if(this.fourthFormGroup.controls.liaiseFormGroup){
    this.patObject.check15 = this.fourthFormGroup.controls.liaiseFormGroup.get('check15').value,
    this.patObject.liase_yes  =this.fourthFormGroup.controls.liaiseFormGroup.get('liase_yes').value,
    this.patObject.liase_date = this.fourthFormGroup.controls.liaiseFormGroup.get('liase_date').value
  }
  if(this.fourthFormGroup.controls.consultLegalFormGroup){
    this.patObject.check16 = this.fourthFormGroup.controls.consultLegalFormGroup.get('check16').value,
    this.patObject.consult_legal_yes = this.fourthFormGroup.controls.consultLegalFormGroup.get('consult_legal_yes').value,
    this.patObject.consult_legal_date = this.fourthFormGroup.controls.consultLegalFormGroup.get('consult_legal_date').value
  }
  if(this.fourthFormGroup.controls.bankAccountFormGroup){
    this.patObject.check17 = this.fourthFormGroup.controls.bankAccountFormGroup.get('check17').value,
    this.patObject.bank_account_yes  = this.fourthFormGroup.controls.bankAccountFormGroup.get('bank_account_yes').value,
    this.patObject.bank_account_date = this.fourthFormGroup.controls.bankAccountFormGroup.get('bank_account_date').value
  }
  if(this.fourthFormGroup.controls.offerHelpFormGroup){
   
    this.patObject.check18 = this.fourthFormGroup.controls.offerHelpFormGroup.get('check18').value,
    this.patObject.offer_help_yes = this.fourthFormGroup.controls.offerHelpFormGroup.get('offer_help_yes').value,
    this.patObject.offer_help_date = this.fourthFormGroup.controls.offerHelpFormGroup.get('offer_help_date').value

  }
  if(this.fourthFormGroup.controls.noneAboveFormGroup){
   
    this.patObject.check19 = this.fourthFormGroup.controls.noneAboveFormGroup.get('check19').value,
    this.patObject.none_reason = this.fourthFormGroup.controls.noneAboveFormGroup.get('none_reason').value,
    this.patObject.review_date = this.fourthFormGroup.get('review_date').value

  }
 
  this.patObject.uuid = this.fourthFormGroup.controls.UUIDFormGroup.get('uuid').value

  if(this.fourthFormGroup.controls.validUUIDFormGroup){
   
    this.patObject.uuid_valid = this.fourthFormGroup.controls.validUUIDFormGroup.get('uuid_valid').value
  }
  if(this.fourthFormGroup.controls.renewUUIdFormGroup){
   
    this.patObject.uuid_renew = this.fourthFormGroup.controls.renewUUIdFormGroup.get('uuid_renew').value,
    this.patObject.uuid_renew_remark = this.fourthFormGroup.controls.renewUUIdFormGroup.get('uuid_renew_remark').value,
    this.patObject.uuid_renew_follow_up = this.fourthFormGroup.controls.renewUUIdFormGroup.get('uuid_renew_follow_up').value

  }
  if(this.fourthFormGroup.controls.benefitFormGroup){
   
    this.patObject.dis_benefit = this.fourthFormGroup.controls.benefitFormGroup.get('dis_benefit').value,
    this.patObject.dis_benefit_remark = this.fourthFormGroup.controls.benefitFormGroup.get('dis_benefit_remark').value,
    this.patObject.dis_benefit_follow_up = this.fourthFormGroup.controls.benefitFormGroup.get('dis_benefit_follow_up').value

  }
 
  this.fourthFormGroup = this._formBuilder.group({

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
  UUIDFormGroup:new FormGroup({
    uuid:new FormControl(this.patObject.uuid),
  }),
  validUUIDFormGroup:new FormGroup({
    uuid_valid:new FormControl(this.patObject.uuid_valid),
  }),
  renewUUIdFormGroup:new FormGroup({
    uuid_renew:new FormControl(this.patObject.uuid_renew),
    uuid_renew_remark:new FormControl(this.patObject.uuid_renew_remark),
    uuid_renew_follow_up:new FormControl(this.patObject.uuid_renew_follow_up),
  }),
  benefitFormGroup:new FormGroup({
    dis_benefit:new FormControl(this.patObject.dis_benefit),
    dis_benefit_remark:new FormControl(this.patObject.dis_benefit_remark),
    dis_benefit_follow_up:new FormControl(this.patObject.dis_benefit_follow_up),
  }),
 
  })
  console.log(this.patObject.uuid)
  console.log(this.patObject.uuid_valid)
  console.log(this.patObject.uuid_renew)
  console.log(this.patObject.dis_benefit)
   this.stepper.previous();
}
checkRateChange1($event:MatRadioChange){

}
checkTobChange1($event:MatRadioChange){
  
      if ($event.value ==='Yes') {
      this.tobaccoYesSelected = true;
       this.secondFormGroup.controls.tobaccoFormGroup.get('tobocco_amount').updateValueAndValidity();
       this.secondFormGroup.controls.tobaccoFormGroup.get('tobacco_yes').updateValueAndValidity();
    
    } else {
      this.tobaccoYesSelected = false;
      this.secondFormGroup.controls.tobaccoFormGroup.get('tobocco_amount').updateValueAndValidity();
      this.secondFormGroup.controls.tobaccoFormGroup.get('tobacco_yes').updateValueAndValidity();
      
      
    }

}

checkTobChange2($event:MatRadioChange){
   
    if ($event.value ==='Yes') {
    this.alcoholYesSelected = true;
    this.secondFormGroup.controls.alcoholFormGroup.get('alcohol_amount').updateValueAndValidity();
    this.secondFormGroup.controls.alcoholFormGroup.get('alcohol_yes').updateValueAndValidity();
  } else {
    this.alcoholYesSelected = false;
    this.secondFormGroup.controls.alcoholFormGroup.get('alcohol_amount').updateValueAndValidity();
    this.secondFormGroup.controls.alcoholFormGroup.get('alcohol_yes').setValue('');
    this.secondFormGroup.controls.alcoholFormGroup.get('alcohol_yes').updateValueAndValidity();
    
  }

}

checkTobChange3($event:MatRadioChange){
   
  if ($event.value ==='Yes') {
  this.otherYesSelected = true;
 this.secondFormGroup.controls.otherFormGroup.get('other_amount').updateValueAndValidity();
 this.secondFormGroup.controls.otherFormGroup.get('other_yes').updateValueAndValidity();
} else {
  this.otherYesSelected = false;
  this.secondFormGroup.controls.otherFormGroup.get('other_amount').updateValueAndValidity();
  this.secondFormGroup.controls.otherFormGroup.get('other_yes').updateValueAndValidity();

  
}

}

checkSkillChange($event:MatRadioChange){
  if ($event.value ==='Yes') {
    this.skillYesSelected = true;
   this.thirdFormGroup.controls.skillFormGroup.get('skill_yes').setValidators(Validators.required);
   this.thirdFormGroup.controls.skillFormGroup.get('skill_yes').updateValueAndValidity();
   
  } else {
    this.skillYesSelected = false;
    this.thirdFormGroup.controls.skillFormGroup.get('skill_yes').setValue('');
    this.thirdFormGroup.controls.skillFormGroup.get('skill_yes').clearValidators();
    this.thirdFormGroup.controls.skillFormGroup.get('skill_yes').updateValueAndValidity();
    
  }

}

checkJobChange($event:MatRadioChange){
  if ($event.value ==='Yes') {
    this.jobYesSelected = true;
    this.thirdFormGroup.controls.jobFormGroup.get('job_yes').setValidators(Validators.required);
    this.thirdFormGroup.controls.jobFormGroup.get('job_yes').updateValueAndValidity();
  } else {
    this.jobYesSelected = false;
    this.thirdFormGroup.controls.jobFormGroup.get('job_yes').setValue('');
    this.thirdFormGroup.controls.jobFormGroup.get('job_yes').clearValidators();
    this.thirdFormGroup.controls.jobFormGroup.get('job_yes').updateValueAndValidity();
    
  }

}

checkInterestActChange($event:MatRadioChange){
  if ($event.value ==='Yes') {
    this.interestActYesSelected = true;
    this.thirdFormGroup.controls.interestActFormGroup.get('interest_act_yes').setValidators(Validators.required);
    this.thirdFormGroup.controls.interestActFormGroup.get('interest_act_yes').updateValueAndValidity();
  } else {
    this.interestActYesSelected = false;
    this.thirdFormGroup.controls.interestActFormGroup.get('interest_act_yes').setValue('');
    this.thirdFormGroup.controls.interestActFormGroup.get('interest_act_yes').clearValidators();
    this.thirdFormGroup.controls.interestActFormGroup.get('interest_act_yes').updateValueAndValidity();
    
  }

}

checkCommunityChange($event:MatRadioChange){
  if ($event.value ==='Yes') {
    this.communityYesSelected = true;
    this.thirdFormGroup.controls.communityFormGroup.get('community_yes').setValidators(Validators.required);
    this.thirdFormGroup.controls.communityFormGroup.get('community_yes').updateValueAndValidity();
  } else {
    this.communityYesSelected = false;
    this.thirdFormGroup.controls.communityFormGroup.get('community_yes').setValue('');
    this.thirdFormGroup.controls.communityFormGroup.get('community_yes').clearValidators();
    this.thirdFormGroup.controls.communityFormGroup.get('community_yes').updateValueAndValidity();
    
  }

}

checkDailyChange($event:MatRadioChange){
  if ($event.value ==='Yes') {
     this.dailyYesSelected = true;
    this.thirdFormGroup.controls.dailyFormGroup.get('daily_yes').setValidators(Validators.required);
    this.thirdFormGroup.controls.dailyFormGroup.get('daily_yes').updateValueAndValidity();
  } else {
     this.dailyYesSelected = false;
    this.thirdFormGroup.controls.dailyFormGroup.get('daily_yes').setValue('');
    this.thirdFormGroup.controls.dailyFormGroup.get('daily_yes').clearValidators();
    this.thirdFormGroup.controls.dailyFormGroup.get('daily_yes').updateValueAndValidity();
    
  }

}

checkHouseChange($event:MatRadioChange){
  if ($event.value ==='Yes') {
    this.houseYesSelected = true;
    this.thirdFormGroup.controls.houseFormGroup.get('house_yes').setValidators(Validators.required);
    this.thirdFormGroup.controls.houseFormGroup.get('house_yes').updateValueAndValidity();
  } else {
    this.houseYesSelected = false;
    this.thirdFormGroup.controls.houseFormGroup.get('house_yes').setValue('');
    this.thirdFormGroup.controls.houseFormGroup.get('house_yes').clearValidators();
    this.thirdFormGroup.controls.houseFormGroup.get('house_yes').updateValueAndValidity();
    
  }

}

checkFinanceChange($event:MatRadioChange){
  if ($event.value ==='Yes') {
    this.financeYesSelected = true;
    this.thirdFormGroup.controls.financeFormGroup.get('finance_yes').setValidators(Validators.required);
    this.thirdFormGroup.controls.financeFormGroup.get('finance_yes').updateValueAndValidity();
  } else {
    this.financeYesSelected = false;
    this.thirdFormGroup.controls.financeFormGroup.get('finance_yes').setValue('');
    this.thirdFormGroup.controls.financeFormGroup.get('finance_yes').clearValidators();
    this.thirdFormGroup.controls.financeFormGroup.get('finance_yes').updateValueAndValidity();
    
  }

}

checkOtherHelpChange($event:MatRadioChange){
  if ($event.value ==='Yes') {
    this.otherAssessYesSelected = true;
    this.thirdFormGroup.controls.otherHelpFormGroup.get('other_help_yes').setValidators(Validators.required);
    this.thirdFormGroup.controls.otherHelpFormGroup.get('other_help_yes').updateValueAndValidity();
  } else {
    this.otherAssessYesSelected = false;
    this.thirdFormGroup.controls.otherHelpFormGroup.get('other_help_yes').setValue('');
    this.thirdFormGroup.controls.otherHelpFormGroup.get('other_help_yes').clearValidators();
    this.thirdFormGroup.controls.otherHelpFormGroup.get('other_help_yes').updateValueAndValidity();
    
  }

}

taskCheck1($event:MatCheckboxChange){
  if ($event.checked == true) {
    this.task1Checked = true;
    this.noneChecked = false;
    this.taskValidationArray.push(1);
    this.none_visible = false;
    this.fourthFormGroup.controls.noneAboveFormGroup.get('check19').setValue(false);
    this.fourthFormGroup.controls.noneAboveFormGroup.get('none_reason').setValue('');
    this.fourthFormGroup.controls.noneAboveFormGroup.get('none_reason').clearValidators();
    this.fourthFormGroup.controls.noneAboveFormGroup.get('none_reason').updateValueAndValidity();
    this.fourthFormGroup.get('review_date').setValue('');
    this.fourthFormGroup.get('review_date').clearValidators();
    this.fourthFormGroup.get('review_date').updateValueAndValidity();
    this.fourthFormGroup.controls.localResourceFormGroup.get('local_resource_yes').setValidators(Validators.required);
    this.fourthFormGroup.controls.localResourceFormGroup.get('local_resource_yes').updateValueAndValidity();
    this.fourthFormGroup.controls.localResourceFormGroup.get('local_resource_date').setValidators(Validators.required);
    this.fourthFormGroup.controls.localResourceFormGroup.get('local_resource_date').updateValueAndValidity();
  } else {
    this.task1Checked = false;
   
    const index = this.taskValidationArray.indexOf(1);
      if (index > -1) {
        this.taskValidationArray.splice(index, 1);
      }
      if(this.taskValidationArray.length < 1){
        this.none_visible = true;
        this.noneChecked = false;
      
    }

    this.fourthFormGroup.controls.localResourceFormGroup.get('local_resource_yes').setValue('');
    this.fourthFormGroup.controls.localResourceFormGroup.get('local_resource_yes').clearValidators();
    this.fourthFormGroup.controls.localResourceFormGroup.get('local_resource_yes').updateValueAndValidity();
    this.fourthFormGroup.controls.localResourceFormGroup.get('local_resource_date').setValue('');
    this.fourthFormGroup.controls.localResourceFormGroup.get('local_resource_date').clearValidators();
    this.fourthFormGroup.controls.localResourceFormGroup.get('local_resource_date').updateValueAndValidity();
    
  }

}

taskCheck2($event:MatCheckboxChange){
  if ($event.checked == true) {
    this.task2Checked = true;
    this.noneChecked = false;
    this.taskValidationArray.push(2);
    this.none_visible = false;
    this.fourthFormGroup.controls.noneAboveFormGroup.get('check19').setValue(false);
    this.fourthFormGroup.controls.noneAboveFormGroup.get('none_reason').setValue('');
    this.fourthFormGroup.controls.noneAboveFormGroup.get('none_reason').clearValidators();
    this.fourthFormGroup.controls.noneAboveFormGroup.get('none_reason').updateValueAndValidity();
    this.fourthFormGroup.get('review_date').setValue('');
    this.fourthFormGroup.get('review_date').clearValidators();
    this.fourthFormGroup.get('review_date').updateValueAndValidity();
    this.fourthFormGroup.controls.differentNeedsFormGroup.get('different_needs_yes').setValidators(Validators.required);
    this.fourthFormGroup.controls.differentNeedsFormGroup.get('different_needs_yes').updateValueAndValidity();
    this.fourthFormGroup.controls.differentNeedsFormGroup.get('different_needs_date').setValidators(Validators.required);
    this.fourthFormGroup.controls.differentNeedsFormGroup.get('different_needs_date').updateValueAndValidity();
  } else {
    this.task2Checked = false;
    const index = this.taskValidationArray.indexOf(2);
    if (index > -1) {
      this.taskValidationArray.splice(index, 1);
    }
    if(this.taskValidationArray.length < 1){
      this.none_visible = true;
      this.noneChecked = false;
  }
    this.fourthFormGroup.controls.differentNeedsFormGroup.get('different_needs_yes').setValue('');
    this.fourthFormGroup.controls.differentNeedsFormGroup.get('different_needs_yes').clearValidators();
    this.fourthFormGroup.controls.differentNeedsFormGroup.get('different_needs_yes').updateValueAndValidity();
    this.fourthFormGroup.controls.differentNeedsFormGroup.get('different_needs_date').setValue('');
    this.fourthFormGroup.controls.differentNeedsFormGroup.get('different_needs_date').clearValidators();
    this.fourthFormGroup.controls.differentNeedsFormGroup.get('different_needs_date').updateValueAndValidity();
    
  }

}

taskCheck3($event:MatCheckboxChange){
  if ($event.checked == true) {
    this.task3Checked = true;
    this.noneChecked = false;
    this.taskValidationArray.push(3);
    this.none_visible = false;
    this.fourthFormGroup.controls.noneAboveFormGroup.get('check19').setValue(false);
    this.fourthFormGroup.controls.noneAboveFormGroup.get('check19').setValue(false);
    this.fourthFormGroup.controls.noneAboveFormGroup.get('none_reason').setValue('');
    this.fourthFormGroup.controls.noneAboveFormGroup.get('none_reason').clearValidators();
    this.fourthFormGroup.controls.noneAboveFormGroup.get('none_reason').updateValueAndValidity();
    this.fourthFormGroup.get('review_date').setValue('');
    this.fourthFormGroup.get('review_date').clearValidators();
    this.fourthFormGroup.get('review_date').updateValueAndValidity();
    this.fourthFormGroup.controls.localFormGroup.get('local_industries_yes').setValidators(Validators.required);
    this.fourthFormGroup.controls.localFormGroup.get('local_industries_yes').updateValueAndValidity();
    this.fourthFormGroup.controls.localFormGroup.get('local_industries_date').setValidators(Validators.required);
    this.fourthFormGroup.controls.localFormGroup.get('local_industries_date').updateValueAndValidity();
  } else {
    this.task3Checked = false;
    const index = this.taskValidationArray.indexOf(3);
      if (index > -1) {
        this.taskValidationArray.splice(index, 1);
      }
      if(this.taskValidationArray.length < 1){
        this.none_visible = true;
        this.noneChecked = false;
    }
    this.fourthFormGroup.controls.localFormGroup.get('local_industries_yes').setValue('');
    this.fourthFormGroup.controls.localFormGroup.get('local_industries_yes').clearValidators();
    this.fourthFormGroup.controls.localFormGroup.get('local_industries_yes').updateValueAndValidity();
    this.fourthFormGroup.controls.localFormGroup.get('local_industries_date').setValue('');
    this.fourthFormGroup.controls.localFormGroup.get('local_industries_date').clearValidators();
    this.fourthFormGroup.controls.localFormGroup.get('local_industries_date').updateValueAndValidity();
    
  }

}

taskCheck4($event:MatCheckboxChange){
  if ($event.checked == true) {
    this.task4Checked = true;
    this.noneChecked = false;
    this.taskValidationArray.push(4);
    this.none_visible = false;
    this.fourthFormGroup.controls.noneAboveFormGroup.get('check19').setValue(false);
    this.fourthFormGroup.controls.noneAboveFormGroup.get('none_reason').setValue('');
    this.fourthFormGroup.controls.noneAboveFormGroup.get('none_reason').clearValidators();
    this.fourthFormGroup.controls.noneAboveFormGroup.get('none_reason').updateValueAndValidity();
    this.fourthFormGroup.get('review_date').setValue('');
    this.fourthFormGroup.get('review_date').clearValidators();
    this.fourthFormGroup.get('review_date').updateValueAndValidity();
    this.fourthFormGroup.controls.skillDevFormGroup.get('skill_dev_yes').setValidators(Validators.required);
    this.fourthFormGroup.controls.skillDevFormGroup.get('skill_dev_yes').updateValueAndValidity();
    this.fourthFormGroup.controls.skillDevFormGroup.get('skill_dev_date').setValidators(Validators.required);
    this.fourthFormGroup.controls.skillDevFormGroup.get('skill_dev_date').updateValueAndValidity();
  } else {
    this.task4Checked = false;
    const index = this.taskValidationArray.indexOf(4);
    if (index > -1) {
      this.taskValidationArray.splice(index, 1);
    }
    if(this.taskValidationArray.length < 1){
      this.none_visible = true;
      this.noneChecked = false;
  }
    this.fourthFormGroup.controls.skillDevFormGroup.get('skill_dev_yes').setValue('');
    this.fourthFormGroup.controls.skillDevFormGroup.get('skill_dev_yes').clearValidators();
    this.fourthFormGroup.controls.skillDevFormGroup.get('skill_dev_yes').updateValueAndValidity();
    this.fourthFormGroup.controls.skillDevFormGroup.get('skill_dev_date').setValue('');
    this.fourthFormGroup.controls.skillDevFormGroup.get('skill_dev_date').clearValidators();
    this.fourthFormGroup.controls.skillDevFormGroup.get('skill_dev_date').updateValueAndValidity();
    
  }

}

taskCheck5($event:MatCheckboxChange){
  if ($event.checked == true) {
    this.task5Checked = true;
    this.noneChecked = false;
    this.taskValidationArray.push(5);
    this.none_visible = false;
    this.fourthFormGroup.controls.noneAboveFormGroup.get('check19').setValue(false);
    this.fourthFormGroup.controls.noneAboveFormGroup.get('none_reason').setValue('');
    this.fourthFormGroup.controls.noneAboveFormGroup.get('none_reason').clearValidators();
    this.fourthFormGroup.controls.noneAboveFormGroup.get('none_reason').updateValueAndValidity();
    this.fourthFormGroup.get('review_date').setValue('');
    this.fourthFormGroup.get('review_date').clearValidators();
    this.fourthFormGroup.get('review_date').updateValueAndValidity();
    this.fourthFormGroup.controls.selfEmployFormGroup.get('self_employ_yes').setValidators(Validators.required);
    this.fourthFormGroup.controls.selfEmployFormGroup.get('self_employ_yes').updateValueAndValidity();
    this.fourthFormGroup.controls.selfEmployFormGroup.get('self_employ_date').setValidators(Validators.required);
    this.fourthFormGroup.controls.selfEmployFormGroup.get('self_employ_date').updateValueAndValidity();
  } else {
    this.task5Checked = false;
    const index = this.taskValidationArray.indexOf(5);
    if (index > -1) {
      this.taskValidationArray.splice(index, 1);
    }
    if(this.taskValidationArray.length < 1){
      this.none_visible = true;
      this.noneChecked = false;
  }
    this.fourthFormGroup.controls.selfEmployFormGroup.get('self_employ_yes').setValue('');
    this.fourthFormGroup.controls.selfEmployFormGroup.get('self_employ_yes').clearValidators();
    this.fourthFormGroup.controls.selfEmployFormGroup.get('self_employ_yes').updateValueAndValidity();
    this.fourthFormGroup.controls.selfEmployFormGroup.get('self_employ_date').setValue('');
    this.fourthFormGroup.controls.selfEmployFormGroup.get('self_employ_date').clearValidators();
    this.fourthFormGroup.controls.selfEmployFormGroup.get('self_employ_date').updateValueAndValidity();
    
  }

}

taskCheck6($event:MatCheckboxChange){
  if ($event.checked == true) {
    this.task6Checked = true;
    this.noneChecked = false;
    this.taskValidationArray.push(6);
    this.none_visible = false;
    this.fourthFormGroup.controls.noneAboveFormGroup.get('check19').setValue(false);
    this.fourthFormGroup.controls.noneAboveFormGroup.get('none_reason').setValue('');
    this.fourthFormGroup.controls.noneAboveFormGroup.get('none_reason').clearValidators();
    this.fourthFormGroup.controls.noneAboveFormGroup.get('none_reason').updateValueAndValidity();
    this.fourthFormGroup.get('review_date').setValue('');
    this.fourthFormGroup.get('review_date').clearValidators();
    this.fourthFormGroup.get('review_date').updateValueAndValidity();
    this.fourthFormGroup.controls.incomeGroup.get('income_generation_yes').setValidators(Validators.required);
    this.fourthFormGroup.controls.incomeGroup.get('income_generation_yes').updateValueAndValidity();
    this.fourthFormGroup.controls.incomeGroup.get('income_generation_date').setValidators(Validators.required);
    this.fourthFormGroup.controls.incomeGroup.get('income_generation_date').updateValueAndValidity();
  } else {
    this.task6Checked = false;
    const index = this.taskValidationArray.indexOf(6);
    if (index > -1) {
      this.taskValidationArray.splice(index, 1);
    }
    if(this.taskValidationArray.length < 1){
      this.none_visible = true;
      this.noneChecked = false;
  }
    this.fourthFormGroup.controls.incomeGroup.get('income_generation_yes').setValue('');
    this.fourthFormGroup.controls.incomeGroup.get('income_generation_yes').clearValidators();
    this.fourthFormGroup.controls.incomeGroup.get('income_generation_yes').updateValueAndValidity();
    this.fourthFormGroup.controls.incomeGroup.get('income_generation_date').setValue('');
    this.fourthFormGroup.controls.incomeGroup.get('income_generation_date').clearValidators();
    this.fourthFormGroup.controls.incomeGroup.get('income_generation_date').updateValueAndValidity();
    
  }

}

taskCheck7($event:MatCheckboxChange){
  if ($event.checked == true) {
    this.task7Checked = true;
    this.noneChecked = false;
    this.taskValidationArray.push(7);
    this.none_visible = false;
    this.fourthFormGroup.controls.noneAboveFormGroup.get('check19').setValue(false);
    this.fourthFormGroup.controls.noneAboveFormGroup.get('none_reason').setValue('');
    this.fourthFormGroup.controls.noneAboveFormGroup.get('none_reason').clearValidators();
    this.fourthFormGroup.controls.noneAboveFormGroup.get('none_reason').updateValueAndValidity();
    this.fourthFormGroup.get('review_date').setValue('');
    this.fourthFormGroup.get('review_date').clearValidators();
    this.fourthFormGroup.get('review_date').updateValueAndValidity();
    this.fourthFormGroup.controls.minergaGroup.get('minerga_yes').setValidators(Validators.required);
    this.fourthFormGroup.controls.minergaGroup.get('minerga_yes').updateValueAndValidity();
    this.fourthFormGroup.controls.minergaGroup.get('minerga_date').setValidators(Validators.required);
    this.fourthFormGroup.controls.minergaGroup.get('minerga_date').updateValueAndValidity();
  } else {
    this.task7Checked = false;
    const index = this.taskValidationArray.indexOf(7);
    if (index > -1) {
      this.taskValidationArray.splice(index, 1);
    }
    if(this.taskValidationArray.length < 1){
      this.none_visible = true;
      this.noneChecked = false;
  }
    this.fourthFormGroup.controls.minergaGroup.get('minerga_yes').setValue('');
    this.fourthFormGroup.controls.minergaGroup.get('minerga_yes').clearValidators();
    this.fourthFormGroup.controls.minergaGroup.get('minerga_yes').updateValueAndValidity();
    this.fourthFormGroup.controls.minergaGroup.get('minerga_date').setValue('');
    this.fourthFormGroup.controls.minergaGroup.get('minerga_date').clearValidators();
    this.fourthFormGroup.controls.minergaGroup.get('minerga_date').updateValueAndValidity();
    
  }

}

taskCheck8($event:MatCheckboxChange){
  if ($event.checked == true) {
    this.task8Checked = true;
    this.noneChecked = false;
    this.taskValidationArray.push(8);
    this.none_visible = false;
    this.fourthFormGroup.controls.noneAboveFormGroup.get('check19').setValue(false);
    this.fourthFormGroup.controls.noneAboveFormGroup.get('none_reason').setValue('');
    this.fourthFormGroup.controls.noneAboveFormGroup.get('none_reason').clearValidators();
    this.fourthFormGroup.controls.noneAboveFormGroup.get('none_reason').updateValueAndValidity();
    this.fourthFormGroup.get('review_date').setValue('');
    this.fourthFormGroup.get('review_date').clearValidators();
    this.fourthFormGroup.get('review_date').updateValueAndValidity();
    this.fourthFormGroup.controls.daycareFormGroup.get('daycare').setValidators(Validators.required);
    this.fourthFormGroup.controls.daycareFormGroup.get('daycare').updateValueAndValidity();
    this.fourthFormGroup.controls.daycareFormGroup.get('daycare_yes').setValidators(Validators.required);
    this.fourthFormGroup.controls.daycareFormGroup.get('daycare_yes').updateValueAndValidity();
  } else {
    this.task8Checked = false;
    const index = this.taskValidationArray.indexOf(8);
    if (index > -1) {
      this.taskValidationArray.splice(index, 1);
    }
    if(this.taskValidationArray.length < 1){
      this.none_visible = true;
      this.noneChecked = false;
  }
    this.fourthFormGroup.controls.daycareFormGroup.get('daycare').setValue('');
    this.fourthFormGroup.controls.daycareFormGroup.get('daycare').clearValidators();
    this.fourthFormGroup.controls.daycareFormGroup.get('daycare').updateValueAndValidity();
    this.fourthFormGroup.controls.daycareFormGroup.get('daycare_yes').setValue('');
    this.fourthFormGroup.controls.daycareFormGroup.get('daycare_yes').clearValidators();
    this.fourthFormGroup.controls.daycareFormGroup.get('daycare_yes').updateValueAndValidity();
    
  }

}

taskCheck9($event:MatCheckboxChange){
  if ($event.checked == true) {
    this.task9Checked = true;
    this.noneChecked = false;
    this.taskValidationArray.push(9);
    this.none_visible = false;
    this.fourthFormGroup.controls.noneAboveFormGroup.get('check19').setValue(false);
    this.fourthFormGroup.controls.noneAboveFormGroup.get('none_reason').setValue('');
    this.fourthFormGroup.controls.noneAboveFormGroup.get('none_reason').clearValidators();
    this.fourthFormGroup.controls.noneAboveFormGroup.get('none_reason').updateValueAndValidity();
    this.fourthFormGroup.get('review_date').setValue('');
    this.fourthFormGroup.get('review_date').clearValidators();
    this.fourthFormGroup.get('review_date').updateValueAndValidity();
    this.fourthFormGroup.controls.cultutalEventFormGroup.get('cultural_event').setValidators(Validators.required);
    this.fourthFormGroup.controls.cultutalEventFormGroup.get('cultural_event').updateValueAndValidity();
    this.fourthFormGroup.controls.cultutalEventFormGroup.get('cultural_event_yes').setValidators(Validators.required);
    this.fourthFormGroup.controls.cultutalEventFormGroup.get('cultural_event_yes').updateValueAndValidity();
  } else {
    this.task9Checked = false;
    const index = this.taskValidationArray.indexOf(9);
    if (index > -1) {
      this.taskValidationArray.splice(index, 1);
    }
    if(this.taskValidationArray.length < 1){
      this.none_visible = true;
      this.noneChecked = false;
  }
    this.fourthFormGroup.controls.cultutalEventFormGroup.get('cultural_event').setValue('');
    this.fourthFormGroup.controls.cultutalEventFormGroup.get('cultural_event').clearValidators();
    this.fourthFormGroup.controls.cultutalEventFormGroup.get('cultural_event').updateValueAndValidity();
    this.fourthFormGroup.controls.cultutalEventFormGroup.get('cultural_event_yes').setValue('');
    this.fourthFormGroup.controls.cultutalEventFormGroup.get('cultural_event_yes').clearValidators();
    this.fourthFormGroup.controls.cultutalEventFormGroup.get('cultural_event_yes').updateValueAndValidity();
    
  }

}

taskCheck10($event:MatCheckboxChange){
  if ($event.checked == true) {
    this.task10Checked = true;
    this.noneChecked = false;
    this.taskValidationArray.push(10);
    this.none_visible = false;
    this.fourthFormGroup.controls.noneAboveFormGroup.get('check19').setValue(false);
    this.fourthFormGroup.controls.noneAboveFormGroup.get('none_reason').setValue('');
    this.fourthFormGroup.controls.noneAboveFormGroup.get('none_reason').clearValidators();
    this.fourthFormGroup.controls.noneAboveFormGroup.get('none_reason').updateValueAndValidity();
    this.fourthFormGroup.get('review_date').setValue('');
    this.fourthFormGroup.get('review_date').clearValidators();
    this.fourthFormGroup.get('review_date').updateValueAndValidity();
    this.fourthFormGroup.controls.educationFormGroup.get('education_yes').setValidators(Validators.required);
    this.fourthFormGroup.controls.educationFormGroup.get('education_yes').updateValueAndValidity();
    this.fourthFormGroup.controls.educationFormGroup.get('education_date').setValidators(Validators.required);
    this.fourthFormGroup.controls.educationFormGroup.get('education_date').updateValueAndValidity();
  } else {
    this.task10Checked = false;
    const index = this.taskValidationArray.indexOf(10);
    if (index > -1) {
      this.taskValidationArray.splice(index, 1);
    }
    if(this.taskValidationArray.length < 1){
      this.none_visible = true;
      this.noneChecked = false;
  }
    this.fourthFormGroup.controls.educationFormGroup.get('education_yes').setValue('');
    this.fourthFormGroup.controls.educationFormGroup.get('education_yes').clearValidators();
    this.fourthFormGroup.controls.educationFormGroup.get('education_yes').updateValueAndValidity();
    this.fourthFormGroup.controls.educationFormGroup.get('education_date').setValue('');
    this.fourthFormGroup.controls.educationFormGroup.get('education_date').clearValidators();
    this.fourthFormGroup.controls.educationFormGroup.get('education_date').updateValueAndValidity();
    
  }

}

taskCheck11($event:MatCheckboxChange){
  if ($event.checked == true) {
    this.task11Checked = true;
    this.noneChecked = false;
    this.taskValidationArray.push(11);
    this.none_visible = false;
    this.fourthFormGroup.controls.noneAboveFormGroup.get('check19').setValue(false);
    this.fourthFormGroup.controls.noneAboveFormGroup.get('none_reason').setValue('');
    this.fourthFormGroup.controls.noneAboveFormGroup.get('none_reason').clearValidators();
    this.fourthFormGroup.controls.noneAboveFormGroup.get('none_reason').updateValueAndValidity();
    this.fourthFormGroup.get('review_date').setValue('');
    this.fourthFormGroup.get('review_date').clearValidators();
    this.fourthFormGroup.get('review_date').updateValueAndValidity();
    this.fourthFormGroup.controls.idProofFormGroup.get('id_proof_yes').setValidators(Validators.required);
    this.fourthFormGroup.controls.idProofFormGroup.get('id_proof_yes').updateValueAndValidity();
    this.fourthFormGroup.controls.idProofFormGroup.get('id_proof_date').setValidators(Validators.required);
    this.fourthFormGroup.controls.idProofFormGroup.get('id_proof_date').updateValueAndValidity();
  } else {
    this.task11Checked = false;
    const index = this.taskValidationArray.indexOf(11);
    if (index > -1) {
      this.taskValidationArray.splice(index, 1);
    }
    if(this.taskValidationArray.length < 1){
      this.none_visible = true;
      this.noneChecked = false;
  }
    this.fourthFormGroup.controls.idProofFormGroup.get('id_proof_yes').setValue('');
    this.fourthFormGroup.controls.idProofFormGroup.get('id_proof_yes').clearValidators();
    this.fourthFormGroup.controls.idProofFormGroup.get('id_proof_yes').updateValueAndValidity();
    this.fourthFormGroup.controls.idProofFormGroup.get('id_proof_date').setValue('');
    this.fourthFormGroup.controls.idProofFormGroup.get('id_proof_date').clearValidators();
    this.fourthFormGroup.controls.idProofFormGroup.get('id_proof_date').updateValueAndValidity();
    
  }

}

taskCheck12($event:MatCheckboxChange){
  if ($event.checked == true) {
    this.task12Checked = true;
    this.noneChecked = false;
    this.taskValidationArray.push(12);
    this.none_visible = false;
    this.fourthFormGroup.controls.noneAboveFormGroup.get('check19').setValue(false);
    this.fourthFormGroup.controls.noneAboveFormGroup.get('none_reason').setValue('');
    this.fourthFormGroup.controls.noneAboveFormGroup.get('none_reason').clearValidators();
    this.fourthFormGroup.controls.noneAboveFormGroup.get('none_reason').updateValueAndValidity();
    this.fourthFormGroup.get('review_date').setValue('');
    this.fourthFormGroup.get('review_date').clearValidators();
    this.fourthFormGroup.get('review_date').updateValueAndValidity();
    this.fourthFormGroup.controls.insClaimFormGroup.get('ins_claim_yes').setValidators(Validators.required);
    this.fourthFormGroup.controls.insClaimFormGroup.get('ins_claim_yes').updateValueAndValidity();
    this.fourthFormGroup.controls.insClaimFormGroup.get('ins_claim_date').setValidators(Validators.required);
    this.fourthFormGroup.controls.insClaimFormGroup.get('ins_claim_date').updateValueAndValidity();
  } else {
    this.task12Checked = false;
    const index = this.taskValidationArray.indexOf(12);
    if (index > -1) {
      this.taskValidationArray.splice(index, 1);
    }
    if(this.taskValidationArray.length < 1){
      this.none_visible = true;
      this.noneChecked = false;
  }
    this.fourthFormGroup.controls.insClaimFormGroup.get('ins_claim_yes').setValue('');
    this.fourthFormGroup.controls.insClaimFormGroup.get('ins_claim_yes').clearValidators();
    this.fourthFormGroup.controls.insClaimFormGroup.get('ins_claim_yes').updateValueAndValidity();
    this.fourthFormGroup.controls.insClaimFormGroup.get('ins_claim_date').setValue('');
    this.fourthFormGroup.controls.insClaimFormGroup.get('ins_claim_date').clearValidators();
    this.fourthFormGroup.controls.insClaimFormGroup.get('ins_claim_date').updateValueAndValidity();
    
  }

}

taskCheck13($event:MatCheckboxChange){
  if ($event.checked == true) {
    this.task13Checked = true;
    this.noneChecked = false;
    this.taskValidationArray.push(13);
    this.none_visible = false;
    this.fourthFormGroup.controls.noneAboveFormGroup.get('check19').setValue(false);
    this.fourthFormGroup.controls.noneAboveFormGroup.get('none_reason').setValue('');
    this.fourthFormGroup.controls.noneAboveFormGroup.get('none_reason').clearValidators();
    this.fourthFormGroup.controls.noneAboveFormGroup.get('none_reason').updateValueAndValidity();
    this.fourthFormGroup.get('review_date').setValue('');
    this.fourthFormGroup.get('review_date').clearValidators();
    this.fourthFormGroup.get('review_date').updateValueAndValidity();
    this.fourthFormGroup.controls.physicianFormGroup.get('physician_yes').setValidators(Validators.required);
    this.fourthFormGroup.controls.physicianFormGroup.get('physician_yes').updateValueAndValidity();
    this.fourthFormGroup.controls.physicianFormGroup.get('physician_date').setValidators(Validators.required);
    this.fourthFormGroup.controls.physicianFormGroup.get('physician_date').updateValueAndValidity();
  } else {
    this.task13Checked = false;
    const index = this.taskValidationArray.indexOf(13);
    if (index > -1) {
      this.taskValidationArray.splice(index, 1);
    }
    if(this.taskValidationArray.length < 1){
      this.none_visible = true;
      this.noneChecked = false;
  }
    this.fourthFormGroup.controls.physicianFormGroup.get('physician_yes').setValue('');
    this.fourthFormGroup.controls.physicianFormGroup.get('physician_yes').clearValidators();
    this.fourthFormGroup.controls.physicianFormGroup.get('physician_yes').updateValueAndValidity();
    this.fourthFormGroup.controls.physicianFormGroup.get('physician_date').setValue('');
    this.fourthFormGroup.controls.physicianFormGroup.get('physician_date').clearValidators();
    this.fourthFormGroup.controls.physicianFormGroup.get('physician_date').updateValueAndValidity();
    
  }

}

taskCheck14($event:MatCheckboxChange){
  if ($event.checked == true) {
    this.task14Checked = true;
    this.noneChecked = false;
    this.taskValidationArray.push(14);
    this.none_visible = false;
    this.fourthFormGroup.controls.noneAboveFormGroup.get('check19').setValue(false);
    this.fourthFormGroup.controls.noneAboveFormGroup.get('none_reason').setValue('');
    this.fourthFormGroup.controls.noneAboveFormGroup.get('none_reason').clearValidators();
    this.fourthFormGroup.controls.noneAboveFormGroup.get('none_reason').updateValueAndValidity();
    this.fourthFormGroup.get('review_date').setValue('');
    this.fourthFormGroup.get('review_date').clearValidators();
    this.fourthFormGroup.get('review_date').updateValueAndValidity();
    this.fourthFormGroup.controls.legalFormGroup.get('legal_yes').setValidators(Validators.required);
    this.fourthFormGroup.controls.legalFormGroup.get('legal_yes').updateValueAndValidity();
    this.fourthFormGroup.controls.legalFormGroup.get('legal_date').setValidators(Validators.required);
    this.fourthFormGroup.controls.legalFormGroup.get('legal_date').updateValueAndValidity();
  } else {
    this.task14Checked = false;
    const index = this.taskValidationArray.indexOf(14);
    if (index > -1) {
      this.taskValidationArray.splice(index, 1);
    }
    if(this.taskValidationArray.length < 1){
      this.none_visible = true;
      this.noneChecked = false;
  }
    this.fourthFormGroup.controls.legalFormGroup.get('legal_yes').setValue('');
    this.fourthFormGroup.controls.legalFormGroup.get('legal_yes').clearValidators();
    this.fourthFormGroup.controls.legalFormGroup.get('legal_yes').updateValueAndValidity();
    this.fourthFormGroup.controls.legalFormGroup.get('legal_date').setValue('');
    this.fourthFormGroup.controls.legalFormGroup.get('legal_date').clearValidators();
    this.fourthFormGroup.controls.legalFormGroup.get('legal_date').updateValueAndValidity();
    
  }

}

taskCheck15($event:MatCheckboxChange){
  if ($event.checked == true) {
    this.task15Checked = true;
    this.noneChecked = false;
    this.taskValidationArray.push(15);
    this.none_visible = false;
    this.fourthFormGroup.controls.noneAboveFormGroup.get('check19').setValue(false);
    this.fourthFormGroup.controls.noneAboveFormGroup.get('none_reason').setValue('');
    this.fourthFormGroup.controls.noneAboveFormGroup.get('none_reason').clearValidators();
    this.fourthFormGroup.controls.noneAboveFormGroup.get('none_reason').updateValueAndValidity();
    this.fourthFormGroup.get('review_date').setValue('');
    this.fourthFormGroup.get('review_date').clearValidators();
    this.fourthFormGroup.get('review_date').updateValueAndValidity();
    this.fourthFormGroup.controls.liaiseFormGroup.get('liase_yes').setValidators(Validators.required);
    this.fourthFormGroup.controls.liaiseFormGroup.get('liase_yes').updateValueAndValidity();
    this.fourthFormGroup.controls.liaiseFormGroup.get('liase_date').setValidators(Validators.required);
    this.fourthFormGroup.controls.liaiseFormGroup.get('liase_date').updateValueAndValidity();
  } else {
    this.task15Checked = false;
    const index = this.taskValidationArray.indexOf(15);
    if (index > -1) {
      this.taskValidationArray.splice(index, 1);
    }
    if(this.taskValidationArray.length < 1){
      this.none_visible = true;
      this.noneChecked = false;
  }
    this.fourthFormGroup.controls.liaiseFormGroup.get('liase_yes').setValue('');
    this.fourthFormGroup.controls.liaiseFormGroup.get('liase_yes').clearValidators();
    this.fourthFormGroup.controls.liaiseFormGroup.get('liase_yes').updateValueAndValidity();
    this.fourthFormGroup.controls.liaiseFormGroup.get('liase_date').setValue('');
    this.fourthFormGroup.controls.liaiseFormGroup.get('liase_date').clearValidators();
    this.fourthFormGroup.controls.liaiseFormGroup.get('liase_date').updateValueAndValidity();
    
  }

}

taskCheck16($event:MatCheckboxChange){
  if ($event.checked == true) {
    this.task16Checked = true;
    this.noneChecked = false;
    this.taskValidationArray.push(16);
    this.none_visible = false;
    this.fourthFormGroup.controls.noneAboveFormGroup.get('check19').setValue(false);
    this.fourthFormGroup.controls.noneAboveFormGroup.get('none_reason').setValue('');
    this.fourthFormGroup.controls.noneAboveFormGroup.get('none_reason').clearValidators();
    this.fourthFormGroup.controls.noneAboveFormGroup.get('none_reason').updateValueAndValidity();
    this.fourthFormGroup.get('review_date').setValue('');
    this.fourthFormGroup.get('review_date').clearValidators();
    this.fourthFormGroup.get('review_date').updateValueAndValidity();
    this.fourthFormGroup.controls.consultLegalFormGroup.get('consult_legal_yes').setValidators(Validators.required);
    this.fourthFormGroup.controls.consultLegalFormGroup.get('consult_legal_yes').updateValueAndValidity();
    this.fourthFormGroup.controls.consultLegalFormGroup.get('consult_legal_date').setValidators(Validators.required);
    this.fourthFormGroup.controls.consultLegalFormGroup.get('consult_legal_date').updateValueAndValidity();
  } else {
    this.task16Checked = false;
    const index = this.taskValidationArray.indexOf(16);
    if (index > -1) {
      this.taskValidationArray.splice(index, 1);
    }
    if(this.taskValidationArray.length < 1){
      this.none_visible = true;
      this.noneChecked = false;
  }
    this.fourthFormGroup.controls.consultLegalFormGroup.get('consult_legal_yes').setValue('');
    this.fourthFormGroup.controls.consultLegalFormGroup.get('consult_legal_yes').clearValidators();
    this.fourthFormGroup.controls.consultLegalFormGroup.get('consult_legal_yes').updateValueAndValidity();
    this.fourthFormGroup.controls.consultLegalFormGroup.get('consult_legal_date').setValue('');
    this.fourthFormGroup.controls.consultLegalFormGroup.get('consult_legal_date').clearValidators();
    this.fourthFormGroup.controls.consultLegalFormGroup.get('consult_legal_date').updateValueAndValidity();
    
  }

}

taskCheck17($event:MatCheckboxChange){
  if ($event.checked == true) {
    this.task17Checked = true;
    this.noneChecked = false;
    this.taskValidationArray.push(17);
    this.none_visible = false;
    this.fourthFormGroup.controls.noneAboveFormGroup.get('check19').setValue(false);
    this.fourthFormGroup.controls.noneAboveFormGroup.get('none_reason').setValue('');
    this.fourthFormGroup.controls.noneAboveFormGroup.get('none_reason').clearValidators();
    this.fourthFormGroup.controls.noneAboveFormGroup.get('none_reason').updateValueAndValidity();
    this.fourthFormGroup.get('review_date').setValue('');
    this.fourthFormGroup.get('review_date').clearValidators();
    this.fourthFormGroup.get('review_date').updateValueAndValidity();
    this.fourthFormGroup.controls.bankAccountFormGroup.get('bank_account_yes').setValidators(Validators.required);
    this.fourthFormGroup.controls.bankAccountFormGroup.get('bank_account_yes').updateValueAndValidity();
    this.fourthFormGroup.controls.bankAccountFormGroup.get('bank_account_date').setValidators(Validators.required);
    this.fourthFormGroup.controls.bankAccountFormGroup.get('bank_account_date').updateValueAndValidity();
  } else {
    this.task17Checked = false;
    const index = this.taskValidationArray.indexOf(17);
    if (index > -1) {
      this.taskValidationArray.splice(index, 1);
    }
    if(this.taskValidationArray.length < 1){
      this.none_visible = true;
      this.noneChecked = false;
  }
    this.fourthFormGroup.controls.bankAccountFormGroup.get('bank_account_yes').setValue('');
    this.fourthFormGroup.controls.bankAccountFormGroup.get('bank_account_yes').clearValidators();
    this.fourthFormGroup.controls.bankAccountFormGroup.get('bank_account_yes').updateValueAndValidity();
    this.fourthFormGroup.controls.bankAccountFormGroup.get('bank_account_date').setValue('');
    this.fourthFormGroup.controls.bankAccountFormGroup.get('bank_account_date').clearValidators();
    this.fourthFormGroup.controls.bankAccountFormGroup.get('bank_account_date').updateValueAndValidity();
    
  }

}

taskCheck18($event:MatCheckboxChange){
  if ($event.checked == true) {
    this.task18Checked = true;
    this.taskValidationArray.push(18);
    this.none_visible = false;
    this.noneChecked = false;
    this.fourthFormGroup.controls.noneAboveFormGroup.get('check19').setValue(false);
    this.fourthFormGroup.controls.noneAboveFormGroup.get('none_reason').setValue('');
    this.fourthFormGroup.controls.noneAboveFormGroup.get('none_reason').clearValidators();
    this.fourthFormGroup.controls.noneAboveFormGroup.get('none_reason').updateValueAndValidity();
    this.fourthFormGroup.get('review_date').setValue('');
    this.fourthFormGroup.get('review_date').clearValidators();
    this.fourthFormGroup.get('review_date').updateValueAndValidity();
    this.fourthFormGroup.controls.offerHelpFormGroup.get('offer_help_yes').setValidators(Validators.required);
    this.fourthFormGroup.controls.offerHelpFormGroup.get('offer_help_yes').updateValueAndValidity();
    this.fourthFormGroup.controls.offerHelpFormGroup.get('offer_help_date').setValidators(Validators.required);
    this.fourthFormGroup.controls.offerHelpFormGroup.get('offer_help_date').updateValueAndValidity();
  } else {
    this.task18Checked = false;
    const index = this.taskValidationArray.indexOf(18);
    if (index > -1) {
      this.taskValidationArray.splice(index, 1);
    }
    if(this.taskValidationArray.length < 1){
      this.none_visible = true;
      this.noneChecked = false;
  }
    this.fourthFormGroup.controls.offerHelpFormGroup.get('offer_help_yes').setValue('');
    this.fourthFormGroup.controls.offerHelpFormGroup.get('offer_help_yes').clearValidators();
    this.fourthFormGroup.controls.offerHelpFormGroup.get('offer_help_yes').updateValueAndValidity();
    this.fourthFormGroup.controls.offerHelpFormGroup.get('offer_help_date').setValue('');
    this.fourthFormGroup.controls.offerHelpFormGroup.get('offer_help_date').clearValidators();
    this.fourthFormGroup.controls.offerHelpFormGroup.get('offer_help_date').updateValueAndValidity();
    
  }

}

taskCheck19($event:MatCheckboxChange){
  if ($event.checked == true) {
    
    this.noneChecked = true;
    this.fourthFormGroup.controls.noneAboveFormGroup.get('none_reason').setValidators(Validators.required);
    this.fourthFormGroup.controls.noneAboveFormGroup.get('none_reason').updateValueAndValidity();
    this.fourthFormGroup.get('review_date').setValidators(Validators.required);
    this.fourthFormGroup.get('review_date').updateValueAndValidity();
    
  } else {
    this.noneChecked = false;
    this.fourthFormGroup.controls.noneAboveFormGroup.get('none_reason').setValue('');
    this.fourthFormGroup.controls.noneAboveFormGroup.get('none_reason').clearValidators();
    this.fourthFormGroup.controls.noneAboveFormGroup.get('none_reason').updateValueAndValidity();
    this.fourthFormGroup.get('review_date').setValue('');
    this.fourthFormGroup.get('review_date').clearValidators();
    this.fourthFormGroup.get('review_date').updateValueAndValidity();
    
  }

}
  uuidChange($event:MatRadioChange){
   
    if ($event.value === 'Yes') {
      this.fourthFormGroup.controls.validUUIDFormGroup.get('uuid_valid').setValidators(Validators.required);
      this.fourthFormGroup.controls.validUUIDFormGroup.get('uuid_valid').updateValueAndValidity();
      this.isYes = true;
      
    }else{
      this.isYes = false;
      this.fourthFormGroup.controls.validUUIDFormGroup.get('uuid_valid').clearValidators();
      this.fourthFormGroup.controls.validUUIDFormGroup.get('uuid_valid').updateValueAndValidity();
      
    }
  }

  reniewUUID($event:MatRadioChange){
    if ($event.value ==='Yes') {
     this.reniewUUIDYesSelected = true;
     this.fourthFormGroup.controls.renewUUIdFormGroup.get('uuid_renew_remark').setValidators(Validators.required);
     this.fourthFormGroup.controls.renewUUIdFormGroup.get('uuid_renew_remark').updateValueAndValidity();
     this.fourthFormGroup.controls.renewUUIdFormGroup.get('uuid_renew_follow_up').setValidators(Validators.required);
     this.fourthFormGroup.controls.renewUUIdFormGroup.get('uuid_renew_follow_up').updateValueAndValidity();
    } else {
      this.reniewUUIDYesSelected = false;
      this.fourthFormGroup.controls.renewUUIdFormGroup.get('uuid_renew_remark').setValue('');
      this.fourthFormGroup.controls.renewUUIdFormGroup.get('uuid_renew_remark').clearValidators();
      this.fourthFormGroup.controls.renewUUIdFormGroup.get('uuid_renew_remark').updateValueAndValidity();
      this.fourthFormGroup.controls.renewUUIdFormGroup.get('uuid_renew_follow_up').setValue('');
      this.fourthFormGroup.controls.renewUUIdFormGroup.get('uuid_renew_follow_up').clearValidators();
      this.fourthFormGroup.controls.renewUUIdFormGroup.get('uuid_renew_follow_up').updateValueAndValidity();
    
      
    }
  }

  needBenefit($event:MatRadioChange){
    if ($event.value ==='Yes') {
     this.needBenefitYesSelected = true;
     this.fourthFormGroup.controls.benefitFormGroup.get('dis_benefit_remark').setValidators(Validators.required);
     this.fourthFormGroup.controls.benefitFormGroup.get('dis_benefit_remark').updateValueAndValidity();
     this.fourthFormGroup.controls.benefitFormGroup.get('dis_benefit_follow_up').setValidators(Validators.required);
     this.fourthFormGroup.controls.benefitFormGroup.get('dis_benefit_follow_up').updateValueAndValidity();
    } else {
      this.needBenefitYesSelected = false;
      this.fourthFormGroup.controls.benefitFormGroup.get('dis_benefit_remark').setValue('');
      this.fourthFormGroup.controls.benefitFormGroup.get('dis_benefit_remark').clearValidators();
      this.fourthFormGroup.controls.benefitFormGroup.get('dis_benefit_remark').updateValueAndValidity();
      this.fourthFormGroup.controls.benefitFormGroup.get('dis_benefit_follow_up').setValue('');
      this.fourthFormGroup.controls.benefitFormGroup.get('dis_benefit_follow_up').clearValidators();
      this.fourthFormGroup.controls.benefitFormGroup.get('dis_benefit_follow_up').updateValueAndValidity();
    
      
    }
  }

  meditationChange($event:MatRadioChange){
    if ($event.value ==='Yes') {
      this.medYesSelected = true;
     this.fifthFormGroup.controls.meditationFormGroup.get('meditation_yes').setValidators(Validators.required);
     this.fifthFormGroup.controls.meditationFormGroup.get('meditation_yes').updateValueAndValidity();
    } else {
      this.medYesSelected = false;
      this.fifthFormGroup.controls.meditationFormGroup.get('meditation_yes').setValue('');
      this.fifthFormGroup.controls.meditationFormGroup.get('meditation_yes').clearValidators();
      this.fifthFormGroup.controls.meditationFormGroup.get('meditation_yes').updateValueAndValidity();
      
    }
  
    }

    medicationHelpChange($event:MatRadioChange){
   
      if ($event.value ==='Yes') {
       this.medHelpYesSelected = true;
       this.fifthFormGroup.controls.medicationHelpFormGroup.get('medication_help_yes').setValidators(Validators.required);
       this.fifthFormGroup.controls.medicationHelpFormGroup.get('medication_help_yes').updateValueAndValidity();
      } else {
        
        this.medHelpYesSelected = false;
        this.fifthFormGroup.controls.medicationHelpFormGroup.get('medication_help_yes').setValue('');
        this.fifthFormGroup.controls.medicationHelpFormGroup.get('medication_help_yes').clearValidators();
        this.fifthFormGroup.controls.medicationHelpFormGroup.get('medication_help_yes').updateValueAndValidity();
        
      }
    
      }

    counsellingChange($event:MatRadioChange){
      if ($event.value ==='Yes') {
        this.counsellingYesSelected = true;
       this.fifthFormGroup.controls.counsellingFormGroup.get('counselling_yes').setValidators(Validators.required);
       this.fifthFormGroup.controls.counsellingFormGroup.get('counselling_yes').updateValueAndValidity();
      } else {
        this.counsellingYesSelected = false;
        this.fifthFormGroup.controls.counsellingFormGroup.get('counselling_yes').setValue('');
        this.fifthFormGroup.controls.counsellingFormGroup.get('counselling_yes').clearValidators();
        this.fifthFormGroup.controls.counsellingFormGroup.get('counselling_yes').updateValueAndValidity();
        
      }
  
    }
  
    referralChange($event:MatRadioChange){
      if ($event.value ==='Yes') {
        this.referralYesSelected = true;
       this.fifthFormGroup.controls.referralFormGroup.get('referral_yes').setValidators(Validators.required);
       this.fifthFormGroup.controls.referralFormGroup.get('referral_yes').updateValueAndValidity();
      } else {
        this.referralYesSelected = false;
        this.fifthFormGroup.controls.referralFormGroup.get('referral_yes').setValue('');
        this.fifthFormGroup.controls.referralFormGroup.get('referral_yes').clearValidators();
        this.fifthFormGroup.controls.referralFormGroup.get('referral_yes').updateValueAndValidity();
        
      }
  
    }
    
    psychoEducationChange($event:MatRadioChange){
      if ($event.value ==='Yes') {
        this.psychoYesSelected = true;
       this.fifthFormGroup.controls.psychoFormGroup.get('psychoeducation_yes').setValidators(Validators.required);
       this.fifthFormGroup.controls.psychoFormGroup.get('psychoeducation_yes').updateValueAndValidity();
      } else {
        this.psychoYesSelected = false;
        this.fifthFormGroup.controls.psychoFormGroup.get('psychoeducation_yes').setValue('');
        this.fifthFormGroup.controls.psychoFormGroup.get('psychoeducation_yes').clearValidators();
        this.fifthFormGroup.controls.psychoFormGroup.get('psychoeducation_yes').updateValueAndValidity();
        
      }
  
    }
  
    psychoInterChange($event:MatRadioChange){
      if ($event.value ==='Yes') {
        this.psychoInterYesSelected = true;
       this.fifthFormGroup.controls.psychoInterFormGroup.get('psychointervension_yes').setValidators(Validators.required);
       this.fifthFormGroup.controls.psychoInterFormGroup.get('psychointervension_yes').updateValueAndValidity();
      } else {
        this.psychoInterYesSelected = false;
        this.fifthFormGroup.controls.psychoInterFormGroup.get('psychointervension_yes').setValue('');
        this.fifthFormGroup.controls.psychoInterFormGroup.get('psychointervension_yes').clearValidators();
        this.fifthFormGroup.controls.psychoInterFormGroup.get('psychointervension_yes').updateValueAndValidity();
        
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
    onFileChange(event){

      this.fileContent = event.target.files;
      this.filePath = this.fileContent;
      for (var i = 0; i < event.target.files.length; i++){
      this.selectedFile[this.x++] = <File>event.target.files[i];
    }
    
    }
    
    addFieldValue() {
    
    
      const fileName = this.filePath[0].name;
           
      if (this.fileContent != null) {
        this.newAttribute.filePath = this.filePath;
        this.newAttribute.fileName = fileName;
        this.fieldArray.push(this.newAttribute);
     
        this.newAttribute = {};
      }
     
    }
    
    deleteFieldValue(index) {
    this.fieldArray.splice(index, 1);
    }
}


