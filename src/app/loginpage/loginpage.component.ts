import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';

import { AuthService } from './login.service';
import { Credentials } from './login.model';


@Component({
  selector: 'app-loginpage',
  templateUrl: './loginpage.component.html',
  styleUrls: ['./loginpage.component.css']
})
export class LoginpageComponent implements OnInit {
  overlayImage:any = '../assets/img/login-bg-overlay.png';
  loginBottom:any = '../assets/img/login-bg-overlay.png';
  reminderLogo:any = '../assets/img/365-logo.png';
  lineRight:any = '../assets/img/login-lines-right.png';
  lineLeft:any = '../assets/img/login-lines-left.png';

  

  credentials: Credentials;
  form:FormGroup
  constructor(private auth: AuthService, private fb: FormBuilder) {
   this.form = this.fb.group({
    username:'',
    password:''
  })
}
  
onLogin() {
    this.auth.login();
    // console.log(credentials)
  }

// onLogin(credentials) {
//     this.auth.login(credentials);
//   }

  

  ngOnInit() {
  }

}
