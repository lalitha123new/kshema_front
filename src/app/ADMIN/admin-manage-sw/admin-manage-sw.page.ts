import { Component, OnInit,ViewChild } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { FormGroup, FormControl,Validators, FormBuilder} from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';
import { ServerService } from 'src/app/services/server.service';



@Component({
  selector: 'app-admin-manage-sw',
  templateUrl: './admin-manage-sw.page.html',
  styleUrls: ['./admin-manage-sw.page.scss'],
})
export class AdminManageSwPage implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  form:FormGroup;
  taluk_array:any;
 

  displayedColumns_SW: string[] = ['first_name', 'last_name', 'contact_no', 'taluk', 'created_at','status'];
  dataSource_SW = new MatTableDataSource<PeriodicElement_sw>(ELEMENT_DATA_SW);

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
    this.getallTaluksPsws();
    

  }


 
  async getallTaluksPsws(){
    let resultArray :any;
  
    let test = await this.serverService.getallTaluksPsws().toPromise().then(result2 => {
     
      resultArray=result2;

   });
    this. showSpinner = false;
    this.taluk_array = resultArray[0].taluka_master;
   
        resultArray = resultArray.reverse();
       
        for(var i = 0; i<resultArray[0].social_worker.length;i++){
       
          for(var k=0;k<resultArray[0].taluka_master.length;k++){
            if( resultArray[0].social_worker[i].taluka_id == resultArray[0].taluka_master[k].taluka_master_id){
              resultArray[0].social_worker[i].taluk =  resultArray[0].taluka_master[k].taluka_name;
            }
          }
       
          resultArray[0].social_worker[i].created_at = resultArray[0].social_worker[i].createdAt;
        }

        resultArray[0].social_worker = resultArray[0].social_worker.reverse();
        this.dataSource_SW.data = resultArray[0].social_worker;
        
        this.dataSource_SW.paginator = this.paginator;
  }

  
  selectedTaluka(event){
    this.applyFilter(event)
  }

 
  redirect(i){
  
    if(i == 1){
      this.router.navigate(['admin-dashboard']);
    }else if(i == 2){
      this.router.navigate(['admin-manage-supervisor']);
    }else if(i == 3){
      this.router.navigate(['admin-manage-taluk']);
    }

  }

  add_user(){
    sessionStorage.setItem('user',"Social Worker");
    this.router.navigate(['add-user']);
    
  }

  editUser(x){
      
    sessionStorage.setItem('user',"Social Worker");
    sessionStorage.setItem('users_id',x);
    this.router.navigate(['edit-user']);
  }
  
  logout(){
    this.router.navigate(['']);
  }

  applyFilter(filterValue: string) {
    this.dataSource_SW.filter= filterValue.trim().toLowerCase();
  }
   onCancel(ev) { 
    // Reset the field
    ev.target.value = '';
  }

  back(){
    this.router.navigate(['admin-dashboard']);
  }
}

export interface PeriodicElement_sw {
  name_sw: string;
  mobile_sw: number;
  user_name_sw: string;
  taluk: string;
  creation_date_sw:string;
  status_sw: string;
}

const ELEMENT_DATA_SW: PeriodicElement_sw[] = [
  { name_sw: '', mobile_sw: 0, user_name_sw: '',taluk:'', creation_date_sw:'', status_sw:''},
  
];


