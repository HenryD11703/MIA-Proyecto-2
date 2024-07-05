import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterOutlet, RouterModule } from '@angular/router';
import { UserService } from '../../../../services/user.service';
import Swal from 'sweetalert2';
import { ActivatedRoute } from '@angular/router';

interface Usuario {
  _id: string;
  nombre: string;
  usuario: string;
  correo: string;
  contrasena: "********"; // para no mostrar nada
  tipo: string;
}

@Component({
  selector: 'app-listausuarios',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    RouterOutlet
  ],
  templateUrl: './listausuarios.component.html',
  styleUrl: './listausuarios.component.scss'
})
export class ListausuariosComponent implements OnInit {
  usuarios: Usuario[] = [];
  filteredUsuarios: Usuario[] = [];
  sortField: keyof Usuario = 'nombre';
  sortDirection: 'asc' | 'desc' = 'asc';
  searchTerm: string = '';


  constructor(
    private userService: UserService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.getUsuarios();
  }



  getUsuarios() {
    this.userService.consult_get('/admin/listausuarios').subscribe({
      next: (response: any) => {
        if (response.status) {
          this.usuarios = response.usuarios;
          this.filteredUsuarios = [...this.usuarios];
          this.sortUsuarios();
        } else {
          console.log(response.message);
        }
      },
      error: (error) => {
        console.error('Error en la consulta de usuarios:', error);
      }
    });
  }

  sortUsuarios() {
    this.filteredUsuarios.sort((a, b) => {
      if (a[this.sortField] < b[this.sortField]) return this.sortDirection === 'asc' ? -1 : 1;
      if (a[this.sortField] > b[this.sortField]) return this.sortDirection === 'asc' ? 1 : -1;
      return 0;
    });
  }

  changeSort(field: keyof Usuario) {
    if (this.sortField === field) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortField = field;
      this.sortDirection = 'asc';
    }
    this.sortUsuarios();
  }

  searchUsuarios() {
    this.filteredUsuarios = this.usuarios.filter(usuario =>
      usuario.nombre.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      usuario.usuario.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      usuario.correo.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      usuario.tipo.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
    this.sortUsuarios();
  }

  regresar() {
    this.router.navigate(['/gestion/usuarios']);
  }

  confirmarEliminar(usuario: Usuario) {
    Swal.fire({
      title: '¿Estás seguro?',
      text: `Estás a punto de eliminar a ${usuario.nombre}`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.eliminarUsuario(usuario);
      }
    });
  }

  eliminarUsuario(usuario: Usuario) {
    this.userService.consult_post('/admin/eliminarusuario', { usuario: usuario.usuario }).subscribe({
      next: (response: any) => {
        if (response.status) {
          Swal.fire('Usuario eliminado', 'El usuario ha sido eliminado correctamente', 'success');
          this.getUsuarios();
        } else {
          console.log(response.message);
        }
      },
      error: (error) => {
        console.error('Error al eliminar usuario:', error);
      }
    });
  }
}