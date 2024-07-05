import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AbstractControl, FormsModule, ValidationErrors } from '@angular/forms';
import { ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterOutlet, RouterModule } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
import { UserService } from '../../../services/user.service';
import Swal from 'sweetalert2';

// ng g c components/auth/register
@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    RouterOutlet
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  showPassword = false;
  showConfirmPassword = false;
  passwordTooShort = false;

  imagen: any = '';
  imagen_path: any = '';
  ruta_aws:any = '';

  constructor(
    private http: UserService,
    private router: Router
  ) { }

  // Validators.required is a built-in Angular validator that checks if the input is empty
  // Validators.email is a built-in Angular validator that checks if the input is a valid email
  // Validators.minLength is a built-in Angular validator that checks if the input has a minimum length
  // Validators.maxLength is a built-in Angular validator that checks if the input has a maximum length
  // Validators.pattern is a built-in Angular validator that checks if the input matches a regular expression

  form_register = new FormGroup({
    path: new FormControl(''),
    imagen: new FormControl(''),
    nombre: new FormControl('', Validators.required),
    usuario: new FormControl('', Validators.required),
    correo: new FormControl('', Validators.email),
    contrasena: new FormControl('', Validators.minLength(8)),
    confirmar_contraseña: new FormControl('', Validators.minLength(8)),
    tipo: new FormControl('Turista') // Todos los usuarios creados por este formulario serán turistas
  });

  register() {
    if (this.form_register.valid) {
      if (this.form_register.value.contrasena === this.form_register.value.confirmar_contraseña) {

        const index = this.imagen_path.indexOf(",");
        this.imagen_path = this.imagen_path.slice(index + 1);
        this.form_register.value.imagen = this.imagen_path;
        this.form_register.value.path = this.imagen.name;
      
        console.log(this.form_register.value);

        this.http.consult_post('/usuario/register', this.form_register.value).subscribe({
          next: (data: any) => {
            if (data.status) {
              Swal.fire({
                title: 'Usuario registrado',
                text: 'Usuario registrado correctamente',
                icon: 'success',
                confirmButtonText: 'Ok'
              });
              console.log(data.image);
              this.ruta_aws = data.image;
              console.log('Usuario registrado');
              this.gotoLogin();
            } else {
              Swal.fire({
                title: 'Error al registrar usuario',
                text: 'Error al registrar usuario',
                icon: 'error',
                confirmButtonText: 'Ok'
              });
              console.log('Error al registrar usuario');
            }
          },
        });
      }else{
        Swal.fire({
          title: 'Las contraseñas no coinciden',
          text: 'Las contraseñas no coinciden',
          icon: 'error',
          confirmButtonText: 'Ok'
        });
        console.log('Las contraseñas no coinciden');
      }
    } else {
      Swal.fire({
        title: 'Formulario invalido',
        text: 'Formulario invalido',
        icon: 'error',
        confirmButtonText: 'Ok'
      });
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

  onFileSelected(event: any){
    // Seleccionar el archivo y convertirlo a base64
    this.imagen = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (event:any) => {
      this.imagen_path = event.target.result;
    }
    reader.readAsDataURL(this.imagen);
  }


  encodeFileAsBase64(file:any){
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.addEventListener('loadend', () =>{
        resolve(reader.result);
      });
      reader.readAsDataURL(file);
    });
  }

}
