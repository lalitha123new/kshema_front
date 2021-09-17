import { Component,OnInit,ViewChild } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {FormBuilder,FormControl,FormGroupDirective,NgForm, FormGroup, Validators} from '@angular/forms';
import {Location} from '@angular/common';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { ServerService } from 'src/app/services/server.service';
import { UUID } from 'angular2-uuid';


@Component({
  selector: 'app-super-notes',
  templateUrl: './super-notes.page.html',
  styleUrls: ['./super-notes.page.scss'],
})
export class SuperNotesPage implements OnInit {
  displayedColumns: string[] = ['name','notes_message','date'];

  dataSource= new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
  @ViewChild(MatPaginator) paginator: MatPaginator;

  newNote = false;
  patientArray:any;
  notes1;
  patient_uuid;
  super_id1;
  super_id;
  group_data_id1;
  group_data_id;
  allPatients_array1:any;
  allPatients_array:any;


  constructor(private _formBuilder: FormBuilder,private _location: Location,
    private router: Router,
   private loadingCtrl: LoadingController,private serverService: ServerService) { }
   user_name;
   group_data_array:any;
   sw_group_id;
   sw_id;

  ngOnInit() {
  }

  ionViewWillEnter() {
   
    this.user_name = sessionStorage.getItem("user_name");
    this.super_id1 = sessionStorage.getItem("supervisor_id");
    this.super_id = parseInt(this.super_id1);
   
    this.group_data_id1 = sessionStorage.getItem("group_data_id");
    this.group_data_id = parseInt(this.group_data_id1);
    this.getGroupData(this.super_id);
    this.getAllPatients(this.group_data_id);
    this.getAllNotes();
    
    
   }

   async getGroupData(supervisor_id){
    let group_array_first :any;
    let test = await this.serverService.getGroupData(supervisor_id).toPromise().then(result1 => {
     
      group_array_first=result1;

   });

     this.group_data_array = group_array_first;
   
  }

  async getAllPatients(group_data_id){
   let patients_array_first :any;
    let test = await this.serverService.getPatitents(group_data_id).toPromise().then(result2 => {
     
      patients_array_first=result2;

   });
 
      
      this.allPatients_array = patients_array_first;
      for(var m=0;m<this.allPatients_array.length;m++){
        this.allPatients_array[m].patient_uuid = this.allPatients_array[m].patientObj.patient_uuid;
        this.allPatients_array[m].name = this.allPatients_array[m].patientObj.name;
        this.allPatients_array[m].group_id = this.allPatients_array[m].patientObj.group_data_id;

      }
      
  
  }

  async getAllNotes(){
    let allnotes_array_first :any;
      let test = await this.serverService.getAllNOtifications(this.super_id).toPromise().then(result3 => {
      
        allnotes_array_first=result3;
      

    });
    let date_array = [];
    let new_array = [];
    let notes_uuid_array = [];
  
      
      this.patientArray = allnotes_array_first;
      let resultArray1 :any;
        resultArray1 = this.allPatients_array;
      
      for(var arr in resultArray1){
        for(var filter in this.patientArray){
            if(resultArray1[arr].patient_uuid == this.patientArray[filter].patient_uuid){
              new_array.push(resultArray1[arr]);
              this.patientArray[filter].name = resultArray1[arr].name;
              
              }
        }
      }
  
      for(var i = 0;i<this.patientArray.length;i++){
        this.patientArray[i].date = this.patientArray[i].createdAt;
        if(this.patientArray[i].read_flag == 1){
          notes_uuid_array.push(this.patientArray[i].notes_uuid);
          }
      
      }
      this.dataSource.data = this.patientArray;

      //paginator code
      this.dataSource.paginator = this.paginator;
      
      for(var m=0;m<notes_uuid_array.length;m++){
        this.updateNotesStatus(notes_uuid_array[m])
        }
    
  
  }


  addNewNote(){
    this.newNote = true;
  }

  changePatient(value) {
    
    this.patient_uuid = value;
    for(var k=0;k<this.allPatients_array.length;k++){
      if(this.patient_uuid == this.allPatients_array[k].patient_uuid){
        
        this.sw_group_id = this.allPatients_array[k].group_id; 
       
      }
    }
    for(var n=0;n<this.group_data_array.length;n++){
      if(this.sw_group_id == this.group_data_array[n].group_data_id){
        this.sw_id = this.group_data_array[n].social_worker_id; 
      }
    }

   
  }


home(){
  this.router.navigate(['supervisor-dashboard']);
}


logout(){
  this.router.navigate(['']);
}


 //update the read status from this page in local db 
 updateNotesStatus(notes_uuid){
  this.serverService.updateNotesStatus(notes_uuid).subscribe(
    data  => {
     
  });
}


sendNotes(){
  const today = new Date();
  const notes_uuid =  UUID.UUID();
  var date = new Date();
    let dateStr =
       
        date.getFullYear() + "-"+("00" + (date.getMonth() + 1)).slice(-2) + "-" +("00" + date.getDate()).slice(-2) + " " +
        ("00" + date.getHours()).slice(-2) + ":" +
        ("00" + date.getMinutes()).slice(-2) + ":" +
        ("00" + date.getSeconds()).slice(-2);

        let notesObj = {
          "notes_uuid" :notes_uuid,
          "notes_message":this.notes1,
          "read_flag":1,
          "patient_uuid":this.patient_uuid,
          "sender_user_id": this.super_id,
          "recipient_user_id":this.sw_id,
          "createdAt":dateStr
      }

    this.loadingCtrl
    .create({
      message: 'Saving Notes data...'
    })
    .then(loadingEl => {
      loadingEl.present();
 
      this.serverService.addNotes(notesObj) .subscribe(
        data  => {
      
      loadingEl.dismiss();
      //window.location.reload();
      this.router.navigate(['supervisor-dashboard']);

      },err => {
        console.log(err);
      
      });
      loadingEl.dismiss();
                
      });
}

}

export interface PeriodicElement {
  name: string;
  notes_message:string;
  date:string;
 
  
}


const ELEMENT_DATA: PeriodicElement[] = [
  {name:'',notes_message:'',date:'25-02-2021'},
 
  
];
