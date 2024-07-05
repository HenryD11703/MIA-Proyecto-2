import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AbstractControl, FormsModule, ValidationErrors } from '@angular/forms';
import { ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterOutlet, RouterModule } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
import { UserService } from '../../../services/user.service';
import { OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-turista',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    RouterOutlet
  ],
  templateUrl: './turista.component.html',
  styleUrl: './turista.component.scss'
})
export class TuristaComponent implements OnInit {
  usuario!: string;
  nombre!: string;
  correo!: string //the ! tells TypeScript that the variable is defined, and cant be null
  imagen!: string;
  
  constructor(
    private http: UserService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(params => {
      this.usuario = params['usuario'];
      this.nombre = params['nombre'];
      this.correo = params['correo'];
      this.imagen = params['imagen'];
    });
  }

  redirectToScheduleTrip() {
    this.router.navigate(['/renta'], { queryParams: { usuario: this.usuario, nombre: this.nombre, correo: this.correo, imagen: this.imagen } });
  }

  redirectToViewTrips() {
    this.router.navigate(['/usuario/verviajes'], { queryParams: { usuario: this.usuario, nombre: this.nombre, correo: this.correo, imagen: this.imagen } });
  }

  logout() {
    //en este caso solo se redirige al login
    this.router.navigate(['/login']);
  }
  //normalmente se debería hacer un post, que envíe la información de la sesión al backend
  // y ya este se encargue de cerrar la sesión y redirigir al login


}
