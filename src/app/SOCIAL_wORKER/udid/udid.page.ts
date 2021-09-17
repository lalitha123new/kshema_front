import { Component, OnInit,ViewChild } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
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

interface rating_options{
  value: string;
  viewValue_rating: string;
}

interface tobacco_options{
  value: string;
  viewValue: string;
  checked:boolean
}
interface tobacco_options1{
  value: string;
  viewValue: string;
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
  selector: 'app-udid',
  templateUrl: './udid.page.html',
  styleUrls: ['./udid.page.scss'],
})
export class UdidPage implements OnInit {
 
  constructor(private _location: Location,
    private router: Router,private _formBuilder: FormBuilder,private dialogModel: MatDialog,
    private patientService: PatientService,private loadingCtrl: LoadingController,
    public alertController: AlertController,private offlineManager : OfflineManagerService) { }
  @ViewChild('stepper') stepper: MatStepper;
  firstFormGroup: any;
  secondFormGroup: any;
  thirdFormGroup: any;
  fourthFormGroup: any;
  isValue = 4;

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
  user_name;

  dateToday;
  date2 = false;

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

  tasks_uuid;
  uploadYes = true;
  statusPending = false;
  certifcateIssued = true;
  dateYes = true;
  reminder1:any;
   reminder2;
  ngOnInit() {
    this.firstFormGroup = this._formBuilder.group({
      udid_details_first:  new FormControl(this.udidObj.udid_details_first,[Validators.required]),
      remarks_first: new FormControl(this.udidObj.remarks_first,[]),
      completed_date_first: new FormControl(this.udidObj.completed_date_first,[]),
      ack_first: new FormControl(this.udidObj.ack_first,[]),
      review_date:new FormControl(this.udidObj.review_date,[]),
    })
    this.secondFormGroup = this._formBuilder.group({
      udid_details_1week:  new FormControl(this.udidObj.udid_details_1week,[Validators.required]),
      remarks_1week: new FormControl(this.udidObj.remarks_1week,[Validators.required]),
      completed_date_1week: new FormControl(this.udidObj.completed_date_1week,[Validators.required]),
      ack_1week: new FormControl(this.udidObj.ack_1week,[Validators.required]),
      date_time_1week: new FormControl(this.udidObj.date_time_1week,[Validators.required]),
      appointment_date_1week: new FormControl(this.udidObj.appointment_date_1week,[]),
      verification_place_1week: new FormControl(this.udidObj.verification_place_1week,[]),
    })
    this.thirdFormGroup = this._formBuilder.group({

      udid_details_2days:  new FormControl(this.udidObj.udid_details_2days,[Validators.required]),
      remarks_2days: new FormControl(this.udidObj.remarks_2days,[Validators.required]),
      completed_date_2days: new FormControl(this.udidObj.completed_date_2days,[Validators.required]),
      ack_2days: new FormControl(this.udidObj.ack_2days,[Validators.required]),
      date_time_2days: new FormControl(this.udidObj.date_time_2days,[Validators.required]),
      appointment_date_2days: new FormControl(this.udidObj.appointment_date_2days,[Validators.required]),
      verification_place_2days: new FormControl(this.udidObj.verification_place_2days,[Validators.required]),
      reminder_given_2days: new FormControl(this.udidObj.reminder_given_2days,[Validators.required]),
      reminder_method_2days: new FormControl(this.udidObj.reminder_method_2days,[]),
    })
    this.fourthFormGroup = this._formBuilder.group({

      udid_details_1month:  new FormControl(this.udidObj.udid_details_1month,[Validators.required]),
      remarks_1month: new FormControl(this.udidObj.remarks_1month,[Validators.required]),
      completed_date_1month: new FormControl(this.udidObj.completed_date_1month,[Validators.required]),
      ack_1month: new FormControl(this.udidObj.ack_1month,[Validators.required]),
      date_time_1month: new FormControl(this.udidObj.date_time_1month,[Validators.required]),
      appointment_date_1month: new FormControl(this.udidObj.appointment_date_1month,[Validators.required]),
      verification_place_1month: new FormControl(this.udidObj.verification_place_1month,[Validators.required]),
      reminder_given_1month: new FormControl(this.udidObj.reminder_given_1month,[Validators.required]),
      reminder_method_1month: new FormControl(this.udidObj.reminder_method_1month,[Validators.required]),
      udid_status: new FormControl(this.udidObj.udid_status,[Validators.required]),
      details_further_steps: new FormControl(this.udidObj.details_further_steps,[]),
      welfare_benefits: new FormControl(this.udidObj.welfare_benefits,[]),
      brochure: new FormControl(this.udidObj.brochure,[]),
      module: new FormControl(this.udidObj.module,[]),
      med_authority:new FormControl(this.udidObj.med_authority,[]),
      date_supervisor:new FormControl(this.udidObj.date_supervisor,[]),
    })
  }


  home(){
    this.router.navigate(['dashboard']);

  }


  redirect(i){
    document.getElementById('mySidenav_sw8').style.width = '0';
    if(i == 1){
      this.router.navigate(['dashboard']);
    }else if(i == 2){
      //this.router.navigate(['managepatient']);
    }

  }


  ionViewWillEnter() {
  
   
    this.user_name = sessionStorage.getItem("user_name");
    this.patient_id =  sessionStorage.getItem('patient_id');
    this.patient_uuid =  sessionStorage.getItem('patient_uuid');
    this.getPatient();
    this.getUUIDUDID();
    //to go to a particular step index
    // this.stepper.selectedIndex = 2;
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
  
  async getUUIDUDID(){
    let uuid_array_first :any;
    let test = await this.patientService.getPatientUUIDUDID(this.patient_uuid).then(result2 => {
     
      uuid_array_first=result2;
 
   });
    
   
      //get the uuid of the udid task in the task table for updating the status if it exists
     if(uuid_array_first[0].udid_uuid_data[0].tasks_uuid){
      this.tasks_uuid = uuid_array_first[0].udid_uuid_data[0].tasks_uuid;
     
     }

     //gettting the latest udid data from the udid table for displaying back in the forms
     if(uuid_array_first[0].latest_udid_data[0].udid_info_obj){
  

      let udidObject = JSON.parse(uuid_array_first[0].latest_udid_data[0].udid_info_obj);
      this.firstFormGroup.get('udid_details_first').setValue(udidObject.udid_details);
     
      if(udidObject.udid_details == "Yes"){
      
        this.tobaccooptionsArray[0].checked = true;
        this.uploadYes = true;
       this.stepper.selectedIndex = 1;
      }else  if(udidObject.udid_details == "No"){
        this.tobaccooptionsArray[1].checked = true;
        this.uploadYes = false;
      }else if(udidObject.udid_details == "Incomplete"){
        this.tobaccooptionsArray[2].checked = true;
      }
  
      this.firstFormGroup.get('remarks_first').setValue((udidObject.remarks));
      this.firstFormGroup.get('completed_date_first').setValue(udidObject.completed_date);
      this.firstFormGroup.get('ack_first').setValue(udidObject.ack_no);
  
       this.secondFormGroup.get('udid_details_1week').setValue(udidObject.udid_details);
      this.secondFormGroup.get('remarks_1week').setValue((udidObject.remarks));
      this.secondFormGroup.get('completed_date_1week').setValue(udidObject.completed_date);
      this.secondFormGroup.get('ack_1week').setValue(udidObject.ack_no);
      this.secondFormGroup.get('date_time_1week').setValue(udidObject.date_time);
     
  
      if(udidObject.date_time == "Yes"){
        this.stepper.selectedIndex = 2;
        this.tobaccooptionsArray2[0].checked = true;
        this.dateYes = true;
  
        
      }else  if(udidObject.date_time == "No"){
        this.tobaccooptionsArray2[1].checked = true;
        this.dateYes = false;
        
      
      }else if(udidObject.date_time == "Incomplete"){
        this.tobaccooptionsArray2[2].checked = true;
        this.dateYes = false;
       
        
      }
      this.secondFormGroup.get('appointment_date_1week').setValue(udidObject.appointment_date);
      this.secondFormGroup.get('verification_place_1week').setValue(udidObject.verification_place);
  
     
      this.thirdFormGroup.get('udid_details_2days').setValue(udidObject.udid_details);
      this.thirdFormGroup.get('remarks_2days').setValue((udidObject.remarks));
      this.thirdFormGroup.get('completed_date_2days').setValue(udidObject.completed_date);
      this.thirdFormGroup.get('ack_2days').setValue(udidObject.ack_no);
    
      this.thirdFormGroup.get('date_time_2days').setValue(udidObject.date_time);
      this.thirdFormGroup.get('appointment_date_2days').setValue(udidObject.appointment_date);
      this.thirdFormGroup.get('verification_place_2days').setValue(udidObject.verification_place);
      this.thirdFormGroup.get('reminder_given_2days').setValue(udidObject.reminder);
     
      this.reminder1 = this.addDays1(new Date(udidObject.appointment_date),2);
     
      let date = ("0" + this.reminder1.getDate()).slice(-2);
      let month = ("0" + (this.reminder1.getMonth() + 1)).slice(-2);
      let year =this.reminder1.getFullYear();
      
      this.reminder2 = date + "-" + month + "-" + year;
     
    
  
      if(udidObject.reminder == "Yes"){
        this.stepper.selectedIndex = 3;
        this.tobaccooptionsArray1[0].checked = true;
       
      }else if(udidObject.reminder == "No"){
        this.tobaccooptionsArray1[1].checked = true;
        
      }
      this.thirdFormGroup.get('reminder_method_2days').setValue(udidObject.reminder_method);
     
      this.fourthFormGroup.get('udid_details_1month').setValue(udidObject.udid_details);
       this.fourthFormGroup.get('remarks_1month').setValue((udidObject.remarks));
      this.fourthFormGroup.get('completed_date_1month').setValue(udidObject.completed_date);
      this.fourthFormGroup.get('ack_1month').setValue(udidObject.ack_no);
      this.fourthFormGroup.get('date_time_1month').setValue(udidObject.date_time);
      this.fourthFormGroup.get('appointment_date_1month').setValue(udidObject.appointment_date);
      this.fourthFormGroup.get('verification_place_1month').setValue(udidObject.verification_place);
      this.fourthFormGroup.get('reminder_given_1month').setValue(udidObject.reminder);
     
      
     
     this.fourthFormGroup.get('reminder_method_1month').setValue(udidObject.reminder_method);
      this.fourthFormGroup.get('udid_status').setValue(udidObject.udid_status);
     if(udidObject.udid_status == 1 || udidObject.udid_status == 4 || udidObject.udid_status == 5 ){
      
       this.certifcateIssued = false;
       this.statusPending = true;
       this.fourthFormGroup.get('details_further_steps').setValue(udidObject.details_further_steps);
       this.fourthFormGroup.get('med_authority').setValue(udidObject.med_authority);
       this.fourthFormGroup.get('date_supervisor').setValue(udidObject.date_supervisor);
      
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
       this.fourthFormGroup.get('details_further_steps').setValue(udidObject.details_further_steps);
       this.fourthFormGroup.get('welfare_benefits').setValue(udidObject.welfare_benefits);
       this.fourthFormGroup.get('brochure').setValue(udidObject.brochure);
       this.fourthFormGroup.get('module').setValue(udidObject.module);
     }
     
     
    }
     

 
  }

  // get the day after first instance
addDays(theDate, days) {
  
    let date =  new Date(theDate.getTime() + days*24*60*60*1000);
    return date;
    //commented for date format new
    // return ("00" + date.getDate()).slice(-2)  + "-"+("00" + (date.getMonth() + 1)).slice(-2) + "-" +date.getFullYear() + " " +
    // ("00" + date.getHours()).slice(-2) + ":" +
    // ("00" + date.getMinutes()).slice(-2) + ":" +
    // ("00" + date.getSeconds()).slice(-2);
     //end commented for date format new

    
    // return date.getFullYear() + "-"+("00" + (date.getMonth() + 1)).slice(-2) + "-" +("00" + date.getDate()).slice(-2) + " " +
    // ("00" + date.getHours()).slice(-2) + ":" +
    // ("00" + date.getMinutes()).slice(-2) + ":" +
    // ("00" + date.getSeconds()).slice(-2);
}
addDays1(theDate, days) {
  
  let date =  new Date(theDate.getTime() - days*24*60*60*1000);
  return date;
  //commented for date format new
  // return ("00" + date.getDate()).slice(-2)  + "-"+("00" + (date.getMonth() + 1)).slice(-2) + "-" +date.getFullYear() + " " +
  // ("00" + date.getHours()).slice(-2) + ":" +
  // ("00" + date.getMinutes()).slice(-2) + ":" +
  // ("00" + date.getSeconds()).slice(-2);
   //end commented for date format new

  
  // return date.getFullYear() + "-"+("00" + (date.getMonth() + 1)).slice(-2) + "-" +("00" + date.getDate()).slice(-2) + " " +
  // ("00" + date.getHours()).slice(-2) + ":" +
  // ("00" + date.getMinutes()).slice(-2) + ":" +
  // ("00" + date.getSeconds()).slice(-2);
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
  
    this.router.navigate(['patient-details']);
   

  }


  previous(){
    this.stepper.previous();
  }
  checkUpload($event:MatRadioChange){
    if ($event.value ==='Yes') {
     this.uploadYes = true;
      this.firstFormGroup.get('remarks_first').setValidators(Validators.required);
      this.firstFormGroup.get('remarks_first').updateValueAndValidity();
      this.firstFormGroup.get('completed_date_first').setValidators(Validators.required);
      this.firstFormGroup.get('completed_date_first').updateValueAndValidity();
      this.firstFormGroup.get('ack_first').setValidators(Validators.required);
      this.firstFormGroup.get('ack_first').updateValueAndValidity();
      this.firstFormGroup.get('review_date').setValue('');
      this.firstFormGroup.get('review_date').clearValidators();
      this.firstFormGroup.get('review_date').updateValueAndValidity();
      //completed_date_first,ack_first
    }else{
      this.uploadYes = false;
      this.firstFormGroup.get('remarks_first').setValue('');
      this.firstFormGroup.get('completed_date_first').setValue('');
      this.firstFormGroup.get('ack_first').setValue('');
      this.firstFormGroup.get('remarks_first').clearValidators();
      this.firstFormGroup.get('remarks_first').updateValueAndValidity();
      this.firstFormGroup.get('completed_date_first').clearValidators();
      this.firstFormGroup.get('completed_date_first').updateValueAndValidity();
      this.firstFormGroup.get('ack_first').clearValidators();
      this.firstFormGroup.get('ack_first').updateValueAndValidity();
      this.firstFormGroup.get('review_date').setValidators(Validators.required);
      this.firstFormGroup.get('review_date').updateValueAndValidity();
      //review_date
    }
  }

  submitStep1(firstFormGroup){
   
   
    let follow_up_date1 =this.firstFormGroup.get('completed_date_first').value;
     

    let udidObj1 = {
      udid_details:  this.firstFormGroup.get('udid_details_first').value,
      remarks: this.firstFormGroup.get('remarks_first').value,
      completed_date:  follow_up_date1,
      ack_no:  this.firstFormGroup.get('ack_first').value,
      review_date:this.firstFormGroup.get('review_date').value,

    }
    
    console.log(this.firstFormGroup.get('udid_details_first').value)
    var currentDate = new Date();
    let date1;
    if(this.firstFormGroup.get('udid_details_first').value == "Yes"){
     date1 = this.addDays(currentDate, 7);
    }else{
      //let date1 = this.addDays(currentDate, 7);
       date1 = this.firstFormGroup.get('review_date').value;
    }
   

      this.patientService.addUDID(this.patient_uuid,udidObj1,this.tasks_uuid,date1).then(() => {
         
      
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

  checkDatetime($event:MatRadioChange){
    if ($event.value ==='Yes') {
      this.dateYes = true;
      this.secondFormGroup.get('appointment_date_1week').setValidators(Validators.required);
      this.secondFormGroup.get('appointment_date_1week').updateValueAndValidity();
      this.secondFormGroup.get('verification_place_1week').setValidators(Validators.required);
      this.secondFormGroup.get('verification_place_1week').updateValueAndValidity();
    }else{
      this.dateYes = false;
      this.secondFormGroup.get('appointment_date_1week').setValue('');
      this.secondFormGroup.get('verification_place_1week').setValue('');
      this.secondFormGroup.get('appointment_date_1week').clearValidators();
      this.secondFormGroup.get('appointment_date_1week').updateValueAndValidity();
      this.secondFormGroup.get('verification_place_1week').clearValidators();
      this.secondFormGroup.get('verification_place_1week').updateValueAndValidity();
    }
  }


  submitStep2(secondFormGroup){
    let date1_new;
    let date2_new;
  
    let follow_up_date1 =this.secondFormGroup.get('completed_date_1week').value;
     

      let follow_up_date2 =this.secondFormGroup.get('appointment_date_1week').value;
      

      //verification_place_1week
    let udidObj2 = {
      udid_details:  this.secondFormGroup.get('udid_details_1week').value,
      remarks: this.secondFormGroup.get('remarks_1week').value,
      completed_date:  follow_up_date1,
      ack_no:  this.secondFormGroup.get('ack_1week').value,
      date_time: this.secondFormGroup.get('date_time_1week').value,
      appointment_date: follow_up_date2,
      verification_place: this.secondFormGroup.get('verification_place_1week').value,

    }
  
    var currentDate = new Date();
    let date1;
    //  let =date1 = this.addDays(currentDate, 2);
    if(this.secondFormGroup.get('date_time_1week').value == "Yes"){
      //date1 = follow_up_date2;
      date1 = this.addDays1(follow_up_date2, 2);
      // console.log("New date"+date1)
    }else{
      date1 = this.addDays(currentDate, 14);
    }
  

      this.patientService.addUDID(this.patient_uuid,udidObj2,this.tasks_uuid,date1).then(() => {
         
       
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
               // this.router.navigate(['patient-details']);
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

  checkReminder($event:MatRadioChange){
    if ($event.value ==='Yes') {
      this.thirdFormGroup.get('reminder_method_2days').setValidators(Validators.required);
      this.thirdFormGroup.get('reminder_method_2days').updateValueAndValidity();
    }else{
      this.thirdFormGroup.get('reminder_method_2days').setValue('');
      this.thirdFormGroup.get('reminder_method_2days').clearValidators();
      this.thirdFormGroup.get('reminder_method_2days').updateValueAndValidity();
    }
  }
  submitStep3(thirdFormGroup){
   

    let date1_new;
    let date2_new;
    console.log(thirdFormGroup);
    let follow_up_date1 =this.thirdFormGroup.get('completed_date_2days').value;
     

      let follow_up_date2 =this.thirdFormGroup.get('appointment_date_2days').value;
      

     
    let udidObj3 = {
      udid_details:  this.thirdFormGroup.get('udid_details_2days').value,
      remarks: this.thirdFormGroup.get('remarks_2days').value,
      completed_date:  follow_up_date1,
      ack_no:  this.thirdFormGroup.get('ack_2days').value,
      date_time: this.thirdFormGroup.get('date_time_2days').value,
      appointment_date: follow_up_date2,
      verification_place: this.thirdFormGroup.get('verification_place_2days').value,
      reminder: this.thirdFormGroup.get('reminder_given_2days').value,
      reminder_method: this.thirdFormGroup.get('reminder_method_2days').value,

    }
   
    var currentDate = new Date();
    let date1 = this.addDays(currentDate, 30);
   
    
    
     
      this.patientService.addUDID(this.patient_uuid,udidObj3,this.tasks_uuid,date1).then(() => {
         
      
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
  statusCheck($event){
    console.log($event);
    if($event == 1 ||$event == 4 ||$event == 5 ){
      this.certifcateIssued = false;
      this.statusPending = true;
      this.fourthFormGroup.get('med_authority').setValidators(Validators.required);
      this.fourthFormGroup.get('med_authority').updateValueAndValidity();
      this.fourthFormGroup.get('date_supervisor').setValidators(Validators.required);
      this.fourthFormGroup.get('date_supervisor').updateValueAndValidity();
      this.fourthFormGroup.get('details_further_steps').setValidators(Validators.required);
      this.fourthFormGroup.get('details_further_steps').updateValueAndValidity();
      this.fourthFormGroup.get('welfare_benefits').setValue('');
      this.fourthFormGroup.get('welfare_benefits').clearValidators();
      this.fourthFormGroup.get('welfare_benefits').updateValueAndValidity();
      this.fourthFormGroup.get('brochure').setValue('');
      this.fourthFormGroup.get('brochure').clearValidators();
      this.fourthFormGroup.get('brochure').updateValueAndValidity();
      this.fourthFormGroup.get('module').setValue('');
      this.fourthFormGroup.get('module').clearValidators();
      this.fourthFormGroup.get('module').updateValueAndValidity();
      
    }else{
      this.statusPending = false;
      this.certifcateIssued = true;

      this.fourthFormGroup.get('welfare_benefits').setValidators(Validators.required);
      this.fourthFormGroup.get('welfare_benefits').updateValueAndValidity();
      this.fourthFormGroup.get('brochure').setValidators(Validators.required);
      this.fourthFormGroup.get('brochure').updateValueAndValidity();
      this.fourthFormGroup.get('module').setValidators(Validators.required);
      this.fourthFormGroup.get('module').updateValueAndValidity();
      this.fourthFormGroup.get('med_authority').setValue('');
      this.fourthFormGroup.get('med_authority').clearValidators();
      this.fourthFormGroup.get('med_authority').updateValueAndValidity();
      this.fourthFormGroup.get('date_supervisor').setValue('');
      this.fourthFormGroup.get('date_supervisor').clearValidators();
      this.fourthFormGroup.get('date_supervisor').updateValueAndValidity();
      this.fourthFormGroup.get('details_further_steps').setValue('');
      this.fourthFormGroup.get('details_further_steps').clearValidators();
      this.fourthFormGroup.get('details_further_steps').updateValueAndValidity();
    }
  }

  submitStep4(fourthFormGroup){


    let date1_new;
    let date2_new;

   
    let follow_up_date1 =this.fourthFormGroup.get('completed_date_1month').value;
      

      let follow_up_date2 =this.fourthFormGroup.get('appointment_date_1month').value;
     
 
   
     
    let udidObj4 = {
      udid_details:  this.fourthFormGroup.get('udid_details_1month').value,
      remarks: this.fourthFormGroup.get('remarks_1month').value,
      completed_date:  follow_up_date1,
      ack_no:  this.fourthFormGroup.get('ack_1month').value,
      date_time: this.fourthFormGroup.get('date_time_1month').value,
      appointment_date: follow_up_date2,
      verification_place: this.fourthFormGroup.get('verification_place_1month').value,
      reminder: this.fourthFormGroup.get('reminder_given_1month').value,
      reminder_method: this.fourthFormGroup.get('reminder_method_1month').value,
      udid_status: this.fourthFormGroup.get('udid_status').value,
      details_further_steps: this.fourthFormGroup.get('details_further_steps').value,
      welfare_benefits: this.fourthFormGroup.get('welfare_benefits').value,
      brochure: this.fourthFormGroup.get('brochure').value,
      module: this.fourthFormGroup.get('module').value,
      med_authority: this.fourthFormGroup.get('med_authority').value,
      date_supervisor: this.fourthFormGroup.get('date_supervisor').value,

    }
    var date2;
    var currentDate = new Date();
   if(this.statusPending ){
     date2 = this.addDays(currentDate, 14); 
   }else{
    date2 = "";
   }
   
     
      this.patientService.addUDID(this.patient_uuid,udidObj4,this.tasks_uuid,date2).then(() => {
         
     
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

  
  ratingArray: rating_options[] = [
    {value: '1', viewValue_rating: '1'},
    {value: '2', viewValue_rating: '2'},
    {value: '3', viewValue_rating: '3'},
    {value: '4', viewValue_rating: '4'},
    {value: '5', viewValue_rating: '5'}
   
  ];
  tobaccooptionsArray: tobacco_options[] = [
    {value: '1', viewValue: 'Yes',checked:false},
    {value: '2', viewValue: 'No',checked:false},
    {value: '3', viewValue: 'Incomplete',checked:false}
   
  ];
  tobaccooptionsArray1: tobacco_options1[] = [
    {value: '1', viewValue: 'Yes',checked:false},
    {value: '2', viewValue: 'No',checked:false}
    
   
  ];
  tobaccooptionsArray2: tobacco_options[] = [
    {value: '1', viewValue: 'Yes',checked:false},
    {value: '2', viewValue: 'No',checked:false},
    {value: '3', viewValue: 'Incomplete',checked:false}
   
  ];
  tobaccooptionsArray3: tobacco_options[] = [
    {value: '1', viewValue: 'Yes',checked:false},
    {value: '2', viewValue: 'No',checked:false},
    {value: '3', viewValue: 'Not done',checked:false}
   
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
