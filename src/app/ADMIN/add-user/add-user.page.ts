import { Component, OnInit } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { ViewChild,Input, Output, EventEmitter, ViewEncapsulation  } from '@angular/core';
import {MatStepperModule} from '@angular/material/stepper';
import {FormBuilder,FormControl,FormGroupDirective,NgForm, FormGroup, Validators,ValidatorFn} from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import {Location} from '@angular/common';
import {  MatStepper} from '@angular/material/stepper';
import { Router } from '@angular/router';
import { MatRadioChange } from '@angular/material/radio';
import { LoadingController } from '@ionic/angular';
import { PatientLocation } from 'src/app/location.model';
import { switchMap, take } from 'rxjs/operators';
import { ServerService } from 'src/app/services/server.service';
import { NavController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {MatSnackBar} from '@angular/material/snack-bar';
import {  MatIcon } from  '@angular/material/icon';
import { AlertController } from '@ionic/angular';




interface user_optons{
  value: string;
  viewValue_user: string;

}

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.page.html',
  styleUrls: ['./add-user.page.scss'],
})
export class AddUserPage implements OnInit {
  private _sanitizer: any;

  constructor(private _formBuilder: FormBuilder,private _location: Location,private router: Router, private serverService: ServerService,
    private loadingCtrl: LoadingController, private route: ActivatedRoute,
    private navCtrl: NavController,private http: HttpClient,
    private snackBar: MatSnackBar, public alertController: AlertController
    ) { }

    form:FormGroup;
    userObj = {
      first_name:'',
      last_name:'',
      contact_no:'',
      address:'',
      taluk:'',
      user_name:'',
      password:'',
      createdAt:'2021-01-12 23:53:17',
      role:'',
      email:''
    };
    taluk_array:any;
    selectedTaluka_id;
    addSuper = true;

    
    
  
    //to dynamically change the user title
    get user1(): any {
      return sessionStorage.getItem('user');
    }
    //user =  sessionStorage.getItem('user');
    user;


    ngOnInit() {
     
      this.form =new FormGroup({
        first_name: new FormControl('',[Validators.required]),
        last_name: new FormControl('',[Validators.required]),
        phone: new FormControl('',[Validators.required]),
        email: new FormControl('',[Validators.required]),
        //address: new FormControl('',[Validators.required]),
        taluk: new FormControl('',[]),
        username: new FormControl('',[Validators.required]),
        password: new FormControl('',[Validators.required]),
        confirm_password: new FormControl('',[Validators.required]),
    })
  
  
    }
    
    ionViewWillEnter() {
      this.form =new FormGroup({
        first_name: new FormControl('',[Validators.required]),
        last_name: new FormControl('',[Validators.required]),
        phone: new FormControl('',[Validators.required]),
        email: new FormControl('',[Validators.required]),
        //address: new FormControl('',[Validators.required]),
        taluk: new FormControl('',[]),
        username: new FormControl('',[Validators.required]),
        password: new FormControl('',[Validators.required]),
        confirm_password: new FormControl('',[Validators.required]),
    })
  
      this.user =  sessionStorage.getItem('user');
      if(this.user1 == "Supervisor"){
     
        this.addSuper = true;
        
      }else{
        this.addSuper = false;
        this.form.get('taluk').setValidators(Validators.required);
      }
      this.getAllTaluks()
       
    }


    getAllTaluks(){
      this.serverService.getAlltalukas()
      .subscribe(
      data  => {
       
        this.taluk_array = data;
       
      },
      error => {
  
      })
    }
   
  
    users: user_optons[] = [
      {value: '1', viewValue_user: 'Logout'},
      {value: '2', viewValue_user: 'Settings'},
      
    ]
    
    redirect(i){
    
      if(i == 1){
        this.router.navigate(['admin-dashboard']);
      }else if(i == 2){
        this.router.navigate(['admin-manage-sw']);
      }else if(i == 3){
        this.router.navigate(['admin-manage-supervisor']);
      }else if(i == 4){
        this.router.navigate(['admin-manage-taluk']);
      }
  
    }
  

    back(){
      if(this.user == "Supervisor"){
        this.router.navigate(['admin-manage-supervisor']);
      }else{
        this.router.navigate(['admin-manage-sw']);
      }
    }
    
    selectedTaluka(event){
    
      this.selectedTaluka_id = event;

    }

    createUser(form) {

    
              this.userObj.first_name = form.value.first_name;
              this.userObj.last_name = form.value.last_name;
              this.userObj.contact_no = form.value.phone;
              this.userObj.email = form.value.email;
              this.userObj.user_name = form.value.username;
              this.userObj.password = form.value.password;
              if(this.user1 == "Supervisor"){
      
                this.userObj.taluk = "0";
              }else{
                this.userObj.taluk = form.value.taluk;
              }

              var date = new Date();
              let dateStr = date.getFullYear() + "-"+("00" + (date.getMonth() + 1)).slice(-2) + "-" +("00" + date.getDate()).slice(-2) + " " +
              ("00" + date.getHours()).slice(-2) + ":" +
              ("00" + date.getMinutes()).slice(-2) + ":" +
              ("00" + date.getSeconds()).slice(-2);

              this.userObj.createdAt = dateStr;

        let userData;

        this.alertController.create({
        header: '',
        cssClass: 'my-custom-alert',
        subHeader: '',
        
        message: 'Are you sure, you want to add new '+this.user+'?',
        buttons: [
          {
            text: 'NO',
            cssClass: 'alertButton1',
            handler: () => {
              
            }
          },
          {
            text: 'Yes',
            cssClass: 'alertButton2',
            handler: () => {

              if(this.user1 === "Social Worker"){
                this.userObj.role = "psw";
                    userData = { 
                      "user": {
                            "users_id":0,
                            "user_name":this.userObj.user_name,
                          "first_name": this.userObj.first_name,
                          "last_name": this.userObj.last_name,
                            "password":this.userObj.password,
                            "role":this.userObj.role,
                            "email":this.userObj.email,
                            "contact_no":this.userObj.contact_no
                            
                            },

                      "social_worker":{
                            "social_worker_id":0,
                            "first_name": this.userObj.first_name,
                            "last_name": this.userObj.last_name,
                            "contact_no":this.userObj.contact_no,
                            "users_id":0,
                            "status":"active",
                            "taluka_id":this.userObj.taluk

                            },
                      "group_data": {
                            
                            "group_data_id":0,
                            "taluka_id":this.userObj.taluk,
                            "supervisor_id":0,
                            "social_worker_id":0

                            }
                      }
              }else if(this.user1 === "Supervisor"){

                this.userObj.role = "supervisor";
                userData =  { 

                      "user": {
                                "users_id":0,
                                "user_name":this.userObj.user_name,
                                "first_name": this.userObj.first_name,
                                "last_name": this.userObj.last_name,
                                "password":this.userObj.password,
                                "role": this.userObj.role,
                                "email":this.userObj.email,
                                "contact_no":this.userObj.contact_no
                              
                                },
                      "supervisor":{
                                "supervisor_id":0,
                                "first_name": this.userObj.first_name,
                                "last_name": this.userObj.last_name,
                                "contact_no":this.userObj.contact_no,
                                "users_id":0,
                                "status":"active"
                              
                                },
                      "taluka_supervisor":{
                                
                                "taluka_supervisor_id":0,
                                "taluka_id": this.userObj.taluk,
                                "supervisor_id":0
                              
                              }
                          }
                    
              }


              
              if(form.value.password == form.value.confirm_password){
              
              
              if(this.user1 === "Social Worker"){
                this.addPSW(userData);
                
              }else if(this.user1 === "Supervisor"){
              
                this.addSupervisor(userData);
                
              }
              
          
              }else{
                this.snackBar.open('Username and password do not match', 'x', {
                  duration: 3000,
                });
              }
              
            }
          
          }
        ]
      }).then(res => {
        res.present();
      });
    }
  
  addSupervisor(userData){

    this.serverService.createUser1(userData)
    .subscribe(
    data  => {
      
    this.router.navigate(['admin-dashboard']);
    
    },
    error  => {
    
    console.log("Error", JSON.stringify(error));
    this.router.navigate(['admin-dashboard']);
    
    })
  }

  addPSW(userData){
  
    this.serverService.createUser2(userData,this.selectedTaluka_id)
    .subscribe(
    data  => {
      
    this.router.navigate(['admin-dashboard']);
   
    },
    error  => {
    
    console.log("Error", JSON.stringify(error));
    this.router.navigate(['admin-dashboard']);
    
    })
  }
    
  }
