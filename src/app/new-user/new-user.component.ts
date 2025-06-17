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
  // Normalizar y limpiar datos antes de enviar
  this.user.id = undefined; // evitar conflictos con la base de datos
  this.user.username = `${(this.user.firstName || '').trim()}${(this.user.lastName || '').trim()}`.toLowerCase();

  // Por si el modelo User llega a tener roles definidos manualmente, forzamos inicialización vacía
  if (!this.user['roles']) {
    this.user['roles'] = [];
  }

  console.log("Registrando usuario:", this.user);

this.userService.register(this.user).subscribe({
   next: () => {
      alert("Usuario registrado exitosamente");
      this.router.navigate(['/login']);
    },
  error: (err) => {
    const mensaje = typeof err.error === 'string' ? err.error : 'Error al registrar usuario.';
    alert(mensaje);
    console.error("Error al registrar:", err);
  }
});

}

}
