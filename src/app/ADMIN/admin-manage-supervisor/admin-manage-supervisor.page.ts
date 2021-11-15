import { Component, OnInit,ViewChild } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { FormGroup, FormControl,Validators, FormBuilder} from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';
import { ServerService } from 'src/app/services/server.service';



interface taluk_optons {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-admin-manage-supervisor',
  templateUrl: './admin-manage-supervisor.page.html',
  styleUrls: ['./admin-manage-supervisor.page.scss'],
})

export class AdminManageSupervisorPage implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  form:FormGroup;
  taluk_array:any;
  taluka_supervisor_array:any;
  group_array:any;
  supervisor_array:any;

  displayedColumns: string[] = ['first_name',  'last_name','contact_no', 'taluk', 'created_at','status'];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
 
  constructor(private formBuilder: FormBuilder,private router: Router,private serverService: ServerService) { }
  showSpinner = false;
  ngOnInit() {
  
    this.form =new FormGroup({
      u_name: new FormControl('',[Validators.required]),
      psw: new FormControl('',[Validators.required])
    })
    
  }

  ionViewWillEnter() {
    this. showSpinner = true;
    this.taluk_array = [];
    this.taluka_supervisor_array = [];
    this.group_array = [];
    this.supervisor_array = [];
    // get talukas, taluka_supervisor, supervisor data 
    this.getAllTalukasPswsTalukasupervisors();
   

  }

  async getAllTalukasPswsTalukasupervisors(){
    let taluk_array_first :any;
    let test = await this.serverService.getAllTalukasPswsTalukasupervisors().toPromise().then(result3 => {
     
      taluk_array_first=result3;

   });
 
   this. showSpinner = false;
  this.group_array = taluk_array_first[0].group_data;
  this.supervisor_array = taluk_array_first[0].supervisor;
  this.taluk_array = taluk_array_first[0].taluka_master;


  for(var i = 0; i< this.supervisor_array.length;i++){
    let existItem = this.group_array.filter(item => item.supervisor_id === this.supervisor_array[i].supervisor_id);
    let arr1 = [];
  
   
    //get the taluka name using the above condition and the taluka_master table
    for(var m=0;m<this.taluk_array.length;m++){
     
      for(var j=0;j<existItem.length;j++){
        if(existItem[j].taluka_id == this.taluk_array[m].taluka_master_id){
           
            arr1.push( this.taluk_array[m].taluka_name)
          }
     
      }
    }
   
    this.supervisor_array[i].taluk = arr1;
    this.supervisor_array[i].created_at =  this.supervisor_array[i].createdAt;
  }
  this.supervisor_array = this.supervisor_array.reverse();
    this.dataSource.data =this.supervisor_array;
   
    this.dataSource.paginator = this.paginator;
  

  }


  async getalltaluks_supervisors(){
    let resultArray :any;
     
    let test = await this.serverService.getTaluksSupervisors().toPromise().then(result3 => {
     
      resultArray=result3;

   });
   this.taluk_array = resultArray[0].taluka_master;
   
    for(var i = 0; i<resultArray[0].supervisor.length;i++){
     
      //get the taluka_id of the supervisor 
      for(var k = 0;k<resultArray[0].taluka_supervisor.length;k++){
        if(resultArray[0].supervisor[i].supervisor_id == resultArray[0].taluka_supervisor[k].supervisor_id){
          resultArray[0].supervisor[i].taluka_id = resultArray[0].taluka_supervisor[k].taluka_id;
        }
      }
     
      //get the taluka name using the above condition and the taluka_master table
      for(var m=0;m<resultArray[0].taluka_master.length;m++){
        if(resultArray[0].supervisor[i].taluka_id == resultArray[0].taluka_master[m].taluka_master_id){
          resultArray[0].supervisor[i].taluk = resultArray[0].taluka_master[m].taluka_name;
        }
      }
     
      resultArray[0].supervisor[i].created_at =  resultArray[0].supervisor[i].createdAt;
    }
    
      resultArray[0].supervisor =  resultArray[0].supervisor.reverse();
      this.dataSource.data = resultArray[0].supervisor;
     
      this.dataSource.paginator = this.paginator;
  }
  
  redirect(i){
   
    if(i == 1){
      this.router.navigate(['admin-dashboard']);
    }else if(i == 2){
      this.router.navigate(['admin-manage-sw']);
    }else if(i == 3){
      this.router.navigate(['admin-manage-taluk']);
    }

  }

  add_user(){
    sessionStorage.setItem('user',"Supervisor");
    this.router.navigate(['add-user']);
  }

  editUser(x){
    sessionStorage.setItem('user',"Supervisor");
    sessionStorage.setItem('users_id',x);
    this.router.navigate(['edit-user']);
  }


  selectedTaluka(event){
    this.applyFilter(event)
  }

  
  applyFilter(filterValue: string) {
   
    this.dataSource.filter= filterValue.trim().toLowerCase();
  }

   onCancel(ev) { 
    // Reset the field
    ev.target.value = '';
  }

  back(){
    this.router.navigate(['admin-dashboard']);
  }
 


  logout(){
    this.router.navigate(['']);
  }
}

export interface PeriodicElement {
  first_name: string;
  contact_no: number;
  user_name: string;
  taluk: string;
  created_at:string;
  status: string;
}
//Custom data for table
const ELEMENT_DATA: PeriodicElement[] = [
  { first_name: '', contact_no: 0, user_name: '',taluk:'', created_at:'', status:''},
 
];

