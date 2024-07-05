import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AbstractControl, FormsModule, ValidationErrors } from '@angular/forms';
import { ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterOutlet, RouterModule } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-autos',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    RouterOutlet
  ],
  templateUrl: './autos.component.html',
  styleUrl: './autos.component.scss'
})
export class AutosComponent {

 

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
    agencia : new FormControl('', Validators.required),
    marca : new FormControl('', Validators.required),
    placa : new FormControl('', Validators.required),
    modelo : new FormControl('', Validators.required),
    precio : new FormControl('', Validators.pattern('^-?[0-9]+(\.[0-9]+)?$')), // probando con una expresion regular
    ciudad : new FormControl('', Validators.required),
  });

  //se registraran en admin/registrarauto
  registerAuto() {
    if (this.form_register.valid) {
      this.http.consult_post('/admin/registerauto', this.form_register.value).subscribe({
        next: (data: any) => {
          if (data.status) {
            alert('Auto registrado');
            console.log('Auto registrado');
          } else {
            alert('Error al registrar auto');
            console.log('Error al registrar auto');
          }
        },
      });
    } else {
      alert('Error al registrar auto');
      console.log('Error al registrar auto');
    }
  }

  goToGestionAutos(){
    this.router.navigate(['/gestion/autos']);
  }

}