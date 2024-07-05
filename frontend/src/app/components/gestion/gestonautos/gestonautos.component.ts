import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterOutlet, RouterModule } from '@angular/router';
import { UserService } from '../../../../app/services/user.service';
import Swal from 'sweetalert2'
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-gestonautos',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    RouterOutlet
  ],
  templateUrl: './gestonautos.component.html',
  styleUrl: './gestonautos.component.scss'
})
export class GestonautosComponent implements OnInit{
  numeroAutos!: number;
  constructor(
    private http: UserService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getNumeroAutos();
  }

  getNumeroAutos() {
    //usar /totalautos
    this.http.consult_get('/admin/getAutoQuantity').subscribe({
      next: (response: any) => {
        if (response.status) {
          this.numeroAutos = response.quantity;
        } else {
          console.log(response.message);
        }
      },
      error: (error) => {
        console.error('Error en la consulta de autos:', error);
      }
    });
  }

  goToAdminPrincipal() {
    this.router.navigate(['/admin/principal']);
  }
  goToUsuarios() {
    this.router.navigate(['/gestion/usuarios']);
  }
  goToViajes() {
    this.router.navigate(['/gestion/viajes']);
  }
  goToAddAuto() {
    this.router.navigate(['/autosreg']);
  }
  goToListAuto() {
    this.router.navigate(['/admin/listas/autos']);
  }
  goToLogin() {
    this.router.navigate(['/login']);
  }
}
