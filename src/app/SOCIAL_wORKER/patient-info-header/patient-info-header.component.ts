import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PatientService } from 'src/app/services/patient.service';
import { Patient } from 'src/app/patient.model';
import { ServerService } from 'src/app/services/server.service';
@Component({
  selector: 'app-patient-info-header',
  templateUrl: './patient-info-header.component.html',
  styleUrls: ['./patient-info-header.component.scss'],
})
export class PatientInfoHeaderComponent implements OnInit {

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
  role;
  patient_array:any;
  demo1:any;
  psw = true;

  constructor(private router: Router,private patientService: PatientService, private serverService: ServerService) { }
 
  ngOnInit() {}

  redirectTo(x){
    if(x==1){
      this.router.navigate(['history']);
    }else{
      this.router.navigate(['edit-patient']);
    }
  }

  ngAfterContentInit(){
console.log("check")
      this.role = sessionStorage.getItem("role")
      this.patient_id =  sessionStorage.getItem('patient_id');
      this.patient_uuid =  sessionStorage.getItem('patient_uuid');
      if(this.role == "psw"){
        this.psw = true;
      this.getPatient();
      }else{
        this.psw = false;
        this.getPatientServer();
      }
  }

  getPatient(){
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
   
  },err => {
    console.log(err);
   
  });
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
     
   
  }
 
}
