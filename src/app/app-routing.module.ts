import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { InicioComponent } from './inicio/inicio.component';
import { MascotasComponent } from './mascotas/mascotas.component';
import { ProductosComponent } from './productos/productos.component';
import { ReservasComponent } from './reservas/reservas.component';
import { ServiciosComponent } from './servicios/servicios.component';
import { PagoComponent } from './pago/pago.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'inicio', component: InicioComponent},
  { path: 'mascotas', component: MascotasComponent},
  { path: 'productos', component: ProductosComponent},
  { path: 'reservas', component: ReservasComponent},
  { path: 'servicios', component: ServiciosComponent},
  { path: 'pago', component: PagoComponent},
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '**', redirectTo: 'login', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
