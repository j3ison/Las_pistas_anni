import { Component, OnInit, TemplateRef } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { DialogComponent } from '../module/dialog/dialog.component';
import { DialogService } from '../module/dialog/service/dialog.service';

interface ServicioReserva {
  idServicio: number;
  idReserva: number;
  idCita: number;
  idPropietario: number;
  // nombrePropietario: string;
  // cedula: string;
  // telefono: string;
  // ubicacion: string;
  // fecha: Date;
  // hora: string;
  // tipoServicio: string;
  // descripcion: string;
  // nombreMascota: string;
  precio: number;
}

@Component({
  selector: 'app-reservas',
  templateUrl: './reservas.component.html',
  styleUrls: ['./reservas.component.css']
})
export class ReservasComponent implements OnInit {

  myData$: any[] = [
    {
      idServicio: 1,
      idReserva: 101,
      idCita: 201,
      idPropietario: 301,
      nombrePropietario: "Juan Pérez",
      cedula: "123456789",
      telefono: "555-1234",
      ubicacion: "Calle Principal 123",
      fecha: "2024-04-10",
      hora: "09:00",
      tipoServicio: "Consulta",
      descripcion: "Vacunación y chequeo de rutina",
      nombreMascota: "Buddy",
      precio: 50.00
    },
    {
      idServicio: 2,
      idReserva: 102,
      idCita: 202,
      idPropietario: 302,
      nombrePropietario: "María Rodríguez",
      cedula: "987654321",
      telefono: "555-5678",
      ubicacion: "Avenida Central 456",
      fecha: "2024-04-12",
      hora: "11:00",
      tipoServicio: "Vacunación",
      descripcion: "Vacuna contra la rabia",
      nombreMascota: "Luna",
      precio: 30.00
    },
    {
      idServicio: 3,
      idReserva: 103,
      idCita: 203,
      idPropietario: 303,
      nombrePropietario: "Ana Gómez",
      cedula: "456789123",
      telefono: "555-9012",
      ubicacion: "Plaza Central 789",
      fecha: "2024-04-15",
      hora: "15:30",
      tipoServicio: "Cirugía",
      descripcion: "Esterilización",
      nombreMascota: "Max",
      precio: 120.00
    },
    {
      idServicio: 4,
      idReserva: 104,
      idCita: 204,
      idPropietario: 301,
      nombrePropietario: "Juan Pérez",
      cedula: "123456789",
      telefono: "555-1234",
      ubicacion: "Calle Principal 123",
      fecha: "2024-04-18",
      hora: "10:00",
      tipoServicio: "Consulta",
      descripcion: "Revisión de estado de salud",
      nombreMascota: "Lucky",
      precio: 40.00
    },
    {
      idServicio: 5,
      idReserva: 105,
      idCita: 205,
      idPropietario: 304,
      nombrePropietario: "Pedro Martínez",
      cedula: "789123456",
      telefono: "555-3456",
      ubicacion: "Avenida Principal 456",
      fecha: "2024-04-20",
      hora: "14:00",
      tipoServicio: "Vacunación",
      descripcion: "Vacuna múltiple",
      nombreMascota: "Rocky",
      precio: 25.00
    },
    {
      idServicio: 6,
      idReserva: 106,
      idCita: 206,
      idPropietario: 305,
      nombrePropietario: "Laura Sánchez",
      cedula: "369258147",
      telefono: "555-6789",
      ubicacion: "Calle Secundaria 789",
      fecha: "2024-04-22",
      hora: "16:30",
      tipoServicio: "Cirugía",
      descripcion: "Extracción de tumor",
      nombreMascota: "Coco",
      precio: 150.00
    },
    {
      idServicio: 7,
      idReserva: 107,
      idCita: 207,
      idPropietario: 306,
      nombrePropietario: "María Rodríguez",
      cedula: "987654321",
      telefono: "555-5678",
      ubicacion: "Avenida Principal 789",
      fecha: "2024-04-25",
      hora: "11:00",
      tipoServicio: "Consulta",
      descripcion: "Chequeo general",
      nombreMascota: "Bella",
      precio: 35.00
    },
    {
      idServicio: 8,
      idReserva: 108,
      idCita: 208,
      idPropietario: 301,
      nombrePropietario: "Juan Pérez",
      cedula: "123456789",
      telefono: "555-1234",
      ubicacion: "Calle Principal 123",
      fecha: "2024-04-28",
      hora: "09:30",
      tipoServicio: "Vacunación",
      descripcion: "Vacuna antirrábica",
      nombreMascota: "Lucky",
      precio: 20.00
    },
    {
      idServicio: 9,
      idReserva: 109,
      idCita: 209,
      idPropietario: 307,
      nombrePropietario: "Carlos Gutiérrez",
      cedula: "654321987",
      telefono: "555-7890",
      ubicacion: "Calle Secundaria 456",
      fecha: "2024-04-30",
      hora: "13:45",
      tipoServicio: "Cirugía",
      descripcion: "Castración",
      nombreMascota: "Simba",
      precio: 80.00
    },
    {
      idServicio: 10,
      idReserva: 110,
      idCita: 210,
      idPropietario: 308,
      nombrePropietario: "Ana Gómez",
      cedula: "456789123",
      telefono: "555-9012",
      ubicacion: "Plaza Central 789",
      fecha: "2024-05-02",
      hora: "12:15",
      tipoServicio: "Consulta",
      descripcion: "Revisión de rutina",
      nombreMascota: "Tom",
      precio: 30.00
    }
  ];
  tableColumns = [
    { label: 'Cedula', def: 'Cedula', dataKey: 'cedula' },
    { label: 'Nombre', def: 'Nombre', dataKey: 'nombrePropietario' },
    { label: 'Telefono', def: 'Telefono', dataKey: 'telefono' },
    { label: 'Dirección', def: 'Direccion', dataKey: 'ubicacion' },
    // { label: 'ID Mascota', def: 'idMascota', dataKey: 'idMascota' },
    { label: 'Nombre Mascota', def: 'NombreMascota', dataKey: 'nombreMascota' },
    { label: 'Fecha', def: 'fecha', dataKey: 'fecha' },
    { label: 'Hora', def: 'hora', dataKey: 'hora' },
    { label: 'Precio', def: 'precio', dataKey: 'precio' },
    { label: 'Tipo Servicio', def: 'tipoServicio', dataKey: 'tipoServicio' },
    // { label: 'Sexo', def: 'sexo', dataKey: 'sexo' },
    { label: 'Descripción', def: 'descripcion', dataKey: 'descripcion' },
  ]
  
  
  private matDialogRef!: MatDialogRef<DialogComponent>;

  constructor(private dialogService: DialogService){}

  ngOnInit(): void {
  }

  openDialogWithTemplate(template: TemplateRef<any>) {
    this.matDialogRef = this.dialogService.openDialogWithTemplate({ template });

    this.matDialogRef.afterClosed().subscribe((res) => {
    });
  }

  cancelDialogResult() {
    this.matDialogRef.close()
  }

}
