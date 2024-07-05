import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterOutlet, RouterModule } from '@angular/router';
import { UserService } from '../../../../app/services/user.service';
import Swal from 'sweetalert2'
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-usuarios',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    RouterOutlet
  ],
  templateUrl: './usuarios.component.html',
  styleUrl: './usuarios.component.scss'
})
export class UsuariosComponent implements OnInit{
  numeroUsuarios!: number;
  numeroAdmins!: number;
  numeroRecs!: number;
  constructor(
    private http: UserService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getNumeroUsuarios();
    this.getNumeroAdmins();
    this.getNumeroRecs();
  }

  getNumeroUsuarios() {
    //usar /totalusers
    this.http.consult_get('/admin/totalusers').subscribe({
      next: (response: any) => {
        if (response.status) {
          this.numeroUsuarios = response.total;
        } else {
          console.log(response.message);
        }
      },
      error: (error) => {
        console.error('Error en la consulta de usuarios:', error);
      }
    });
  }

  getNumeroRecs() {
    //usar /totalrecs
    this.http.consult_get('/admin/totalrecs').subscribe({
      next: (response: any) => {
        if (response.status) {
          this.numeroRecs = response.total;
        } else {
          console.log(response.message);
        }
      },
      error: (error) => {
        console.error('Error en la consulta de recs:', error);
      }
    });
  }

  getNumeroAdmins() {
    //usar /totaladmins
    this.http.consult_get('/admin/totaladmins').subscribe({
      next: (response: any) => {
        if (response.status) {
          this.numeroAdmins = response.total;
        } else {
          console.log(response.message);
        }
      },
      error: (error) => {
        console.error('Error en la consulta de admins:', error);
      }
    });
  }

  goToAdminPrincipal() {
    this.router.navigate(['/admin/principal']);
  }
  goToAutos() {
    this.router.navigate(['/gestion/autos']);
  }
  goToViajes() {
    this.router.navigate(['/gestion/viajes']);
  }

  goToRegUser() {
    this.router.navigate(['/admin/registro/usuario']);
  }
  goToRegAdmin() {
    this.router.navigate(['/admin/registro/admin']);
  }
  goToRegRec() {
    this.router.navigate(['/regrec']);
  }

  goToUserList() {
    this.router.navigate(['/admin/listas/usuarios']);
  }
  goToLogin() {
    this.router.navigate(['/login']);
  } 
}

