import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AbstractControl, FormsModule, ValidationErrors } from '@angular/forms';
import { ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterOutlet, RouterModule } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
import { UserService } from '../../../services/user.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-viajes',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    RouterOutlet
  ],
  templateUrl: './viajes.component.html',
  styleUrl: './viajes.component.scss'
})
export class ViajesComponent {

  constructor(
    private http: UserService,
    private router: Router
  ) { }

  form_register = new FormGroup({
    agencia : new FormControl('', Validators.required),
    origen : new FormControl('', Validators.required),
    destino : new FormControl('', Validators.required),
    dias : new FormControl('', Validators.required),
    precio : new FormControl('', Validators.pattern('^-?[0-9]+(\.[0-9]+)?$'))
  });

  registerViaje() {
    if (this.form_register.valid) {
      this.http.consult_post('/admin/registerviaje', this.form_register.value).subscribe({
        next: (data: any) => {
          if (data.status) {
            Swal.fire({
              icon: 'success',
              title: 'Viaje registrado',
              text: 'Viaje registrado exitosamente.'
            });
            console.log('Viaje registrado');
          } else {
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: 'Error al registrar viaje.'
            });
            console.log('Error al registrar viaje');
          }
        },
      });
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Formulario invalido.'
      });
    }
  }
  Regresar() {
    this.router.navigate(['/gestion/viajes']);
  }

}
