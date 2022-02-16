import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {FormBuilder,FormControl,FormGroupDirective,NgForm, FormGroup, Validators,ValidatorFn} from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PatientService } from 'src/app/services/patient.service';
import { LoadingController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { NetworkService, ConnectionStatus } from 'src/app/services/network.service';
import { OfflineManagerService } from '../../services/offline-manager.service';



interface gender_optons {
  value: string;
  viewValue: string;
}

interface district_optons{
  value: number;
  viewValue: string;
}

interface taluk_optons{
  value: number;
  viewValue: string;
}
@Component({
  selector: 'app-edit-patient',
  templateUrl: './edit-patient.page.html',
  styleUrls: ['./edit-patient.page.scss'],
})
export class EditPatientPage implements OnInit {

  constructor(private router: Router,private _formBuilder: FormBuilder,
    private patientService: PatientService,private loadingCtrl: LoadingController,
    public alertController: AlertController,private networkService : NetworkService,private offlineManager : OfflineManagerService) { }
  
  editFormGroup: any;
  patient_id;
  patient_uuid;
  kshema_id;
  demo;
  user_name;
  
  name;
  gender1;
  age;
  mobile;
  address;
  care_giver;
  care_giver_mobile;
  asha;
  psw_incharge;
  active = true;
 status;
 taluk_array:any;
 district_array:any;
 showSpinner = false;
 isDisabled = false;

ngOnInit() {

  this.editFormGroup = this._formBuilder.group({
    name: new FormControl('', [Validators.required]),
    gender:new FormControl('', [Validators.required]),
    dob : new FormControl('', [Validators.required]),
    phone : new FormControl('', [Validators.required]),
    caregiver_name: new FormControl('', []),
    caregiver_phone: new FormControl('', []),
    address1: new FormControl('', [Validators.required]),
    method_reach: new FormControl('', []),
    district_selected : new FormControl('', Validators.required),
    taluk_selected: new FormControl('', Validators.required),
    contact_patient: new FormControl('',[]),
    //psw_incharge: new FormControl(this.patObject.psw_incharge, Validators.required),
  });
  
}


ionViewWillEnter() {
  this.user_name = sessionStorage.getItem("user_name");
  this.isDisabled = false;
  this.showSpinner = true;
  this.editFormGroup = this._formBuilder.group({
    name: new FormControl('', [Validators.required]),
    gender:new FormControl('', [Validators.required]),
    dob : new FormControl('', [Validators.required]),
    phone : new FormControl('', [Validators.required]),
    caregiver_name: new FormControl('', []),
    caregiver_phone: new FormControl('', []),
    address1: new FormControl('', [Validators.required]),
    method_reach: new FormControl('', []),
    district_selected : new FormControl('', Validators.required),
    taluk_selected: new FormControl('', Validators.required),
    contact_patient: new FormControl('',[]),
    //psw_incharge: new FormControl(this.patObject.psw_incharge, Validators.required),
  });
  this.networkService.initializeNetworkEvents();
  this.user_name = sessionStorage.getItem("user_name");
  this.patient_id =  sessionStorage.getItem('patient_id');
  this.patient_uuid =  sessionStorage.getItem('patient_uuid');
  //this.getTaluks();
  //this.getDistricts();
  this.getPatient(this.patient_uuid);
}

getDistricts(){
  this.patientService.getDistricts().then((res) => {
  
    this.district_array = res;
    
 
  });
}
async getTaluks(){
  let taluk_array_first :any;
  let test = await this.patientService.getTaluks().then(result1 => {
   
   taluk_array_first=result1;

 });
 
 this.taluk_array = taluk_array_first;
 
  
}
  
  async getPatient(patient_uuid){
    let pat_array_first :any;
    let test = await this.patientService.fetchPatient(patient_uuid).then(result2 => {
     
      pat_array_first=result2;
  
   });
  
  this.showSpinner = false;
  this.kshema_id = pat_array_first[0].kshema_id;
  this.name = pat_array_first[0].name;
  this.demo = JSON.parse(pat_array_first[0].demographic_info);

    if(this.demo.gender == 1){
    this.gender1 = "M";
    }else if(this.demo.gender == 2){
    this.gender1 = "F";
    }else{
    this.gender1 = "O";
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
    this.editFormGroup.get('name').setValue(pat_array_first[0].name);
    this.demo = JSON.parse(pat_array_first[0].demographic_info);
    this.editFormGroup.get('gender').setValue(this.demo.gender);
    this.editFormGroup.get('dob').setValue(this.demo.dob);
    this.editFormGroup.get('phone').setValue(this.demo.phone);
    this.editFormGroup.get('caregiver_name').setValue(this.demo.caregiver_name);
    this.editFormGroup.get('caregiver_phone').setValue(this.demo.caregiver_phone);
    this.editFormGroup.get('address1').setValue(this.demo.address1);
    this.editFormGroup.get('method_reach').setValue(this.demo.method_reach);
    this.editFormGroup.get('district_selected').setValue(this.demo.district_selected);
    this.editFormGroup.get('taluk_selected').setValue(this.demo.taluk_selected);
    this.editFormGroup.get('contact_patient').setValue(this.demo.contact_patient);
    if(pat_array_first[0].status == 'active'){
      this.active = true;
    }else{
      this.active = false;
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

//to activate or deactivate patient
onChangeSlideToggle(event){
  if (event.checked == true) {
    this.active = true;
  } else {
    this.active = false;
  }
}

editPatient(){
  this.isDisabled = true;
  if( this.active == true){
    this.status = "active";
  }else{
    this.status = "inactive";
  }

  let name = this.editFormGroup.get('name').value;
  let demographicData = {
    
    gender:this.editFormGroup.get('gender').value,
    dob:this.editFormGroup.get('dob').value,
    address1:this.editFormGroup.get('address1').value,
    caregiver_name:this.editFormGroup.get('caregiver_name').value,
    caregiver_phone:this.editFormGroup.get('caregiver_phone').value,
    district_selected:this.editFormGroup.get('district_selected').value,
    method_reach:this.editFormGroup.get('method_reach').value,
    phone:this.editFormGroup.get('phone').value,
    taluk_selected:this.editFormGroup.get('taluk_selected').value,
    contact_patient: this.editFormGroup.get('contact_patient').value,

  }
  
   
    this.patientService.updatePatientDemo(this.patient_uuid,name,demographicData,this.status).then(() => {
       
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
     
        
      },err => {
        console.log("No Internet Connection! Data added to the Request List");
      
       
      });
 
}

redirectTo(x){
  if(x==1){
    this.router.navigate(['history']);
  }else{
    this.router.navigate(['edit-patient']);
  }
}

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
  
  {value: 1, viewValue: 'Gangavathi'},
  {value: 2, viewValue: 'Gauribidanur'},
  {value: 3, viewValue: 'Madhugiri'},
  {value: 4, viewValue: 'Sirsi'},
  {value: 5, viewValue: 'Hospete'},
  {value: 6, viewValue: 'Chitapur'},
  {value: 7, viewValue: 'Sindgi'},
  {value: 8, viewValue: 'Chikodi'},
  {value: 9, viewValue: 'Basavakalyan'},
  {value: 10, viewValue: 'Jamkhandi'},
 
];

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

textOnlyValidation(event: any){
  //const pattern = /[0-9.,]/;
  const pattern = /[^a-zA-Z/. -]/;
  let inputChar = String.fromCharCode(event.charCode);

  if (pattern.test(inputChar)) {
    // invalid character, prevent input
    event.preventDefault();
  }
}
  textOnlyValidationCare(event: any){
    //const pattern = /[0-9.,]/;
    const pattern = /[^a-zA-Z/. -]/;
    let inputChar = String.fromCharCode(event.charCode);

    if (pattern.test(inputChar)) {
      // invalid character, prevent input
      event.preventDefault();
    }
  }


}
