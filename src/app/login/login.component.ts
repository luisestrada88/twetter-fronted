import { Component } from '@angular/core';
import { UserService } from '../services/user.service';
import { Credential } from '../models/user/Credential';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(
    private userService: UserService,
    private router: Router
  ) { }

  email: string = "";
  password: string = "";

  callLogin() {
    const myCredential = new Credential();
    myCredential.email = this.email;
    myCredential.password = this.password;

    this.userService.login(myCredential).subscribe({
      next: (token: string) => {
        if (token) {
          localStorage.setItem('token', token);
          console.log("Token guardado:", token);
          this.router.navigate(['/tweets']);
        } else {
          alert("Login fallido: token vacío.");
        }
      },
      error: (err) => {
        console.error("Error de login:", err);
        alert("Login fallido. Verifica tus credenciales.");
      }
    });
  }
}
