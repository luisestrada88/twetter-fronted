import { Component } from '@angular/core';
import { UserService } from '../services/user.service';
import { User } from '../models/user/User';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.css']
})
export class NewUserComponent {

  constructor(
    private userService: UserService,
    private router: Router
  ) { }

  user: User = new User();

 createUser() {
  this.user.username = `${this.user.firstName}${this.user.lastName}`.toLowerCase();
  this.user.id = undefined; // <- clave para evitar el error
  console.log("Registrando usuario:", this.user);
  this.userService.register(this.user).subscribe({
    next: (res) => {
      console.log("Usuario registrado:", res);
      this.router.navigate(['/login']);
    },
    error: (err) => {
      console.error("Error al registrar:", err);
      alert("Error al registrar usuario.");
    }
  });
}

}
