import { Component, OnInit } from '@angular/core';
import { ViewChild,Input, Output, EventEmitter, ViewEncapsulation  } from '@angular/core';
import {FormBuilder,FormControl,FormGroupDirective,NgForm, FormGroup, Validators,ValidatorFn} from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import { Router } from '@angular/router';
import { ServerService } from 'src/app/services/server.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {MatSnackBar} from '@angular/material/snack-bar';
import {  MatIcon } from  '@angular/material/icon';

interface supervisor_optons {
  value: any;
  viewValue: string;
}

@Component({
  selector: 'app-edit-taluk',
  templateUrl: './edit-taluk.page.html',
  styleUrls: ['./edit-taluk.page.scss'],
})
export class EditTalukPage implements OnInit {

  constructor(private _formBuilder: FormBuilder,private router: Router,
    private serverService: ServerService,
   private http: HttpClient,private snackBar: MatSnackBar) { }

   editTalukform1:FormGroup;
   taluka_id;
   taluk_data:any;
   supervisor_array:any;
   supervisor_array1:any;
   group_array:any;
   supervisorId;
   selectedSuper;
   showSpinner = false;
   isDisabled = false;

  ngOnInit() {
    this.editTalukform1 =new FormGroup({
      district: new FormControl('',[Validators.required]),
      taluk: new FormControl('',[Validators.required]),
      supervisor: new FormControl('',[Validators.required]),
    });
  }

  ionViewWillEnter() {
    this.isDisabled = false;
    this.showSpinner = true;
    this.supervisorId;
    this.taluka_id = sessionStorage.getItem("taluka_id");
    
    this.getTalukDetails();
    this.getAllSupervisors();
    this.getAllTalukasPswsTalukasupervisors();
  }


  back(){
    this.router.navigate(['admin-manage-taluk']);
  }

  selectedSupervisor(event){

    this.selectedSuper = event;
    
  }
  
  editTaluk(form1){
    this.isDisabled = true;
    let edittaluakObj = {
      "taluka_name":this.editTalukform1.get('taluk').value,
      "taluka_details": this.editTalukform1.get('district').value,
     
    }
    
    this.serverService.editTaluk(edittaluakObj,this.taluka_id,this.selectedSuper).subscribe(data  => {
     
      this.router.navigate(['admin-manage-taluk']);
    },
    error  => {
      console.log(error);
     
      this.router.navigate(['admin-manage-taluk']);
    });
  }

  getTalukDetails(){
    this.serverService.getTaluka(this.taluka_id).subscribe(data  => {
      this.showSpinner = false;
      this.taluk_data = data;
       //replace this data with the REST call data
      this.editTalukform1.get('district').setValue(this.taluk_data[0].taluka_details);
      this.editTalukform1.get('taluk').setValue(this.taluk_data[0].taluka_name);
      
    },
    error =>{

    })
   
  }

  //to get all supervisors
getAllSupervisors(){
    
  this.serverService.getSupervisors().subscribe(data  => {

    this.supervisor_array = data;

},
error  => {
console.log("Error", JSON.stringify(error));

})
}

async getAllTalukasPswsTalukasupervisors(){
  let taluk_array_first :any;
  let test = await this.serverService.getAllTalukasPswsTalukasupervisors().toPromise().then(result3 => {
   
    taluk_array_first=result3;

 });


  this.group_array = taluk_array_first[0].group_data;
  this.supervisor_array1 = taluk_array_first[0].supervisor;

console.log(this.taluka_id)
   for(var m =0;m<this.group_array.length;m++){
     if(this.taluka_id == this.group_array[m].taluka_id){
       this.supervisorId = this.group_array[m].supervisor_id;

     }
     
  }
 
  for(var n =0; n<this.supervisor_array1.length; n++){
    if(this.supervisorId == this.supervisor_array1[n].supervisor_id){
      this.editTalukform1.get('supervisor').setValue(this.supervisor_array1[n].supervisor_id);

    }
    
 }
}

  supervisors: supervisor_optons[] = [
    {value: 1, viewValue: 'Supervisor1'},
    {value: 2, viewValue: 'Supervisor2'},
    {value: 3, viewValue: 'Supervisor3'}
  ]

}
