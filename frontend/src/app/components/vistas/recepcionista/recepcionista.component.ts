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
  usuario: string;
  aprobado: boolean | undefined; //este dato es undefined por que hasta aca se decide si se aprueba o no el viaje
}

@Component({
  selector: 'app-recepcionista',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    RouterOutlet
  ],
  templateUrl: './recepcionista.component.html',
  styleUrl: './recepcionista.component.scss'
})
export class RecepcionistaComponent implements OnInit {
  viajeReservado: ViajeReservado[] = [];

  constructor(
    private userService: UserService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.getViajes();
  }

  getViajes() {
    this.userService.consult_get('/recepcion/reserva').subscribe({
      next: (response: any) => {
        if (response.status) {
          this.viajeReservado = response.data;
        } else {
          console.log(response.message);
        }
      },
      error: (error) => {
        console.error('Error en la petición:', error);
      }
    });
  }

  aprobarViaje(id: string) {
    //se manda el id del viaje, y ya en mongo se busca ese id, y se le añade la propiedad aprobado: true
    this.userService.consult_post('/recepcion/aprobar', { id }).subscribe({
      next: (response: any) => {
        if (response.status) {
          Swal.fire('Viaje aprobado', 'El viaje ha sido aprobado', 'success');
          //se actualiza la lista de viajes
          this.getViajes();
        } else {
          Swal.fire('Error', 'No se pudo aprobar el viaje', 'error');
        }
      },
      error: (error) => {
        console.error('Error en la petición:', error);
      }
    });
  }
}