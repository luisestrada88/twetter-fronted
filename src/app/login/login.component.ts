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

  email: string = "";
  password: string = "";

  constructor(
    private userService: UserService,
    private router: Router
  ) {}

callLogin() {
  const myCredential = new Credential();
  myCredential.email = this.email;
  myCredential.password = this.password;

  this.userService.login(myCredential).subscribe({
    next: (response: any) => {
      if (response && response.token) {
        localStorage.setItem('token', response.token);
        localStorage.setItem('username', myCredential.email);
        localStorage.setItem('userId', response.userId);  // Guardar el userId
        console.log("Token guardado:", response.token);
        this.router.navigate(['/home']);
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
