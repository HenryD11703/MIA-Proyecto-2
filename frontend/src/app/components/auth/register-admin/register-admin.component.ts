import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AbstractControl, FormsModule, ValidationErrors } from '@angular/forms';
import { ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterOutlet, RouterModule } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
import { UserService } from '../../../services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register-admin',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    RouterOutlet
  ],
  templateUrl: './register-admin.component.html',
  styleUrl: './register-admin.component.scss'
})
export class RegisterAdminComponent implements OnInit {
  showPassword = false;
  showConfirmPassword = false;
  passwordTooShort = false;
  constructor(
    private http: UserService,
    private router: Router
  ) { }
  form_register = new FormGroup({
    nombre: new FormControl('', Validators.required),
    usuario: new FormControl('', Validators.required),
    correo: new FormControl('', Validators.email),
    contrasena: new FormControl('', Validators.minLength(8)),
    confirmar_contraseña: new FormControl('', Validators.minLength(8)),
    tipo: new FormControl('Administrador') // Todos los usuarios creados por este formulario serán administradores
  });

  ngOnInit() {
    //Usar una pregunta en Swal para preguntar la contraseña ya que no todos los administradores pueden registrar a otros
    //Si la contraseña es correcta, se muestra el formulario de registro
    //Si la contraseña es incorrecta, se regresa a gestion/usuarios
    //Para este caso la contraseña sera "admin123"
    Swal.fire({
      title: 'Contraseña de administrador',
      input: 'password',
      inputAttributes: {
        autocapitalize: 'off'
      },
      showCancelButton: false,
      confirmButtonText: 'Aceptar',
      showLoaderOnConfirm: true,
      preConfirm: (password) => {
        if (password === 'admin123') {
          Swal.fire({
            title: 'Contraseña correcta',
            icon: 'success'
          });
        } else {
          Swal.fire({
            title: 'Contraseña incorrecta',
            icon: 'error'
          });
          this.gotoAdmin();
        }
      },
      allowOutsideClick: () => !Swal.isLoading()
    });
  }

  register() {
    if (this.form_register.valid) {
      if (this.form_register.value.contrasena === this.form_register.value.confirmar_contraseña) {
        this.http.consult_post('/usuario/register', this.form_register.value).subscribe({
          next: (data: any) => {
            if (data.status) {
              alert('Usuario registrado');
              console.log('Usuario registrado');
              this.gotoAdmin();
            } else {
              alert('Error al registrar usuario');
              console.log('Error al registrar usuario');
            }
          },
        });
      } else {
        alert('Las contraseñas no coinciden');
        console.log('Las contraseñas no coinciden');
      }
    } else {
      alert('Formulario invalido');
      console.log('Formulario invalido');
    }
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }
  toggleConfirmPasswordVisibility() {
    this.showConfirmPassword = !this.showConfirmPassword;
  }

  gotoLogin() {
    this.router.navigate(['/login']);
  }
  checkPasswordLength(): void {
    const password = this.form_register.get('contrasena')?.value;
    this.passwordTooShort = password !== null && password !== undefined && password.length < 8;
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append('file', file);
      this.http.consult_post('/usuario/upload', formData).subscribe({
        next: (data: any) => {
          if (data.status) {
            alert('Imagen subida');
            console.log('Imagen subida');
          } else {
            alert('Error al subir imagen');
            console.log('Error al subir imagen');
          }
        },
      });
    }
  }

  gotoAdmin() {
    this.router.navigate(['/gestion/usuarios']);
  }
}
