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
import { throttleTime } from 'rxjs/operators';
import { OfflineManagerService } from '../../services/offline-manager.service';

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
@Component({
  selector: 'app-welfare',
  templateUrl: './welfare.page.html',
  styleUrls: ['./welfare.page.scss'],
})
export class WelfarePage implements OnInit {
 
  constructor(private router: Router,private _formBuilder: FormBuilder,private dialogModel: MatDialog,
    private patientService: PatientService,private loadingCtrl: LoadingController,
    public alertController: AlertController,private offlineManager : OfflineManagerService) { }
  @ViewChild('stepper') stepper: MatStepper;
  isValue = 4;
  firstFormGroup: any;
  secondFormGroup: any;

  welfaresubForm1:any;
  welfaresubForm2:any;

  user_name;
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
  dateToday;

  welfareObj = {
    form1:'',
    form1_details:'',
    form1_date:'',
    form2:'',
    form2_details:'',
    form2_date:'',
    form3:'',
    form3_details:'',
    form3_date:'',
    form4:'',
    form4_details:'',
    form4_date:'',
    form5:'',
    form5_details:'',
    form5_date:'',
    form6:'',
    form6_details:'',
    form6_date:'',
    form7:'',
    form7_details:'',
    form7_date:'',
    form8:'',
    form8_details:'',
    form8_date:'',
    form9:'',
    form9_details:'',
    form9_date:'',
    form10:'',
    form10_details:'',
    form10_date:'',
    form11:'',
    form11_details:'',
    form11_date:'',
    form12:'',
    form12_details:'',
    form12_date:'',
    form13:'',
    form13_details:'',
    form13_date:'',
    form14:'',
    form14_details:'',
    form14_date:'',
  }
 
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

  task_array = [];


  ngOnInit() {
    this.firstFormGroup = this._formBuilder.group({

     welfaresubForm1: new FormGroup({
        form1: new FormControl(this.welfareObj.form1, Validators.required),
      form1_details: new FormControl(this.welfareObj.form1_details, []),
      form1_date:new FormControl(this.welfareObj.form1_date, []),
     
      }),

      welfaresubForm2: new FormGroup({
     form2: new FormControl(this.welfareObj.form2, Validators.required),
     form2_details: new FormControl(this.welfareObj.form2_details, []),
     form2_date:new FormControl(this.welfareObj.form2_date, []),
     }),

     welfaresubForm3: new FormGroup({
      form3: new FormControl(this.welfareObj.form3, Validators.required),
      form3_details: new FormControl(this.welfareObj.form3_details, []),
      form3_date:new FormControl(this.welfareObj.form3_date, []),
      }),

      welfaresubForm4: new FormGroup({
        form4: new FormControl(this.welfareObj.form4, Validators.required),
        form4_details: new FormControl(this.welfareObj.form4_details, []),
        form4_date:new FormControl(this.welfareObj.form4_date, []),
        }),
        welfaresubForm5: new FormGroup({
          form5: new FormControl(this.welfareObj.form5, Validators.required),
          form5_details: new FormControl(this.welfareObj.form5_details, []),
          form5_date:new FormControl(this.welfareObj.form5_date, []),
          }),
        welfaresubForm6: new FormGroup({
          form6: new FormControl(this.welfareObj.form6, Validators.required),
          form6_details: new FormControl(this.welfareObj.form6_details, []),
          form6_date:new FormControl(this.welfareObj.form6_date, []),
          }),
        welfaresubForm7: new FormGroup({
          form7: new FormControl(this.welfareObj.form7, Validators.required),
          form7_details: new FormControl(this.welfareObj.form7_details,[]),
          form7_date:new FormControl(this.welfareObj.form7_date,[]),
          }),
          welfaresubForm8: new FormGroup({
            form8: new FormControl(this.welfareObj.form8, Validators.required),
            form8_details: new FormControl(this.welfareObj.form8_details, []),
            form8_date:new FormControl(this.welfareObj.form8_date, []),
            }),
          welfaresubForm9: new FormGroup({
            form9: new FormControl(this.welfareObj.form9, Validators.required),
            form9_details: new FormControl(this.welfareObj.form9_details, []),
            form9_date:new FormControl(this.welfareObj.form9_date, []),
            }),
          welfaresubForm10: new FormGroup({
            form10: new FormControl(this.welfareObj.form10, Validators.required),
            form10_details: new FormControl(this.welfareObj.form10_details, []),
            form10_date:new FormControl(this.welfareObj.form10_date, []),
            }),
          welfaresubForm11: new FormGroup({
            form11: new FormControl(this.welfareObj.form11, Validators.required),
            form11_details: new FormControl(this.welfareObj.form11_details, []),
            form11_date:new FormControl(this.welfareObj.form11_date, []),
            }),
            welfaresubForm12: new FormGroup({
              form12: new FormControl(this.welfareObj.form12, Validators.required),
              form12_details: new FormControl(this.welfareObj.form12_details, []),
              form12_date:new FormControl(this.welfareObj.form12_date, []),
              }),

            welfaresubForm13: new FormGroup({
              form13: new FormControl(this.welfareObj.form13, Validators.required),
              form13_details: new FormControl(this.welfareObj.form13_details, []),
              form13_date:new FormControl(this.welfareObj.form13_date,[]),
              }),
              welfaresubForm14: new FormGroup({
                form14: new FormControl(this.welfareObj.form14, []),
                form14_details: new FormControl(this.welfareObj.form14_details, []),
                form14_date:new FormControl(this.welfareObj.form14_date, []),
                }),
 
    })
    this.secondFormGroup = this._formBuilder.group({
    })
}

home(){
  this.router.navigate(['dashboard']);
}

redirect(i){
  
  if(i == 1){
    this.router.navigate(['dashboard']);
  }else if(i == 2){
   // this.router.navigate(['managepatient']);
  }

}

ionViewWillEnter() {
 
  this.user_name = sessionStorage.getItem("user_name");
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
  

    this.patient_id =  sessionStorage.getItem('patient_id');
    this.patient_uuid =  sessionStorage.getItem('patient_uuid');
    this.getPatient(this.patient_uuid);
    this.getPatientWelfare(this.patient_uuid);
}

async getPatient(patient_uuid){
 
  let patient_array_first :any;
    let test = await this.patientService.fetchPatient(patient_uuid).then(result1 => {
     
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

async getPatientWelfare(patient_uuid){
  let welfare_array_first :any;
  let test = await this.patientService.fetchPatientWelfare(patient_uuid).then(result2 => {
   
    welfare_array_first=result2;

 });
 
 
    if(welfare_array_first.length > 1){
      this.task_array = welfare_array_first;
  
    for(var i = 0;i<welfare_array_first.length;i++){
     
          if(welfare_array_first[i].task_type == 21){
          this.task_id1 =welfare_array_first[i].tasks_uuid;
          let option1 = JSON.parse(welfare_array_first[i].task_details);
           this.option_value1 = option1[0];
           this.details1 = option1[1];


          if(this.option_value1 == "Yes"){
          this.yesNoArray1[0].checked = true;
          this.firstFormGroup.controls.welfaresubForm1.get('form1').setValue(this.option_value1);
          this.check1 = true;
          }else if(this.option_value1 == "No"){
          this.yesNoArray1[1].checked = true;
          this.firstFormGroup.controls.welfaresubForm1.get('form1').setValue(this.option_value1);
          }
          this.det1 = this.details1;
          }

          if(welfare_array_first[i].task_type == 22){
            this.task_id2 =welfare_array_first[i].tasks_uuid;
            let option2 = JSON.parse(welfare_array_first[i].task_details);
            this.option_value2 = option2[0];
            this.details2 = option2[1];

            if(this.option_value2 == "Yes"){
              this.yesNoArray2[0].checked = true;
              this.firstFormGroup.controls.welfaresubForm2.get('form2').setValue(this.option_value2);
              this.det2 = this.details2;
              this.date2_new = welfare_array_first[i].task_due_date;
              this.date2 = new Date(welfare_array_first[i].task_due_date); 
              let date = ("0" + this.date2.getDate()).slice(-2);
              let month = ("0" + (this.date2.getMonth() + 1)).slice(-2);
              let year =this.date2.getFullYear();
              this.date2 = date + "-" + month + "-" + year;
              
              this.check2 = true;
            }else if(this.option_value2 == "No"){
              this.yesNoArray2[1].checked = true;
              this.firstFormGroup.controls.welfaresubForm2.get('form2').setValue(this.option_value2);
            }
          }

          if(welfare_array_first[i].task_type == 23){
         
            this.task_id3 =welfare_array_first[i].tasks_uuid;
            let option3 = JSON.parse(welfare_array_first[i].task_details);
            this.option_value3 = option3[0];
            this.details3 = option3[1];
            
            if(this.option_value3 == "Yes"){
              this.tobaccooptionsArray1new[0].checked = true;
              this.firstFormGroup.controls.welfaresubForm3.get('form3').setValue(this.option_value3);
              this.det3 = this.details3;
              //this.date3 = res[i].task_due_date;
              this.date3_new = welfare_array_first[i].task_due_date;
              this.date3 = new Date(welfare_array_first[i].task_due_date); 
              let date = ("0" + this.date3.getDate()).slice(-2);
              let month = ("0" + (this.date3.getMonth() + 1)).slice(-2);
              let year =this.date3.getFullYear();
              this.date3 = date + "-" + month + "-" + year;
              this.check3 = true;
            }else if(this.option_value3 == "No"){
              this.tobaccooptionsArray1new[1].checked = true;
              this.firstFormGroup.controls.welfaresubForm3.get('form3').setValue(this.option_value3);
            }else if(this.option_value3 == "Already availed"){
              this.tobaccooptionsArray1new[2].checked = true;
              this.firstFormGroup.controls.welfaresubForm3.get('form3').setValue(this.option_value3);
            }else if(this.option_value3 == "Needs review"){
            
              this.tobaccooptionsArray1new[3].checked = true;
              this.firstFormGroup.controls.welfaresubForm3.get('form3').setValue(this.option_value3);
              this.det3 = this.details3;
              //this.date3 = res[i].task_due_date;
              this.date3_new = welfare_array_first[i].task_due_date;
              this.date3 = new Date(welfare_array_first[i].task_due_date); 
              let date = ("0" + this.date3.getDate()).slice(-2);
              let month = ("0" + (this.date3.getMonth() + 1)).slice(-2);
              let year =this.date3.getFullYear();
              this.date3 = date + "-" + month + "-" + year;
              this.check3 = true;
            }
          }

          if(welfare_array_first[i].task_type == 24){
      
            this.task_id4 =welfare_array_first[i].tasks_uuid;
            let option4 = JSON.parse(welfare_array_first[i].task_details);
            this.option_value4 = option4[0];
            this.details4 = option4[1];
            
            if(this.option_value4 == "Yes"){
              this.tobaccooptionsArray2new[0].checked = true;
              this.firstFormGroup.controls.welfaresubForm4.get('form4').setValue(this.option_value4);
              this.det4 = this.details4;
              this.date4_new = welfare_array_first[i].task_due_date;
              this.date4 = new Date(welfare_array_first[i].task_due_date); 
              let date = ("0" + this.date4.getDate()).slice(-2);
              let month = ("0" + (this.date4.getMonth() + 1)).slice(-2);
              let year =this.date4.getFullYear();
              this.date4 = date + "-" + month + "-" + year;
              this.check4 = true;
            }else if(this.option_value4 == "No"){
              this.tobaccooptionsArray2new[1].checked = true;
              this.firstFormGroup.controls.welfaresubForm4.get('form4').setValue(this.option_value4);
            }else if(this.option_value4 == "Already availed"){
              this.tobaccooptionsArray2new[2].checked = true;
              this.firstFormGroup.controls.welfaresubForm4.get('form4').setValue(this.option_value4);
            }else if(this.option_value4 == "Needs review"){
             
              this.tobaccooptionsArray2new[3].checked = true;
              this.firstFormGroup.controls.welfaresubForm4.get('form4').setValue(this.option_value4);
               this.det4 = this.details4;
            
              this.date4_new = welfare_array_first[i].task_due_date;
              this.date4 = new Date(welfare_array_first[i].task_due_date); 
              let date = ("0" + this.date4.getDate()).slice(-2);
              let month = ("0" + (this.date4.getMonth() + 1)).slice(-2);
              let year =this.date4.getFullYear();
              this.date4 = date + "-" + month + "-" + year;
              this.check4 = true;
            }else if(this.option_value4 == "Does not apply"){
              this.tobaccooptionsArray2new[4].checked = true;
              this.firstFormGroup.controls.welfaresubForm4.get('form3').setValue(this.option_value4);
            }
          }

          if(welfare_array_first[i].task_type == 25){
            this.task_id5 =welfare_array_first[i].tasks_uuid;
            let option5 = JSON.parse(welfare_array_first[i].task_details);
            this.option_value5 = option5[0];
            this.details5 = option5[1];

            if(this.option_value5 == "Yes"){
              this.YesNoOtherOptions[0].checked = true;
              this.firstFormGroup.controls.welfaresubForm5.get('form5').setValue(this.option_value5);
              this.det5 = this.details5;
              //this.date5 = res[i].task_due_date;
              this.date5_new = welfare_array_first[i].task_due_date;
              this.date5 = new Date(welfare_array_first[i].task_due_date); 
             
              let date = ("0" + this.date5.getDate()).slice(-2);
              let month = ("0" + (this.date5.getMonth() + 1)).slice(-2);
              let year =this.date5.getFullYear();
              this.date5 = date + "-" + month + "-" + year;
              this.check5 = true;
            }else if(this.option_value5 == "No"){
              this.YesNoOtherOptions[1].checked = true;
              this.firstFormGroup.controls.welfaresubForm5.get('form5').setValue(this.option_value5);
            }else if(this.option_value5 == "Already availed"){
              this.YesNoOtherOptions[2].checked = true;
              this.firstFormGroup.controls.welfaresubForm5.get('form5').setValue(this.option_value5);
            }else if(this.option_value5 == "Do not apply"){
              this.YesNoOtherOptions[3].checked =  true;
              this.firstFormGroup.controls.welfaresubForm5.get('form5').setValue(this.option_value5);
            }
          }

          if(welfare_array_first[i].task_type == 26){
            this.task_id6 =welfare_array_first[i].tasks_uuid;
            let option6 = JSON.parse(welfare_array_first[i].task_details);
            this.option_value6 = option6[0];
            this.details6 = option6[1];
            
            if(this.option_value6 == "Yes"){
              this.tobaccooptionsArray3[0].checked = true;
              this.firstFormGroup.controls.welfaresubForm6.get('form6').setValue(this.option_value6);
              this.det6 = this.details6;
              //this.date6 = res[i].task_due_date;
              this.date6_new = welfare_array_first[i].task_due_date;
              this.date6 = new Date(welfare_array_first[i].task_due_date); 
              let date = ("0" + this.date6.getDate()).slice(-2);
              let month = ("0" + (this.date6.getMonth() + 1)).slice(-2);
              let year =this.date6.getFullYear();
              this.date6 = date + "-" + month + "-" + year;
              this.check6 = true;
            }else if(this.option_value6 == "No"){
              this.tobaccooptionsArray3[1].checked = true;
              this.firstFormGroup.controls.welfaresubForm6.get('form6').setValue(this.option_value6);
            }else if(this.option_value6 == "Already availed"){
              this.tobaccooptionsArray3[2].checked = true;
              this.firstFormGroup.controls.welfaresubForm6.get('form6').setValue(this.option_value6);
            }
          }

          if(welfare_array_first[i].task_type == 27){
            this.task_id7 =welfare_array_first[i].tasks_uuid;
            let option7 = JSON.parse(welfare_array_first[i].task_details);
            this.option_value7 = option7[0];
            this.details7 = option7[1];
            
            if(this.option_value7 == "Yes"){
              this.yesNoArray3[0].checked = true;
              this.firstFormGroup.controls.welfaresubForm7.get('form7').setValue(this.option_value7);
              this.det7 = this.details7;
              //this.date7 = res[i].task_due_date;
              this.date7_new = welfare_array_first[i].task_due_date;
              this.date7 = new Date(welfare_array_first[i].task_due_date); 
              let date = ("0" + this.date7.getDate()).slice(-2);
              let month = ("0" + (this.date7.getMonth() + 1)).slice(-2);
              let year =this.date7.getFullYear();
              this.date7 = date + "-" + month + "-" + year;
              this.check7 = true;
            }else if(this.option_value7 == "No"){
              this.yesNoArray3[1].checked = true;
              this.firstFormGroup.controls.welfaresubForm7.get('form7').setValue(this.option_value7);
            }
          }

          if(welfare_array_first[i].task_type == 28){
            this.task_id8 =welfare_array_first[i].tasks_uuid;
            let option8 = JSON.parse(welfare_array_first[i].task_details);
            this.option_value8 = option8[0];
            this.details8 = option8[1];
            
            if(this.option_value8 == "Yes"){
              this.tobaccooptionsArray4[0].checked = true;
              this.firstFormGroup.controls.welfaresubForm8.get('form8').setValue(this.option_value8);
              this.det8 = this.details8;
              //this.date8 = res[i].task_due_date;
              this.date8_new = welfare_array_first[i].task_due_date;
              this.date8 = new Date(welfare_array_first[i].task_due_date); 
              let date = ("0" + this.date8.getDate()).slice(-2);
              let month = ("0" + (this.date8.getMonth() + 1)).slice(-2);
              let year =this.date8.getFullYear();
              this.date8 = date + "-" + month + "-" + year;
              this.check8 = true;
            }else if(this.option_value8 == "No"){
              this.tobaccooptionsArray4[1].checked = true;
              this.firstFormGroup.controls.welfaresubForm8.get('form8').setValue(this.option_value8);
            }else if(this.option_value8 == "Already availed"){
              this.tobaccooptionsArray4[2].checked = true;
              this.firstFormGroup.controls.welfaresubForm8.get('form8').setValue(this.option_value8);
            }
          }

          if(welfare_array_first[i].task_type == 29){
            this.task_id9 =welfare_array_first[i].tasks_uuid;
            let option9= JSON.parse(welfare_array_first[i].task_details);
            this.option_value9 = option9[0];
            this.details9 = option9[1];
            
            if(this.option_value9 == "Yes"){
              this.tobaccooptionsArray4[0].checked = true;
              this.firstFormGroup.controls.welfaresubForm9.get('form9').setValue(this.option_value9);
              this.det9 = this.details9;
              //this.date9 = res[i].task_due_date;
              this.date9_new = welfare_array_first[i].task_due_date;
              this.date9 = new Date(welfare_array_first[i].task_due_date); 
              let date = ("0" + this.date9.getDate()).slice(-2);
              let month = ("0" + (this.date9.getMonth() + 1)).slice(-2);
              let year =this.date9.getFullYear();
              this.date9 = date + "-" + month + "-" + year;
              this.check9 = true;
            }else if(this.option_value9 == "No"){
              this.tobaccooptionsArray4[1].checked = true;
              this.firstFormGroup.controls.welfaresubForm9.get('form9').setValue(this.option_value9);
            }else if(this.option_value9 == "Already availed"){
              this.tobaccooptionsArray4[2].checked = true;
              this.firstFormGroup.controls.welfaresubForm9.get('form9').setValue(this.option_value9);
            }
          }

          if(welfare_array_first[i].task_type == 30){
            this.task_id10 =welfare_array_first[i].tasks_uuid;
            let option10= JSON.parse(welfare_array_first[i].task_details);
            this.option_value10 = option10[0];
            this.details10 = option10[1];

            if(this.option_value10 == "Yes"){
              this.tobaccooptionsArray5[0].checked = true;
              this.firstFormGroup.controls.welfaresubForm10.get('form10').setValue(this.option_value10);
              this.det10 = this.details10;
              //this.date10 = res[i].task_due_date;
           
              this.date10_new = welfare_array_first[i].task_due_date;
              this.date10 = new Date(welfare_array_first[i].task_due_date); 
              let date = ("0" + this.date10.getDate()).slice(-2);
              let month = ("0" + (this.date10.getMonth() + 1)).slice(-2);
              let year =this.date10.getFullYear();
              this.date10 = date + "-" + month + "-" + year;
              this.check10 = true;
            }else if(this.option_value10 == "No"){
              this.tobaccooptionsArray5[1].checked = true;
              this.firstFormGroup.controls.welfaresubForm10.get('form10').setValue(this.option_value10);
            }else if(this.option_value10 == "Already availed"){
              this.tobaccooptionsArray5[2].checked = true;
              this.firstFormGroup.controls.welfaresubForm10.get('form10').setValue(this.option_value10);
            }
          }

          if(welfare_array_first[i].task_type == 31){
            this.task_id11 =welfare_array_first[i].tasks_uuid;
            let option11= JSON.parse(welfare_array_first[i].task_details);
            this.option_value11 = option11[0];
            this.details11= option11[1];

            if(this.option_value11 == "Yes"){
              this.tobaccooptionsArray6[0].checked = true;
              this.firstFormGroup.controls.welfaresubForm11.get('form11').setValue(this.option_value11);
              this.det11 = this.details11;
              //this.date11 = res[i].task_due_date;
              this.date11_new = welfare_array_first[i].task_due_date;
              this.date11 = new Date(welfare_array_first[i].task_due_date); 
              let date = ("0" + this.date11.getDate()).slice(-2);
              let month = ("0" + (this.date11.getMonth() + 1)).slice(-2);
              let year =this.date11.getFullYear();
              this.date11 = date + "-" + month + "-" + year;
              this.check11 = true;
            }else if(this.option_value11 == "No"){
              this.tobaccooptionsArray6[1].checked = true;
              this.firstFormGroup.controls.welfaresubForm11.get('form11').setValue(this.option_value11);
            }else if(this.option_value11 == "Already availed"){
              this.tobaccooptionsArray6[2].checked = true;
              this.firstFormGroup.controls.welfaresubForm11.get('form11').setValue(this.option_value11);
            }
          }

          if(welfare_array_first[i].task_type == 32){
            this.task_id12 =welfare_array_first[i].tasks_uuid;

            let option12= JSON.parse(welfare_array_first[i].task_details);
            this.option_value12 = option12[0];
            this.details12= option12[1];
            
            if(this.option_value12 == "Yes"){
              this.tobaccooptionsArray7[0].checked = true;
              this.firstFormGroup.controls.welfaresubForm12.get('form12').setValue(this.option_value12);
              this.det12 = this.details12;
              //this.date12 = res[i].task_due_date;
              this.date12_new = welfare_array_first[i].task_due_date;
              this.date12 = new Date(welfare_array_first[i].task_due_date); 
              let date = ("0" + this.date12.getDate()).slice(-2);
              let month = ("0" + (this.date12.getMonth() + 1)).slice(-2);
              let year =this.date12.getFullYear();
              this.date12 = date + "-" + month + "-" + year;
              this.check12 = true;
            }else if(this.option_value12 == "No"){
              this.tobaccooptionsArray7[1].checked = true;
              this.firstFormGroup.controls.welfaresubForm12.get('form12').setValue(this.option_value12);
            }else if(this.option_value12 == "Already availed"){
              this.tobaccooptionsArray7[2].checked = true;
              this.firstFormGroup.controls.welfaresubForm12.get('form12').setValue(this.option_value12);
            }
          }

          if(welfare_array_first[i].task_type == 33){
            this.task_id13 =welfare_array_first[i].tasks_uuid;
            let option13= JSON.parse(welfare_array_first[i].task_details);
            this.option_value13 = option13[0];
            //let option_value13 ="Yes";
            this.details13= option13[1];
            
            if(this.option_value13 == "Yes"){
              this.tobaccooptionsArray8[0].checked = true;
              this.firstFormGroup.controls.welfaresubForm13.get('form13').setValue(this.option_value13);
              this.det13 = this.details13;
              //this.date13 = res[i].task_due_date;
              this.date13_new = welfare_array_first[i].task_due_date;
              this.date13 = new Date(welfare_array_first[i].task_due_date); 
              let date = ("0" + this.date13.getDate()).slice(-2);
              let month = ("0" + (this.date13.getMonth() + 1)).slice(-2);
              let year =this.date13.getFullYear();
              this.date13 = date + "-" + month + "-" + year;
              this.check13 = true;
            }else if(this.option_value13 == "No"){
              this.tobaccooptionsArray8[1].checked = true;
              this.firstFormGroup.controls.welfaresubForm13.get('form13').setValue(this.option_value13);
            }else if(this.option_value13 == "Already availed"){
              this.tobaccooptionsArray8[2].checked = true;
              this.firstFormGroup.controls.welfaresubForm13.get('form13').setValue(this.option_value13);
            }
          }
          if(welfare_array_first[i].task_type == 34){
            this.task_id14 =welfare_array_first[i].tasks_uuid;
            let option14= JSON.parse(welfare_array_first[i].task_details);
            this.option_value14 = option14[0];
            this.details14= option14[1];
            this.det14 = this.details14;
              //this.date14 = res[i].task_due_date;
              this.date14_new = welfare_array_first[i].task_due_date;
              this.date14 = new Date(welfare_array_first[i].task_due_date);
                
              let date = ("0" + this.date14.getDate()).slice(-2);
              let month = ("0" + (this.date14.getMonth() + 1)).slice(-2);
              let year =this.date14.getFullYear();
              this.date14 = date + "-" + month + "-" + year;
              this.check14 = true;
            
          }
    

    }

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

  previous1(){
    this.ngOnInit();
    this.router.navigate(['patient-details']);

  }

  previous(){
    this.stepper.previous();
  }

  async submitStep1(firstFormGroup){
  //if first visit, then insert data to table else update data in the table
 
    if(this.task_array.length > 0){
 
      let welArray = [];
      let welObj1 = {};
      let welObj2 = {};
      let welObj3 = {};
      let welObj4 = {};
      let welObj5 = {};
      let welObj6 = {};
      let welObj7 = {};
      let welObj8 = {};
      let welObj9 = {};
      let welObj10 = {};
      let welObj11= {};
      let welObj12 = {};
      let welObj13 = {};
      let welObj14 = {};
      let arr1 = [];

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
     
    if(this.task_id1 != undefined){
      arr1.push(this.firstFormGroup.controls.welfaresubForm1.get('form1').value,this.firstFormGroup.controls.welfaresubForm1.get('form1_details').value)
      welObj1 = {
        uuid:this.task_id1,
        task_status:"pending",
        task_details:arr1,
        date:'',
      }
      welArray.push(welObj1);
     
    }else{
     
      let arr1 = [];
      arr1.push(this.firstFormGroup.controls.welfaresubForm1.get('form1').value,this.firstFormGroup.controls.welfaresubForm1.get('form1_details').value)
      fourthObj1 = {
        check21:this.firstFormGroup.controls.welfaresubForm1.get('form1').value,
        option:21,
        task_details:arr1,
        date:'',
      }
      fourthArray.push(fourthObj1);
    }
    
   
    if(this.task_id2 != undefined){
    if(this.firstFormGroup.controls.welfaresubForm2.get('form2_date').value != ""){
      let arr2 = [];
      arr2.push(this.firstFormGroup.controls.welfaresubForm2.get('form2').value,this.firstFormGroup.controls.welfaresubForm2.get('form2_details').value)
      let follow_up_date1 = this.firstFormGroup.controls.welfaresubForm2.get('form2_date').value;
      
      let follow_up_date = follow_up_date1;
      
      welObj2 = {
        uuid:this.task_id2,
        task_status:"pending",
        task_details:arr2,
        date:follow_up_date
      }
      
      
   }else{
    let arr2 = [];
    arr2.push(this.option_value2,this.details2)
    welObj2 = {
      uuid:this.task_id2,
        task_status:"pending",
      task_details:arr2,
      date:this.date2_new
    }
     
    }
    welArray.push(welObj2);
    }else{
    let arr2 = [];
    arr2.push(this.firstFormGroup.controls.welfaresubForm2.get('form2').value,this.firstFormGroup.controls.welfaresubForm2.get('form2_details').value)
   
  if(this.firstFormGroup.controls.welfaresubForm2.get('form2_date').value != ""){
    let follow_up_date1 = this.firstFormGroup.controls.welfaresubForm2.get('form2_date').value;
    
    let follow_up_date = follow_up_date1;
    
    fourthObj2 = {
      check22:this.firstFormGroup.controls.welfaresubForm2.get('form2').value,
      option:22,
      task_details:arr2,
      date:follow_up_date
    }
    
    
 }else{
 
  fourthObj2 = {
    check22:this.firstFormGroup.controls.welfaresubForm2.get('form2').value,
    option:22,
    task_details:arr2,
    date:""
  }
   
  }
  fourthArray.push(fourthObj2);
    }

    if(this.task_id3 != undefined){
     if(this.firstFormGroup.controls.welfaresubForm3.get('form3_date').value != ""){
      let arr3 = [];
    
      arr3.push(this.firstFormGroup.controls.welfaresubForm3.get('form3').value,this.firstFormGroup.controls.welfaresubForm3.get('form3_details').value)
    
      let follow_up_date1 = this.firstFormGroup.controls.welfaresubForm3.get('form3_date').value;
     
      let follow_up_date = follow_up_date1;
     
      
      welObj3 = {
        uuid:this.task_id3,
        task_status:"pending",
        task_details:arr3,
        date:follow_up_date,
      }
     
      
    }else{
      let arr3 = [];
      arr3.push(this.option_value3,this.details3)
      welObj3 = {
        uuid:this.task_id3,
        task_status:"pending",
        task_details:arr3,
        date:this.date3_new
      }
     
    }
    welArray.push(welObj3);
    }else{
      let arr3 = [];
      arr3.push( this.firstFormGroup.controls.welfaresubForm3.get('form3').value,this.firstFormGroup.controls.welfaresubForm3.get('form3_details').value)
        
      if(this.firstFormGroup.controls.welfaresubForm3.get('form3_date').value != ""){
        let follow_up_date1 = this.firstFormGroup.controls.welfaresubForm3.get('form3_date').value;
        
        let follow_up_date = follow_up_date1;
        
        fourthObj3 = {
          check23:this.firstFormGroup.controls.welfaresubForm3.get('form3').value,
          option:23,
          task_details:arr3,
          date:follow_up_date,
        }
       
        
      }else{
         fourthObj3 = {
          check23:this.firstFormGroup.controls.welfaresubForm3.get('form3').value,
          option:23,
          task_details:arr3,
          date:"",
        }
       
      }
      fourthArray.push(fourthObj3);
    }

    if(this.task_id4 != undefined){
    if(this.firstFormGroup.controls.welfaresubForm4.get('form4_date').value != ""){
      let arr4 = [];
      arr4.push(this.firstFormGroup.controls.welfaresubForm4.get('form4').value,this.firstFormGroup.controls.welfaresubForm4.get('form4_details').value)

      let follow_up_date1 = this.firstFormGroup.controls.welfaresubForm4.get('form4_date').value;
     
      let follow_up_date = follow_up_date1;
     
      
      welObj4 = {
        uuid:this.task_id4,
        task_status:"pending",
        task_details:arr4,
        date:follow_up_date,
      }
     
      
    }else{
      let arr4 = [];
      arr4.push(this.option_value4,this.details4)
      welObj4 = {
        uuid:this.task_id4,
        task_status:"pending",
        task_details:arr4,
        date:this.date4_new
      }
     
    }
    welArray.push(welObj4);
    }else{
      let arr4 = [];
      arr4.push(this.firstFormGroup.controls.welfaresubForm4.get('form4').value,this.firstFormGroup.controls.welfaresubForm4.get('form4_details').value)
    
      if(this.firstFormGroup.controls.welfaresubForm4.get('form4_date').value != ""){
       
        let follow_up_date1 = this.firstFormGroup.controls.welfaresubForm4.get('form4_date').value;
       
         let follow_up_date = follow_up_date1;
        
        fourthObj4 = {
          check24:this.firstFormGroup.controls.welfaresubForm4.get('form4').value,
          option:24,
          task_details:arr4,
          date:follow_up_date,
        }
       
        
      }else{
       
        fourthObj4 = {
          check24:this.firstFormGroup.controls.welfaresubForm4.get('form4').value,
          option:24,
          task_details:arr4,
          date:"",
        }
       
      }
      fourthArray.push(fourthObj4);
    }

    if(this.task_id5 != undefined){
      if(this.firstFormGroup.controls.welfaresubForm5.get('form5_date').value != ""){
        let arr5 = [];
arr5.push(this.firstFormGroup.controls.welfaresubForm5.get('form5').value,this.firstFormGroup.controls.welfaresubForm5.get('form5_details').value)
  
      let follow_up_date1 = this.firstFormGroup.controls.welfaresubForm5.get('form5_date').value;
     
      let follow_up_date = follow_up_date1;
      
      welObj5 = {
        uuid:this.task_id5,
        task_status:"pending",
        task_details:arr5,
        date:follow_up_date,
      }
     
      
    }else{
      let arr5 = [];
      arr5.push(this.option_value5,this.details5)
      welObj5 = {
        uuid:this.task_id5,
        task_status:"pending",
        task_details:arr5,
        date:this.date5_new
      }
     
    }
    welArray.push(welObj5);
    }else{
      let arr5 = [];
      arr5.push(this.firstFormGroup.controls.welfaresubForm5.get('form5').value,this.firstFormGroup.controls.welfaresubForm5.get('form5_details').value)
       
     if(this.firstFormGroup.controls.welfaresubForm5.get('form5_date').value != ""){
     
        let follow_up_date1 = this.firstFormGroup.controls.welfaresubForm5.get('form5_date').value;
       
        let follow_up_date = follow_up_date1;
        
        fourthObj5 = {
          check25:this.firstFormGroup.controls.welfaresubForm5.get('form5').value,
          option:25,
          task_details:arr5,
          date:follow_up_date,
        }
       
        
      }else{
        
        fourthObj5 = {
          check25:this.firstFormGroup.controls.welfaresubForm5.get('form5').value,
          option:25,
          task_details:arr5,
          date:"",
        }
       
      }
      fourthArray.push(fourthObj5);
    }

    if(this.task_id6 != undefined){
      if(this.firstFormGroup.controls.welfaresubForm6.get('form6_date').value != ""){
        let arr6 = [];
    arr6.push(this.firstFormGroup.controls.welfaresubForm6.get('form6').value,this.firstFormGroup.controls.welfaresubForm6.get('form6_details').value)
  
      let follow_up_date1 = this.firstFormGroup.controls.welfaresubForm6.get('form6_date').value;
      
      let follow_up_date = follow_up_date1;
      
      welObj6 = {
        uuid:this.task_id6,
        task_status:"pending",
        task_details:arr6,
        date:follow_up_date,
      }
     
      
    }else{
      let arr6 = [];
      arr6.push(this.option_value6,this.details6)
      welObj6 = {
        uuid:this.task_id6,
        task_status:"pending",
        task_details:arr6,
        date:this.date6_new
      }
     
    }
    welArray.push(welObj6);
    }else{
      let arr6 = [];
      arr6.push(this.firstFormGroup.controls.welfaresubForm6.get('form6').value,this.firstFormGroup.controls.welfaresubForm6.get('form6_details').value)
     
     if(this.firstFormGroup.controls.welfaresubForm6.get('form6_date').value != ""){
      
      let follow_up_date1 = this.firstFormGroup.controls.welfaresubForm6.get('form6_date').value;
     
      let follow_up_date = follow_up_date1;
      
      fourthObj6 = {
        check26:this.firstFormGroup.controls.welfaresubForm6.get('form6').value,
        option:26,
        task_details:arr6,
        date:follow_up_date,
      }
     
      
    }else{
      
      fourthObj6 = {
        check26:this.firstFormGroup.controls.welfaresubForm6.get('form6').value,
        option:26,
        task_details:arr6,
        date:"",
      }
     
    }
    fourthArray.push(fourthObj6);
    }

    if(this.task_id7 != undefined){
     if(this.firstFormGroup.controls.welfaresubForm7.get('form7_date').value != ""){
      let arr7 = [];
      arr7.push(this.firstFormGroup.controls.welfaresubForm7.get('form7').value,this.firstFormGroup.controls.welfaresubForm7.get('form7_details').value)
        
      let follow_up_date1 = this.firstFormGroup.controls.welfaresubForm7.get('form7_date').value;
     
      let follow_up_date = follow_up_date1;
      
      welObj7 = {
        uuid:this.task_id7,
        task_status:"pending",
        task_details:arr7,
        date:follow_up_date,
      }
     
    }else{
      let arr7 = [];
      arr7.push(this.option_value7,this.details7)
      welObj7 = {
        uuid:this.task_id7,
        task_status:"pending",
        task_details:arr7,
        date:this.date7_new
      }
     
    }
    welArray.push(welObj7);
    }else{
      let arr7 = [];
  arr7.push(this.firstFormGroup.controls.welfaresubForm7.get('form7').value,this.firstFormGroup.controls.welfaresubForm7.get('form7_details').value)

    if(this.firstFormGroup.controls.welfaresubForm7.get('form7_date').value != ""){
    
      let follow_up_date1 = this.firstFormGroup.controls.welfaresubForm7.get('form7_date').value;
    
      let follow_up_date = follow_up_date1;
      
      fourthObj7 = {
        check27:this.firstFormGroup.controls.welfaresubForm7.get('form7').value,
        option:27,
        task_details:arr7,
        date:follow_up_date,
      }
    
    }else{
      
      fourthObj7 = {
        check27:this.firstFormGroup.controls.welfaresubForm7.get('form7').value,
        option:27,
        task_details:arr7,
        date:"",
      }
    
    }
    fourthArray.push(fourthObj7);
    }

    if(this.task_id8 != undefined){
    if(this.firstFormGroup.controls.welfaresubForm8.get('form8_date').value != ""){
      let arr8 = [];
      arr8.push(this.firstFormGroup.controls.welfaresubForm8.get('form8').value,this.firstFormGroup.controls.welfaresubForm8.get('form8_details').value)
        
      let follow_up_date1 = this.firstFormGroup.controls.welfaresubForm8.get('form8_date').value;
     
      let follow_up_date = follow_up_date1;
      
      welObj8 = {
        uuid:this.task_id8,
        task_status:"pending",
        task_details:arr8,
        date:follow_up_date,
      }
      
      
    }else{
      let arr8 = [];
      arr8.push(this.option_value8,this.details8)
      welObj8 = {
        uuid:this.task_id8,
        task_status:"pending",
        task_details:arr8,
        date:this.date8_new
      }
     
    }
    welArray.push(welObj8);
    }else{
      let arr8 = [];
    arr8.push(this.firstFormGroup.controls.welfaresubForm8.get('form8').value,this.firstFormGroup.controls.welfaresubForm8.get('form8_details').value)
     
   if(this.firstFormGroup.controls.welfaresubForm8.get('form8_date').value != ""){
    
      let follow_up_date1 = this.firstFormGroup.controls.welfaresubForm8.get('form8_date').value;
     
      let follow_up_date = follow_up_date1;
      
      fourthObj8 = {
        check28:this.firstFormGroup.controls.welfaresubForm8.get('form8').value,
        option:28,
        task_details:arr8,
        date:follow_up_date,
      }
      
      
    }else{
      
      fourthObj8 = {
        check28:this.firstFormGroup.controls.welfaresubForm8.get('form8').value,
        option:28,
        task_details:arr8,
        date:"",
      }
     
    }
    fourthArray.push(fourthObj8);
    }
   
    if(this.task_id9 != undefined){
      if(this.firstFormGroup.controls.welfaresubForm9.get('form9_date').value != ""){
        let arr9 = [];
      arr9.push(this.firstFormGroup.controls.welfaresubForm9.get('form9').value,this.firstFormGroup.controls.welfaresubForm9.get('form9_details').value)
  
      let follow_up_date1 = this.firstFormGroup.controls.welfaresubForm9.get('form9_date').value;
      
      let follow_up_date = follow_up_date1;
      
      welObj9 = {
        uuid:this.task_id9,
        task_status:"pending",
        task_details:arr9,
        date:follow_up_date,
      }
      
      
    }else{
      let arr9 = [];
      arr9.push(this.option_value9,this.details9)
      welObj9 = {
        uuid:this.task_id9,
        task_status:"pending",
        task_details:arr9,
        date:this.date9_new
      }
     
    }
    welArray.push(welObj9);
    }else{
      let arr9 = [];
      arr9.push(this.firstFormGroup.controls.welfaresubForm9.get('form9').value,this.firstFormGroup.controls.welfaresubForm9.get('form9_details').value)
       
     if(this.firstFormGroup.controls.welfaresubForm9.get('form9_date').value != ""){
      
        let follow_up_date1 = this.firstFormGroup.controls.welfaresubForm9.get('form9_date').value;
        
        let follow_up_date = follow_up_date1;
        
        fourthObj9 = {
          check29:this.firstFormGroup.controls.welfaresubForm9.get('form9').value,
          option:29,
          task_details:arr9,
          date:follow_up_date,
        }
        
        
      }else{
       
        fourthObj9 = {
          check29:this.firstFormGroup.controls.welfaresubForm9.get('form9').value,
          option:29,
          task_details:arr9,
          date:"",
        }
       
      }
      fourthArray.push(fourthObj9);
    }

    if(this.task_id10 != undefined){
     if(this.firstFormGroup.controls.welfaresubForm10.get('form10_date').value != ""){
      let arr10 = [];
      arr10.push(this.firstFormGroup.controls.welfaresubForm10.get('form10').value,this.firstFormGroup.controls.welfaresubForm10.get('form10_details').value)
        
      let follow_up_date1 = this.firstFormGroup.controls.welfaresubForm10.get('form10_date').value;
     
      let follow_up_date = follow_up_date1;
      
      welObj10 = {
        uuid:this.task_id10,
        task_status:"pending",
        task_details:arr10,
        date:follow_up_date,
      }
     
      
    }else{
      let arr10 = [];
      arr10.push(this.option_value10,this.details10)
      welObj10 = {
        uuid:this.task_id10,
        task_status:"pending",
        task_details:arr10,
        date:this.date10_new
      }
     
    }
    welArray.push(welObj10);
    }else{
      let arr10 = [];
      arr10.push(this.firstFormGroup.controls.welfaresubForm10.get('form10').value,this.firstFormGroup.controls.welfaresubForm10.get('form10_details').value)
      
      if(this.firstFormGroup.controls.welfaresubForm10.get('form10_date').value != ""){
       
        let follow_up_date1 = this.firstFormGroup.controls.welfaresubForm10.get('form10_date').value;
        
        let follow_up_date = follow_up_date1;
        
        fourthObj10 = {
          check30:this.firstFormGroup.controls.welfaresubForm10.get('form10').value,
          option:30,
          task_details:arr10,
          date:follow_up_date,
        }
       
        
      }else{
      
        fourthObj10 = {
          check30:this.firstFormGroup.controls.welfaresubForm10.get('form10').value,
          option:30,
          task_details:arr10,
          date:"",
        }
       
      }
      fourthArray.push(fourthObj10);
    }

    if(this.task_id11 != undefined){
    if(this.firstFormGroup.controls.welfaresubForm11.get('form11_date').value != ""){
      let arr11 = [];
  arr11.push(this.firstFormGroup.controls.welfaresubForm11.get('form11').value,this.firstFormGroup.controls.welfaresubForm11.get('form11_details').value)

      let follow_up_date1 = this.firstFormGroup.controls.welfaresubForm11.get('form11_date').value;
      
      let follow_up_date = follow_up_date1;
      
      welObj11 = {
        uuid:this.task_id11,
        task_status:"pending",
        task_details:arr11,
        date:follow_up_date,
      }
    
      
    }else{
      let arr11 = [];
      arr11.push(this.option_value11,this.details11)
      welObj11 = {
        uuid:this.task_id11,
        task_status:"pending",
        task_details:arr11,
        date:this.date11_new
      }
     
    }
    welArray.push(welObj11);
    }else{
      let arr11 = [];
      arr11.push(this.firstFormGroup.controls.welfaresubForm11.get('form11').value,this.firstFormGroup.controls.welfaresubForm11.get('form11_details').value)
    
      if(this.firstFormGroup.controls.welfaresubForm11.get('form11_date').value != ""){
      
        let follow_up_date1 = this.firstFormGroup.controls.welfaresubForm11.get('form11_date').value;
      
        let follow_up_date =follow_up_date1;
        
        fourthObj11 = {
          check31:this.firstFormGroup.controls.welfaresubForm11.get('form11').value,
          option:31,
          task_details:arr11,
          date:follow_up_date,
        }
      
        
      }else{
      
        fourthObj11 = {
          check31:this.firstFormGroup.controls.welfaresubForm11.get('form11').value,
          option:31,
          task_details:arr11,
          date:"",
        }
      
      }
      fourthArray.push(fourthObj11);
    }

    if(this.task_id12 != undefined){
     if(this.firstFormGroup.controls.welfaresubForm12.get('form12_date').value != ""){
      let arr12 = [];
      arr12.push(this.firstFormGroup.controls.welfaresubForm12.get('form12').value,this.firstFormGroup.controls.welfaresubForm12.get('form12_details').value)
        
      let follow_up_date1 = this.firstFormGroup.controls.welfaresubForm12.get('form12_date').value;
     
      let follow_up_date = follow_up_date1;
     
      
      welObj12 = {
        uuid:this.task_id12,
        task_status:"pending",
        task_details:arr12,
        date:follow_up_date,
      }
      
      
    }else{
      let arr12 = [];
      arr12.push(this.option_value12,this.details12)
      welObj12 = {
        uuid:this.task_id12,
        task_status:"pending",
        task_details:arr12,
        date:this.date12_new
      }
     
    }
    welArray.push(welObj12);
    }else{
      let arr12 = [];
      arr12.push(this.firstFormGroup.controls.welfaresubForm12.get('form12').value,this.firstFormGroup.controls.welfaresubForm12.get('form12_details').value)
      
    if(this.firstFormGroup.controls.welfaresubForm12.get('form12_date').value != ""){
      
        let follow_up_date1 = this.firstFormGroup.controls.welfaresubForm12.get('form12_date').value;
      
        let follow_up_date = follow_up_date1;
        
        fourthObj12 = {
          check32:this.firstFormGroup.controls.welfaresubForm12.get('form12').value,
          option:32,
          task_details:arr12,
          date:follow_up_date,
        }
        
        
      }else{
        
        fourthObj12 = {
          check32:this.firstFormGroup.controls.welfaresubForm12.get('form12').value,
          option:32,
          task_details:arr12,
          date:"",
        }
      
      }
      fourthArray.push(fourthObj12);
    }

    if(this.task_id13 != undefined){
      if(this.firstFormGroup.controls.welfaresubForm13.get('form13_date').value != ""){
        let arr13 = [];
arr13.push(this.firstFormGroup.controls.welfaresubForm13.get('form13').value,this.firstFormGroup.controls.welfaresubForm13.get('form13_details').value)
  
      let follow_up_date1 = this.firstFormGroup.controls.welfaresubForm13.get('form13_date').value;
      
      let follow_up_date = follow_up_date1;
      
      welObj13 = {
        uuid:this.task_id13,
        task_status:"pending",
        task_details:arr13,
        date:follow_up_date,
      }
     
      
    }else{
      let arr13 = [];
      arr13.push(this.option_value13,this.details13)
      welObj13 = {
        uuid:this.task_id13,
        task_status:"pending",
        task_details:arr13,
        date:this.date13_new
      }
     
    }
    welArray.push(welObj13);
    }else{
      let arr13 = [];
      arr13.push(this.firstFormGroup.controls.welfaresubForm13.get('form13').value,this.firstFormGroup.controls.welfaresubForm13.get('form13_details').value)
        
    if(this.firstFormGroup.controls.welfaresubForm13.get('form13_date').value != ""){
    
        let follow_up_date1 = this.firstFormGroup.controls.welfaresubForm13.get('form13_date').value;
        
        let follow_up_date = follow_up_date1;
        
        fourthObj13 = {
          check33:this.firstFormGroup.controls.welfaresubForm13.get('form13').value,
          option:33,
          task_details:arr13,
          date:follow_up_date,
        }
      
        
      }else{
      
        fourthObj13 = {
          check33:this.firstFormGroup.controls.welfaresubForm13.get('form13').value,
          option:33,
          task_details:arr13,
          date:"",
        }
      
      }
      fourthArray.push(fourthObj13);
    }

    if(this.task_id14 != undefined){
      if(this.firstFormGroup.controls.welfaresubForm14.get('form14_date').value != ""){
        let arr14 = [];
        arr14.push("",this.firstFormGroup.controls.welfaresubForm14.get('form14_details').value)
        let follow_up_date1 = this.firstFormGroup.controls.welfaresubForm14.get('form14_date').value;
        
        let follow_up_date = follow_up_date1;
        welObj14 = {
          uuid:this.task_id14,
          task_status:"pending",
          task_details:arr14,
          date:follow_up_date,
        }
       
      }
      else{
        let arr14 = [];
        arr14.push("",this.details14)
        welObj14 = {
          uuid:this.task_id14,
          task_status:"pending",
          task_details:arr14,
          date:this.date14_new
        }
      }
      welArray.push(welObj14);
    }else{
      let arr14 = [];
    arr14.push("",this.firstFormGroup.controls.welfaresubForm14.get('form14_details').value)
    
     if(this.firstFormGroup.controls.welfaresubForm14.get('form14_date').value != ""){
      
        let follow_up_date1 = this.firstFormGroup.controls.welfaresubForm14.get('form14_date').value;
        
        let follow_up_date =follow_up_date1;
        fourthObj14 = {
          check34:this.firstFormGroup.controls.welfaresubForm14.get('form14').value,
          option:34,
          task_details:arr14,
          date:follow_up_date,
        }
       
      }
      else{
       
        fourthObj14 = {
          check34:this.firstFormGroup.controls.welfaresubForm14.get('form14').value,
          option:34,
          task_details:arr14,
          date:"",
        }
      }
      fourthArray.push(fourthObj14);
    }
 
  

      let result1 = await this.patientService.updateWelfareTask(this.patient_uuid,welArray,fourthArray).then(() => {
        
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
  
              
             
              //this.router.navigate(['patient-details']);
              this.displayLoader();
              setTimeout(()=>{
               this.dismissLoader();
               this.offlineManager.checkForEvents().subscribe();
              // this.router.navigate(['patient-details']);
              }, 10000);
                    
          
                
                
              }
            
            }
          ]
        }).then(res => {
          res.present();
        });
       
       
          
        },err => {
          console.log("No Internet Connection! Data added to the Request List");
         // loadingEl.dismiss();
         
        });
    }else{
   
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
    
    
      let arr1 = [];
      arr1.push(this.firstFormGroup.controls.welfaresubForm1.get('form1').value,this.firstFormGroup.controls.welfaresubForm1.get('form1_details').value)
      fourthObj1 = {
        check21:this.firstFormGroup.controls.welfaresubForm1.get('form1').value,
        option:21,
        task_details:arr1,
        date:"",
      }
      fourthArray.push(fourthObj1);
      
      
  
      let arr2 = [];
      arr2.push(this.firstFormGroup.controls.welfaresubForm2.get('form2').value,this.firstFormGroup.controls.welfaresubForm2.get('form2_details').value)
     
    if(this.firstFormGroup.controls.welfaresubForm2.get('form2_date').value != ""){
      let follow_up_date1 = this.firstFormGroup.controls.welfaresubForm2.get('form2_date').value;
      
      let follow_up_date = follow_up_date1;
      
      fourthObj2 = {
        check22:this.firstFormGroup.controls.welfaresubForm2.get('form2').value,
        option:22,
        task_details:arr2,
        date:follow_up_date
      }
      
      
   }else{
   
    fourthObj2 = {
      check22:this.firstFormGroup.controls.welfaresubForm2.get('form2').value,
      option:22,
      task_details:arr2,
      date:""
    }
     
    }
    fourthArray.push(fourthObj2);
     
    let arr3 = [];
    arr3.push( this.firstFormGroup.controls.welfaresubForm3.get('form3').value,this.firstFormGroup.controls.welfaresubForm3.get('form3_details').value)
      
    if(this.firstFormGroup.controls.welfaresubForm3.get('form3_date').value != ""){
      let follow_up_date1 = this.firstFormGroup.controls.welfaresubForm3.get('form3_date').value;
      
      let follow_up_date = follow_up_date1;
      
      fourthObj3 = {
        check23:this.firstFormGroup.controls.welfaresubForm3.get('form3').value,
        option:23,
        task_details:arr3,
        date:follow_up_date,
      }
     
      
    }else{
       fourthObj3 = {
        check23:this.firstFormGroup.controls.welfaresubForm3.get('form3').value,
        option:23,
        task_details:arr3,
        date:"",
      }
     
    }
    fourthArray.push(fourthObj3);
  
    
    let arr4 = [];
    arr4.push(this.firstFormGroup.controls.welfaresubForm4.get('form4').value,this.firstFormGroup.controls.welfaresubForm4.get('form4_details').value)
    
    if(this.firstFormGroup.controls.welfaresubForm4.get('form4_date').value != ""){
     
      let follow_up_date1 = this.firstFormGroup.controls.welfaresubForm4.get('form4_date').value;
     
       let follow_up_date = follow_up_date1;
      
      fourthObj4 = {
        check24:this.firstFormGroup.controls.welfaresubForm4.get('form4').value,
        option:24,
        task_details:arr4,
        date:follow_up_date,
      }
     
      
    }else{
     
      fourthObj4 = {
        check24:this.firstFormGroup.controls.welfaresubForm4.get('form4').value,
        option:24,
        task_details:arr4,
        date:"",
      }
     
    }
    fourthArray.push(fourthObj4);
    let arr5 = [];
    arr5.push(this.firstFormGroup.controls.welfaresubForm5.get('form5').value,this.firstFormGroup.controls.welfaresubForm5.get('form5_details').value)
     
   if(this.firstFormGroup.controls.welfaresubForm5.get('form5_date').value != ""){
   
      let follow_up_date1 = this.firstFormGroup.controls.welfaresubForm5.get('form5_date').value;
     
      let follow_up_date = follow_up_date1;
      
      fourthObj5 = {
        check25:this.firstFormGroup.controls.welfaresubForm5.get('form5').value,
        option:25,
        task_details:arr5,
        date:follow_up_date,
      }
     
      
    }else{
      
      fourthObj5 = {
        check25:this.firstFormGroup.controls.welfaresubForm5.get('form5').value,
        option:25,
        task_details:arr5,
        date:"",
      }
     
    }
    fourthArray.push(fourthObj5);
    let arr6 = [];
      arr6.push(this.firstFormGroup.controls.welfaresubForm6.get('form6').value,this.firstFormGroup.controls.welfaresubForm6.get('form6_details').value)
     
     if(this.firstFormGroup.controls.welfaresubForm6.get('form6_date').value != ""){
      
      let follow_up_date1 = this.firstFormGroup.controls.welfaresubForm6.get('form6_date').value;
     
      let follow_up_date = follow_up_date1;
      
      fourthObj6 = {
        check26:this.firstFormGroup.controls.welfaresubForm6.get('form6').value,
        option:26,
        task_details:arr6,
        date:follow_up_date,
      }
     
      
    }else{
      
      fourthObj6 = {
        check26:this.firstFormGroup.controls.welfaresubForm6.get('form6').value,
        option:26,
        task_details:arr6,
        date:"",
      }
     
    }
    fourthArray.push(fourthObj6);
    let arr7 = [];
arr7.push(this.firstFormGroup.controls.welfaresubForm7.get('form7').value,this.firstFormGroup.controls.welfaresubForm7.get('form7_details').value)

    if(this.firstFormGroup.controls.welfaresubForm7.get('form7_date').value != ""){
     
      let follow_up_date1 = this.firstFormGroup.controls.welfaresubForm7.get('form7_date').value;
     
      let follow_up_date = follow_up_date1;
      
      fourthObj7 = {
        check27:this.firstFormGroup.controls.welfaresubForm7.get('form7').value,
        option:27,
        task_details:arr7,
        date:follow_up_date,
      }
     
    }else{
      
      fourthObj7 = {
        check27:this.firstFormGroup.controls.welfaresubForm7.get('form7').value,
        option:27,
        task_details:arr7,
        date:"",
      }
     
    }
    fourthArray.push(fourthObj7);
   
    let arr8 = [];
    arr8.push(this.firstFormGroup.controls.welfaresubForm8.get('form8').value,this.firstFormGroup.controls.welfaresubForm8.get('form8_details').value)
     
   if(this.firstFormGroup.controls.welfaresubForm8.get('form8_date').value != ""){
    
      let follow_up_date1 = this.firstFormGroup.controls.welfaresubForm8.get('form8_date').value;
     
      let follow_up_date = follow_up_date1;
      
      fourthObj8 = {
        check28:this.firstFormGroup.controls.welfaresubForm8.get('form8').value,
        option:28,
        task_details:arr8,
        date:follow_up_date,
      }
      
      
    }else{
      
      fourthObj8 = {
        check28:this.firstFormGroup.controls.welfaresubForm8.get('form8').value,
        option:28,
        task_details:arr8,
        date:"",
      }
     
    }
    fourthArray.push(fourthObj8);
    let arr9 = [];
    arr9.push(this.firstFormGroup.controls.welfaresubForm9.get('form9').value,this.firstFormGroup.controls.welfaresubForm9.get('form9_details').value)
     
   if(this.firstFormGroup.controls.welfaresubForm9.get('form9_date').value != ""){
    
      let follow_up_date1 = this.firstFormGroup.controls.welfaresubForm9.get('form9_date').value;
      
      let follow_up_date = follow_up_date1;
      
      fourthObj9 = {
        check29:this.firstFormGroup.controls.welfaresubForm9.get('form9').value,
        option:29,
        task_details:arr9,
        date:follow_up_date,
      }
      
      
    }else{
     
      fourthObj9 = {
        check29:this.firstFormGroup.controls.welfaresubForm9.get('form9').value,
        option:29,
        task_details:arr9,
        date:"",
      }
     
    }
    fourthArray.push(fourthObj9);
    let arr10 = [];
    arr10.push(this.firstFormGroup.controls.welfaresubForm10.get('form10').value,this.firstFormGroup.controls.welfaresubForm10.get('form10_details').value)
    
    if(this.firstFormGroup.controls.welfaresubForm10.get('form10_date').value != ""){
     
      let follow_up_date1 = this.firstFormGroup.controls.welfaresubForm10.get('form10_date').value;
      
      let follow_up_date = follow_up_date1;
      
      fourthObj10 = {
        check30:this.firstFormGroup.controls.welfaresubForm10.get('form10').value,
        option:30,
        task_details:arr10,
        date:follow_up_date,
      }
     
      
    }else{
    
      fourthObj10 = {
        check30:this.firstFormGroup.controls.welfaresubForm10.get('form10').value,
        option:30,
        task_details:arr10,
        date:"",
      }
     
    }
    fourthArray.push(fourthObj10);
    let arr11 = [];
    arr11.push(this.firstFormGroup.controls.welfaresubForm11.get('form11').value,this.firstFormGroup.controls.welfaresubForm11.get('form11_details').value)
  
    if(this.firstFormGroup.controls.welfaresubForm11.get('form11_date').value != ""){
     
      let follow_up_date1 = this.firstFormGroup.controls.welfaresubForm11.get('form11_date').value;
     
      let follow_up_date =follow_up_date1;
      
      fourthObj11 = {
        check31:this.firstFormGroup.controls.welfaresubForm11.get('form11').value,
        option:31,
        task_details:arr11,
        date:follow_up_date,
      }
    
      
    }else{
     
      fourthObj11 = {
        check31:this.firstFormGroup.controls.welfaresubForm11.get('form11').value,
        option:31,
        task_details:arr11,
        date:"",
      }
     
    }
    fourthArray.push(fourthObj11);
    let arr12 = [];
    arr12.push(this.firstFormGroup.controls.welfaresubForm12.get('form12').value,this.firstFormGroup.controls.welfaresubForm12.get('form12_details').value)
     
   if(this.firstFormGroup.controls.welfaresubForm12.get('form12_date').value != ""){
    
      let follow_up_date1 = this.firstFormGroup.controls.welfaresubForm12.get('form12_date').value;
     
      let follow_up_date = follow_up_date1;
      
      fourthObj12 = {
        check32:this.firstFormGroup.controls.welfaresubForm12.get('form12').value,
        option:32,
        task_details:arr12,
        date:follow_up_date,
      }
      
      
    }else{
      
       fourthObj12 = {
        check32:this.firstFormGroup.controls.welfaresubForm12.get('form12').value,
        option:32,
        task_details:arr12,
        date:"",
      }
     
    }
    fourthArray.push(fourthObj12);
    let arr13 = [];
    arr13.push(this.firstFormGroup.controls.welfaresubForm13.get('form13').value,this.firstFormGroup.controls.welfaresubForm13.get('form13_details').value)
      
  if(this.firstFormGroup.controls.welfaresubForm13.get('form13_date').value != ""){
  
      let follow_up_date1 = this.firstFormGroup.controls.welfaresubForm13.get('form13_date').value;
      
      let follow_up_date = follow_up_date1;
      
      fourthObj13 = {
        check33:this.firstFormGroup.controls.welfaresubForm13.get('form13').value,
        option:33,
        task_details:arr13,
        date:follow_up_date,
      }
     
      
    }else{
     
      fourthObj13 = {
        check33:this.firstFormGroup.controls.welfaresubForm13.get('form13').value,
        option:33,
        task_details:arr13,
        date:"",
      }
     
    }
    fourthArray.push(fourthObj13);
    
    let arr14 = [];
    arr14.push("",this.firstFormGroup.controls.welfaresubForm14.get('form14_details').value)
    
     if(this.firstFormGroup.controls.welfaresubForm14.get('form14_date').value != ""){
      
        let follow_up_date1 = this.firstFormGroup.controls.welfaresubForm14.get('form14_date').value;
        
        let follow_up_date =follow_up_date1;
        fourthObj14 = {
          check34:this.firstFormGroup.controls.welfaresubForm14.get('form14').value,
          option:34,
          task_details:arr14,
          date:follow_up_date,
        }
       
      }
      else{
       
        fourthObj14 = {
          check34:this.firstFormGroup.controls.welfaresubForm14.get('form14').value,
          option:34,
          task_details:arr14,
          date:"",
        }
      }
      fourthArray.push(fourthObj14);
    
    

let statusArray = [];

let result2 = await this.patientService.addWelfareTask(this.patient_uuid,fourthArray).then(() => {
      
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
  
                
             
              //this.router.navigate(['patient-details']);
              this.displayLoader();
              setTimeout(()=>{
               this.dismissLoader();
               this.offlineManager.checkForEvents().subscribe();
              // this.router.navigate(['patient-details']);
              }, 10000);
                    
           
                
                
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
  }

 
  
  tobaccooptionsArray1: tobacco_options[] = [
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
  tobaccooptionsArray2: tobacco_options[] = [
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
  tobaccooptionsArray3: tobacco_options[] = [
    {value: '1', viewValue: 'Yes',checked:false},
    {value: '2', viewValue: 'No',checked:false},
    {value: '2', viewValue: 'Already availed',checked:false}
   
  ];
  tobaccooptionsArray4: tobacco_options[] = [
    {value: '1', viewValue: 'Yes',checked:false},
    {value: '2', viewValue: 'No',checked:false},
    {value: '3', viewValue: 'Already availed',checked:false}
   
  ];
  tobaccooptionsArray5: tobacco_options[] = [
    {value: '1', viewValue: 'Yes',checked:false},
    {value: '2', viewValue: 'No',checked:false},
    {value: '2', viewValue: 'Already availed',checked:false}
   
  ];
  tobaccooptionsArray6: tobacco_options[] = [
    {value: '1', viewValue: 'Yes',checked:false},
    {value: '2', viewValue: 'No',checked:false},
    {value: '2', viewValue: 'Already availed',checked:false}
   
  ];
  tobaccooptionsArray7: tobacco_options[] = [
    {value: '1', viewValue: 'Yes',checked:false},
    {value: '2', viewValue: 'No',checked:false},
    {value: '2', viewValue: 'Already availed',checked:false}
   
  ];
  tobaccooptionsArray8: tobacco_options[] = [
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

  checkWel1($event:MatRadioChange){
    if ($event.value ==='Yes') {
    
      this.firstFormGroup.controls.welfaresubForm1.get('form1_details').clearValidators();
      this.firstFormGroup.controls.welfaresubForm1.get('form1_details').updateValueAndValidity();
      
    
    } else {
     
    
      this.firstFormGroup.controls.welfaresubForm1.get('form1_details').setValidators(Validators.required);
      this.firstFormGroup.controls.welfaresubForm1.get('form1_details').updateValueAndValidity();
     
      
      
    }
  }
  checkWel2($event:MatRadioChange){
    if ($event.value ==='Yes') {
    
      this.firstFormGroup.controls.welfaresubForm2.get('form2_details').setValidators(Validators.required);
      this.firstFormGroup.controls.welfaresubForm2.get('form2_details').updateValueAndValidity();
      this.firstFormGroup.controls.welfaresubForm2.get('form2_date').setValidators(Validators.required);
      this.firstFormGroup.controls.welfaresubForm2.get('form2_date').updateValueAndValidity();
    
    } else {
     
      this.firstFormGroup.controls.welfaresubForm2.get('form2_details').setValue('');
      this.firstFormGroup.controls.welfaresubForm2.get('form2_details').clearValidators();
      this.firstFormGroup.controls.welfaresubForm2.get('form2_details').updateValueAndValidity();
      this.firstFormGroup.controls.welfaresubForm2.get('form2_date').setValue('');
      this.firstFormGroup.controls.welfaresubForm2.get('form2_date').clearValidators();
      this.firstFormGroup.controls.welfaresubForm2.get('form2_date').updateValueAndValidity();
      
      
    }
  }
  checkWel3($event:MatRadioChange){
    if ($event.value ==='Yes' || $event.value ==='Needs review') {
    
      this.firstFormGroup.controls.welfaresubForm3.get('form3_details').setValidators(Validators.required);
      this.firstFormGroup.controls.welfaresubForm3.get('form3_details').updateValueAndValidity();
      this.firstFormGroup.controls.welfaresubForm3.get('form3_date').setValidators(Validators.required);
      this.firstFormGroup.controls.welfaresubForm3.get('form3_date').updateValueAndValidity();
    
    } else {
     
      this.firstFormGroup.controls.welfaresubForm3.get('form3_details').setValue('');
      this.firstFormGroup.controls.welfaresubForm3.get('form3_details').clearValidators();
      this.firstFormGroup.controls.welfaresubForm3.get('form3_details').updateValueAndValidity();
      this.firstFormGroup.controls.welfaresubForm3.get('form3_date').setValue('');
      this.firstFormGroup.controls.welfaresubForm3.get('form3_date').clearValidators();
      this.firstFormGroup.controls.welfaresubForm3.get('form3_date').updateValueAndValidity();
      
      
    }
  }
  checkWel4($event:MatRadioChange){
    if ($event.value ==='Yes' || $event.value ==='Needs review') {
    
      this.firstFormGroup.controls.welfaresubForm4.get('form4_details').setValidators(Validators.required);
      this.firstFormGroup.controls.welfaresubForm4.get('form4_details').updateValueAndValidity();
      this.firstFormGroup.controls.welfaresubForm4.get('form4_date').setValidators(Validators.required);
      this.firstFormGroup.controls.welfaresubForm4.get('form4_date').updateValueAndValidity();
    
    } else {
     
      this.firstFormGroup.controls.welfaresubForm4.get('form4_details').setValue('');
      this.firstFormGroup.controls.welfaresubForm4.get('form4_details').clearValidators();
      this.firstFormGroup.controls.welfaresubForm4.get('form4_details').updateValueAndValidity();
      this.firstFormGroup.controls.welfaresubForm4.get('form4_date').setValue('');
      this.firstFormGroup.controls.welfaresubForm4.get('form4_date').clearValidators();
      this.firstFormGroup.controls.welfaresubForm4.get('form4_date').updateValueAndValidity();
      
      
    }
  }
  checkWel5($event:MatRadioChange){
    if ($event.value ==='Yes') {
    
      this.firstFormGroup.controls.welfaresubForm5.get('form5_details').setValidators(Validators.required);
      this.firstFormGroup.controls.welfaresubForm5.get('form5_details').updateValueAndValidity();
      this.firstFormGroup.controls.welfaresubForm5.get('form5_date').setValidators(Validators.required);
      this.firstFormGroup.controls.welfaresubForm5.get('form5_date').updateValueAndValidity();
    
    } else {
     
      this.firstFormGroup.controls.welfaresubForm5.get('form5_details').setValue('');
      this.firstFormGroup.controls.welfaresubForm5.get('form5_details').clearValidators();
      this.firstFormGroup.controls.welfaresubForm5.get('form5_details').updateValueAndValidity();
      this.firstFormGroup.controls.welfaresubForm5.get('form5_date').setValue('');
      this.firstFormGroup.controls.welfaresubForm5.get('form5_date').clearValidators();
      this.firstFormGroup.controls.welfaresubForm5.get('form5_date').updateValueAndValidity();
      
      
    }
  }
  checkWel6($event:MatRadioChange){
    if ($event.value ==='Yes') {
    
      this.firstFormGroup.controls.welfaresubForm6.get('form6_details').setValidators(Validators.required);
      this.firstFormGroup.controls.welfaresubForm6.get('form6_details').updateValueAndValidity();
      this.firstFormGroup.controls.welfaresubForm6.get('form6_date').setValidators(Validators.required);
      this.firstFormGroup.controls.welfaresubForm6.get('form6_date').updateValueAndValidity();
    
    } else {
     
      this.firstFormGroup.controls.welfaresubForm6.get('form6_details').setValue('');
      this.firstFormGroup.controls.welfaresubForm6.get('form6_details').clearValidators();
      this.firstFormGroup.controls.welfaresubForm6.get('form6_details').updateValueAndValidity();
      this.firstFormGroup.controls.welfaresubForm6.get('form6_date').setValue('');
      this.firstFormGroup.controls.welfaresubForm6.get('form6_date').clearValidators();
      this.firstFormGroup.controls.welfaresubForm6.get('form6_date').updateValueAndValidity();
      
      
    }
  }
  checkWel7($event:MatRadioChange){
    if ($event.value ==='Yes') {
    
      this.firstFormGroup.controls.welfaresubForm7.get('form7_details').setValidators(Validators.required);
      this.firstFormGroup.controls.welfaresubForm7.get('form7_details').updateValueAndValidity();
      this.firstFormGroup.controls.welfaresubForm7.get('form7_date').setValidators(Validators.required);
      this.firstFormGroup.controls.welfaresubForm7.get('form7_date').updateValueAndValidity();
    
    } else {
     
      this.firstFormGroup.controls.welfaresubForm7.get('form7_details').setValue('');
      this.firstFormGroup.controls.welfaresubForm7.get('form7_details').clearValidators();
      this.firstFormGroup.controls.welfaresubForm7.get('form7_details').updateValueAndValidity();
      this.firstFormGroup.controls.welfaresubForm7.get('form7_date').setValue('');
      this.firstFormGroup.controls.welfaresubForm7.get('form7_date').clearValidators();
      this.firstFormGroup.controls.welfaresubForm7.get('form7_date').updateValueAndValidity();
      
      
    }
  }
  checkWel8($event:MatRadioChange){
    if ($event.value ==='Yes') {
    
      this.firstFormGroup.controls.welfaresubForm8.get('form8_details').setValidators(Validators.required);
      this.firstFormGroup.controls.welfaresubForm8.get('form8_details').updateValueAndValidity();
      this.firstFormGroup.controls.welfaresubForm8.get('form8_date').setValidators(Validators.required);
      this.firstFormGroup.controls.welfaresubForm8.get('form8_date').updateValueAndValidity();
    
    } else {
     
      this.firstFormGroup.controls.welfaresubForm8.get('form8_details').setValue('');
      this.firstFormGroup.controls.welfaresubForm8.get('form8_details').clearValidators();
      this.firstFormGroup.controls.welfaresubForm8.get('form8_details').updateValueAndValidity();
      this.firstFormGroup.controls.welfaresubForm8.get('form8_date').setValue('');
      this.firstFormGroup.controls.welfaresubForm8.get('form8_date').clearValidators();
      this.firstFormGroup.controls.welfaresubForm8.get('form8_date').updateValueAndValidity();
      
      
    }
  }
  checkWel9($event:MatRadioChange){
    if ($event.value ==='Yes') {
    
      this.firstFormGroup.controls.welfaresubForm9.get('form9_details').setValidators(Validators.required);
      this.firstFormGroup.controls.welfaresubForm9.get('form9_details').updateValueAndValidity();
      this.firstFormGroup.controls.welfaresubForm9.get('form9_date').setValidators(Validators.required);
      this.firstFormGroup.controls.welfaresubForm9.get('form9_date').updateValueAndValidity();
    
    } else {
     
      this.firstFormGroup.controls.welfaresubForm9.get('form9_details').setValue('');
      this.firstFormGroup.controls.welfaresubForm9.get('form9_details').clearValidators();
      this.firstFormGroup.controls.welfaresubForm9.get('form9_details').updateValueAndValidity();
      this.firstFormGroup.controls.welfaresubForm9.get('form9_date').setValue('');
      this.firstFormGroup.controls.welfaresubForm9.get('form9_date').clearValidators();
      this.firstFormGroup.controls.welfaresubForm9.get('form9_date').updateValueAndValidity();
      
      
    }
  }
  checkWel10($event:MatRadioChange){
    if ($event.value ==='Yes') {
    
      this.firstFormGroup.controls.welfaresubForm10.get('form10_details').setValidators(Validators.required);
      this.firstFormGroup.controls.welfaresubForm10.get('form10_details').updateValueAndValidity();
      this.firstFormGroup.controls.welfaresubForm10.get('form10_date').setValidators(Validators.required);
      this.firstFormGroup.controls.welfaresubForm10.get('form10_date').updateValueAndValidity();
    
    } else {
     
      this.firstFormGroup.controls.welfaresubForm10.get('form10_details').setValue('');
      this.firstFormGroup.controls.welfaresubForm10.get('form10_details').clearValidators();
      this.firstFormGroup.controls.welfaresubForm10.get('form10_details').updateValueAndValidity();
      this.firstFormGroup.controls.welfaresubForm10.get('form10_date').setValue('');
      this.firstFormGroup.controls.welfaresubForm10.get('form10_date').clearValidators();
      this.firstFormGroup.controls.welfaresubForm10.get('form10_date').updateValueAndValidity();
      
      
    }
  }
  checkWel11($event:MatRadioChange){
    if ($event.value ==='Yes') {
    
      this.firstFormGroup.controls.welfaresubForm11.get('form11_details').setValidators(Validators.required);
      this.firstFormGroup.controls.welfaresubForm11.get('form11_details').updateValueAndValidity();
      this.firstFormGroup.controls.welfaresubForm11.get('form11_date').setValidators(Validators.required);
      this.firstFormGroup.controls.welfaresubForm11.get('form11_date').updateValueAndValidity();
    
    } else {
     
      this.firstFormGroup.controls.welfaresubForm11.get('form11_details').setValue('');
      this.firstFormGroup.controls.welfaresubForm11.get('form11_details').clearValidators();
      this.firstFormGroup.controls.welfaresubForm11.get('form11_details').updateValueAndValidity();
      this.firstFormGroup.controls.welfaresubForm11.get('form11_date').setValue('');
      this.firstFormGroup.controls.welfaresubForm11.get('form11_date').clearValidators();
      this.firstFormGroup.controls.welfaresubForm11.get('form11_date').updateValueAndValidity();
      
      
    }
  }
  checkWel12($event:MatRadioChange){
    if ($event.value ==='Yes') {
    
      this.firstFormGroup.controls.welfaresubForm12.get('form12_details').setValidators(Validators.required);
      this.firstFormGroup.controls.welfaresubForm12.get('form12_details').updateValueAndValidity();
      this.firstFormGroup.controls.welfaresubForm12.get('form12_date').setValidators(Validators.required);
      this.firstFormGroup.controls.welfaresubForm12.get('form12_date').updateValueAndValidity();
    
    } else {
     
      this.firstFormGroup.controls.welfaresubForm12.get('form12_details').setValue('');
      this.firstFormGroup.controls.welfaresubForm12.get('form12_details').clearValidators();
      this.firstFormGroup.controls.welfaresubForm12.get('form12_details').updateValueAndValidity();
      this.firstFormGroup.controls.welfaresubForm12.get('form12_date').setValue('');
      this.firstFormGroup.controls.welfaresubForm12.get('form12_date').clearValidators();
      this.firstFormGroup.controls.welfaresubForm12.get('form12_date').updateValueAndValidity();
      
      
    }
  }
  checkWel13($event:MatRadioChange){
    if ($event.value ==='Yes') {
    
      this.firstFormGroup.controls.welfaresubForm13.get('form13_details').setValidators(Validators.required);
      this.firstFormGroup.controls.welfaresubForm13.get('form13_details').updateValueAndValidity();
      this.firstFormGroup.controls.welfaresubForm13.get('form13_date').setValidators(Validators.required);
      this.firstFormGroup.controls.welfaresubForm13.get('form13_date').updateValueAndValidity();
    
    } else {
     
      this.firstFormGroup.controls.welfaresubForm13.get('form13_details').setValue('');
      this.firstFormGroup.controls.welfaresubForm13.get('form13_details').clearValidators();
      this.firstFormGroup.controls.welfaresubForm13.get('form13_details').updateValueAndValidity();
      this.firstFormGroup.controls.welfaresubForm13.get('form13_date').setValue('');
      this.firstFormGroup.controls.welfaresubForm13.get('form13_date').clearValidators();
      this.firstFormGroup.controls.welfaresubForm13.get('form13_date').updateValueAndValidity();
      
      
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
