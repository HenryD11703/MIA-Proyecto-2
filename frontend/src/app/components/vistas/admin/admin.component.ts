import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterOutlet, RouterModule } from '@angular/router';
import { UserService } from '../../../services/user.service';
import Swal from 'sweetalert2'
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    RouterOutlet
  ],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss'
})
export class AdminComponent implements OnInit{

  touristQuantity: number = 0;
  autosQuantity: number = 0;
  tripsQuantity: number = 0;

  constructor(
    private http: UserService,
    private router: Router
  ) { }
  ngOnInit(){
    this.getTouristQuantity();
    this.getAutoQuantity();
    this.getTripsQuantity();
  }

  goToUserG() {
    this.router.navigate(['/gestion/usuarios']);
  }
  goToAutoG() {
    this.router.navigate(['/gestion/autos']);
  }
  goToViajeG() {
    this.router.navigate(['/gestion/viajes']);
  }

  getTouristQuantity() {
    this.http.consult_get('/admin/getTouristQuantity').subscribe({
      next: (data: any) => {
        if (data.status) {
          this.touristQuantity = data.quantity;

        } else {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'No se pudo obtener la cantidad de turistas'
          });
        }
      },
      error: (error) => {
        console.error('Error en la petición:', error);
      }
    })
  }

  getAutoQuantity() {
    this.http.consult_get('/admin/getAutoQuantity').subscribe({
      next: (data: any) => {
        if (data.status) {
          this.autosQuantity = data.quantity;

        } else {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'No se pudo obtener la cantidad de autos'
          });
        }
      },
      error: (error) => {
        console.error('Error en la petición:', error);
      }
    })
  }

  getTripsQuantity() {
    this.http.consult_get('/admin/getTripsQuantity').subscribe({
      next: (data: any) => {
        if (data.status) {
          this.tripsQuantity = data.quantity;

        } else {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'No se pudo obtener la cantidad de viajes'
          });
        }
      },
      error: (error) => {
        console.error('Error en la petición:', error);
      }
    })
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }
}
