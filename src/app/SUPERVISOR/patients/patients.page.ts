import { Component, OnInit,ViewChild } from '@angular/core';
import {MatPaginator, PageEvent} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {FormBuilder,FormControl,FormGroupDirective,NgForm, FormGroup, Validators} from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ServerService } from 'src/app/services/server.service';
import {Location} from '@angular/common';
import { DatePipe } from '@angular/common'

@Component({
  selector: 'app-patients',
  templateUrl: './patients.page.html',
  styleUrls: ['./patients.page.scss'],
})
export class PatientsPage implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;

  displayedColumns_dashboard: string[] = ['name','mobile','address','task','due_date','gender','age','patient_id'];
  displayedColumns_dashboard1: string[] = ['name',  'sw', 'task','due_date'];
  
  dataSource_dashboard1 = new MatTableDataSource<PeriodicElement_dashboard1>(ELEMENT_DATA_dashboard1);

  constructor(private _formBuilder: FormBuilder,private _location: Location,
    private router: Router, private serverService: ServerService,private datePipe: DatePipe) { }

    allPatients_array:any;
    super_id1;
    super_id;
    group_data_id1;
    group_data_id;
    user_name;
    psw_array:any;
    group_data_array:any;
   
    

  ngOnInit() {
    
  }


  ionViewWillEnter() {
   
    this.user_name = sessionStorage.getItem("user_name");
    this.allPatients_array = []; 
    this.super_id1 = sessionStorage.getItem("supervisor_id");
    this.super_id = parseInt(this.super_id1);
    this.group_data_id1 = sessionStorage.getItem("group_data_id");
    this.group_data_id = parseInt(this.group_data_id1);
    
    this.getGroupData(this.super_id);
    this.getAllPSWs();
    this.getPatients();

   
  }

  async getGroupData(supervisor_id){

    let group_array_first :any;
    let test = await this.serverService.getGroupData(supervisor_id).toPromise().then(result1 => {
     
      group_array_first=result1;

   });
   this.group_data_array = group_array_first;
   
  }
  //to get all psws
  async getAllPSWs(){
    let psw_array_first :any;
    let test = await this.serverService.getPsws().toPromise().then(result2 => {
    
      psw_array_first=result2;

  });
  this.psw_array = psw_array_first;
      
    
  }

  
  //to get all patients data
  async getPatients(){
    let patients_array_first :any;
    let test = await this.serverService.getPatitents(this.group_data_id).toPromise().then(result1 => {
     
      patients_array_first=result1;

   });
  
   this.allPatients_array = patients_array_first;
  
     
      for(var k = 0;k<this.allPatients_array.length;k++){
       
        this.allPatients_array[k].name = this.allPatients_array[k].patientObj.name;
        this.allPatients_array[k].patient_uuid = this.allPatients_array[k].patientObj.patient_uuid;
        this.allPatients_array[k].group_data_id = this.allPatients_array[k].patientObj.group_data_id;
        this.allPatients_array[k].task =  this.allPatients_array[k].clinical_visits.visit_type;
        this.allPatients_array[k].due_date1 =  new Date(this.allPatients_array[k].clinical_visits.followup_date);
      
        let date = ("0" + this.allPatients_array[k].due_date1.getDate()).slice(-2);
        let month = ("0" + (this.allPatients_array[k].due_date1.getMonth() + 1)).slice(-2);
        let year =this.allPatients_array[k].due_date1.getFullYear();
        this.allPatients_array[k].due_date = date + "-" + month + "-" + year;
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
          this.allPatients_array[k].address = demo2.address1;
          for(var j=0;j<this.group_data_array.length;j++){
            if(demo1.group_data_id == this.group_data_array[j].group_data_id){
             
              this.allPatients_array[k].social_worker_id = this.group_data_array[j].social_worker_id;
            }
          }

         
          for(var n=0;n<this.psw_array.length;n++){
            if(this.allPatients_array[k].social_worker_id == this.psw_array[n].social_worker_id){
              this.allPatients_array[k].sw = this.psw_array[n].first_name
            }
          }
         

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
    this.router.navigate(['supervisor-dashboard']);
  }

  

  //redirect to patient page
  patientDetails(patient,group){
    sessionStorage.setItem("patient_uuid",patient)
    sessionStorage.setItem("group_id",group)
    this.router.navigate(['send-message']);

  }
  
}

export interface PeriodicElement_dashboard1 {
  name: string;
  mobile: number;
  sw: string;
  task: string;
  due_date:string;
  
}


const ELEMENT_DATA_dashboard1: PeriodicElement_dashboard1[] = [
  { name: '',mobile: 1234512345, sw:'', task:'',due_date:''},
  
];