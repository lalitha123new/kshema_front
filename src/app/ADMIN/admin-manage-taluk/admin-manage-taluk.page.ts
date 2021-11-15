import { Component, OnInit,ViewChild } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { FormGroup, FormControl,Validators, FormBuilder} from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';
import { ServerService } from 'src/app/services/server.service';



@Component({
  selector: 'app-admin-manage-taluk',
  templateUrl: './admin-manage-taluk.page.html',
  styleUrls: ['./admin-manage-taluk.page.scss'],
})
export class AdminManageTalukPage implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;

  form:FormGroup;
  
  taluka_supervisor_array:any;
  psw_array:any;
  taluk_array:any;
  group_array:any;
  supervisor_array:any;
  
  displayedColumns_taluk: string[] = ['taluka_name', 'supervisors', 'social_workers','district'];
  dataSource_taluk = new MatTableDataSource<PeriodicElement_taluk>(ELEMENT_DATA_taluk);


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
    this.taluka_supervisor_array = [];
    this.psw_array = [];
    this.taluk_array = [];
    this.group_array = [];
    this.supervisor_array = [];
    this.getAllTalukasPswsTalukasupervisors();
  }

  async getAllTalukasPswsTalukasupervisors(){
    let taluk_array_first :any;
    let test = await this.serverService.getAllTalukasPswsTalukasupervisors().toPromise().then(result3 => {
     
      taluk_array_first=result3;

   });
 
    this. showSpinner = false;
    this.taluka_supervisor_array = taluk_array_first[0].taluka_supervisor;
    this.psw_array = taluk_array_first[0].social_worker;
    this.group_array = taluk_array_first[0].group_data;
    this.supervisor_array = taluk_array_first[0].supervisor;

   
     
   for(var i = 0;i<taluk_array_first[0].taluka_master.length;i++){
    
    taluk_array_first[0].taluka_master[i].district =taluk_array_first[0].taluka_master[i].taluka_details;


     for(var k =0;k<this.psw_array.length;k++){
      taluk_array_first[0].taluka_master[i].social_workers = this.psw_array.filter((obj) => obj.taluka_id === taluk_array_first[0].taluka_master[i].taluka_master_id).length;
     }
     

     for(var m =0;m<this.group_array.length;m++){
       
     if( taluk_array_first[0].taluka_master[i].taluka_master_id == this.group_array[m].taluka_id ){
       if(this.group_array[m].supervisor_id != 0){
     taluk_array_first[0].taluka_master[i].supervisors = 1;
       }else{
        taluk_array_first[0].taluka_master[i].supervisors = 0;
       }
     }
     
    }

    }
      taluk_array_first[0].taluka_master = taluk_array_first[0].taluka_master.reverse();
      this.dataSource_taluk.data = taluk_array_first[0].taluka_master;
     
      //paginator code
      this.dataSource_taluk.paginator = this.paginator;
  

  }


  redirect(i){
  
    if(i == 1){
      this.router.navigate(['admin-dashboard']);
    }else if(i == 2){
      this.router.navigate(['admin-manage-sw']);
    }else if(i == 3){
      this.router.navigate(['admin-manage-supervisor']);
    }

  }

  logout(){
    this.router.navigate(['']);
  }

  add_taluk(){
 
    this.router.navigate(['add-taluk']);
  }

  editTaluk(p){
    sessionStorage.setItem("taluka_id",p)

    this.router.navigate(['edit-taluk']);
  }

  back(){
    this.router.navigate(['admin-dashboard']);
  }
  
  applyFilter(filterValue: string) {
   
    this.dataSource_taluk.filter= filterValue.trim().toLowerCase();
  }

   onCancel(ev) { 
    // Reset the field
    ev.target.value = '';
  }
  
  
}

export interface PeriodicElement_taluk {
  taluka_name: string;
  supervisors: number;
  social_workers: number;
  district:string;
}

const ELEMENT_DATA_taluk: PeriodicElement_taluk[] = [
  { taluka_name: '', supervisors: 0, social_workers: 0,district:""},
  
];