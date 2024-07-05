import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AbstractControl, FormsModule, ValidationErrors } from '@angular/forms';
import { ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterOutlet, RouterModule } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-reg-recepcionista',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    RouterOutlet
  ],
  templateUrl: './reg-recepcionista.component.html',
  styleUrl: './reg-recepcionista.component.scss'
})
export class RegRecepcionistaComponent {
  showPassword = false;
  showConfirmPassword = false;
  passwordTooShort = false;
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
    nombre: new FormControl('', Validators.required),
    usuario: new FormControl('', Validators.required),
    correo: new FormControl('', Validators.email),
    contrasena: new FormControl('', Validators.minLength(8)),
    confirmar_contraseña: new FormControl('', Validators.minLength(8)),
    tipo: new FormControl('Recepcionista') 
  });

  registerRec() {
    if (this.form_register.valid) {
      if (this.form_register.value.contrasena === this.form_register.value.confirmar_contraseña) {
        this.http.consult_post('/recepcion/register', this.form_register.value).subscribe({
          next: (data: any) => {
            if (data.status) {
              alert('Usuario registrado');
              console.log('Usuario registrado');
              this.goToAdmin();
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
  goToAdmin() {
    this.router.navigate(['/gestion/usuarios']);
  }
}
