import { Component } from '@angular/core';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})

export class ForgotPasswordComponent {

  email : String = "";

  constructor( private userService: UserService,
               private router: Router)
  {
  }
  resetPassword() {
    console.log(this.email);


  }
}
