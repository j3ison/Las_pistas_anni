import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { InicioComponent } from './inicio/inicio.component';
import { ProductosComponent } from './productos/productos.component';
import { ReservasComponent } from './reservas/reservas.component';
import { ServiciosComponent } from './servicios/servicios.component';
import { MascotasComponent } from './mascotas/mascotas.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';

import { SidenavModule } from './module/sidenav/sidenav.module';
import { HeaderModule } from './module/header/header.module';
import { BodyModule } from './module/body/body.module';

import { MatCardModule } from '@angular/material/card';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';

import { NgChartsModule } from 'ng2-charts';
import { BarChartComponent } from './module/graph/components/bar-chart/bar-chart.component';
// import { BarChartComponent } from './modules/graph/components/bar-chart/bar-chart.component';
import { LineChartComponent } from './module/graph/components/line-chart/line-chart.component';
import { DoughnutChartComponent } from './module/graph/components/doughnut-chart/doughnut-chart.component';
import { PieChartComponent } from './module/graph/components/pie-chart/pie-chart.component';
import { PolarAreaChartComponent } from './module/graph/components/polar-area-chart/polar-area-chart.component';
import { MatDividerModule } from '@angular/material/divider';
import { TableComponent } from './module/table/table.component';

import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { FullCalendarModule } from '@fullcalendar/angular';
import { PagoComponent } from './pago/pago.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    InicioComponent,
    ProductosComponent,
    ReservasComponent,
    ServiciosComponent,
    MascotasComponent,
    TableComponent,
    BarChartComponent,
    LineChartComponent,
    DoughnutChartComponent,
    PieChartComponent,
    PolarAreaChartComponent,
    PagoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatCheckboxModule,
    SidenavModule,
    HeaderModule,
    BodyModule,
    MatCardModule,
    ReactiveFormsModule,
    MatButtonModule,
    NgChartsModule,
    MatDividerModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory,
    }),
    FullCalendarModule
    
  ],
  
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
