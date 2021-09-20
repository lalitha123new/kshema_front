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
import { PatientService } from 'src/app/services/patient.service';
import { Patient } from 'src/app/patient.model';
import { Subscription } from 'rxjs';
import { ServerService } from 'src/app/services/server.service';
import { MatCheckboxChange } from '@angular/material/checkbox';



@Component({
  selector: 'app-supervisor-dashboard',
  templateUrl: './supervisor-dashboard.page.html',
  styleUrls: ['./supervisor-dashboard.page.scss'],
})
export class SupervisorDashboardPage implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  
  constructor(private router: Router,private serverService: ServerService) { }
  dashboard_clicked =  true;
  manage_social_worker =  false;
  super_id1;
  super_id;
  group_data_id1;
  group_data_id;
  taluk_array:any;
  group_data_array:any;
  psw_array:any;
  upcoming_tasks_array = [];
  upcoming_tasks_pat_array = [];
  overdue_tasks_array = [];
  overdue_tasks_pat_array = [];

  displayedColumns_dashboard1: string[] = ['name',  'sw', 'task','due_date'];
  
  dataSource_dashboard1 = new MatTableDataSource<PeriodicElement_dashboard1>(ELEMENT_DATA_dashboard1);
  dataSource_dashboard2 = new MatTableDataSource<PeriodicElement_dashboard2>(ELEMENT_DATA_dashboard2);
  dataSource_dashboard3 = new MatTableDataSource<PeriodicElement_dashboard3>(ELEMENT_DATA_dashboard3);
  dataSource_dashboard4 = new MatTableDataSource<PeriodicElement_dashboard4>(ELEMENT_DATA_dashboard4);

  isValue: number = 1; 
  isValueCheck : number = 1;
  checkModel1 = true;
  checkModel2 = false;
  
  showCompleted = 30;
  showCompletedTask = 5;
  today_action= true;
  upcoming = false;
  overdue = false;
  incomplete = false;
  complete = false;

  date_today: Date;
  dateToday;
  days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
  day;
  patientArray:any;
  total_patients = 0;
  public notes_count: number;

  today_visit_completed = 0;
  today_visit_completed1 = 0;
  today_visit_total = 0;
  today_task_total = 0;
  today_task_completed = 0;
  today_task_completed1 = 0;
  visit_number_array = [];
  task_number_array:any;
  
  overdue_total = 0;
  overdue_visit = 0;
  overdue_task = 0;
  sw_total = 0;

  today_final_array = [];
  upcoming_final_array = [];
  overdue_final_array = [];
  complete_final_array = [];
  buttonNumber: number = 1; 
  data_res3 :any;
  data_res4 = [];
  data_res2 :any;
  data_res5 :any;
  data_res5a :any;
  data_res6:any;
  data_res10 :any;
  upcoming_total =0;
  upcoming_task = 0;
  upcoming_visit = 0;
  rem_no:number;
  user_name;
  new_array1= [];
  group_data;
  group_data1;
  user_id;
 


  ngOnInit() {

    this.date_today = new Date();  
    let date = ("0" + this.date_today.getDate()).slice(-2);
    let month = ("0" + (this.date_today.getMonth() + 1)).slice(-2);
    let year = this.date_today.getFullYear();
    this.dateToday = date + "/" + month + "/" + year;
    this.day = this.days[this.date_today.getDay()];
    this.getAllPSWs();
  }
 

  ionViewWillEnter() {
   this.sw_total = 0;
   this.group_data_array = [];
    this.group_data = sessionStorage.getItem("group_data");
    this.group_data1 =  JSON.parse( this.group_data);
    this.today_visit_completed = 0;
    this.today_visit_completed1 = 0;
    this.today_visit_total = 0;
    this.today_task_total = 0;
    this.today_task_completed = 0;
    this.today_task_completed1 = 0;
    this.user_name = sessionStorage.getItem("user_name");
  
    this.super_id1 = sessionStorage.getItem("supervisor_id");
    this.super_id = parseInt(this.super_id1);
    
    this.group_data_id = sessionStorage.getItem('group_data_id');
    this.group_data_id = 0;
    this.user_id =  sessionStorage.getItem("users_id");
  
    this.getGroupData(this.super_id);
    this.getAllTaluks();
    this.getactivePatitents(this.group_data_id);
    this.getPatitents(this.group_data_id);
   

    this.today_final_array = [];
    this.dataSource_dashboard1.data = [];
    this.upcoming_final_array = [];
    this.dataSource_dashboard2.data = [];
    this.overdue_final_array = [];
    this.dataSource_dashboard3.data = [];
    this.complete_final_array = [];
    this.dataSource_dashboard4.data = [];
    this.buttonNumber = 1; 
    this.getTodayVisit();
  
    this.today_visit_completed = 0; 
    this.today_task_completed = 0;
    this.getTodayTaskNumber();
    this.getTodayCompletedTaskNumber();
    this.getUpcomingVisitNumber();
    this.getUpcomingTaskNumber();

    this.overdue_total =0;
    this.overdue_visit = 0;
    this.getOverVisitNumber();
    this.overdue_task = 0;
    this.getOverTaskNumber();
    this.getNotificationCount();
   
   
    
  }
  //to get all psws
 async getAllPSWs(){
  let psw_array_first :any;
  let test = await this.serverService.getPsws().toPromise().then(result1 => {
   
    psw_array_first=result1;

 });
 
  this.psw_array = psw_array_first;

 
}

 async getGroupData(supervisor_id){
  let group_array_first :any;
  let test = await this.serverService.getGroupData(supervisor_id).toPromise().then(result2 => {
   
    group_array_first=result2;

 });
  
   console.log(group_array_first)
    
     this.group_data_array = group_array_first;
     this.sw_total = this.group_data_array.filter(function(item){
      return item.social_worker_id != 0;
    }).length;
    // this.sw_total = this.group_data_array.length;
     
   
  }

  async getAllTaluks(){
    let taluk_array_first :any;
  let test = await this.serverService.getAlltalukas().toPromise().then(result3 => {
   
    taluk_array_first=result3;

 });
   
      
       this.taluk_array = taluk_array_first;
       
       
      
    
   }
  async getactivePatitents(group_data_id){
    let active_array_first :any;
  let test = await this.serverService.getActivePatitents(group_data_id).toPromise().then(result4 => {
   
    active_array_first=result4;

 });
    let all_patients:any;
    
      all_patients =  active_array_first;
      //this.total_patients = all_patients.length;
   
  }

  getPatitents(group_data_id){
    let all_patients:any;
    let all_patients1:any;
    this.new_array1 = [];
    this.serverService.getPatitents(group_data_id)
    .subscribe(
    data  => {
      
      all_patients =  data;
      
      for(var m=0;m<all_patients.length;m++){
        for(var n=0;n<this.group_data1.length;n++){
         if(all_patients[m].patientObj.group_data_id == this.group_data1[n]){
         
          all_patients[m].group_data = all_patients[m].patientObj.group_data_id;
          if(all_patients[m].group_data != null){
           
            this.new_array1.push(all_patients[m])
          }
          
        }
         }
       }
      this.total_patients = this.new_array1.length;
      
    });
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
     // this.dataSource_dashboard1.data = [];
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
       // this.dataSource_dashboard1.data = [];
        this.getTodayVisit();
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
       // this.dataSource_dashboard1.data = [];
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
      this.dataSource_dashboard4.data = [];
      if(this.checkModel1 && !this.checkModel2){
        this.today_final_array = [];
        //this.dataSource_dashboard1.data = [];
        this.getTodayVisit();
        this.upcoming = false;
        this.overdue = false;
        this.complete = false;
        this.incomplete = false;
        this.today_action = true;
      }
       else if(!this.checkModel1 && this.checkModel2){
        this.today_final_array = [];
       // this.dataSource_dashboard1.data = [];
        this.getTodayTask();
        this.upcoming = false;
        this.overdue = false;
        this.complete = false;
        this.incomplete = false;
        this.today_action = true;
       
      }
      else if(this.checkModel1  && this.checkModel2){
     
        this.today_final_array = [];
        //this.dataSource_dashboard1.data = [];
        this.getTodayVisit();
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
      this.dataSource_dashboard4.data = [];
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
      this.dataSource_dashboard1.data = [];
      this.dataSource_dashboard2.data = [];
      this.dataSource_dashboard3.data = [];
      if(this.checkModel1 && !this.checkModel2){
       
        //to be done
         this.complete_final_array = [];
         this.dataSource_dashboard4.data = [];
       // this.getCompletedTask();
        
         this.today_action =  false;
         this.upcoming = false;
         this.overdue = false;
         this.incomplete = false;
         this.complete = true;
         
       }else if(!this.checkModel1 && this.checkModel2){
         this.complete_final_array = [];
         this.dataSource_dashboard4.data = [];
         this.getCompletedTask();
         this.today_action =  false;
         this.incomplete = false;
         this.upcoming = false;
         this.overdue = false;
         this.complete = true;
         
       }else if(this.checkModel1 && this.checkModel2){
        this.complete_final_array = [];
         this.dataSource_dashboard4.data = [];
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
      this.checkModel2 = false;
      this.checkModel1 = true;
      this.router.navigate(['all-patients']);
    }
  }
  
  //get today's consultation data
  async getTodayVisit(){
    let today_visit_array_first :any;
    this.data_res3 = [];
  let test = await this.serverService.getTodayVisitsServerDb(this.group_data_id).toPromise().then(result5 => {
   
    today_visit_array_first=result5;

 });
    
    this.visit_number_array = [];
   
   
    
       this.patientArray = today_visit_array_first;
       
       //this.data_res3 = today_visit_array_first;
       for(var m=0;m<today_visit_array_first.length;m++){
        for(var n=0;n<this.group_data1.length;n++){
         if(today_visit_array_first[m].patientObj.group_data_id == this.group_data1[n]){
         
          today_visit_array_first[m].group_data =today_visit_array_first[m].patientObj.group_data_id;
          if(today_visit_array_first[m].group_data != null){
           
            this.data_res3.push(today_visit_array_first[m]);
          }
          
        }
         }
       }
       
       
      
       for(var k = 0;k<this.data_res3.length;k++){
       if(this.data_res3[k].patientObj.status != "inactive"){
          this.data_res3[k].name = this.data_res3[k].patientObj.name;
          this.data_res3[k].patient_uuid = this.data_res3[k].patientObj.patient_uuid;
          this.data_res3[k].task =  this.data_res3[k].clinical_visits.visit_type;
        
          this.data_res3[k].due_date1 =  new Date(this.data_res3[k].clinical_visits.followup_date);
        
          let date = ("0" + this.data_res3[k].due_date1.getDate()).slice(-2);
          let month = ("0" + (this.data_res3[k].due_date1.getMonth() + 1)).slice(-2);
          let year =this.data_res3[k].due_date1.getFullYear();
          this.data_res3[k].due_date = date + "-" + month + "-" + year;
         
          let demo = (this.data_res3[k].patientObj);
          let demo1= JSON.parse(demo.demographic_info);
         
          let taluk_id = parseInt(demo1.taluk_selected);
         if(this.taluk_array){
         for(var p=0;p<this.taluk_array.length;p++){
           if(taluk_id == this.taluk_array[p].taluka_master_id){
           
            this.data_res3[k].taluk_name = this.taluk_array[p].taluka_name;
           }
         }
        }else{
          this.data_res3[k].taluk_name = "Test taluk";
        }
       
          const birthDate = new Date(demo1.dob);
          const today = new Date();
          let age = today.getFullYear() - new Date(demo1.dob).getFullYear();
          const m = today.getMonth() - new Date(demo1.dob).getMonth();
         
          if (m < 0 || (m === 0 && today.getDate() < new Date(demo1.dob).getDate())) {
            age--;
           
          }
          this.data_res3[k].age = age;
          if(demo1.gender == "1"){
          this.data_res3[k].gender = "M";
          }else if(demo1.gender == "2"){
            this.data_res3[k].gender = "F";
          }else{
          this.data_res3[k].gender = "O";
          }
          this.data_res3[k].mobile = demo1.phone;
          this.data_res3[k].address = demo1.address1;

         if(this.group_data_array){
          for(var j=0;j<this.group_data_array.length;j++){
            if(demo.group_data_id == this.group_data_array[j].group_data_id){
             
              this.data_res3[k].social_worker_id = this.group_data_array[j].social_worker_id;
            }
          }
        }else{
          this.data_res3[k].social_worker_id = 10;
        }

        if(this.psw_array){
          for(var n=0;n<this.psw_array.length;n++){
            if(this.data_res3[k].social_worker_id == this.psw_array[n].social_worker_id){
              this.data_res3[k].sw = this.psw_array[n].first_name
            }
          }
        }else{
          this.data_res3[k].sw = "Social worker";
        }
         
          
          this.today_final_array.push(this.data_res3[k]);
          this.visit_number_array.push(this.data_res3[k])
          this.today_visit_total = this.visit_number_array.length;
         
          this.dataSource_dashboard1.data = this.today_final_array;
          this.dataSource_dashboard1.paginator = this.paginator;
        
        }
       }
      
    
  
  }
  
  //get today's task data - display only one task per patient and display the number of remaining tasks
  //upon button click
  getTodayTask(){
    let count_arr :any;
    this.data_res4 = [];
    let array2:any;
    this.serverService.getTodayTasksServerDb(this.group_data_id) .subscribe(
      data2  => {
       
        let res2 = [];
        this.patientArray = data2;
        //res2 = data2;
        array2 = data2;

        for(var m=0;m<array2.length;m++){
          for(var n=0;n<this.group_data1.length;n++){
           if(array2[m].patientObj.group_data_id == this.group_data1[n]){
           
            array2[m].patientObj.group_data =array2[m].patientObj.group_data_id;
            if( array2[m].patientObj.group_data != null){
             
              res2.push(array2[m]);
            }
            
          }
           }
         }

      for(var m=0;m<res2.length;m++){
    
        if(res2[m].tasks.status == "pending" || res2[m].tasks.status == "In Progress"){
     
          this.data_res4.push(res2[m]);
         
          
        }
      }
     
     
      //  this.today_visit_total = this.total_patients;
       
   
      
       // get array of total number of tasks per patient
       count_arr = this.data_res4.reduce(function(obj, v) {
      
        obj[v.patientObj.patient_uuid] = (obj[v.patientObj.patient_uuid] || 0) + 1;
       
        return obj;
      }, {})
     
      let new_array:any;
     //get the remaining task number per (after displaying only one record ) patient
     new_array = Object.values(count_arr);
     for(var m = 0;m<new_array.length;m++){
      
       new_array[m] = new_array[m] - 1;
       this.data_res4[m].remaining_task_number = new_array[m]
     }
     
         //to remove duplicate records based on patient_uuid
        var filterArray = this.data_res4.reduce((accumalator, current) => {
          if(!accumalator.some(item => item.patientObj.patient_uuid === current.patientObj.patient_uuid)) {
            accumalator.push(current);
          }
          return accumalator;
        },[]);

      this.data_res4 = filterArray;


       for(var k = 0;k<this.data_res4.length;k++){
         
        if(this.data_res4[k].patientObj.status != "inactive"){
        // if(this.data_res4[k].patientObj.group_data_id == this.group_data_id){
          this.data_res4[k].name = this.data_res4[k].patientObj.name;
          this.data_res4[k].patient_uuid = this.data_res4[k].patientObj.patient_uuid;
          this.data_res4[k].task =  this.data_res4[k].tasks.task_type;
        
          if(this.data_res4[k].task < 20){
            this.data_res4[k].task = "Rehab Measures";
          }else if(this.data_res4[k].task > 20 && this.data_res4[k].task < 36){
            this.data_res4[k].task = "Welfare Module";
          }else if(this.data_res4[k].task == 41){
            this.data_res4[k].task = "UDID Follow up";
          }else{
            this.data_res4[k].task = "Medicine Refill";
          }
          this.data_res4[k].due_date =  this.data_res4[k].tasks.task_due_date;
         
          let demo = (this.data_res4[k].patientObj);
          let demo1= JSON.parse(demo.demographic_info);
       
          const birthDate = new Date(demo1.dob);
          const today = new Date();
          let age = today.getFullYear() - new Date(demo1.dob).getFullYear();
          const m = today.getMonth() - new Date(demo1.dob).getMonth();
         
          if (m < 0 || (m === 0 && today.getDate() < new Date(demo1.dob).getDate())) {
            age--;
           
          }
          this.data_res4[k].age = age;
          if(demo1.gender == "1"){
          this.data_res4[k].gender = "M";
          }else if(demo1.gender == "2"){
            this.data_res4[k].gender = "F";
          }else{
          this.data_res4[k].gender = "O";
          }

          let taluk_id = parseInt(demo1.taluk_selected);
         
         for(var p=0;p<this.taluk_array.length;p++){
           if(taluk_id == this.taluk_array[p].taluka_master_id){
           
            this.data_res4[k].taluk_name = this.taluk_array[p].taluka_name;
           }
         }
          this.data_res4[k].sw = "Social worker test";
          this.data_res4[k].mobile = demo1.phone;
          this.data_res4[k].address = demo1.address1;
          this.data_res4[k].rem_no = new_array[k];
          for(var j=0;j<this.group_data_array.length;j++){
            if(demo.group_data_id == this.group_data_array[j].group_data_id){
             
              this.data_res4[k].social_worker_id = this.group_data_array[j].social_worker_id;
            }
          }

         
          for(var n=0;n<this.psw_array.length;n++){
            if(this.data_res4[k].social_worker_id == this.psw_array[n].social_worker_id){
              this.data_res4[k].sw = this.psw_array[n].first_name
            }
          }
        
          this.today_final_array.push(this.data_res4[k]);
          this.today_final_array = this.today_final_array.reverse();
          this.dataSource_dashboard1.data = this.today_final_array;
          this.dataSource_dashboard1.paginator = this.paginator;
           
        }
      //}
          
       }

      });
  }

  //get the today's tasks task number to display in the card when page is loaded
  getTodayTaskNumber(){
    let today_task_array = [];
    let overdue_task1 = [];
    let array2:any;
    //this.today_task_total = 0;
    this.serverService.getTodayTasksServerDb(this.group_data_id) .subscribe(
      data  => {
        //today_task_array = data;
        array2 = data;
        for(var m=0;m<array2.length;m++){
          for(var n=0;n<this.group_data1.length;n++){
           if(array2[m].patientObj.group_data_id == this.group_data1[n]){
           
            array2[m].patientObj.group_data =array2[m].patientObj.group_data_id;
            if( array2[m].patientObj.group_data != null){
             
              today_task_array.push(array2[m]);
            }
            
          }
           }
         }
        for(var m=0;m<today_task_array.length;m++){
         // if(today_task_array[m].patientObj.group_data_id == this.group_data_id){
            overdue_task1[m] = today_task_array[m];
        const count = overdue_task1.filter((obj) => obj.patientObj.status === 'active').length;
        
        this.today_task_total = count;
          //}
        }
    })
  }


  //get upcoming consultation data upon button click
  getUpcomingVisit(){
    this.data_res2 = [];
    let array1:any;
    this.serverService.getUpcomingVisitsServerDb(this.group_data_id) .subscribe(
      data3  => {
    
        //this.data_res2 = data3;
        array1 = data3;
        for(var m=0;m<array1.length;m++){
          for(var n=0;n<this.group_data1.length;n++){
           if(array1[m].patientObj.group_data_id == this.group_data1[n]){
           
            array1[m].group_data =array1[m].patientObj.group_data_id;
            if(array1[m].group_data != null){
             
              this.data_res2.push(array1[m]);
            }
            
          }
           }
         }

        for(var k=0;k<this.data_res2.length;k++){
          if(this.data_res2[k].patientObj.status != "inactive"){
          this.data_res2[k].name = this.data_res2[k].patientObj.name;
          this.data_res2[k].patient_uuid = this.data_res2[k].patientObj.patient_uuid;
          this.data_res2[k].task =  this.data_res2[k].clinical_visits.visit_type;
          this.data_res2[k].due_date1 =  new Date(this.data_res2[k].clinical_visits.followup_date);
          let date = ("0" + this.data_res2[k].due_date1.getDate()).slice(-2);
          let month = ("0" + (this.data_res2[k].due_date1.getMonth() + 1)).slice(-2);
          let year =this.data_res2[k].due_date1.getFullYear();
          this.data_res2[k].due_date = date + "-" + month + "-" + year;
         
          let demo = (this.data_res2[k].patientObj);
          let demo1= JSON.parse(demo.demographic_info);
       
          const birthDate = new Date(demo1.dob);
          const today = new Date();
          let age = today.getFullYear() - new Date(demo1.dob).getFullYear();
          const m = today.getMonth() - new Date(demo1.dob).getMonth();
         
          if (m < 0 || (m === 0 && today.getDate() < new Date(demo1.dob).getDate())) {
            age--;
           
          }
          this.data_res2[k].age = age;

          if(demo1.gender == "1"){
          this.data_res2[k].gender = "M";
          }else if(demo1.gender == "2"){
            this.data_res2[k].gender = "F";
          }else{
          this.data_res2[k].gender = "O";
          }

          let taluk_id = parseInt(demo1.taluk_selected);
         
          for(var p=0;p<this.taluk_array.length;p++){
            if(taluk_id == this.taluk_array[p].taluka_master_id){
            
             this.data_res2[k].taluk_name = this.taluk_array[p].taluka_name;
            }
          }
          this.data_res2[k].mobile = demo1.phone;
          this.data_res2[k].address = demo1.address1;
          this.data_res2[k].sw = "Social worker test";
          for(var j=0;j<this.group_data_array.length;j++){
            if(demo.group_data_id == this.group_data_array[j].group_data_id){
             
              this.data_res2[k].social_worker_id = this.group_data_array[j].social_worker_id;
            }
          }

         
          for(var n=0;n<this.psw_array.length;n++){
            if(this.data_res2[k].social_worker_id == this.psw_array[n].social_worker_id){
              this.data_res2[k].sw = this.psw_array[n].first_name
            }
          }
          this.upcoming_final_array.push( this.data_res2[k]);
          this.dataSource_dashboard2.data = this.upcoming_final_array;
          this.dataSource_dashboard2.paginator = this.paginator;
        
          }
          }
      })

  }

  //get upcoming consultation number to display in the card when page is loaded
  getUpcomingVisitNumber(){
    let upcoming_visit:any;
    this.serverService.getUpcomingVisitsServerDb(this.group_data_id) .subscribe(
      data3  => {
        upcoming_visit = data3;
     
      const count = upcoming_visit.filter((obj) => obj.patientObj.status === 'active').length;
        
        this.upcoming_visit = count;
    
  
    })
  }

  //get upcoming task data upon button click
  getUpcomingTask(){
    this.data_res5 = [];
    let upcoming_array= [];
     this.upcoming_tasks_array = [];
     this.upcoming_tasks_pat_array = [];
     let array2:any;
    this.serverService.getUpcomingTasksServerDb(this.group_data_id) .subscribe(
      data4  => {
       
       // this.data_res5 = data4;
        //upcoming_array = data4;
        array2 = data4;
        for(var m=0;m<array2.length;m++){
          for(var n=0;n<this.group_data1.length;n++){
           if(array2[m].patientObj.group_data_id == this.group_data1[n]){
           
            array2[m].patientObj.group_data =array2[m].patientObj.group_data_id;
            if( array2[m].patientObj.group_data != null){
             
              upcoming_array.push(array2[m]);
            }
            
          }
           }
         }

        
        for(var m=0;m<upcoming_array.length;m++){
         
          this.upcoming_tasks_array.push(upcoming_array[m].tasks);
          this.upcoming_tasks_pat_array.push(upcoming_array[m].patientObj)
          
        }
        
          //begin newly added code to display the recent date data
          let result:any;
          result = Object.values( this.upcoming_tasks_array.reduce((a, {tasks_id,tasks_uuid,patient_uuid,task_type,creation_date,task_due_date,task_details,status,update_date,origin_record_id,createdAt}) => {

          if (a[patient_uuid]) {
          
            if (a[patient_uuid].task_due_date > task_due_date) a[patient_uuid] = {tasks_id,tasks_uuid,patient_uuid,task_type,creation_date,task_due_date,task_details,status,update_date,origin_record_id,createdAt};
              } else a[patient_uuid] = {tasks_id,tasks_uuid,patient_uuid,task_type,creation_date,task_due_date,task_details,status,update_date,origin_record_id,createdAt};
              
              return a;
            }, {}));

          this.data_res5  = result;
       
         //get patient demo from all patients data based on patient id and date from the tasks query data
         for(var arr in this.upcoming_tasks_pat_array){
          this.upcoming_tasks_pat_array[arr].followup_date = '';
          this.upcoming_tasks_pat_array[arr].due_date = '';
          for(var filter in this.data_res5){
              if(this.upcoming_tasks_pat_array[arr].patient_uuid == this.data_res5[filter].patient_uuid){
               
                this.data_res5[filter].patient_id = this.upcoming_tasks_pat_array[arr].patient_id;
                this.data_res5[filter].group_data_id = this.upcoming_tasks_pat_array[arr].group_data;
                this.data_res5[filter].name = this.upcoming_tasks_pat_array[arr].name;
                this.data_res5[filter].demographic_info = this.upcoming_tasks_pat_array[arr].demographic_info;
                this.data_res5[filter].status1 = this.upcoming_tasks_pat_array[arr].status;
                
                }
          }
        }
          

        let count_arr :any;
   
        //get the array of total number of tasks per patient
       count_arr = this.upcoming_tasks_array.reduce(function(obj, v) {
      
        obj[v.patient_uuid] = (obj[v.patient_uuid] || 0) + 1;
       
        return obj;
      }, {})
      
      let new_array:any;
    
      //get the remaining task number after display one task for each patient
     new_array = Object.values(count_arr);
     for(var m = 0;m<new_array.length;m++){
      
       new_array[m] = new_array[m] - 1;
       this.data_res5[m].remaining_task_number = new_array[m]
     }

     //to remove duplicate records with patient_uuid
    var filterArray = this.data_res5.reduce((accumalator, current) => {
      if(!accumalator.some(item => item.patient_uuid === current.patient_uuid)) {
        accumalator.push(current);
      }
      return accumalator;
    },[]);

    this.data_res5 = filterArray;
        
        for(var k=0;k<this.data_res5.length;k++){
         
          if(this.data_res5[k].status1 != "inactive"){
          //  if(this.data_res5[k].group_data_id == this.group_data_id){
          this.data_res5[k].name = this.data_res5[k].name;
          this.data_res5[k].patient_uuid = this.data_res5[k].patient_uuid;
          this.data_res5[k].task =  this.data_res5[k].task_type;
          if(this.data_res5[k].task < 20){
            this.data_res5[k].task = "Rehab Measures";
          }else if(this.data_res5[k].task > 20 && this.data_res5[k].task < 36){
            this.data_res5[k].task = "Welfare Module";
          }else if(this.data_res5[k].task == 41){
            this.data_res5[k].task = "UDID Follow up";
          }else{
            this.data_res5[k].task = "Medicine Refill";
          }
          this.data_res5[k].due_date1 =  new Date(this.data_res5[k].task_due_date);
         
        
          let date = ("0" + this.data_res5[k].due_date1.getDate()).slice(-2);
          let month = ("0" + (this.data_res5[k].due_date1.getMonth() + 1)).slice(-2);
          let year =this.data_res5[k].due_date1.getFullYear();
          this.data_res5[k].due_date = date + "-" + month + "-" + year;
         
         // let demo = (this.data_res5[k].patientObj);
         // let demo1= demo.demographic_info;
         let demo1= JSON.parse(this.data_res5[k].demographic_info);
       
          const birthDate = new Date(demo1.dob);
          const today = new Date();
          let age = today.getFullYear() - new Date(demo1.dob).getFullYear();
          const m = today.getMonth() - new Date(demo1.dob).getMonth();
         
          if (m < 0 || (m === 0 && today.getDate() < new Date(demo1.dob).getDate())) {
            age--;
           
          }
          this.data_res5[k].age = age;
          let taluk_id = parseInt(demo1.taluk_selected);
         
          for(var p=0;p<this.taluk_array.length;p++){
            if(taluk_id == this.taluk_array[p].taluka_master_id){
            
             this.data_res5[k].taluk_name = this.taluk_array[p].taluka_name;
            }
          }
          if(demo1.gender == "1"){
          this.data_res5[k].gender = "M";
          }else if(demo1.gender == "2"){
            this.data_res5[k].gender = "F";
          }else{
          this.data_res5[k].gender = "O";
          }
         
          this.data_res5[k].mobile = demo1.phone;
          this.data_res5[k].address = demo1.address1;
          this.data_res5[k].rem_no = new_array[k];
          //this.data_res5[k].sw = "Social worker test";
          for(var j=0;j<this.group_data_array.length;j++){
            if( this.data_res5[k].group_data_id == this.group_data_array[j].group_data_id){
             
              this.data_res5[k].social_worker_id = this.group_data_array[j].social_worker_id;
            }
          }

         
          for(var n=0;n<this.psw_array.length;n++){
            if(this.data_res5[k].social_worker_id == this.psw_array[n].social_worker_id){
              this.data_res5[k].sw = this.psw_array[n].first_name
            }
          }
          
          this.upcoming_final_array.push( this.data_res5[k]);
          this.dataSource_dashboard2.data = this.upcoming_final_array;
          this.dataSource_dashboard2.paginator = this.paginator;
         
          }
       // }
        }
      })
  }

  //get upcoming task number to display in the card when page is loaded
  getUpcomingTaskNumber(){
    let upcoming_task:any;
    this.serverService.getUpcomingTasksServerDb(this.group_data_id) .subscribe(
      data3  => {
      upcoming_task = data3;
      this.upcoming_task = upcoming_task.length;
      this.upcoming_total =this.upcoming_total + this.upcoming_task;
    
  
    })

  }

  //get overdue consultation data upon button click
  getOverdueVisit(){
    this.data_res5a = [];
    let array1:any;
    this.serverService.getUpOverdueVisitsServerDb(this.group_data_id) .subscribe(
      data5  => {
      
        //this.data_res5a = data5;
        array1 = data5;
     
       
        for(var m=0;m<array1.length;m++){
          for(var n=0;n<this.group_data1.length;n++){
           if(array1[m].patientObj.group_data_id == this.group_data1[n]){
           
            array1[m].group_data =array1[m].patientObj.group_data_id;
            if(array1[m].group_data != null){
             
              this.data_res5a.push(array1[m]);
            }
            
          }
           }
         }
        for(var k=0;k<this.data_res5a.length;k++){
          if(this.data_res5a[k].patientObj.status != "inactive"){
          this.data_res5a[k].name = this.data_res5a[k].patientObj.name;
          this.data_res5a[k].patient_uuid = this.data_res5a[k].patientObj.patient_uuid;
          this.data_res5a[k].task =  this.data_res5a[k].clinical_visits.visit_type;
          this.data_res5a[k].due_date1 =  new Date(this.data_res5a[k].clinical_visits.followup_date);
        
          let date = ("0" + this.data_res5a[k].due_date1.getDate()).slice(-2);
          let month = ("0" + (this.data_res5a[k].due_date1.getMonth() + 1)).slice(-2);
          let year =this.data_res5a[k].due_date1.getFullYear();
          this.data_res5a[k].due_date = date + "-" + month + "-" + year;
         
          let demo = (this.data_res5a[k].patientObj);
          let demo1= JSON.parse(demo.demographic_info);
       
          const birthDate = new Date(demo1.dob);
          const today = new Date();
          let age = today.getFullYear() - new Date(demo1.dob).getFullYear();
          const m = today.getMonth() - new Date(demo1.dob).getMonth();
         
          if (m < 0 || (m === 0 && today.getDate() < new Date(demo1.dob).getDate())) {
            age--;
           
          }
          this.data_res5a[k].age = age;
          if(demo1.gender == "1"){
          this.data_res5a[k].gender = "M";
          }else if(demo1.gender == "2"){
            this.data_res5a[k].gender = "F";
          }else{
          this.data_res5a[k].gender = "O";
          }

          let taluk_id = parseInt(demo1.taluk_selected);
         
          for(var p=0;p<this.taluk_array.length;p++){
            if(taluk_id == this.taluk_array[p].taluka_master_id){
            
             this.data_res5a[k].taluk_name = this.taluk_array[p].taluka_name;
            }
          }
          this.data_res5a[k].mobile = demo1.phone;
          this.data_res5a[k].address = demo1.address1;
          this.data_res5a[k].sw = "Social worker test";
          for(var j=0;j<this.group_data_array.length;j++){
            if(demo.group_data_id == this.group_data_array[j].group_data_id){
             
              this.data_res5a[k].social_worker_id = this.group_data_array[j].social_worker_id;
            }
          }

         
          for(var n=0;n<this.psw_array.length;n++){
            if(this.data_res5a[k].social_worker_id == this.psw_array[n].social_worker_id){
              this.data_res5a[k].sw = this.psw_array[n].first_name
            }
          }
        this.overdue_final_array.push( this.data_res5a[k]);
        this.dataSource_dashboard3.data = this.overdue_final_array;
        this.dataSource_dashboard3.paginator = this.paginator;
         
        }
          }
      })
  }

  //get overdue consultation number to display in the card when page is loaded
  getOverVisitNumber(){
    let over_visit = [];
    let array2:any;
    this.serverService.getUpOverdueVisitsServerDb(this.group_data_id) .subscribe(
      data5  => {
        //over_visit = data5;
        array2 = data5;
        //this.overdue_visit = over_visit.length;
        for(var m=0;m<array2.length;m++){
          for(var n=0;n<this.group_data1.length;n++){
           if(array2[m].patientObj.group_data_id == this.group_data1[n]){
           
            array2[m].group_data =array2[m].patientObj.group_data_id;
            if(array2[m].group_data != null){
               if(array2[m].patientObj.status === 'active'){
             
              over_visit.push(array2[m]);
               }
            }
            
          }
           }
         }
      
     // const count = over_visit.filter((obj) => obj.patientObj.status === 'active').length;
        
       
        this.overdue_visit =  over_visit.length;
      });
  }

  //get overdue tasks data upon button click
  getOverdueTask(){
    this.data_res6 = [];
    let overdue_array  = [];
    this.overdue_tasks_array = [];
    this.overdue_tasks_pat_array = [];
    let array2:any;
    this.serverService.getOverdueTasksServerDb(this.group_data_id) .subscribe(
      data6a  => {
      
        //overdue_array =  data6a;
        array2 = data6a;
       // console.log(overdue_array)
        for(var m=0;m<array2.length;m++){
          for(var n=0;n<this.group_data1.length;n++){
           if(array2[m].patientObj.group_data_id == this.group_data1[n]){
           
            array2[m].patientObj.group_data =array2[m].patientObj.group_data_id;
            if( array2[m].patientObj.group_data != null){
             
              overdue_array.push(array2[m]);
            }
            
          }
           }
         }
        //this.data_res6 = data6a;
    
        // for(var m=0;m<overdue_array.length;m++){
        //   if(overdue_array[m].status == "pending" || overdue_array[m].status == "In Progress"){
        //     this.data_res6[m] = overdue_array[m];
        //   }
        // }
        for(var m=0;m<overdue_array.length;m++){
         
          this.overdue_tasks_array.push(overdue_array[m].tasks);
          this.overdue_tasks_pat_array.push(overdue_array[m].patientObj)
          
        }
      

         //begin newly added code to display the recent date data
         let result:any;
         result = Object.values( this.overdue_tasks_array.reduce((a, {tasks_id,tasks_uuid,patient_uuid,task_type,creation_date,task_due_date,task_details,status,update_date,origin_record_id,createdAt}) => {

         if (a[patient_uuid]) {
         
           if (a[patient_uuid].task_due_date > task_due_date) a[patient_uuid] = {tasks_id,tasks_uuid,patient_uuid,task_type,creation_date,task_due_date,task_details,status,update_date,origin_record_id,createdAt};
             } else a[patient_uuid] = {tasks_id,tasks_uuid,patient_uuid,task_type,creation_date,task_due_date,task_details,status,update_date,origin_record_id,createdAt};
             
             return a;
           }, {}));

         this.data_res6  = result;
      
          //get patient demo from all patients data based on patient id and date from the tasks query data
          for(var arr in this.overdue_tasks_pat_array){
          
            this.overdue_tasks_pat_array[arr].followup_date = '';
            this.overdue_tasks_pat_array[arr].due_date = '';
            for(var filter in this.data_res6){
                if(this.overdue_tasks_pat_array[arr].patient_uuid == this.data_res6[filter].patient_uuid){
                 
                  this.data_res6[filter].patient_id = this.overdue_tasks_pat_array[arr].patient_id;
                  this.data_res6[filter].group_data_id = this.overdue_tasks_pat_array[arr].group_data;
                  this.data_res6[filter].name = this.overdue_tasks_pat_array[arr].name;
                  this.data_res6[filter].demographic_info = this.overdue_tasks_pat_array[arr].demographic_info;
                  this.data_res6[filter].status1 = this.overdue_tasks_pat_array[arr].status;
                  
                  
                  }
            }
          }
        let count_arr :any;
  
        //get the array of total number of tasks per patients
       count_arr = this.overdue_tasks_array.reduce(function(obj, v) {
        
        obj[v.patient_uuid] = (obj[v.patient_uuid] || 0) + 1;
        
        return obj;
      }, {})
      
      let new_array:any;
   
      // get the remainin number of tasks for each patient(display only one task)
     new_array = Object.values(count_arr);
     for(var m = 0;m<new_array.length;m++){
       new_array[m] = new_array[m] - 1;
       this.data_res6[m].remaining_task_number = new_array[m]
     }

          //to remove duplicate records with patient_uuid
            var filterArray = this.data_res6.reduce((accumalator, current) => {
              if(!accumalator.some(item => item.patient_uuid === current.patient_uuid)) {
                accumalator.push(current);
              }
              return accumalator;
            },[]);

        this.data_res6 = filterArray;
        for(var k=0;k<this.data_res6.length;k++){
         
          if(this.data_res6[k].status1 != "inactive"){
           // if(this.data_res6[k].group_data_id == this.group_data_id){
         if(this.data_res6[k].task_type){
          this.data_res6[k].name = this.data_res6[k].name;
          this.data_res6[k].patient_uuid = this.data_res6[k].patient_uuid;
          this.data_res6[k].task =  this.data_res6[k].task_type;
          if(this.data_res6[k].task < 20){
            this.data_res6[k].task = "Rehab Measures";
          }else if(this.data_res6[k].task > 20 && this.data_res6[k].task < 36){
            this.data_res6[k].task = "Welfare Module";
          }else if(this.data_res6[k].task == 41){
            this.data_res6[k].task = "UDID Follow up";
          }else{
            this.data_res6[k].task = "Medicine Refill";
          }
        
          this.data_res6[k].due_date1 =  new Date(this.data_res6[k].task_due_date);
         
        
          let date = ("0" + this.data_res6[k].due_date1.getDate()).slice(-2);
          let month = ("0" + (this.data_res6[k].due_date1.getMonth() + 1)).slice(-2);
          let year =this.data_res6[k].due_date1.getFullYear();
          this.data_res6[k].due_date = date + "-" + month + "-" + year;
         
          //let demo = (this.data_res6[k].patientObj);
          let demo1= JSON.parse(this.data_res6[k].demographic_info);
          //let demo1= this.data_res6[k].demographic_info;
      
          const birthDate = new Date(demo1.dob);
          const today = new Date();
          let age = today.getFullYear() - new Date(demo1.dob).getFullYear();
          const m = today.getMonth() - new Date(demo1.dob).getMonth();
         
          if (m < 0 || (m === 0 && today.getDate() < new Date(demo1.dob).getDate())) {
            age--;
           
          }
          this.data_res6[k].age = age;
          if(demo1.gender == "1"){
          this.data_res6[k].gender = "M";
          }else if(demo1.gender == "2"){
            this.data_res6[k].gender = "F";
          }else{
          this.data_res6[k].gender = "O";
          }
        
          let taluk_id = parseInt(demo1.taluk_selected);
         
          for(var p=0;p<this.taluk_array.length;p++){
            if(taluk_id == this.taluk_array[p].taluka_master_id){
            
             this.data_res6[k].taluk_name = this.taluk_array[p].taluka_name;
            }
          }
          this.data_res6[k].mobile = demo1.phone;
          this.data_res6[k].address = demo1.address1;
          this.data_res6[k].rem_no = new_array[k];
          //this.data_res6[k].sw = "Social worker test";
          for(var j=0;j<this.group_data_array.length;j++){
            if(this.data_res6[k].group_data_id == this.group_data_array[j].group_data_id){
             
              this.data_res6[k].social_worker_id = this.group_data_array[j].social_worker_id;
            }
          }

       
          for(var n=0;n<this.psw_array.length;n++){
            
            if(this.data_res6[k].social_worker_id == this.psw_array[n].social_worker_id){
              this.data_res6[k].sw = this.psw_array[n].first_name
            }
          }
      this.overdue_final_array.push( this.data_res6[k]);
      this.dataSource_dashboard3.data = this.overdue_final_array;
      this.dataSource_dashboard3.paginator = this.paginator;
      
        }
     // }
        }
        }
      });
  }

  //get overdue task number to display in the card when page is loaded
  getOverTaskNumber(){
    let over_task = [];
    let overdue_task1 = [];
    let array2:any;
    this.serverService.getOverdueTasksServerDb(this.group_data_id) .subscribe(
      data6  => {
        //over_task = data6;
        array2 = data6;
        for(var m=0;m<array2.length;m++){
          for(var n=0;n<this.group_data1.length;n++){
           if(array2[m].patientObj.group_data_id == this.group_data1[n]){
           
            array2[m].patientObj.group_data =array2[m].patientObj.group_data_id;
            if( array2[m].patientObj.group_data != null){
             
              over_task.push(array2[m]);
            }
            
          }
           }
         }
        //this.overdue_task = over_task.length;
      
        this.overdue_total =  this.overdue_visit;
        for(var m=0;m<over_task.length;m++){
          //if(over_task[m].patientObj.group_data_id == this.group_data_id){
          if(over_task[m].tasks.status == "pending" || over_task[m].tasks.status == "In Progress"){
            overdue_task1[m] = over_task[m];
            this.overdue_task = overdue_task1.length;
         
            const count = overdue_task1.filter((obj) => obj.patientObj.status === 'active').length;
            this.overdue_task =  count;
          }
       // }
        }
        
        this.overdue_total = this.overdue_total + this.overdue_task;
        
      });
  }

  //get completed task data 
  getCompletedTask(){
    this.data_res10 = [];
    let tasks_array:any;
    let array2:any;
    this.serverService.getCompletedTasksServerDb(this.group_data_id) .subscribe(
      data7  => {
     
        //this.data_res10 = data7;
        array2 =  data7;
        for(var m=0;m<array2.length;m++){
          for(var n=0;n<this.group_data1.length;n++){
           if(array2[m].patientObj.group_data_id == this.group_data1[n]){
           
            array2[m].patientObj.group_data =array2[m].patientObj.group_data_id;
            if( array2[m].patientObj.group_data != null){
             
              this.data_res10.push(array2[m]);
            }
            
          }
           }
         }
        // for(var m=0;m<tasks_array.length;m++){
        //   if(tasks_array[m].status == "Completed"){
        //     this.data_res10[m] = tasks_array[m];
        //   }
        // }
        let count_arr :any;
   
        //get the array of total number of tasks per patient
       count_arr = this.data_res10.reduce(function(obj, v) {
      
        obj[v.patientObj.patient_uuid] = (obj[v.patientObj.patient_uuid] || 0) + 1;
        //new_array.push(obj[v.patient_uuid])
        return obj;
      }, {})
      
      let new_array:any;
    
      //get the remaining task number after display one task for each patient
     new_array = Object.values(count_arr);
     for(var m = 0;m<new_array.length;m++){
       new_array[m] = new_array[m] - 1;
       this.data_res10[m].remaining_task_number = new_array[m]
     }

     //to remove duplicate records with patient_uuid
    var filterArray = this.data_res10.reduce((accumalator, current) => {
      if(!accumalator.some(item => item.patientObj.patient_uuid === current.patientObj.patient_uuid)) {
        accumalator.push(current);
      }
      return accumalator;
    },[]);
    this.data_res10 = filterArray;

        for(var k=0;k<this.data_res10.length;k++){
        //if(this.data_res10[k].patientObj.group_data_id == this.group_data_id){
          this.data_res10[k].name = this.data_res10[k].patientObj.name;
          this.data_res10[k].patient_uuid = this.data_res10[k].patientObj.patient_uuid;
          this.data_res10[k].group_data_id = this.data_res10[k].patientObj.group_data;
          this.data_res10[k].task =  this.data_res10[k].tasks.task_type;
          if(this.data_res10[k].task < 20){
            this.data_res10[k].task = "Rehab Measures";
          }else if(this.data_res10[k].task > 20 && this.data_res10[k].task < 36){
            this.data_res10[k].task = "Welfare Module";
          }else if(this.data_res10[k].task == 41){
            this.data_res10[k].task = "UDID Follow up";
          }else{
            this.data_res10[k].task = "Medicine Refill";
          }
          this.data_res10[k].due_date1 =  new Date(this.data_res10[k].tasks.task_due_date);
          let date = ("0" + this.data_res10[k].due_date1.getDate()).slice(-2);
          let month = ("0" + (this.data_res10[k].due_date1.getMonth() + 1)).slice(-2);
          let year =this.data_res10[k].due_date1.getFullYear();
          this.data_res10[k].due_date = date + "-" + month + "-" + year;
         
          let demo = (this.data_res10[k].patientObj);
          let demo1= JSON.parse(demo.demographic_info);
       
          const birthDate = new Date(demo1.dob);
          const today = new Date();
          let age = today.getFullYear() - new Date(demo1.dob).getFullYear();
          const m = today.getMonth() - new Date(demo1.dob).getMonth();
         
          if (m < 0 || (m === 0 && today.getDate() < new Date(demo1.dob).getDate())) {
            age--;
           
          }
          this.data_res10[k].age = age;
          let taluk_id = parseInt(demo1.taluk_selected);
     
          for(var p=0;p<this.taluk_array.length;p++){
            if(taluk_id == this.taluk_array[p].taluka_master_id){
            
             this.data_res10[k].taluk_name = this.taluk_array[p].taluka_name;
            }
          }
          if(demo1.gender == "1"){
          this.data_res10[k].gender = "M";
          }else if(demo1.gender == "2"){
            this.data_res10[k].gender = "F";
          }else{
          this.data_res10[k].gender = "O";
          }
          //this.data_res10[k].sw = "Social worker test";
          for(var j=0;j<this.group_data_array.length;j++){
            if(this.data_res10[k].group_data_id == this.group_data_array[j].group_data_id){
             
              this.data_res10[k].social_worker_id = this.group_data_array[j].social_worker_id;
            }
          }

        
          for(var n=0;n<this.psw_array.length;n++){
            if(this.data_res10[k].social_worker_id == this.psw_array[n].social_worker_id){
              this.data_res10[k].sw = this.psw_array[n].first_name
            }
          }
         
          this.data_res10[k].mobile = demo1.phone;
          this.data_res10[k].address = demo1.address1;
          this.data_res10[k].rem_no = new_array[k];
         

        this.complete_final_array.push( this.data_res10[k]);
        this.dataSource_dashboard4.data = this.complete_final_array;
        this.dataSource_dashboard4.paginator = this.paginator;
        //}
        
        }
      });

  }

  getTodayCompletedTaskNumber(){
    this.today_task_completed1 = 0;
    this.task_number_array = [];
    this.today_task_completed = 0;
    this.serverService.getTodayCompletedTasksServerDb(this.group_data_id) .subscribe(
      data20  => {
        
        this.task_number_array = data20;
        this.today_task_completed = this.task_number_array.length;
        this.today_task_completed1 = (this.today_task_completed/this.today_task_total)*100;
       

      });
  }

 //redirect to the patient page
  patientDetails(n,group_data_id){
  
    sessionStorage.setItem("patient_uuid",n);
    sessionStorage.setItem("group_id",group_data_id);
    this.router.navigate(['send-message']);
    this.today_action =  true;
      this.upcoming = false;
      this.overdue = false;
      this.complete = false;
      this.incomplete = false;
      this.checkModel2 = false;
      this.checkModel1 = true;
  
  
  
  }

  selectedTaluka(event){
   
    this.applyFilter(event);
  
  }

  applyFilter(filterValue: string) {
   

    if(this.today_action){
    
    this.dataSource_dashboard1.filter = filterValue.trim().toLowerCase();
    
    
    
  }else if(this.upcoming){
 
    this.dataSource_dashboard2.filter= filterValue.trim().toLowerCase();
   
  }else if(this.overdue){
   
    this.dataSource_dashboard3.filter= filterValue.trim().toLowerCase();
  }else if(this.complete){
    this.dataSource_dashboard4.filter= filterValue.trim().toLowerCase();
  }
  }
  

  logout(){
    this.router.navigate(['']);
  }

 

  //get the unread notification count 
  getNotificationCount(){
  
 let notes_array :any;
 let notes_array1 :any;
    this.serverService.getUnreadCount(this.user_id)
    .subscribe(
    data  => {
   notes_array= data;
   this.notes_count = notes_array.length;
   
    });
  }

  //redirect to the notes page
  displayNotes(){
    this.router.navigate(['notes']);
  
  }



}

export interface PeriodicElement_dashboard {
  name: string;
  kshema_id: number;
  mobile: number;
  taluk: string;
  last_visit_date:string;
  next_visit_date:string;
}
export interface PeriodicElement_dashboard1 {
  name: string;
  mobile: number;
  sw: string;
  task: string;
  due_date:string;
  
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
  { name: '',mobile: 0, sw:'', task:'',due_date:''},
  
];

const ELEMENT_DATA_dashboard2: PeriodicElement_dashboard2[] = [
  {name:'',mobile:'',address:'',task:'',due_date:'',gender:'',age:0,patient_id:0}
  
];

const ELEMENT_DATA_dashboard3: PeriodicElement_dashboard3[] = [
  {name:'',mobile:'',address:'',task:'',due_date:'',gender:'',age:0,patient_id:0}
  
];
const ELEMENT_DATA_dashboard4: PeriodicElement_dashboard3[] = [
  {name:'',mobile:'',address:'',task:'',due_date:'',gender:'',age:0,patient_id:0}
  
];