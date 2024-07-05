import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterOutlet, RouterModule } from '@angular/router';
import { UserService } from '../../../../app/services/user.service';
import Swal from 'sweetalert2'
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-gestonviajes',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    RouterOutlet
  ],
  templateUrl: './gestonviajes.component.html',
  styleUrl: './gestonviajes.component.scss'
})
export class GestonviajesComponent {
  constructor(
    private http: UserService,
    private router: Router
  ) { }

  goToAdminPrincipal() {
    this.router.navigate(['/admin/principal']);
  }
  goToUsuarios() {
    this.router.navigate(['/gestion/usuarios']);
  }
  goToAutos() {
    this.router.navigate(['/gestion/autos']);
  }
  goToCrearViaje() {
    this.router.navigate(['/viajesreg']);
  }
  goToListaViajes() {
    this.router.navigate(['/admin/listas/viajes']);
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }
  goToTodasLasReservas() {
    this.router.navigate(['/admin/listas/reservas']);
  }
}
