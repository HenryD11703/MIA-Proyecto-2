import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterOutlet, RouterModule } from '@angular/router';
import { UserService } from '../../../../services/user.service';
import Swal from 'sweetalert2'
import { ActivatedRoute } from '@angular/router';

interface Auto {
  _id: string;
  agencia: string;
  marca: string;
  placa: string;
  modelo: string;
  precio: number;
  ciudad: string;
  usuario: string;
}

@Component({
  selector: 'app-autosrenta',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    RouterOutlet
  ],//cliente
  templateUrl: './autosrenta.component.html',
  styleUrl: './autosrenta.component.scss'
})
export class AutosrentaComponent implements OnInit {

  //para limitar el acceso a la pagina, para que no se pueda solo buscar en el navegador la url
  //se puede hacer un guard, que redirija a la pagina de login si no se ha iniciado sesion
  //pero no se implementó en este caso :(

  nombre!: string;
  correo!: string;
  usuario!: string;
  autos: Auto[] = [];

  constructor(
    private userService: UserService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.getAutos();
    this.activatedRoute.queryParams.subscribe(params => {
      this.usuario = params['usuario'];
      this.nombre = params['nombre'];
      this.correo = params['correo'];
    });
  }

  getAutos() {
    this.userService.consult_get('/usuario/autos').subscribe({
      next: (response: any) => {
        if (response.status) {
          this.autos = response.data;
          //console.log('Autos obtenidos:', this.autos);
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Error al obtener autos',
          });
        }
      },
      error: (error) => {
        console.error('Error en la petición:', error);
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Error en la petición',
        });
      }
    });
  }

  noAuto() {
    const payload = { usuario: this.usuario };
    this.userService.consult_post('/usuario/no-reservar-auto', payload).subscribe({
      next: (response: any) => {
        if (response.status) {
          console.log('No reservar auto:', response.msg);
          Swal.fire('No reservar auto', 'No se ha reservado ningún auto', 'success');
          // redirigir a /usuario/turista, y enviar los datos de la sesión
          this.router.navigate(['/usuario/turista'], { queryParams: { usuario: this.usuario, nombre: this.nombre, correo: this.correo } });
        } else {
          console.log('Error al no reservar auto:', response.msg);
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Error al no reservar auto',
          });
        }
      },
      error: (error) => {
        console.error('Error en la petición:', error);
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Error en la petición',
        });
      }
    });

  }

  seleccionarAuto(auto: Auto) {
    this.userService.consult_post('/usuario/seleccionar-auto', auto).subscribe({
      next: (response: any) => {
        if (response.status) {
          console.log('Auto seleccionado:', auto);
          Swal.fire('Auto seleccionado', 'El auto ha sido seleccionado', 'success');
          // redirigir a /usuario/turista, y enviar los datos de la sesión
          this.router.navigate(['/usuario/turista'], { queryParams: { usuario: this.usuario, nombre: this.nombre, correo: this.correo } });
        } else {
          console.log('Error al seleccionar auto:', response.msg);
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Error al seleccionar auto',
          });
        }
      },
      error: (error) => {
        console.error('Error en la petición:', error);
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Error en la petición',
        });
      }
    });
  }

  confirmarAuto(auto: Auto) {
    auto.usuario = this.usuario;
    Swal.fire({
      title: 'Confirmar auto',
      text: '¿Estás seguro de querer confirmar este auto?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Sí',
      cancelButtonText: 'No'
    }).then((result) => {
      if (result.isConfirmed) {
        this.seleccionarAuto(auto);
      }
    });
  }

  noReservar() {
    Swal.fire({
      title: 'No reservar auto',
      text: '¿Estás seguro de no querer reservar ningún auto?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Sí',
      cancelButtonText: 'No'
    }).then((result) => {
      if (result.isConfirmed) {
        this.noAuto();
      }
    });
  }


}
