import { Component, OnInit,ViewChild } from '@angular/core';

import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {FormBuilder,FormControl,FormGroupDirective,NgForm, FormGroup, Validators} from '@angular/forms';
import {Location} from '@angular/common';
import { Router } from '@angular/router';
import { PatientService } from 'src/app/services/patient.service';
import { ServerService } from 'src/app/services/server.service';
import { JSDocCommentStmt } from '@angular/compiler';



@Component({
  selector: 'app-all-patients',
  templateUrl: './all-patients.page.html',
  styleUrls: ['./all-patients.page.scss'],
})
export class AllPatientsPage implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;

  displayedColumns_dashboard: string[] = ['name','mobile','address','task','due_date','gender','age','patient_id'];
  displayedColumns_dashboard1: string[] = ['name','mobile','address','task','due_date'];
  
  dataSource_dashboard1 = new MatTableDataSource<PeriodicElement_dashboard1>(ELEMENT_DATA_dashboard1);

  constructor(private _formBuilder: FormBuilder,
    private _location: Location,
    private router: Router,
    private patientService: PatientService,
    private serverService: ServerService) { }

  data;
  data_res1 = [];
  data_res2 = [];
  filtered_upcoming_visit = [];
  data_res3 = [];
  filtered_today_visit = [];
  data_res4 = [];
  filtered_today_task = [];
  data_res5 = [];
  filtered_upcoming_task = [];
  data_res5a = [];
  filtered_overdue_visit = [];
  data_res6 = [];
  filtered_overdue_task = [];
  final_array = [];
  today = new Date();
  date = ("0" + this.today.getDate()).slice(-2);
  month = ("0" + (this.today.getMonth() + 1)).slice(-2);
  year = this.today.getFullYear();
  today_date = this.date + "-" + this.month + "-" + this.year;
  show = false;
  user_name;

  //supervisor code
  allPatients_array:any;
  super_id1;
  super_id;
  group_data_id1;
  group_data_id;
  psw_array:any;
  group_data_array:any;
  role;
  hide_col = true;
  add_pat = true;
  new_array = [];
  group_data;
  group_data1;
  showSpinner = false;

  
  ngOnInit() {   
  }

  ionViewWillEnter() {
    
      
    this.user_name = sessionStorage.getItem("user_name");
    this.role = sessionStorage.getItem("role");
    this.dataSource_dashboard1.data =[];
    this.allPatients_array = []; 
    this.super_id1 = sessionStorage.getItem("supervisor_id");
    this.super_id = parseInt(this.super_id1);
    this.group_data_id1 = sessionStorage.getItem("group_data_id");
    this.group_data_id = parseInt(this.group_data_id1);
   

    if(this.role == "psw"){
      this.showSpinner= true;
      this.add_pat = true;
      this.hide_col = true;
      this.getPatients();
      this.getAllVisit();
    }else{
      this.showSpinner= true;
      this.add_pat = false;
      this.hide_col = false;
      this.group_data = sessionStorage.getItem("group_data");
      this.group_data1 =  JSON.parse( this.group_data);
      this.group_data_id = 0;
      this.getGroupDataServer(this.super_id);
      this.getAllTalukasPswsTalukasupervisors();
    }
   
  }

  async getPatients(){
    let patients_array_first :any;
    let test = await this.patientService.fetchPatientsAll().then(result1 => {
     
      patients_array_first=result1;

   });

  
      this.data_res1 = patients_array_first;
     

  }

  async getAllVisit(){
    let visits_array_first :any;
    let test = await this.patientService.getAllVisit().then(result2 => {
     
      visits_array_first=result2;
     

   });
      this.data_res3 = [];
      this.filtered_today_visit = [];
     
      this.data_res3 = visits_array_first;
   
      let resultArray1 :any;
      resultArray1 = this.data_res1;
    
    
    
    for(var arr in resultArray1){
      
     
      for(var filter in this.data_res3){

          if(resultArray1[arr].patient_uuid == this.data_res3[filter].patient_uuid){

            
            resultArray1[arr].task = this.data_res3[filter].visit_type;
            resultArray1[arr].followup_date = this.data_res3[filter].followup_date;
            this.filtered_today_visit.push(resultArray1[arr]);
            }
      }
    }

    for(var k = 0; k<this.filtered_today_visit.length;k++){

      this.filtered_today_visit[k].due_date =  new Date(this.filtered_today_visit[k].followup_date);
     
      let demo1= (JSON.parse(this.filtered_today_visit[k].demographic_info));
     
       const birthDate = new Date(demo1.dob);
       const today = new Date();
      let age = today.getFullYear() - new Date(demo1.dob).getFullYear();
      const m = today.getMonth() - new Date(demo1.dob).getMonth();
     
      if (m < 0 || (m === 0 && today.getDate() < new Date(demo1.dob).getDate())) {
        age--;
       
      }
      this.filtered_today_visit[k].age = age;
  
      if(demo1.gender == 1){
      this.filtered_today_visit[k].gender = "M";
      }else if(demo1.gender == 2){
        this.filtered_today_visit[k].gender = "F";
      }else{
      this.filtered_today_visit[k].gender = "O";
      }

   if(this.filtered_today_visit[k].task == 1){
    this.filtered_today_visit[k].task = "PHC";
   }else if(this.filtered_today_visit[k].task == 2){
    this.filtered_today_visit[k].task = "Taluk Hospital";
   }else if(this.filtered_today_visit[k].task == 3){
    this.filtered_today_visit[k].task = "District Hospital";
   }else{
    this.filtered_today_visit[k].task =  this.filtered_today_visit[k].task;
   }
      this.filtered_today_visit[k].mobile = demo1.phone;
      this.filtered_today_visit[k].address = demo1.address1;
      this.dataSource_dashboard1.data = this.filtered_today_visit;
      this.dataSource_dashboard1.paginator = this.paginator;
      
    }
    this.showSpinner= false;
  }

  
  async getGroupDataServer(supervisor_id){

    let group_array_first :any;
    let test = await this.serverService.getGroupData(supervisor_id).toPromise().then(result1 => {
     
      group_array_first=result1;

   });
   this.group_data_array = group_array_first;
   
  }
  
  async getAllTalukasPswsTalukasupervisors(){
    let taluk_array_first :any;
    let test = await this.serverService.getAllTalukasPswsTalukasupervisors().toPromise().then(result3 => {
     
      taluk_array_first=result3;

   });
 
 
  
  this.psw_array = taluk_array_first[0].social_worker;
  
  this.getPatientsServer();
  
  }
  
  //to get all patients data
  async getPatientsServer(){
    let patients_array_first :any;
    this.new_array = []
    let test = await this.serverService.getPatitents(this.group_data_id).toPromise().then(result1 => {
     
      patients_array_first=result1;

   });
   this.showSpinner= false;
   this.new_array = patients_array_first;
  
   for(var m=0;m<this.new_array.length;m++){
    for(var n=0;n<this.group_data1.length;n++){
     if(this.new_array[m].patientObj.group_data_id == this.group_data1[n]){
     
       this.new_array[m].group_data = this.new_array[m].patientObj.group_data_id;
      if(this.new_array[m].group_data != null){
       
        this.allPatients_array.push(this.new_array[m]);
      }
      
    }
     }
   }
   
   
      for(var k = 0;k<this.allPatients_array.length;k++){
       
        this.allPatients_array[k].name = this.allPatients_array[k].patientObj.name;
        this.allPatients_array[k].patient_uuid = this.allPatients_array[k].patientObj.patient_uuid;
        this.allPatients_array[k].group_data_id = this.allPatients_array[k].patientObj.group_data_id;
        // if(this.allPatients_array[k].clinical_visits.visit_type == ""){
        //   this.allPatients_array[k].task =  "Others";
        // }else{
        // this.allPatients_array[k].task =  this.allPatients_array[k].clinical_visits.visit_type;
        // }
       
        if(this.allPatients_array[k].clinical_visits.visit_type == 1){
          this.allPatients_array[k].task = "PHC";
         }else if(this.allPatients_array[k].clinical_visits.visit_type == 2){
          this.allPatients_array[k].task = "Taluk Hospital";
         }else if(this.allPatients_array[k].clinical_visits.visit_type == 3){
          this.allPatients_array[k].task = "District Hospital";
         }else if(this.allPatients_array[k].clinical_visits.visit_type == 4){
            this.allPatients_array[k].task =  "Others";
          }else{
            this.allPatients_array[k].task =  this.allPatients_array[k].clinical_visits.visit_type;
            }
        this.allPatients_array[k].due_date =  new Date(this.allPatients_array[k].clinical_visits.followup_date);
      
        let demo1= (this.allPatients_array[k].patientObj);
      
        let demo2 = JSON.parse(demo1.demographic_info);
   
          const birthDate = new Date(demo2.dob);
          const today = new Date();
          let age = today.getFullYear() - new Date(demo2.dob).getFullYear();
          const m = today.getMonth() - new Date(demo2.dob).getMonth();
         
          if (m < 0 || (m === 0 && today.getDate() < new Date(demo2.dob).getDate())) {
            age--;
           
          }
        
          this.allPatients_array[k].age = age;
         
          if(demo2.gender == "1"){
          this.allPatients_array[k].gender = "M";
          }else if(demo2.gender == "2"){
            this.allPatients_array[k].gender = "F";
          }else{
          this.allPatients_array[k].gender = "O";
          }
          this.allPatients_array[k].mobile = demo2.phone;
        
        
          for(var j=0;j<this.group_data_array.length;j++){
           
            if(this.allPatients_array[k].group_data == this.group_data_array[j].group_data_id){
            
              this.allPatients_array[k].social_worker_id = this.group_data_array[j].social_worker_id;
             
            }
          }

         
          for(var n=0;n<this.psw_array.length;n++){
            if(this.allPatients_array[k].social_worker_id == this.psw_array[n].social_worker_id){
              this.allPatients_array[k].mobile = this.psw_array[n].first_name
            }
          }
            //newly addd - to remove duplicate records based on patient_uuid 
          this.allPatients_array = this.allPatients_array.reduce((accumalator, current) => {
          if(!accumalator.some(item => item.patientObj.patient_uuid === current.patientObj.patient_uuid)) {
            accumalator.push(current);
          }
          return accumalator;
        },[]);
         

      this.dataSource_dashboard1.data = this.allPatients_array;
      this.dataSource_dashboard1.paginator = this.paginator;
      
      
      
        }
  
  }

  applyFilter(filterValue: string) {
    this.dataSource_dashboard1.filter= filterValue.trim().toLowerCase();
  }

   onCancel(ev) { 
    // Reset the field
    ev.target.value = '';
  }


  logout(){
    this.router.navigate(['']);
   
  }
 
  home(){
    if(this.role == "psw"){
    this.router.navigate(['dashboard']);
    }else{
      this.router.navigate(['supervisor-dashboard']);
    }
  }

  patientDetails(m,n,o){
    sessionStorage.setItem("patient_uuid",n);
    if(this.role == "supervisor"){
    sessionStorage.setItem("psw_incharge",o);
    }
    this.router.navigate(['patient-details']);
  
  }
  
  add_patient(){
    this.router.navigate(['addpatient']);
  }
  
 
}

export interface PeriodicElement_dashboard1 {
  name: string;
  mobile:string;
  address:string;
  task:string;
  due_date:string;
  gender:string;
  age:number;
  patient_id:number;
  
}
const ELEMENT_DATA_dashboard1: PeriodicElement_dashboard1[] = [
  {name:'',mobile:'',address:'',task:'',due_date:'',gender:'',age:0,patient_id:0}
  
];