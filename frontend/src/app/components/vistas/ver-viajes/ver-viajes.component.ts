import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterOutlet, RouterModule } from '@angular/router';
import { UserService } from '../../../services/user.service';
import Swal from 'sweetalert2';
import { ActivatedRoute } from '@angular/router';

interface ViajeReservado {
  _id: string;
  agencia: string;
  origen: string;
  destino: string;
  dias: number;
  precio: number;
  agencia_auto: string | undefined;
  marca: string | undefined;
  placa: string | undefined;
  modelo: string | undefined;
  precio_auto: number | undefined;
  ciudad_auto: string | undefined; //estos datos son undefined por que el usuario pudo o no haber rentado un auto
  aprobado: boolean;
}

@Component({
  selector: 'app-ver-viajes',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    RouterOutlet
  ],
  templateUrl: './ver-viajes.component.html',
  styleUrl: './ver-viajes.component.scss'
})
export class VerViajesComponent implements OnInit {
  //se mostrara el viaje reservado por el  usuario
  viajes: ViajeReservado[] = [];
  usuario!: string;
  nombre!: string;
  correo!: string;
  imagen!: string;

  constructor(
    private userService: UserService,
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

    this.getViajes();
  }

  getViajes() {
    this.userService.consult_post('/usuario/consultar-viajes', { usuario: this.usuario }).subscribe({
      next: (response: any) => {
        if (response.status) {
          this.viajes = response.data;
          console.log('Viajes obtenidos:', this.viajes);
        } else {
          console.log('Error al obtener viajes:', response.msg);
        }
      },
      error: (error) => {
        console.error('Error al obtener viajes:', error);
      }
    });
  }

  regresar() {
    this.router.navigate(['/usuario/turista'], { queryParams: { usuario: this.usuario, nombre: this.nombre, correo: this.correo, imagen: this.imagen } });
  }
  logout() {
    this.router.navigate(['/login']);
  }

  //se cancela el viaje, se elimina de la base de datos
  cancelarViaje(id: string) {
    this.userService.consult_post('/usuario/cancelar-viaje', { id }).subscribe({
      next: (response: any) => {
        if (response.status) {
          Swal.fire('Viaje cancelado', 'El viaje ha sido cancelado', 'success');
          //se actualiza la lista de viajes
          this.getViajes();
        } else {
          Swal.fire('Error', 'No se pudo cancelar el viaje', 'error');
        }
      },
      error: (error) => {
        console.error('Error en la petición:', error);
      }
    });
  }

  confirmarCancelacion(id: string) {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Esta acción no se puede deshacer.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, cancelar',
      cancelButtonText: 'No, mantener'
    }).then((result) => {
      if (result.isConfirmed) {
        this.cancelarViaje(id);
      }
    });
  }

}

