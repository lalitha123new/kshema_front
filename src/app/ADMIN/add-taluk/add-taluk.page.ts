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
  selector: 'app-add-taluk',
  templateUrl: './add-taluk.page.html',
  styleUrls: ['./add-taluk.page.scss'],
})
export class AddTalukPage implements OnInit {
  form1:FormGroup;
  supervisor_array:any;
  constructor(private _formBuilder: FormBuilder,private router: Router,
     private serverService: ServerService,
    private http: HttpClient,private snackBar: MatSnackBar) { }

    selectedSuper;

  ngOnInit() {
    this.form1 =new FormGroup({
      district: new FormControl('',[Validators.required]),
      taluk: new FormControl('',[Validators.required]),
      supervisor: new FormControl('',[Validators.required]),
    });
  }

  ionViewWillEnter(){
    
  this.getAllSupervisors();
  this.form1 =new FormGroup({
    district: new FormControl('',[Validators.required]),
    taluk: new FormControl('',[Validators.required]),
    supervisor: new FormControl('',[Validators.required]),
  });

}

  //to get all supervisors
  getAllSupervisors(){
      
    this.serverService.getSupervisors()
  .subscribe(data  => {

      this.supervisor_array = data;

  },
  error  => {
  console.log("Error", JSON.stringify(error));

  })
  }

  back(){
    this.router.navigate(['admin-manage-taluk']);
  }

  selectedSupervisor(event){

    this.selectedSuper = event;

  }
  
  createTaluk(form1){
    
    let talukaObj = {
      
      "taluka_master_id":0,
      "taluka_name":form1.value.taluk,
      "taluka_details":form1.value.district,
      "created_at":""
     

    }
    
    this.serverService.createTaluk(talukaObj,this.selectedSuper)
    .subscribe(
    data  => {

      this.router.navigate(['admin-manage-taluk']);

    },
    error  => {
      console.log(error);

      this.router.navigate(['admin-manage-taluk']);
    });
  }
  
  supervisors: supervisor_optons[] = [
    {value: 1, viewValue: 'Supervisor1'},
    {value: 2, viewValue: 'Supervisor2'},
    {value: 3, viewValue: 'Supervisor3'}
  ]
}
