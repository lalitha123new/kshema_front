import { Component, OnInit,ViewChild } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {FormBuilder,FormControl,FormGroupDirective,NgForm, FormGroup, Validators} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import {Location} from '@angular/common';
import {  MatStepper} from '@angular/material/stepper';
import { Router } from '@angular/router';
import { PatientService } from 'src/app/services/patient.service';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { NetworkService, ConnectionStatus } from 'src/app/services/network.service';
import { OfflineManagerService } from 'src/app/services/offline-manager.service';
import { LoadingController } from '@ionic/angular';
import { ServerService } from 'src/app/services/server.service';

interface taluk_optons{
  value: string;
  viewValue: string;
}

export class MhdErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {

  displayedColumns_dashboard1: string[] = ['name','mobile','address','task','due_date'];
  displayedColumns_dashboard2: string[] = ['name','mobile','address','task','due_date'];
  displayedColumns_dashboard3: string[] = ['name','mobile','address','task','due_date'];
  
  dataSource_dashboard1 = new MatTableDataSource<PeriodicElement_dashboard1>(ELEMENT_DATA_dashboard1);
  dataSource_dashboard2 = new MatTableDataSource<PeriodicElement_dashboard2>(ELEMENT_DATA_dashboard2);
  dataSource_dashboard3 = new MatTableDataSource<PeriodicElement_dashboard3>(ELEMENT_DATA_dashboard3);
  dataSource_dashboard4 = new MatTableDataSource<PeriodicElement_dashboard4>(ELEMENT_DATA_dashboard4);
  
  @ViewChild('paginator1') paginator1: MatPaginator;
  @ViewChild('paginator2') paginator2: MatPaginator;
  @ViewChild('paginator3') paginator3: MatPaginator;
  @ViewChild('paginator4') paginator4: MatPaginator;

  user_name;
  //arrays for saving the data from query 
  data : any;
  data_res1 :any;
  data_res1a:any;
  data_res2 :any;
  data_res3_old :any;
  data_res3 :any;
  data_res3_active :any;
  data_res4 :any;
  data_res5 :any;
  data_res5a = [];
  data_res6 :any;
  data_res10 :any;
  data_uuid_today:any;
  data_uuid_today_benefit:any;
  data_uuid_upcoming:any;
  data_uuid_upcoming_benefit:any;

  today_final_array = [];
  upcoming_final_array = [];
  overdue_final_array = [];
  complete_final_array = [];
 
  age = 0;
  gender;
  total_patients = 0;
  sync_count =0;
  //button number and checkbox number
  buttonNumber: number = 1; 
  checkboxNumber : number = 1;
  checkModel1 = true;
  checkModel2 = true;

  
  constructor(private _formBuilder: FormBuilder,
    private _location: Location,
    private router: Router,
    private patientService: PatientService,
    private networkService : NetworkService,
    private offlineManager : OfflineManagerService,
    private loadingCtrl: LoadingController,
    private serverService: ServerService) { 

  }
 
  @ViewChild('stepper') stepper: MatStepper;
  sw_id1;
  sw_id;

  today_action= true;
  upcoming = false;
  overdue = false;
  incomplete = false;
  complete = false;
  

  date_today: Date;
  dateToday;
  days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
  day;

  today_visit_total;
  today_visit_completed = 0;
  today_visit_completed1 = 0;
  today_task_total = 0;
  today_task_completed = 0;
  today_task_completed1 = 0;


  upcoming_total =0;;
  upcoming_task = 0;
  upcoming_visit = 0;

  overdue_total = 0;
  overdue_visit = 0;
  overdue_task = 0;

  //arrays with patient demographic data and clinical or task data 
  filtered_today_visit = [];
  filtered_today_task = [];
  filtered_upcoming_visit = [];
  filtered_upcoming_task :any;
  final_upcoming_visit = [];
  filtered_overdue_visit = [];
  filtered_overdue_task= [];
  filtered_completed_task= [];


  //not used - date in the dd-mm-yyyy format for fetching todays,upcoming and overdue data from table 
  today = new Date();
  date = ("0" + this.today.getDate()).slice(-2);
  month = ("0" + (this.today.getMonth() + 1)).slice(-2);
  year = this.today.getFullYear();
  today_date = this.date + "-" + this.month + "-" + this.year;

  
  public notes_count: number;
  users_id;
  showSpinner = false;

  ngOnInit() {
  this.data_uuid_today = []; 
  this.data_uuid_upcoming= [];
  this.data_uuid_upcoming_benefit = [];
  //for displaying date and day in the first card(today as dd/mm/yyyy)
  this.date_today = new Date();  
  let date = ("0" + this.date_today.getDate()).slice(-2);
  let month = ("0" + (this.date_today.getMonth() + 1)).slice(-2);
  let year = this.date_today.getFullYear();
  this.dateToday = date + "/" + month + "/" + year;

  this.day = this.days[this.date_today.getDay()];
  
  var currentDate = new Date();
  

   
  }

  ionViewWillEnter() {
    this.showSpinner = true;
    this.user_name = sessionStorage.getItem("user_name");
   
    this.sw_id1 = sessionStorage.getItem("sw_id");
    this.sw_id = parseInt(this.sw_id1);
    this.users_id = sessionStorage.getItem("users_id");
   
    this.today_action = true;
    this.today_final_array = [];
    this.dataSource_dashboard1.data = [];
    this.upcoming_final_array = [];
    this.dataSource_dashboard2.data = [];
    this.overdue_final_array = [];
    this.dataSource_dashboard3.data = [];
    this.complete_final_array = [];
    this.dataSource_dashboard4.data = [];
    this.buttonNumber = 1; 
    
  
    this.today_visit_completed = 0; 
    this.today_task_completed = 0;
    this.overdue_total =0;
    this.overdue_visit = 0;
    this.overdue_task = 0;
    this.getPatients()
    this.getTodayVisit();
  

  }

  //get only active patients
  async getPatients(){
    let patients_array_first :any;
    let test = await this.patientService.fetchPatients().then(result1 => {
     
      patients_array_first=result1;

   });
      
    this.data_res1 = patients_array_first;
    this.data_res1a = patients_array_first;
  
    
   
  }

  //get today consultation and other counts for display in cards after page is loaded
  async getTodayVisit(){
   
    this.data_res3_old = [];
    this.data_res3 = [];
    this.data_res3_active = [];
    this.filtered_today_visit = [];
    let sort_array1 = [];


    let today_visit_array_first :any;
    let test = await this.patientService.todaysPatients1(this.today_date).then(result1 => {
     
      today_visit_array_first=result1;

   });
    
        this.showSpinner = false;
      if(today_visit_array_first[0].today_visit_data.length > 0){
        this.data_res3 = today_visit_array_first[0].today_visit_data;
      
      }
      let today_date = new Date();
      today_date.setHours(0,0,0,0);
  
      this.today_visit_total = today_visit_array_first[0].today_visit_data.length;
      this.today_task_total = today_visit_array_first[0].today_task;
      this.upcoming_visit =  today_visit_array_first[0].upcoming_visit;
      this.upcoming_task =  today_visit_array_first[0].upcoming_task;
      this.upcoming_total =   this.upcoming_visit +  this.upcoming_task;
      this.overdue_visit = today_visit_array_first[0].overdue_visit;
      this.overdue_task =  today_visit_array_first[0].overdue_task;
      this.overdue_total =  this.overdue_visit+ this.overdue_task ;
      this.overdue_visit = today_visit_array_first[0].overdue_visit;
      this.today_task_completed =   today_visit_array_first[0].task_completed;
      //for displaying the the progress bar value
      this.today_task_completed1 = (this.today_task_completed/this.today_task_total)*100;
      this.notes_count = today_visit_array_first[0].note_count;
      this.total_patients = today_visit_array_first[0].total_patients;
      this.sync_count =  today_visit_array_first[0].syncCount;
      
      for(var m=0;m<this.data_res3.length;m++){
    
        if(today_date > new Date(this.data_res3[m].followup_date)){
    
        }else if(today_date < new Date(this.data_res3[m].followup_date)){
    
        }else{
         
          this.data_res3[m].followup_date1 = new Date(this.data_res3[m].followup_date);
         
          
        }
      }
      let resultArray1 :any;
      //all patients with demographic data only
      resultArray1 = this.data_res1;
     
      //filter all patients array to get the demographic details of patients ids in the today clinical data array
    for(var arr in resultArray1){
      for(var filter in this.data_res3){
    if(this.data_res3[filter].followup_date1){
       
          if(resultArray1[arr].patient_uuid == this.data_res3[filter].patient_uuid){
            this.filtered_today_visit.push(resultArray1[arr]);
            this.data_res3[filter].patient_id = resultArray1[arr].patient_id;
            this.data_res3[filter].name = resultArray1[arr].name;
            this.data_res3[filter].demographic_info = resultArray1[arr].demographic_info;
        
            }
          }
          }
      
    }
    
    //display the today visit array with demographic details from all patients array
    for(var k = 0; k<this.data_res3.length;k++){
      if(this.data_res3[filter].followup_date1){
    if(this.data_res3[k].name){

      this.data_res3[k].name = this.data_res3[k].name;
      this.data_res3[k].task =  this.data_res3[k].visit_type;
     
      this.data_res3[k].due_date =  this.data_res3[k].followup_date1;
      let demo1= (JSON.parse(this.data_res3[k].demographic_info));
       const birthDate = new Date(demo1.dob);
       const today = new Date();
      let age = today.getFullYear() - new Date(demo1.dob).getFullYear();
      const m = today.getMonth() - new Date(demo1.dob).getMonth();
     
      if (m < 0 || (m === 0 && today.getDate() < new Date(demo1.dob).getDate())) {
        age--;
       
      }
      this.data_res3[k].age = age;
  
      if(demo1.gender == 1){
      this.data_res3[k].gender = "M";
      }else if(demo1.gender == 2){
        this.data_res3[k].gender = "F";
      }else{
      this.data_res3[k].gender = "O";
      }
      this.data_res3[k].mobile = demo1.phone;
      this.data_res3[k].address = demo1.address1;
      this.today_final_array.push(this.data_res3[k]);
   
      this.dataSource_dashboard1.data = this.today_final_array;
      this.dataSource_dashboard1.paginator = this.paginator1;
     
      
    }
  }
}
      this.getTodayTask();
  }

  
  async getUpdatedSyncCount(){
   
    this.sync_count = 0;


    let today_visit_array_first :any;
    let test = await this.patientService.todaysPatients1(this.today_date).then(result1 => {
     
      today_visit_array_first=result1;

   });
    
      this.showSpinner = false;
      this.sync_count =  today_visit_array_first[0].syncCount;
  }

  toggleButton(x){
    this.buttonNumber = x;
    this.displayFunction(this.buttonNumber);
  }

  visitClicked($event:MatCheckboxChange){
   
    if ($event.checked == true) {
      this.checkModel1 =  true;
      this.displayFunction(this.buttonNumber);
    }else{
      
      this.checkModel1 = false;
     
      if(this.checkModel2){
      this.today_final_array = [];
      this.dataSource_dashboard1.data = [];
       this.getTodayTask();
        this.upcoming_final_array = [];
        this.dataSource_dashboard2.data = [];
        this.getUpcomingTask();
        this.overdue_final_array = [];
        this.dataSource_dashboard3.data = [];
       this.getOverdueTask();
       this.complete_final_array = [];
       this.dataSource_dashboard4.data = [];
       this.getCompletedTask();

        }else{
          this.today_final_array = [];
          this.dataSource_dashboard1.data = [];
          this.upcoming_final_array = [];
          this.dataSource_dashboard2.data = [];
          this.overdue_final_array = [];
          this.dataSource_dashboard3.data = [];
          this.complete_final_array = [];
          this.dataSource_dashboard4.data = [];
        }
      
    }

  }

  taskClicked($event:MatCheckboxChange){
   
    if ($event.checked == true) {
   
      this.checkModel2 =  true;
      this.displayFunction(this.buttonNumber);
    }else{
     
      this.checkModel2 = false;
      if(this.checkModel1){
        this.today_final_array = [];
        this.dataSource_dashboard1.data = [];
       this.getTodayVisitOld();
        this.upcoming_final_array = [];
        this.dataSource_dashboard2.data = [];
        this.getUpcomingVisit();
       this.overdue_final_array = [];
       this.dataSource_dashboard3.data = [];
        this.getOverdueVisit();
        this.complete_final_array = [];
        this.dataSource_dashboard4.data = [];
        this.getCompletedTask();
      }else{
        this.today_final_array = [];
        this.dataSource_dashboard1.data = [];
        this.upcoming_final_array = [];
        this.dataSource_dashboard2.data = [];
        this.overdue_final_array = [];
        this.dataSource_dashboard3.data = [];
        this.complete_final_array = [];
        this.dataSource_dashboard4.data = [];
      }
     
    }

  }

  displayFunction(x){
    if(x ==1){
      this.dataSource_dashboard2.data = [];
      this.dataSource_dashboard3.data = [];
      if(this.checkModel1 && !this.checkModel2){
        this.today_final_array = [];
        this.dataSource_dashboard1.data = [];
        this.getTodayVisitOld();
        this.upcoming = false;
        this.overdue = true;
        this.complete = false;
        this.incomplete = false;
        this.today_action = true;
      }
       else if(!this.checkModel1 && this.checkModel2){
        this.today_final_array = [];
        this.dataSource_dashboard1.data = [];
        this.getTodayTask();
        this.upcoming = false;
        this.overdue = false;
        this.complete = false;
        this.incomplete = false;
        this.today_action = true;
       
      }
      else if(this.checkModel1  && this.checkModel2){
      
        this.today_final_array = [];
        this.dataSource_dashboard1.data = [];
        this.getTodayVisitOld();
        this.getTodayTask();
        this.upcoming = false;
        this.overdue = false;
        this.complete = false;
        this.incomplete = false;
        this.today_action = true;
       
       
      }else{
        this.upcoming = false;
        this.overdue = false;
        this.today_action =  false;
        this.incomplete = false;
        this.complete = false;
      }
     
    }else if(x == 2){
      this.upcoming = false;
      this.dataSource_dashboard1.data = [];
      this.dataSource_dashboard3.data = [];
      if(this.checkModel1 && !this.checkModel2){
        this.upcoming_final_array = [];
        this.dataSource_dashboard2.data = [];
        this.getUpcomingVisit();
        this.today_action =  false;
        this.overdue = false;
        this.incomplete = false;
        this.complete = false;
        this.upcoming = true;
       
      }
       else if(!this.checkModel1 && this.checkModel2){
        this.upcoming_final_array = [];
        this.dataSource_dashboard2.data = [];
        this.getUpcomingTask();
        this.today_action =  false;
        this.overdue = false;
        this.complete = false;
        this.incomplete = false;
        this.upcoming = true;
      
      }

      else if(this.checkModel1 && this.checkModel2){

        this.upcoming_final_array = [];
        this.dataSource_dashboard2.data = [];
        this.getUpcomingVisit();
        this.getUpcomingTask();
        this.today_action =  false;
        this.overdue = false;
        this.complete = false;
        this.incomplete = false;
        this.upcoming = true;
       
      }else{
       
        this.today_action =  false;
        this.overdue = false;
        this.upcoming = false;
        this.complete = false;
        this.incomplete = false;
      }
    }else if(x ==3){
      this.dataSource_dashboard1.data = [];
      this.dataSource_dashboard2.data = [];
      this.dataSource_dashboard4.data = [];
      if(this.checkModel1 && !this.checkModel2){
        this.overdue_final_array = [];
        this.dataSource_dashboard3.data = [];
        this.getOverdueVisit();
        this.today_action =  false;
        this.complete = false;
        this.incomplete = false;
        this.upcoming = false;
        this.overdue = true;
       
        
      }else if(!this.checkModel1 && this.checkModel2){
        this.overdue_final_array = [];
        this.dataSource_dashboard3.data = [];
        this.getOverdueTask();
        this.today_action =  false;
        this.complete = false;
        this.incomplete = false;
        this.upcoming = false;
        this.overdue = true;
        
      } else if(this.checkModel1 && this.checkModel2){
       
        this.overdue_final_array = [];
        this.dataSource_dashboard3.data = [];
        this.getOverdueVisit();
        this.getOverdueTask();
        this.today_action =  false;
        this.complete = false;
        this.incomplete = false;
        this.upcoming = false;
        this.overdue = true;
      }else{
      
        this.today_action =  false;
        this.overdue = false;
        this.upcoming = false;
        this.complete = false;
        this.incomplete = false;
      }
     
    }else if(x ==4){
      if(this.checkModel1 && !this.checkModel2){
         this.today_action =  false;
         this.upcoming = false;
         this.overdue = false;
         this.incomplete = false;
         this.complete = true;
         
       }else if(!this.checkModel1 && this.checkModel2){
         this.complete_final_array = [];
         this.getCompletedTask();
         this.today_action =  false;
         this.incomplete = false;
         this.upcoming = false;
         this.overdue = false;
         this.complete = true;
         
       }else if(this.checkModel1 && this.checkModel2){
        this.complete_final_array = [];
        this.getCompletedTask();
         this.today_action =  false;
         this.incomplete = false;
         this.upcoming = false;
         this.overdue = false;
         this.complete = true;
       }else{
        
         this.today_action =  false;
         this.overdue = false;
         this.upcoming = false;
         this.complete = false;
         this.incomplete = false;
       }
    }else if(x ==5){
      
      this.today_action =  false;
      this.upcoming = false;
      this.overdue = false;
      this.complete = false;
      this.incomplete = true;
      
    }else if(x == 6){
      this.today_action =  true;
      this.upcoming = false;
      this.overdue = false;
      this.complete = false;
      this.incomplete = false;
      this.checkModel2 = true;
      this.checkModel1 = true;
      this.router.navigate(['all-patients']);
    }
  }

  //get today consultation - active patients only based on button click
  getTodayVisitOld(){
    this.showSpinner = true;
   
  
    this.data_res3 = [];
   
    this.filtered_today_visit = [];
    let sort_array1 = [];

      this.patientService.todaysPatients(this.today_date).then((res) => {
      
        this.data_res3 = res;
      let resultArray1 :any;
      //all patients with demographic data only
      resultArray1 = this.data_res1;
    
      //filter all patients array to get the demographic details of patients ids in the today clinical data array
    for(var arr in resultArray1){
      for(var filter in this.data_res3){
          if(resultArray1[arr].patient_uuid == this.data_res3[filter].patient_uuid){
            this.filtered_today_visit.push(resultArray1[arr]);
            this.data_res3[filter].patient_id = resultArray1[arr].patient_id;
            this.data_res3[filter].name = resultArray1[arr].name;
            this.data_res3[filter].demographic_info = resultArray1[arr].demographic_info;
            
            }
      }
    }
    
    
    //display the today visit array with demographic details from all patients array
    for(var k = 0; k<this.data_res3.length;k++){
      
    if(this.data_res3[k].name){
      
      this.data_res3[k].name = this.data_res3[k].name;
      this.data_res3[k].task =  this.data_res3[k].visit_type;
     
      this.data_res3[k].due_date =  new Date(this.data_res3[k].followup_date);
      let demo1= (JSON.parse(this.data_res3[k].demographic_info));
       const birthDate = new Date(demo1.dob);
       const today = new Date();
      let age = today.getFullYear() - new Date(demo1.dob).getFullYear();
      const m = today.getMonth() - new Date(demo1.dob).getMonth();
     
      if (m < 0 || (m === 0 && today.getDate() < new Date(demo1.dob).getDate())) {
        age--;
       
      }
      this.data_res3[k].age = age;
  
      if(demo1.gender == 1){
      this.data_res3[k].gender = "M";
      }else if(demo1.gender == 2){
        this.data_res3[k].gender = "F";
      }else{
      this.data_res3[k].gender = "O";
      }
      this.data_res3[k].mobile = demo1.phone;
      this.data_res3[k].address = demo1.address1;
      this.today_final_array.push(this.data_res3[k]);
   
      this.dataSource_dashboard1.data = this.today_final_array;
      this.dataSource_dashboard1.paginator = this.paginator1;
     
    }
    }
   
    this.showSpinner = false;
    });
  }

//get today task data - active patients upon button click - only one recent date task/patient
  getTodayTask(){
    this.showSpinner = true;
    
    this.data_res4 = [];
    this.filtered_today_task = [];
    let sort_array1a = [];
    
    
  
      this.patientService.todaysPatientsTasks(this.today_date).then((res) => {
     
        
      this.data_res4 = res;
      let resultArray2 :any;
      resultArray2 = this.data_res1a;

      
      
    
    //for getting patient demographic infor from patient table based on patient uuid from clinical visit table for today
    for(var arr in resultArray2){
      for(var filter in this.data_res4){
          if(resultArray2[arr].patient_uuid == this.data_res4[filter].patient_uuid){
            this.filtered_today_task.push(resultArray2[arr]);
            this.data_res4[filter].patient_id = resultArray2[arr].patient_id;
            this.data_res4[filter].name = resultArray2[arr].name;
            this.data_res4[filter].demographic_info = resultArray2[arr].demographic_info;
            sort_array1a.push(this.data_res4[filter].patient_id);

            
            }
      }
    }

    //code for enhancemnet - display only one task per patient, display the number of other tasks per patient as number
    //get the number of tasks for each patient
   let count_arr :any;
   
     count_arr = this.data_res4.reduce(function(obj, v) {
      obj[v.patient_uuid] = (obj[v.patient_uuid] || 0) + 1;
      return obj;
    }, {})
    
    //count_arr shows number of tasks for each patient as object
    //getting only values from the object as array
    
  
     let new_array:any;
     //assigning the count array into another array
     new_array = Object.values(count_arr);
     for(var m = 0;m<new_array.length;m++){
       new_array[m] = new_array[m] - 1;
       this.data_res4[m].remaining_task_number = new_array[m]
     }
  
 //to remove duplicate records with patient_uuid
 var filterArray = this.data_res4.reduce((accumalator, current) => {
  if(!accumalator.some(item => item.patient_uuid === current.patient_uuid)) {
    accumalator.push(current);
  }
  return accumalator;
},[]);
this.data_res4 = filterArray;


    for(var k = 0; k<this.data_res4.length;k++){
      if(this.data_res4[k].name){
       
      this.data_res4[k].name = this.data_res4[k].name;
      this.data_res4[k].due_date = new Date(this.data_res4[k].task_due_date);
    
      if(this.data_res4[k].task_type < 20){
        this.data_res4[k].task = "Rehabilitation Measures";
      }else if(this.data_res4[k].task_type > 20 && this.data_res4[k].task_type < 36){
        this.data_res4[k].task = "Welfare Module";
      }else if(this.data_res4[k].task_type == 41){
        this.data_res4[k].task = "UDID Follow up";
      }else{
        this.data_res4[k].task = "Medicine Refill";
      }
      let demo1= (JSON.parse(this.data_res4[k].demographic_info));
     
       const birthDate = new Date(demo1.dob);
       const today = new Date();
      let age = today.getFullYear() - new Date(demo1.dob).getFullYear();
      const m = today.getMonth() - new Date(demo1.dob).getMonth();
     
      if (m < 0 || (m === 0 && today.getDate() < new Date(demo1.dob).getDate())) {
        age--;
       
      }
      this.data_res4[k].age = age;
  
      if(demo1.gender == 1){
      this.data_res4[k].gender = "M";
      }else if(demo1.gender == 2){
        this.data_res4[k].gender = "F";
      }else{
      this.data_res4[k].gender = "O";
      }
      this.data_res4[k].mobile = demo1.phone;
      this.data_res4[k].address = demo1.address1;
      this.data_res4[k].rem_no = new_array[k];
     
     
      this.today_final_array.push( this.data_res4[k]);
     
     
      this.dataSource_dashboard1.data = this.today_final_array;
      this.dataSource_dashboard1.paginator = this.paginator1;
      
     
    }

    }
    this.showSpinner = false;
    });

  }
 
  //get upcoming consultation -active patients data based on button click
  getUpcomingVisit(){
    this.showSpinner = true;
 
        let today = new Date();
        this.data_res2 = [];
        this.filtered_upcoming_visit = [];
        let sort_array2 = [];
       

        this.patientService.upcomingPatients(this.today_date).then((res30) => {
       
          this.data_res2 = res30;
        
          let resultArray :any;
        
          resultArray = this.data_res1;
          
  
        for(var arr in resultArray){
         
          for(var filter in this.data_res2){
           
              if(resultArray[arr].patient_uuid === this.data_res2[filter].patient_uuid){
                this.filtered_upcoming_visit.push(resultArray[arr]);
               
                this.data_res2[filter].patient_id = resultArray[arr].patient_id;
                this.data_res2[filter].name = resultArray[arr].name;
                this.data_res2[filter].demographic_info = resultArray[arr].demographic_info;
                sort_array2.push(this.data_res2[filter].patient_id);
                
                }
          }
        }
        
      
        for(var k = 0; k<this.data_res2.length;k++){
         if(this.data_res2[k].name){
          
          this.data_res2[k].name = this.data_res2[k].name;
          this.data_res2[k].due_date =  new Date(this.data_res2[k].followup_date);
          this.data_res2[k].task =  this.data_res2[k].visit_type;
         
          let demo1= (JSON.parse(this.data_res2[k].demographic_info));
           const birthDate = new Date(demo1.dob);
           const today = new Date();
          let age = today.getFullYear() - new Date(demo1.dob).getFullYear();
          const m = today.getMonth() - new Date(demo1.dob).getMonth();
         
          if (m < 0 || (m === 0 && today.getDate() < new Date(demo1.dob).getDate())) {
            age--;
           
          }
          this.data_res2[k].age = age;
      
          if(demo1.gender == 1){
          this.data_res2[k].gender = "M";
          }else if(demo1.gender == 2){
            this.data_res2[k].gender = "F";
          }else{
          this.data_res2[k].gender = "O";
         
          }
          this.data_res2[k].mobile = demo1.phone;
          this.data_res2[k].address = demo1.address1;
         
          this.upcoming_final_array.push(this.data_res2[k]);
          this.dataSource_dashboard2.data = this.upcoming_final_array;
          this.dataSource_dashboard2.paginator = this.paginator2;
         
        }
      }
      this. showSpinner = false;
       
        });
       
       
  }  

   //get upcoming consultation - active patients data based on button click - only one recent date task/patient
 getUpcomingTask(){
  this.showSpinner = true;
        this.data_res5 = [];
        this.filtered_upcoming_task = [];
        let sort_array2a = [];

        this.patientService.upcomingPatientsTasks(this.today_date).then((res40) => {
         

          //begin newly added code to display the recent date data
          let result:any;
          result = Object.values(res40.reduce((a, {tasks_id,tasks_uuid,patient_uuid,task_type,creation_date,task_due_date,task_details,status,update_date,origin_record_id,created_at}) => {

          if (a[patient_uuid]) {
          
            if (a[patient_uuid].task_due_date > task_due_date) a[patient_uuid] = {tasks_id,tasks_uuid,patient_uuid,task_type,creation_date,task_due_date,task_details,status,update_date,origin_record_id,created_at};
              } else a[patient_uuid] = {tasks_id,tasks_uuid,patient_uuid,task_type,creation_date,task_due_date,task_details,status,update_date,origin_record_id,created_at};
              
              return a;
            }, {}));

          this.data_res5  = result;
          //end


          let resultArray2 :any;
          resultArray2 = this.data_res1;
        
          //get patient demo from all patients data based on patient id and date from the tasks query data
        for(var arr in resultArray2){
          resultArray2[arr].followup_date = '';
          resultArray2[arr].due_date = '';
          for(var filter in this.data_res5){
              if(resultArray2[arr].patient_uuid == this.data_res5[filter].patient_uuid){
                this.filtered_upcoming_task.push(resultArray2[arr]);
                this.data_res5[filter].patient_id = resultArray2[arr].patient_id;
                this.data_res5[filter].name = resultArray2[arr].name;
                this.data_res5[filter].demographic_info = resultArray2[arr].demographic_info;
                sort_array2a.push(this.data_res5[filter].patient_id);
                
                }
          }
        }
      //code for enhancemnet - display only one task per patient, display the number of other tasks per patient as number
      //get the number of tasks for each patient
    let count_arr_up :any;
   
    count_arr_up = res40.reduce(function(obj, v) {
     obj[v.patient_uuid] = (obj[v.patient_uuid] || 0) + 1;
     return obj;
   }, {})
   
   //count_arr shows number of tasks for each patient as object
   //getting only values from the object as array
   
  
    let new_array_up:any;
    //assigning the count array into another array
    new_array_up = Object.values(count_arr_up);
   
    for(var m = 0;m<new_array_up.length;m++){
      new_array_up[m] = new_array_up[m] - 1;
      this.data_res5[m].remaining_task_number = new_array_up[m]
    }


    //to remove duplicate records with patient_uuid
    var filterArray_up = this.data_res5.reduce((accumalator, current) => {
    if(!accumalator.some(item => item.patient_uuid === current.patient_uuid)) {
      accumalator.push(current);
    }
    return accumalator;
    },[]);
    this.data_res5 = filterArray_up;

       
    for(var k = 0; k<this.data_res5.length;k++){
      if( this.data_res5[k].name){

      this.data_res5[k].name = this.data_res5[k].name;
    
     if(this.data_res5[k].task_type < 20){
      this.data_res5[k].task = "Rehabilitation Measures";
    }else if(this.data_res5[k].task_type > 20 && this.data_res5[k].task_type < 36){
      this.data_res5[k].task = "Welfare Module";
    }else if(this.data_res5[k].task_type == 41){
      this.data_res5[k].task = "UDID Follow up";
    }else{
      this.data_res5[k].task = "Medicine Refill";
    }
    
      this.data_res5[k].due_date =  new Date(this.data_res5[k].task_due_date); 
      let demo1= (JSON.parse(this.data_res5[k].demographic_info));
       const birthDate = new Date(demo1.dob);
       const today = new Date();
      let age = today.getFullYear() - new Date(demo1.dob).getFullYear();
      const m = today.getMonth() - new Date(demo1.dob).getMonth();
     
      if (m < 0 || (m === 0 && today.getDate() < new Date(demo1.dob).getDate())) {
        age--;
       
      }
      this.data_res5[k].age = age;
  
      if(demo1.gender == 1){
        this.data_res5[k].gender = "M";
      }else if(demo1.gender == 2){
        this.data_res5[k].gender = "F";
      }else{
      this.data_res5[k].gender = "O";
      }
      this.data_res5[k].mobile = demo1.phone;
      this.data_res5[k].address = demo1.address1;
      this.data_res5[k].rem_no = new_array_up[k];
      this.upcoming_final_array.push(this.data_res5[k]);
      this.dataSource_dashboard2.data = this.upcoming_final_array;
      this.dataSource_dashboard2.paginator = this.paginator2;
      
    }
  }
  this.showSpinner = false;
        });
       

 }

 //get overdue consultation - active patients data based on button click
 getOverdueVisit(){
  this.showSpinner = true;
        this.data_res5a = [];
        this.filtered_overdue_visit = [];
        let sort_array3 = [];

        this.patientService.overdueVisit(this.today_date).then((res6) => {
         
          this.data_res5a = res6;
          let resultArray_over_visit :any;
          resultArray_over_visit = this.data_res1;
      
        
        for(var arr in resultArray_over_visit){
          for(var filter in this.data_res5a){
              if(resultArray_over_visit[arr].patient_uuid == this.data_res5a[filter].patient_uuid){
                this.filtered_overdue_visit.push(resultArray_over_visit[arr]);
                this.data_res5a[filter].patient_id = resultArray_over_visit[arr].patient_id;
                this.data_res5a[filter].name = resultArray_over_visit[arr].name;
                this.data_res5a[filter].demographic_info = resultArray_over_visit[arr].demographic_info;
                
                sort_array3.push(this.data_res5a[filter].patient_id);
                }
          }
        }

    
        for(var k = 0; k<this.data_res5a.length;k++){
          if(this.data_res5a[k].name){
            
          this.data_res5a[k].name = this.data_res5a[k].name;
          this.data_res5a[k].task =  this.data_res5a[k].visit_type;
          this.data_res5a[k].due_date =  new Date(this.data_res5a[k].followup_date);
       
          let demo1= (JSON.parse(this.data_res5a[k].demographic_info));
           const birthDate = new Date(demo1.dob);
           const today = new Date();
          let age = today.getFullYear() - new Date(demo1.dob).getFullYear();
          const m = today.getMonth() - new Date(demo1.dob).getMonth();
         
          if (m < 0 || (m === 0 && today.getDate() < new Date(demo1.dob).getDate())) {
            age--;
           
          }
          this.data_res5a[k].age = age;
      
          if(demo1.gender == 1){
          this.data_res5a[k].gender = "M";
          }else if(demo1.gender == 2){
            this.data_res5a[k].gender = "F";
          }else{
          this.data_res5a[k].gender = "O";
         
          }
          this.data_res5a[k].mobile = demo1.phone;
          this.data_res5a[k].address = demo1.address1;
          this.overdue_final_array.push( this.data_res5a[k]);
          this.dataSource_dashboard3.data = this.overdue_final_array;
          this.dataSource_dashboard3.paginator = this.paginator3;
        }
        }
        this.showSpinner = false;
        });

  
 }

 //get overdue task - active patients data based on button click  - only one recent date task/patient
 getOverdueTask(){
  
        this.showSpinner = true;
        this.data_res6 = [];
        this.filtered_overdue_task = [];
        let sort_array3a = [];
        this.patientService.getOverTask(this.today_date).then((res7) => {
 
         //begin newly added code to display the recent date data
         let result1:any;
         
         
      
        result1 = Object.values(res7.reduce((a, {tasks_id,tasks_uuid,patient_uuid,task_type,creation_date,task_due_date,task_details,status,update_date,origin_record_id,created_at}) => {

        if (a[patient_uuid]) {
        
          if (a[patient_uuid].task_due_date > task_due_date) a[patient_uuid] = {tasks_id,tasks_uuid,patient_uuid,task_type,creation_date,task_due_date,task_details,status,update_date,origin_record_id,created_at};
            } else a[patient_uuid] = {tasks_id,tasks_uuid,patient_uuid,task_type,creation_date,task_due_date,task_details,status,update_date,origin_record_id,created_at};
            
            return a;
          }, {}));

 
          this.data_res6  = result1;
         //end of newly added code
       
        
        let resultArray2_over_task :any;
        resultArray2_over_task = this.data_res1;
      
        //get patient demo from all patients data based on patient id and date from the tasks query data
      for(var arr in resultArray2_over_task){
        resultArray2_over_task[arr].followup_date = '';
        resultArray2_over_task[arr].due_date = '';
        for(var filter in this.data_res6){
            if(resultArray2_over_task[arr].patient_uuid == this.data_res6[filter].patient_uuid){
              this.filtered_overdue_task.push(resultArray2_over_task[arr]);
              this.data_res6[filter].patient_id = resultArray2_over_task[arr].patient_id;
              this.data_res6[filter].name = resultArray2_over_task[arr].name;
              this.data_res6[filter].demographic_info = resultArray2_over_task[arr].demographic_info;
              sort_array3a.push(this.data_res6[filter].patient_id);
              }
           
        }
      }
      //code for enhancemnet - display only one task per patient, display the number of other tasks per patient as number
      //get the number of tasks for each patient
    let count_arr_over :any;
   
    count_arr_over = res7.reduce(function(obj, v) {
     obj[v.patient_uuid] = (obj[v.patient_uuid] || 0) + 1;
     return obj;
     
   }, {})
   
   //count_arr shows number of tasks for each patient as object
   //getting only values from the object as array
  
    let new_array_over:any;
    //assigning the count array into another array
    new_array_over = Object.values(count_arr_over);

    for(var m = 0;m<new_array_over.length;m++){
    
      new_array_over[m] = new_array_over[m] - 1;
      this.data_res6[m].remaining_task_number = new_array_over[m]
    }


      //to remove duplicate records with patient_uuid
      var filterArray_over = this.data_res6.reduce((accumalator, current) => {
      if(!accumalator.some(item => item.patient_uuid === current.patient_uuid)) {
        accumalator.push(current);
      }
      return accumalator;
      },[]);
      this.data_res6 = filterArray_over;
      
  for(var k = 0; k<this.data_res6.length;k++){
    
   if(this.data_res6[k].name){
    
    this.data_res6[k].name = this.data_res6[k].name;
    this.data_res6[k].due_date = new Date(this.data_res6[k].task_due_date);
 
    if(this.data_res6[k].task_type < 20){
      this.data_res6[k].task = "Rehabilitation Measures";
     
    }else if(this.data_res6[k].task_type > 20 && this.data_res6[k].task_type < 36){
    
      this.data_res6[k].task = "Welfare Module";
     
    }else if(this.data_res6[k].task_type == 41){
      this.data_res6[k].task = "UDID Follow up";
    }else{
      this.data_res6[k].task = "Medicine Refill";
    }
  
    let demo1= (JSON.parse(this.data_res6[k].demographic_info));
     const birthDate = new Date(demo1.dob);
     const today = new Date();
    let age = today.getFullYear() - new Date(demo1.dob).getFullYear();
    const m = today.getMonth() - new Date(demo1.dob).getMonth();
   
    if (m < 0 || (m === 0 && today.getDate() < new Date(demo1.dob).getDate())) {
      age--;
     
    }
    this.data_res6[k].age = age;

    if(demo1.gender == 1){
    this.data_res6[k].gender = "M";
    }else if(demo1.gender == 2){
      this.data_res6[k].gender = "F";
    }else{
    this.data_res6[k].gender = "O";
    }
    this.data_res6[k].mobile = demo1.phone;
    this.data_res6[k].address = demo1.address1;
    this.data_res6[k].rem_no = new_array_over[k];
  
    this.overdue_final_array.push( this.data_res6[k]);
    this.dataSource_dashboard3.data = this.overdue_final_array;
    this.dataSource_dashboard3.paginator = this.paginator3;
   
  
  }
}
this.showSpinner = false;
})

}

//get completed task - active patients data based on button click  - only one recent date task/patient
getCompletedTask(){
  this.showSpinner = true;
  this.data_res10 = [];
  this.filtered_completed_task = [];
  let sort_array4a = [];
  this.patientService.getCompletedTask(this.today_date).then((res11) => {

 
  //begin newly added code to display the recent date data
  let result2:any;
  result2 = Object.values(res11.reduce((a, {tasks_id,tasks_uuid,patient_uuid,task_type,creation_date,task_due_date,task_details,status,update_date,origin_record_id,created_at}) => {

  if (a[patient_uuid]) {
  
    if (a[patient_uuid].task_due_date > task_due_date) a[patient_uuid] = {tasks_id,tasks_uuid,patient_uuid,task_type,creation_date,task_due_date,task_details,status,update_date,origin_record_id,created_at};
      } else a[patient_uuid] = {tasks_id,tasks_uuid,patient_uuid,task_type,creation_date,task_due_date,task_details,status,update_date,origin_record_id,created_at};
      
      return a;
    }, {}));

  this.data_res10  = result2;
  //end


  let resultArray2_complete_task :any;
  resultArray2_complete_task = this.data_res1;

  //get patient demo from all patients data based on patient id and date from the tasks query data
for(var arr in resultArray2_complete_task){
  
  for(var filter in this.data_res10){
      if(resultArray2_complete_task[arr].patient_uuid == this.data_res10[filter].patient_uuid){
        this.filtered_completed_task.push(resultArray2_complete_task[arr]);
        this.data_res10[filter].patient_id = resultArray2_complete_task[arr].patient_id;
        this.data_res10[filter].name = resultArray2_complete_task[arr].name;
        this.data_res10[filter].demographic_info = resultArray2_complete_task[arr].demographic_info;
        sort_array4a.push(this.data_res10[filter].patient_id);
        
        }
  }
}
//code for enhancemnet - display only one task per patient, display the number of other tasks per patient as number
//get the number of tasks for each patient
let count_arr_comp :any;

count_arr_comp = res11.reduce(function(obj, v) {
obj[v.patient_uuid] = (obj[v.patient_uuid] || 0) + 1;
return obj;
}, {})

//count_arr shows number of tasks for each patient as object
//getting only values from the object as array


let new_array_comp:any;
//assigning the count array into another array
new_array_comp = Object.values(count_arr_comp);

for(var m = 0;m<new_array_comp.length;m++){
  new_array_comp[m] = new_array_comp[m] - 1;
this.data_res10[m].remaining_task_number = new_array_comp[m]
}


//to remove duplicate records with patient_uuid
var filterArray_comp = this.data_res10.reduce((accumalator, current) => {
if(!accumalator.some(item => item.patient_uuid === current.patient_uuid)) {
accumalator.push(current);
}
return accumalator;
},[]);
this.data_res10 = filterArray_comp;
for(var k = 0; k<this.data_res10.length;k++){
  if(this.data_res10[k].name){
    
this.data_res10[k].name = this.data_res10[k].name;

this.data_res10[k].due_date = new Date(this.data_res10[k].task_due_date);

if(this.data_res10[k].task_type < 20){
  this.data_res10[k].task = "Rehabilitation Measures";
}else if(this.data_res10[k].task_type > 20 && this.data_res10[k].task_type < 36){
  this.data_res10[k].task = "Welfare Module";
}else if(this.data_res10[k].task_type == 41){
  this.data_res10[k].task = "UDID Follow up";
}else{
  this.data_res10[k].task = "Medicine Refill";
}

let demo1= (JSON.parse(this.data_res10[k].demographic_info));

const birthDate = new Date(demo1.dob);
const today = new Date();
let age = today.getFullYear() - new Date(demo1.dob).getFullYear();
const m = today.getMonth() - new Date(demo1.dob).getMonth();

if (m < 0 || (m === 0 && today.getDate() < new Date(demo1.dob).getDate())) {
age--;

}
this.data_res10[k].age = age;

if(demo1.gender == 1){
this.data_res10[k].gender = "M";
}else if(demo1.gender == 2){
this.data_res10[k].gender = "F";
}else{
this.data_res10[k].gender = "O";
}

this.data_res10[k].mobile = demo1.phone;
this.data_res10[k].address = demo1.address1;
this.data_res10[k].rem_no = new_array_comp[k];

this.complete_final_array.push( this.data_res10[k]);

this.dataSource_dashboard4.data = this.complete_final_array;
this.dataSource_dashboard4.paginator = this.paginator4;
//}
  }
}
this.showSpinner = false;
})

}


//filter the tables
  applyFilter(filterValue: string) {
    if(this.today_action){
    this.dataSource_dashboard1.filter= filterValue.trim().toLowerCase();
    
  }else if(this.upcoming){
    this.dataSource_dashboard2.filter= filterValue.trim().toLowerCase();
  }else if(this.overdue){
    this.dataSource_dashboard3.filter= filterValue.trim().toLowerCase();
  }
  }

//remove filter
onCancel(ev) { 
// Reset the field
ev.target.value = '';
}
 
add_patient(){
  this.router.navigate(['addpatient']);
}

logout(){
  this.router.navigate(['']);
 
 
}

patientDetails(m,n){
 
 this.today_action =  false;
 this.upcoming = false;
 this.overdue = false;
 this.complete = false;
 this.incomplete = false;
 this.checkModel2 = true;
 this.checkModel1 = true;
 sessionStorage.setItem("patient_uuid",n);
 this.router.navigate(['patient-details']);
 



}



//to redirect to the notes page
displayNotes(){
  this.router.navigate(['notes']);
}

//sync data from storage table in device to the server db
sync(){

   //this.offlineManager.checkForEvents().subscribe();
   this.networkService.onNetworkChange().subscribe((status: ConnectionStatus) => {
    if (status == ConnectionStatus.Online) {
      //when the app initializes and if its online, sync data if exists in the request(storage) table
      this.offlineManager.checkForEvents().subscribe();
    }else{
      alert("No network");
    }
  });

}


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
  



taluk: taluk_optons[] = [
  {value: '1', viewValue: 'Basavakalyana'},
  {value: '2', viewValue: 'Bidar'},
  {value: '3', viewValue: 'Kolar'}
];

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
  rem_no:number;
  
}
export interface PeriodicElement_dashboard2 {
  name: string;
  mobile:string;
  address:string;
  task:string;
  due_date:string;
  gender:string;
  age:number;
  patient_id:number;
  rem_no:number;
  
}
export interface PeriodicElement_dashboard3 {
  name: string;
  mobile:string;
  address:string;
  task:string;
  due_date:string;
  gender:string;
  age:number;
  patient_id:number;
  rem_no:number;
  
}
export interface PeriodicElement_dashboard4 {
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
  {name:'',mobile:'',address:'',task:'',due_date:'',gender:'',age:0,patient_id:0,rem_no:0}
  
];
const ELEMENT_DATA_dashboard2: PeriodicElement_dashboard2[] = [
  {name:'',mobile:'',address:'',task:'',due_date:'',gender:'',age:0,patient_id:0,rem_no:0}
  
];

const ELEMENT_DATA_dashboard3: PeriodicElement_dashboard3[] = [
  {name:'',mobile:'',address:'',task:'',due_date:'',gender:'',age:0,patient_id:0,rem_no:0}
  
];
const ELEMENT_DATA_dashboard4: PeriodicElement_dashboard4[] = [
  {name:'',mobile:'',address:'',task:'',due_date:'',gender:'',age:0,patient_id:0}
  
];



  
