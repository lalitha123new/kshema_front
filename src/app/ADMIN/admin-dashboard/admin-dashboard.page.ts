import { Component, OnInit } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { FormGroup, FormControl,Validators, FormBuilder} from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { ServerService } from 'src/app/services/server.service';


@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.page.html',
  styleUrls: ['./admin-dashboard.page.scss'],
})
export class AdminDashboardPage implements OnInit {

sw_no = 0;
supervisor = 0;
taluk_array:any;
taluk_count = 0;
showSpinner = false;
  
  constructor(private formBuilder: FormBuilder,private router: Router,private serverService: ServerService) { }

  ngOnInit() {

  }

  ionViewWillEnter() {
    this.showSpinner = true;
    this.getAllUsers();
    this.getAllTaluks();

  }

   //to get all supervisors
  getAllUsers(){
    this.serverService.getUsers().subscribe(data  => {
   
    let resultArray1 :any;
    let resultArray2 :any;
    resultArray1 = data;
    resultArray2 = data;
    resultArray1 = (resultArray1).filter(xx => xx.role === 'psw');
    resultArray2 = (resultArray2).filter(xx => xx.role === 'supervisor');
    this.sw_no = resultArray1.length;
    this.supervisor = resultArray2.length;
    
  
    });
  }


  getAllTaluks(){
    this.serverService.getAlltalukas().subscribe(data  => {
      this.showSpinner = false;
      this.taluk_array = data;
      this.taluk_count =  this.taluk_array.length
     
    },
    error => {

    })
  }

  toggleButton(i){
  
    if(i == 1){
     
      this.router.navigate(['admin-manage-sw']);
      
    }else if(i == 2){
     
      this.router.navigate(['admin-manage-supervisor']);
    }else if(i == 3){
      
      this.router.navigate(['admin-manage-taluk']);
    }

  }
  
  
 
}











