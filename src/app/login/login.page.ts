import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { FormGroup, FormControl,Validators, FormBuilder} from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from "@angular/material/snack-bar";
import { MatInputModule } from '@angular/material/input';
import { ServerService } from 'src/app/services/server.service';
import { LoadingController } from '@ionic/angular';
import { PatientService } from 'src/app/services/patient.service';
import { OfflineManagerService } from 'src/app/services/offline-manager.service';
import { NetworkService, ConnectionStatus } from 'src/app/services/network.service';
import { Network } from '@ionic-native/network/ngx';
import { BehaviorSubject, Observable } from 'rxjs';
import { Plugins } from '@capacitor/core';
const { CapacitorSQLite,Device } = Plugins;


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  
 
  
  private status: BehaviorSubject<ConnectionStatus> = new BehaviorSubject(ConnectionStatus.Offline);

  constructor(private router: Router,private formBuilder: FormBuilder,public snackBar: MatSnackBar,private serverService: ServerService
    ,private loadingCtrl: LoadingController,private patientService: PatientService, private networkService : NetworkService
    ,private offlineManager : OfflineManagerService,private network: Network,) { }

    defaultValue: number = 3; 
    form:FormGroup;
    checkStatus = false;
    sw_id = "1";
    taluk_id = "1";
    super_array:any = [];
    
    loginObj = {
            user_name:'',
            password:''
    }
    dataExists = true;

  ngOnInit() {
      this.form =new FormGroup({
      u_name: new FormControl('',[Validators.required]),
      psw: new FormControl('',[Validators.required])
  })
  }

  ionViewWillEnter() {
    this.dataExists = true;
    // //update the network status
    // this.networkService.initializeNetworkEvents1();
   
  }

  toggle1(x) { 
    if(x == 1){
      this.defaultValue = 1;
    }else if(x==2){
      this.defaultValue = 2;
    }else{
      this.defaultValue = 3;
    }
   }

  toggle2() { 
  this.defaultValue = 2;
 }

  toggle3() {
   this.defaultValue = 3; 
  }


//get metadata for the psw and supervisor login - logForm
 async logForm(){
   //update the network status for online and offline login
  this.networkService.initializeNetworkEvents1();
  const info = await Device.getInfo();
  this.loginObj.user_name = this.form.get('u_name').value;
  this.loginObj.password = this.form.get('psw').value;
  if((this.loginObj.user_name != "") || (this.loginObj.password != "") || (this.loginObj.user_name != "" && this.loginObj.password!="")){
  if(this.loginObj.user_name == "admin" && this.loginObj.password == "123"){
    if(info.platform === "ios" || info.platform === "android") {
      this.snackBar.open('Access denied', 'x', {
        duration: 3000,
      });
    }else{
    this.router.navigate(['/admin-dashboard']);
    sessionStorage.setItem("user_name","admin");
    this.form.reset();
    }
  }else{
    this.checkConnectivity();
  }
  }
  
 }

 //if online login - server db, else local db - first time login should be online login using server db
 async checkConnectivity(){
  const info = await Device.getInfo();
   
      //get the current network status
      let status1 =  this.networkService.getCurrentNetworkStatus();
      if (status1 === 0) {

    this.serverService.login(this.loginObj).subscribe(data  => {

      let user_id = parseInt(JSON.stringify(data));
      
    
      if(user_id > 0){
        
        this.getMetaDataPsw(user_id,"psw",this.loginObj.user_name,this.loginObj.password);
        this.form.reset();

      }
    },
    async error  => {
      //in the response from db there is @@###, so response is coming in the error block
    let data1 = error.error;
   
    if(data1.text){
    if(data1.text != "invalid"){
      let data2:any = [];
      
      this.form.reset();

      data2 = data1.text.split("@@###");
   
    
     
      //based on the rolw, display data in pages(if role is psw - data from local db, if rolw is supervisor - data is from serverdb)
      sessionStorage.setItem("users_id",data2[0]);
      sessionStorage.setItem("role",data2[1]);

    if(data2[1] == "supervisor"){
      if(info.platform === "ios" || info.platform === "android") {
        this.snackBar.open('Access denied', 'x', {
          duration: 3000,
        });
      }else{
       
        this.getMetaDataSupervisor1(data2[0],data2[1]);
      }
    }else{
      if(info.platform === "ios" || info.platform === "android") {
       
       
       
        this.getMetaDataPsw(data2[0],data2[1],this.loginObj.user_name,this.loginObj.password);
       
      }else{
       
        this.snackBar.open('Access denied', 'x', {
          duration: 3000,
        });
      }
      
    }

    }else if(data1.text == "invalid"){
      this.snackBar.open('Invalid credentials', 'x', {
        duration: 3000,
      });
    }
  }
      else{
      console.log(JSON.stringify(error))
      this.snackBar.open('Internal server error', 'x', {
        duration: 3000,
      });
    }
    
    });
      

   }else{
   
    this.patientService.offlineLogin(this.loginObj.user_name,this.loginObj.password).then((res1) => {
  
      if(res1){
      let login1 = res1[0].loginData;
      let sw1 = res1[0].swData;
      let group1 = res1[0].groupData;
      
    
      sessionStorage.setItem("role","psw");
      sessionStorage.setItem("users_id",login1[0].users_id);
      sessionStorage.setItem("name",login1[0].user_name);
      sessionStorage.setItem("user_name",login1[0].first_name);
      sessionStorage.setItem("group_data_id",group1[0].group_data_id);
      sessionStorage.setItem("taluka_id",group1[0].taluka_id);
      sessionStorage.setItem("sw_id",sw1[0].social_worker_id);
      sessionStorage.setItem("supervisor_id",group1[0].supervisor_id);
 
        this.router.navigate(['/dashboard']);
       
        this.form.reset();
      }else{
        this.snackBar.open('Invalid credentials', 'x', {
          duration: 3000,
        });
        
        this.form.reset();
      }
     }),err => {
      console.log(err);
     
    };

   }


}

//get psw meta data and save login credentials in local db in the first online login
getMetaDataPsw(user_id,role,user_name,psw){
  this.serverService.getMetaData(user_id,role).subscribe(async data  => {

  let res1:any;
  res1 = data;
 
  let res1User = res1.user;
  let res1PSW = res1.group_data;
  let res1Info= res1.social_worker;
  let res1Super = res1.supervisor;

 sessionStorage.setItem("users_id",res1User.users_id);
 sessionStorage.setItem("name",JSON.stringify(res1User.user_name));
 sessionStorage.setItem("group_data_id",res1PSW.group_data_id);
 sessionStorage.setItem("taluka_id",res1PSW.taluka_id);
 sessionStorage.setItem("sw_id",res1PSW.social_worker_id);
 sessionStorage.setItem("supervisor_id",res1Super.users_id);
 sessionStorage.setItem("user_name",res1Info.first_name);
 let retSelect:any;
    
        let test = await this.offlineManager.sqlQuery("getAllPatients",{}).then(result => {
          retSelect=result;
        });
       
     if(retSelect.values.length < 1){
      
      this.dataExists = false;
      this.displayLoader();
      this.patientService.addUser(res1User.users_id,user_name,psw,res1PSW.group_data_id,res1PSW.social_worker_id,res1Super.users_id,res1Info.first_name,res1PSW.taluka_id).then(() => {
      this.reverseSync(res1PSW.group_data_id);
      this.form.reset();
    },err => {
      });
      
     }else{
      this.dataExists = true;
      this.displayLoader();
      this.patientService.addUser(res1User.users_id,user_name,psw,res1PSW.group_data_id,res1PSW.social_worker_id,res1Super.users_id,res1Info.first_name,res1PSW.taluka_id).then(() => {
        let result =this.offlineManager.fetchServerNotes();
       
         setTimeout(()=>{
           this.dismissLoader();
           this.router.navigate(['/dashboard']); 
          }, 5000);

         this.form.reset();
       },err => {

         });
     
     }
  },
  error  => {
 
  console.log("Error", JSON.stringify(error));
  
  });


}

//old api to get the supervisor metadata
getMetaDataSupervisor(user_id,role){
  
  this.serverService.getMetaData(user_id,role).subscribe(data  => {
   
    this.super_array = data;
    sessionStorage.setItem("user_name",this.super_array.user.first_name);
    sessionStorage.setItem("group_data_id",this.super_array.group_data.group_data_id);
    sessionStorage.setItem("supervisor_id",this.super_array.supervisor.supervisor_id);
    this.router.navigate(['/supervisor-dashboard']);
    
  },
  error  => {
    alert("Server error");
  });
}

forgot_password(){
  this.router.navigate(['/forgot-password']);
}
//direct login using static valid username and password entries
logForm3(){

  this.loginObj.user_name = this.form.get('u_name').value;
  this.loginObj.password = this.form.get('psw').value;
  if((this.loginObj.user_name != "") || (this.loginObj.password != "") || (this.loginObj.user_name != "" && this.loginObj.password!="")){
    if((this.loginObj.user_name == "test101") && (this.loginObj.password == "123")){
    let user_id = 23;
    
    sessionStorage.setItem("role","psw")
    sessionStorage.setItem("sw_id",JSON.stringify(user_id));
    this.router.navigate(['/dashboard']);
        this.form.reset();
    }else{
      this.snackBar.open('Invalid Login', 'x', {
            duration: 10000,
          });
    }
  }
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
//get the supervisor metadata
getMetaDataSupervisor1(user_id,role){
  //this.serverService.getMetaData1(user_id,role).subscribe(data  => {

  this.serverService.getMetaData1(user_id,role).subscribe(data  => {
  
    this.super_array = data;

    let group_array:any;
    let psw_array:any;
    let group_aray2 = [];
    
    group_array = this.super_array.group_data;
    psw_array = this.super_array.group_data;
     
    for(var i= 0;i<group_array.length;i++){

      group_aray2.push(group_array[i].group_data_id)
    }
    sessionStorage.setItem("group_data",JSON.stringify(group_aray2));
    
    sessionStorage.setItem("user_name",this.super_array.user.first_name);
    //sessionStorage.setItem("group_data_id",this.super_array.group_data.group_data_id);
    sessionStorage.setItem("supervisor_id",this.super_array.supervisor.supervisor_id);
    this.router.navigate(['/supervisor-dashboard']);
    
  },
  error  => {
    alert("Server error");
  });
}

reverseSync(group_data_id){
  this.serverService.getAllPatientsToDevice(group_data_id)
  .subscribe(
  data  => {

    //data to be saved to device db from server
    if(data){
      let patientObj : any;
      let clinical_visits :any
      let tasks1 :any;
      let notes1 :any;
      let udid_info1 :any;
      patientObj = data[0].patientObj;
      clinical_visits = data[0].clinical_visits;
      tasks1 = data[0].tasks;
      notes1 = data[0].notes;
      
      udid_info1 = data[0].udid_info;
      this.patientService.reverseSync(patientObj,clinical_visits,tasks1,notes1,udid_info1).then((res1) => {
        this.dismissLoader();
        this.router.navigate(['/dashboard']);
      })
  }
  },error=>{
    //no data to save to device db
    this.dismissLoader();
    this.router.navigate(['/dashboard']);
  });

}

}
