import { Routes } from '@angular/router';
import { RegisterComponent } from './components/auth/register/register.component';
import { LoginComponent } from './components/auth/login/login.component';
import { RegRecepcionistaComponent } from './components/auth/reg-recepcionista/reg-recepcionista.component';
import { AutosComponent } from './components/registros/autos/autos.component';
import { ViajesComponent } from './components/registros/viajes/viajes.component';
import { PrincipalComponent } from './components/vistas/principal/principal.component';
import { RentaviajesComponent } from './components/registros/renta/rentaviajes/rentaviajes.component';
import { AutosrentaComponent } from './components/registros/renta/autosrenta/autosrenta.component';
import { TuristaComponent } from './components/vistas/turista/turista.component';
import { AdminComponent } from './components/vistas/admin/admin.component';
import { RecepcionistaComponent } from './components/vistas/recepcionista/recepcionista.component';
import { VerViajesComponent } from './components/vistas/ver-viajes/ver-viajes.component';
import { UsuariosComponent } from './components/gestion/usuarios/usuarios.component';
import { GestonautosComponent } from './components/gestion/gestonautos/gestonautos.component';
import { GestonviajesComponent } from './components/gestion/gestonviajes/gestonviajes.component';
import { RegisteruseradminComponent } from './components/auth/registeruseradmin/registeruseradmin.component';
import { RegisterAdminComponent } from './components/auth/register-admin/register-admin.component';
import { ListausuariosComponent } from './components/vistas/listas/listausuarios/listausuarios.component';
import { ListaautosComponent } from './components/vistas/listas/listaautos/listaautos.component';
import { ListaviajesComponent } from './components/vistas/listas/listaviajes/listaviajes.component';
import { ListareservasComponent } from './components/vistas/listas/listareservas/listareservas.component';

export const routes: Routes = [
    {
        path: '',
        component: PrincipalComponent
    },
    {
        path: 'register',
        component: RegisterComponent
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'regrec',
        component: RegRecepcionistaComponent
    },
    {
        path: 'autosreg',
        component: AutosComponent
    },
    {
        path: 'viajesreg',
        component: ViajesComponent
    },
    {
        path: 'renta',
        component: RentaviajesComponent
    },
    {
        path: 'autosrenta',
        component: AutosrentaComponent
    },
    {
        path: 'usuario/turista',
        component: TuristaComponent
    },
    {
        path: 'admin/principal',
        component: AdminComponent
    },
    {
        path: 'recepcionista/principal',
        component: RecepcionistaComponent
    },
    {
        path: 'usuario/verviajes',
        component: VerViajesComponent
    },
    {
        path: 'gestion/usuarios',
        component: UsuariosComponent
    },
    {
        path: 'gestion/autos',
        component: GestonautosComponent
    },
    {
        path: 'gestion/viajes',
        component: GestonviajesComponent
    },
    {
        path: 'admin/registro/usuario',
        component: RegisteruseradminComponent
    },
    {
        path: 'admin/registro/admin',
        component: RegisterAdminComponent
    },
    {
        path: 'admin/listas/usuarios',
        component: ListausuariosComponent
    },
    {
        path: 'admin/listas/autos',
        component: ListaautosComponent
    },
    {
        path: 'admin/listas/viajes',
        component: ListaviajesComponent
    },
    {
        path: 'admin/listas/reservas',
        component: ListareservasComponent
    }
];
