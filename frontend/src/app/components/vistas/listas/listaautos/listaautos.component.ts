import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterOutlet, RouterModule } from '@angular/router';
import { UserService } from '../../../../services/user.service';
import Swal from 'sweetalert2';
import { ActivatedRoute } from '@angular/router';

interface Auto {
  _id: string;
  agencia: string;
  marca: string;
  placa: string;
  modelo: string;
  precio: number;
  ciudad: string;
}

@Component({
  selector: 'app-listaautos',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    RouterOutlet
  ],
  templateUrl: './listaautos.component.html',
  styleUrl: './listaautos.component.scss'
})
export class ListaautosComponent implements OnInit{
  autos: Auto[] = [];
  filteredAutos: Auto[] = [];
  sortField: keyof Auto = 'marca';
  sortDirection: 'asc' | 'desc' = 'asc';
  searchTerm: string = '';

  constructor(
    private userService: UserService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.getAutos();
  }

  getAutos() {
    this.userService.consult_get('/admin/getautos').subscribe({
      next: (response: any) => {
        if (response.status) {
          this.autos = response.autos;
          this.filteredAutos = [...this.autos];
          this.sortAutos();
        } else {
          console.log(response.message);
        }
      }
    });
  }

  sortAutos() {
    this.filteredAutos.sort((a, b) => {
      if (a[this.sortField] < b[this.sortField]) return this.sortDirection === 'asc' ? -1 : 1;
      if (a[this.sortField] > b[this.sortField]) return this.sortDirection === 'asc' ? 1 : -1;
      return 0;
    });
  }

  changeSort(field: keyof Auto) {
    if (field === this.sortField) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortField = field;
      this.sortDirection = 'asc';
    }
    this.sortAutos();
  }

  searchAutos() {
    this.filteredAutos = this.autos.filter(auto => 
      auto.marca.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      auto.placa.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      auto.modelo.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      auto.ciudad.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
    this.sortAutos();
  }

  confirmarEliminar(auto: Auto) {
    Swal.fire({
      title: '¿Estás seguro?',
      text: `¿Deseas eliminar el auto ${auto.marca} ${auto.modelo}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.eliminarAuto(auto);
      }
    });
  }

  eliminarAuto(auto: Auto) {
    this.userService.consult_post('/admin/eliminarauto', { placa: auto.placa }).subscribe({
      next: (response: any) => {
        if (response.status) {
          Swal.fire('Auto eliminado', 'El auto ha sido eliminado', 'success');
          this.getAutos();
        } else {
          Swal.fire('Error', 'No se pudo eliminar el auto', 'error');
        }
      }
    });
  }
  regresar() {
    this.router.navigate(['/gestion/autos']);
  }
}
