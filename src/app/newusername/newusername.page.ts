import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { FormGroup, FormControl,Validators, FormBuilder} from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from "@angular/material/snack-bar";
import { MatInputModule } from '@angular/material/input';
import { ServerService } from 'src/app/services/server.service';
@Component({
  selector: 'app-newusername',
  templateUrl: './newusername.page.html',
  styleUrls: ['./newusername.page.scss'],
})
export class NewusernamePage implements OnInit {

  constructor(private router: Router,private formBuilder: FormBuilder,public snackBar: MatSnackBar,
    private serverService: ServerService) { }
    usernameForm:FormGroup;
    email_old ="";
  
    ngOnInit() {
      var url_path=this.router.url;
      var arr=url_path.split("?");
      var arr1=arr[1].split("=");
      var dec = atob(decodeURIComponent(arr1[1]));
      this.email_old = dec;
   
      this.usernameForm =new FormGroup({
        email: new FormControl(this.email_old,[Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"),Validators.required]),
        username: new FormControl('',[Validators.required]),
       
      
    })
   
    
    }
    
    ionViewWillEnter() {
      this.usernameForm.get('email').setValue(this.email_old);
    }

    newusername(usernameForm){
    
        this.serverService.newUsername(usernameForm.value.username,usernameForm.value.email).subscribe(data  => {
          this.snackBar.open('Successfully reset password', 'x', {
            duration: 10000,
          });
          this.router.navigate(['']);
        },
        error  => {
          this.snackBar.open('Successfully reset password', 'x', {
            duration: 3000,
            
          });
          this.router.navigate(['']);
         
        });
      
      }
}
