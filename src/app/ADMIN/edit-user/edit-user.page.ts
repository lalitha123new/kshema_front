import { Component, OnInit } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { ViewChild,Input, Output, EventEmitter, ViewEncapsulation  } from '@angular/core';
import {MatStepperModule} from '@angular/material/stepper';
import {FormBuilder,FormControl,FormGroupDirective,NgForm, FormGroup, Validators,ValidatorFn} from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import {Location} from '@angular/common';
import { Router } from '@angular/router';
import { MatRadioChange } from '@angular/material/radio';
import { LoadingController } from '@ionic/angular';
import { switchMap, take } from 'rxjs/operators';
import { ServerService } from 'src/app/services/server.service';
import { NavController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {MatSnackBar} from '@angular/material/snack-bar';
import {  MatIcon } from  '@angular/material/icon';



@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.page.html',
  styleUrls: ['./edit-user.page.scss'],
})

export class EditUserPage implements OnInit {

  constructor(private _formBuilder: FormBuilder,private _location: Location,private router: Router, private serverService: ServerService,
    private loadingCtrl: LoadingController, private route: ActivatedRoute,
    private navCtrl: NavController,private http: HttpClient,
    private snackBar: MatSnackBar
    ) { }
    editUserForm:FormGroup;
    user1;
    active = true;
    users_id;
    userArray:any;
    disabledTrue = true;
    status = "active";
    taluk_array:any;
    taluka_supervisor_array:any;
    social_worker_id = 0;
    supervisor_id =0;
    editSuper = true;
    group_array:any;
    supervisor_array:any;
    arr1 = [];

  ngOnInit() {
    
    this.editUserForm =new FormGroup({
      first_name: new FormControl('',[Validators.required]),
      last_name: new FormControl('',[Validators.required]),
      phone: new FormControl('',[Validators.required]),
      email: new FormControl('',[Validators.required]),
      //address: new FormControl('',[Validators.required]),
      taluk: new FormControl('',[Validators.required]),
      username: new FormControl('',[Validators.required]),
      password: new FormControl('',[Validators.required]),
      confirm_password: new FormControl('',[Validators.required]),
  })
  // this.getAllTaluks();
  // this.getTalukaSupervisors();
    
  }


  ionViewWillEnter() {
    this.user1 = sessionStorage.getItem('user');
    this.users_id = sessionStorage.getItem('users_id');
    this.getAllTaluks();
    this.getAllTalukasPswsTalukasupervisors();
    if(this.user1 == "Supervisor"){
      this.editSuper = true;
    }else{
      this.editSuper = false;
    }
   
  }

   getAllTaluks(){
     this.serverService.getAlltalukas()
    .subscribe(
    data  => {
     
      this.taluk_array = data;
     // this.getTalukaSupervisors();
     this.getUserDetails();
      
     
    },
    error => {

    })
  }
 
  
  getTalukaSupervisors(){
     this.serverService.getTalukaSupervisors()
        .subscribe(
        data  => {
          this.taluka_supervisor_array = data;
          this.getUserDetails();
        });
  }


  back(){
    if(this.user1 == "Supervisor"){
      this.router.navigate(['admin-manage-supervisor']);
    }else{
      this.router.navigate(['admin-manage-sw']);
    }
  }

  async getAllTalukasPswsTalukasupervisors(){
    let taluk_array_first :any;
    let test = await this.serverService.getAllTalukasPswsTalukasupervisors().toPromise().then(result3 => {
     
      taluk_array_first=result3;

   });
 
 
  this.group_array = taluk_array_first[0].group_data;
  
  this.taluk_array = taluk_array_first[0].taluka_master;


 
  }

  getUserDetails(){
   
  
    let role = "supervisor";
    if(this.user1 == "Supervisor"){
      role = "supervisor";
    }else{
      role = "social_worker";
    }
   
     this.serverService.getUserData(this.users_id,role)
        .subscribe(
        data  => {
          
    this.userArray =  data;
    this.editUserForm.get('first_name').setValue(this.userArray.user.first_name);
    this.editUserForm.get('last_name').setValue(this.userArray.user.last_name);
    this.editUserForm.get('phone').setValue(this.userArray.user.contact_no);
    this.editUserForm.get('email').setValue(this.userArray.user.email);

    if(this.userArray.supervisor){
     
      this.supervisor_id = this.userArray.supervisor.supervisor_id;
     
     if(this.userArray.supervisor.status === "active"){
      this.active =  true;
        this.status = "active";
    }else{
      this.active =  false;
        this.status = "inactive";
    }
   
      let existItem = this.group_array.filter(item => item.supervisor_id === this.userArray.supervisor.supervisor_id);
       this.arr1 = [];
   
     
      //get the taluka names
      for(var m=0;m<this.taluk_array.length;m++){
       
        for(var j=0;j<existItem.length;j++){
          if(existItem[j].taluka_id == this.taluk_array[m].taluka_master_id){
             
            this.arr1.push( this.taluk_array[m].taluka_name)
            }
       
        }
      }
    
      
 
      
    }else{
      
      this.social_worker_id = this.userArray.social_worker.social_worker_id;
      this.editUserForm.get('taluk').setValue(this.userArray.social_worker.taluka_id);
      if(this.userArray.social_worker.status === "active"){
       
        this.active =  true;
        this.status = "active";
      }else{
        this.active =  false;
        this.status = "inactive";
      }
    }
    
    this.editUserForm.get('username').setValue(this.userArray.user.user_name);
    this.editUserForm.get('password').setValue(this.userArray.user.password);
    this.editUserForm.get('confirm_password').setValue(this.userArray.user.password); 

        });
  }

  //to activate or deactivate user
  onChangeSlideToggle(event){
    if (event.checked == true) {
      this.active = true;
      this.status = "active";
    } else {
      this.active = false;
      this.status = "inactive";
    }
  }
  
  

  editUser(editUserForm){
    let taluka_id;
    if(this.user1 == "Supervisor"){
      taluka_id = 0;
    }else{
       taluka_id =  this.editUserForm.get('taluk').value;
    }
   

    let userObj = {
      user_name: this.editUserForm.get('username').value,
      first_name: this.editUserForm.get('first_name').value,
      last_name: this.editUserForm.get('last_name').value,
      contact_no: this.editUserForm.get('phone').value,
      email: this.editUserForm.get('email').value,
      users_id: this.users_id,
      

      //address: this.editUserForm.get('phone').value,
      // taluk: this.editUserForm.get('taluk').value,
      // username: this.editUserForm.get('username').value,
      // password:this.editUserForm.get('password').value,
     
    }
    let role_type = 0;
  if(this.user1 == "Supervisor"){
    role_type = 2;
  }else{
    role_type = 1;
  }
  
    this.serverService.editUser(userObj,this.users_id,role_type,this.status,taluka_id,this.social_worker_id,this.supervisor_id)
    .subscribe(
      success =>  {
        
        this.router.navigate(['admin-dashboard']);
    },
    error  => {
    
      console.log("Error", JSON.stringify(error));
      if(this.user1 == "Supervisor"){
       
       this.router.navigate(['admin-dashboard']);
      }else{
       
        this.router.navigate(['admin-dashboard']);
      }
      });
  }

  
}
