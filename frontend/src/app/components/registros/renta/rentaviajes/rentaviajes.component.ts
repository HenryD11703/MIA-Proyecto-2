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
    selector: 'app-rentaviajes',
    standalone: true,
    imports: [
      CommonModule,
      FormsModule,
      ReactiveFormsModule,
      RouterModule,
      RouterOutlet
    ],
    templateUrl: './rentaviajes.component.html',
    styleUrl: './rentaviajes.component.scss'
  })
  export class RentaviajesComponent implements OnInit {
    viajes: Viaje[] = [];
    usuario!: string;
    nombre!: string;
    correo!: string;
    imagen!: string;
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
      this.activatedRoute.queryParams.subscribe(params => {
        this.usuario = params['usuario'];
        this.nombre = params['nombre'];
        this.correo = params['correo'];
        this.imagen = params['imagen'];
      });
    }

    regresar() {
      this.router.navigate(['/usuario/turista'], { queryParams: { usuario: this.usuario, nombre: this.nombre, correo: this.correo, imagen: this.imagen } });
    }

    getViajes() {
      this.userService.consult_get('/usuario/viajes').subscribe({
        next: (response: any) => {
          if (response.status) {
            this.viajes = response.data;
            this.filteredViajes = [...this.viajes];
            this.sortViajes();
            console.log('Viajes obtenidos:', this.viajes);
          } else {
            console.log('Error al obtener viajes:', response.msg);
          }
        },
        error: (error) => {
          console.error('Error en la petición:', error);
        }
      });
    }

    seleccionarViaje(viaje: Viaje) {
      this.userService.consult_post('/usuario/seleccionar-viaje', viaje).subscribe({
        next: (response: any) => {
          if (response.status) {
            console.log('Viaje seleccionado:', viaje);
            Swal.fire('Viaje seleccionado', 'El viaje ha sido seleccionado', 'success');
            // redirect to the autosrenta page
            this.redirectAutosRenta();          
          } else {
            console.log('Error al seleccionar viaje:', response.msg);
            Swal.fire('Error', 'No se pudo seleccionar el viaje', 'error');
          }
        },
        error: (error) => {
          console.error('Error en la petición:', error);
          Swal.fire('Error', 'No se pudo seleccionar el viaje', 'error');
        }
      });
    }

    confirmarViaje(viaje: Viaje) {
      Swal.fire({
        title: 'Confirmar viaje',
        text: '¿Estás seguro de querer confirmar este viaje?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Sí',
        cancelButtonText: 'No'
      }).then((result) => {
        if (result.isConfirmed) {
          this.seleccionarViaje(viaje);
        }
      });
    }

    redirectAutosRenta() {
      this.router.navigate(['/autosrenta'], { queryParams: { usuario: this.usuario, nombre: this.nombre, correo: this.correo } });
    }

    sortViajes() {
      this.filteredViajes.sort((a, b) => {
        if (a[this.sortField] < b[this.sortField]) return this.sortDirection === 'asc' ? -1 : 1;
        if (a[this.sortField] > b[this.sortField]) return this.sortDirection === 'asc' ? 1 : -1;
        return 0;
      });
    }

    changeSort(field: keyof Viaje) {
      if (this.sortField === field) {
        this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
      } else {
        this.sortField = field;
        this.sortDirection = 'asc';
      }
      this.sortViajes();
    }

    searchViajes() {
      this.filteredViajes = this.viajes.filter(viaje => 
        viaje.agencia.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        viaje.origen.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        viaje.destino.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
      this.sortViajes();
    }
  }

  /**
   * TODO:
   * - Create different sort of trips (e.g. name, price, days, etc.)
   * - Add a search bar to filter trips
   */