import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterOutlet, RouterModule } from '@angular/router';
import { UserService } from '../../../../services/user.service';
import Swal from 'sweetalert2';
import { ActivatedRoute } from '@angular/router';



interface Reserva {
  _id: string;
  origen: string;
  destino: string;
  dias: number;
  precio: number;
  agencia_auto: string | null
  marca: string | null
  placa: string | null
  modelo: string | null
  precio_auto: number | null
  ciudad_auto: string | null
  usuario: string;
  aprobado: boolean | null
}

@Component({
  selector: 'app-listareservas',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    RouterOutlet
  ],
  templateUrl: './listareservas.component.html',
  styleUrl: './listareservas.component.scss'
})
export class ListareservasComponent implements OnInit {

  reservas: Reserva[] = [];
  filteredReservas: Reserva[] = [];
  sortField: keyof Reserva = '_id'
  sortDirection: 'asc' | 'desc' = 'asc';
  searchTerm: string = '';

  constructor(
    private userService: UserService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.getReservas();
  }

  getReservas() {
    this.userService.consult_get('/admin/listareservas').subscribe({
      next: (response: any) => {
        if (response.status) {
          this.reservas = response.reservas;
          console.log(this.reservas);
          this.filteredReservas = [...this.reservas];
        } else {
          console.log(response.message);
        }
      },
      error: (error) => {
        console.error('Error en la petición:', error);
      }
    });
  }

  changeSort(field: keyof Reserva) {
    if (field === this.sortField) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortField = field;
      this.sortDirection = 'asc';
    }
  }

  searchReservas() {
    this.filteredReservas = this.reservas.filter((reserva) => {
      return Object.values(reserva).join('').toLowerCase().includes(this.searchTerm.toLowerCase());
    });
  }

  eliminarReserva(reserva: Reserva) {
    console.log(reserva._id);
    this.userService.consult_post('/admin/eliminarreserva', { _id: reserva._id }).subscribe({
      next: (response: any) => {
        if (response.status) {
          Swal.fire('Reserva eliminada', 'La reserva ha sido eliminada', 'success');
          this.getReservas();
        } else {
          Swal.fire('Error', 'No se pudo eliminar la reserva', 'error');
        }
      },
      error: (error) => {
        console.error('Error en la petición:', error);
      }
    });
  }

  regresar() {
    this.router.navigate(['/gestion/viajes']);
  }

  confirmarEliminar(reserva: Reserva) {
    Swal.fire({
      title: '¿Estás seguro?',
      text: `¿Deseas eliminar la reserva ${reserva._id}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí',
      cancelButtonText: 'No'
    }).then((result) => {
      if (result.isConfirmed) {
        this.eliminarReserva(reserva);
      }
    });
  }

}
