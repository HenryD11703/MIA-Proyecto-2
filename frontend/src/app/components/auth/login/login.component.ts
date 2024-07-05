import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import Swal from 'sweetalert2';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    RouterOutlet
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  showPassword = false;
  constructor(
    private http: UserService,
    private router: Router
  ) { }

  form_login = new FormGroup({
    usuario: new FormControl('', Validators.required),
    contrasena: new FormControl('', Validators.required)
  });

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  login() {
    if (this.form_login.valid) {

      this.http.consult_post('/usuario/login', this.form_login.value).subscribe({
        next: (response: any) => {
          if (response.status) {
            Swal.fire({
              icon: 'success',
              title: 'Inicio de sesión exitoso',
              text: 'Bienvenido de vuelta.'
            });
            console.log('Inicio de sesión exitoso:', response.data);
            this.gotoHomeTipo(response.data.tipo, response.data.nombre, response.data.usuario, response.data.correo, response.data.imagen);
          } else {
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: response.msg
            });
          }
        },
        error: (error) => {
          console.error('Error en el login:', error);
          let errorMessage = 'Hubo un problema al intentar iniciar sesión. Por favor, intenta de nuevo.';
          if (error.status === 200) {
            errorMessage = 'Usuario no encontrado :(. Por favor, verifica tus credenciales.';
          }
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: errorMessage
          });
        }
      });

    } else {
      Swal.fire({
        icon: 'warning',
        title: 'Campos incompletos',
        text: 'Por favor, completa todos los campos requeridos.'
      });
    }
  }

  gotoRegister() {
    this.router.navigate(['/register']);
  }

  gotoHomeTipo(tipo: string, nombre: string, usuario: string, correo: string, imagen?: string) {
    switch (tipo) {
      case 'Turista':
        this.router.navigate(['/usuario/turista'], { queryParams: { usuario: usuario, nombre: nombre, correo: correo, imagen: imagen } });
        //imagen sera un link del bucket de aws que se obtiene al registrarse y se muestra como foto de perfil en los datos de usuario
        break;
      case 'Administrador':
        this.router.navigate(['/admin/principal']);
        break;
      case 'Recepcionista':
        this.router.navigate(['/recepcionista/principal']);
        break;
    }
  }
}
