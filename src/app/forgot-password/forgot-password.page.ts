import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { FormGroup, FormControl,Validators, FormBuilder} from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from "@angular/material/snack-bar";
import { MatInputModule } from '@angular/material/input';
import { ServerService } from 'src/app/services/server.service';
import { LoadingController } from '@ionic/angular';
@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.page.html',
  styleUrls: ['./forgot-password.page.scss'],
})
export class ForgotPasswordPage implements OnInit {

  passwordForm:FormGroup;
  usernameForm:FormGroup;
  error_value = false;
  forgotuser_value = true;
  username_error_value = false;
  error_disp = '';

  constructor(private router: Router,private formBuilder: FormBuilder,public snackBar: MatSnackBar,
    private serverService: ServerService,private loadingCtrl: LoadingController) { }

  ngOnInit() {
    this.passwordForm =new FormGroup({
      username: new FormControl('',[Validators.required]),
  })

  this.usernameForm =new FormGroup({
    email: new FormControl('',[Validators.required]),
})
  }

  forgotUser() {
    this.forgotuser_value = false;
    this.username_error_value = false;
    this.error_disp = '';
  }
  
  forgotPass() {
    this.forgotuser_value = true;
  }

  forgotPassword(passwordForm){
    this.displayLoader();
    this.serverService.forgotPassword(passwordForm.value.username).subscribe(data  => {
     
      this.dismissLoader();
      this.router.navigate(['']);
    },error =>{
      this.dismissLoader();
      this.router.navigate(['']);
      this.snackBar.open('Link sent to mail', 'x', {
        duration: 3000,
        
      });
    });

  }

  forgotUsername(usernameForm){
    this.displayLoader();
    
    this.serverService.forgotUsername(usernameForm.value.email).subscribe(data  => {
      this.dismissLoader();
      this.router.navigate(['']);
    },error =>{
      this.dismissLoader();
      this.router.navigate(['']);
      this.snackBar.open('Link sent to mail', 'x', {
        duration: 3000,
        
      });
    });

  }

  displayLoader(){
    this.loadingCtrl.create({
      message: 'Please wait...'
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
}
