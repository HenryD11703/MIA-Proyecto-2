import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterOutlet, RouterModule } from '@angular/router';
import { UserService } from '../../../../services/user.service';
import Swal from 'sweetalert2';
import { ActivatedRoute } from '@angular/router';

interface Viaje {
  _id: string;
  agencia: string;
  origen: string;
  destino: string;
  dias: number;
  precio: number;
}

@Component({
  selector: 'app-listaviajes',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    RouterOutlet
  ],
  templateUrl: './listaviajes.component.html',
  styleUrl: './listaviajes.component.scss'
})
export class ListaviajesComponent implements OnInit {
  viajes: Viaje[] = [];
  filteredViajes: Viaje[] = [];
  sortField: keyof Viaje = 'precio';
  sortDirection: 'asc' | 'desc' = 'asc';
  searchTerm: string = '';

  constructor(
    private userService: UserService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.getViajes();
  }

  getViajes() {
    this.userService.consult_get('/admin/listaviajes').subscribe({
      next: (response: any) => {
        if (response.status) {
          this.viajes = response.viajes;
          this.filteredViajes = [...this.viajes];
          this.sortViajes();
        } else {
          console.log(response.message);
        }
      },
      error: (error) => {
        console.error('Error en la petición:', error);
      }
    });
  }

  sortViajes() {
    this.filteredViajes.sort((a, b) => {
      if (a[this.sortField] < b[this.sortField]) return this.sortDirection === 'asc' ? -1 : 1;

      if (a[this.sortField] > b[this.sortField]) return this.sortDirection === 'asc' ? 1 : -1;
      return 0;
    });
  }
  changeSort(field: keyof Viaje) {
    if (field === this.sortField) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortField = field;
      this.sortDirection = 'asc';
    }
    this.sortViajes();
  }

  searchViajes() {
    this.filteredViajes = this.viajes.filter((viaje) =>
      viaje.agencia.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      viaje.origen.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      viaje.destino.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      viaje.dias.toString().includes(this.searchTerm.toLowerCase()) ||
      viaje.precio.toString().includes(this.searchTerm.toLowerCase())
    );
  }

  regresar() {
    this.router.navigate(['/gestion/viajes']);
  }

  confirmarEliminar(viaje: Viaje) {
    Swal.fire({
      title: '¿Estás seguro?',
      text: `¿Deseas eliminar el viaje ${viaje.agencia} - ${viaje.origen} - ${viaje.destino}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí',
      cancelButtonText: 'No'
    }).then((result) => {
      if (result.isConfirmed) {
        this.eliminarViaje(viaje);
      }
    });
  }

  eliminarViaje(viaje: Viaje) {
    this.userService.consult_post('/admin/eliminarviaje', { _id: viaje._id }).subscribe({
      next: (response: any) => {
        if (response.status) {
          Swal.fire('Éxito', 'Viaje eliminado correctamente', 'success');
          this.getViajes();
        } else {
          console.log('Error al eliminar viaje:', response.message);
          Swal.fire('Error', 'No se pudo eliminar el viaje', 'error');
        }
      },
      error: (error) => {
        console.error('Error en la petición:', error);
        Swal.fire('Error', 'No se pudo eliminar el viaje', 'error');
      }
    });
  }

}
