import { Component, OnInit } from '@angular/core';


interface Pago {
  cedula: string;
  nombrePropietario: string;
  fechaCita: string;
  horaCita: string;
  tipoServicio: string;
  descripcionServicio: string;
  descuento: string;
  precio: string;
  montoTotal: string;
  formaPago: string;
}

@Component({
  selector: 'app-pago',
  templateUrl: './pago.component.html',
  styleUrls: ['./pago.component.css']
})
export class PagoComponent implements OnInit{
 

  myData$: any[] = [
    {
      cedula: "1234567890",
      nombrePropietario: "Juan Pérez",
      fechaCita: "2024-04-10",
      horaCita: "10:00",
      tipoServicio: "Vacunación",
      descripcionServicio: "Vacuna antirrábica y desparasitación",
      descuento: "0",
      precio: "50",
      montoTotal: "50",
      formaPago: "Efectivo"
    },
    {
      cedula: "0987654321",
      nombrePropietario: "María González",
      fechaCita: "2024-04-12",
      horaCita: "15:30",
      tipoServicio: "Consulta",
      descripcionServicio: "Revisión general y control de peso",
      descuento: "10",
      precio: "80",
      montoTotal: "70",
      formaPago: "Tarjeta de crédito"
    },
    {
      cedula: "1357902468",
      nombrePropietario: "Ana Martínez",
      fechaCita: "2024-04-15",
      horaCita: "09:00",
      tipoServicio: "Peluquería",
      descripcionServicio: "Corte de pelo y baño",
      descuento: "5",
      precio: "70",
      montoTotal: "65",
      formaPago: "Transferencia bancaria"
    },
    {
      cedula: "2468013579",
      nombrePropietario: "Pedro Rodríguez",
      fechaCita: "2024-04-18",
      horaCita: "11:30",
      tipoServicio: "Vacunación",
      descripcionServicio: "Vacuna múltiple y análisis de sangre",
      descuento: "0",
      precio: "60",
      montoTotal: "60",
      formaPago: "Efectivo"
    },
    {
      cedula: "9876543210",
      nombrePropietario: "Laura Díaz",
      fechaCita: "2024-04-20",
      horaCita: "14:00",
      tipoServicio: "Consulta",
      descripcionServicio: "Examen de rutina y prescripción de medicamentos",
      descuento: "0",
      precio: "75",
      montoTotal: "75",
      formaPago: "Efectivo"
    },
    {
      cedula: "5432167890",
      nombrePropietario: "Roberto Fernández",
      fechaCita: "2024-04-22",
      horaCita: "16:30",
      tipoServicio: "Peluquería",
      descripcionServicio: "Baño y cepillado",
      descuento: "15",
      precio: "90",
      montoTotal: "75",
      formaPago: "Tarjeta de débito"
    },
    {
      cedula: "6789012345",
      nombrePropietario: "Carlos López",
      fechaCita: "2024-04-25",
      horaCita: "08:00",
      tipoServicio: "Vacunación",
      descripcionServicio: "Vacuna antiparasitaria y control de pulgas",
      descuento: "0",
      precio: "55",
      montoTotal: "55",
      formaPago: "Efectivo"
    },
    {
      cedula: "4321098765",
      nombrePropietario: "Elena Ruiz",
      fechaCita: "2024-04-28",
      horaCita: "12:00",
      tipoServicio: "Consulta",
      descripcionServicio: "Revisión de rutina y análisis de orina",
      descuento: "0",
      precio: "70",
      montoTotal: "70",
      formaPago: "Efectivo"
    },
    {
      cedula: "0123456789",
      nombrePropietario: "José García",
      fechaCita: "2024-05-01",
      horaCita: "09:30",
      tipoServicio: "Peluquería",
      descripcionServicio: "Corte de uñas y limpieza de oídos",
      descuento: "0",
      precio: "45",
      montoTotal: "45",
      formaPago: "Efectivo"
    },
    {
      cedula: "5678901234",
      nombrePropietario: "Marta Sánchez",
      fechaCita: "2024-05-05",
      horaCita: "13:30",
      tipoServicio: "Vacunación",
      descripcionServicio: "Vacuna antiparasitaria y control de garrapatas",
      descuento: "0",
      precio: "60",
      montoTotal: "60",
      formaPago: "Efectivo"
    }
  ];

  tableColumns = [
    { label: 'Cedula', def: 'Cedula', dataKey: 'cedula' },
    { label: 'Nombre', def: 'Nombre', dataKey: 'nombrePropietario' },
    { label: 'Fecha Cita', def: 'fechaCita', dataKey: 'fechaCita' },
    { label: 'Hora Cita', def: 'horaCita', dataKey: 'horaCita' },
    { label: 'Tipo Servicio', def: 'tipoServicio', dataKey: 'tipoServicio' },
    { label: 'Descripción del Servicio', def: 'descripcionServicio', dataKey: 'descripcionServicio' },
    { label: 'Forma de Pago', def: 'formaPago', dataKey: 'formaPago' },
    { label: 'Descuento', def: 'descuento', dataKey: 'descuento' },
    { label: 'Precio', def: 'precio', dataKey: 'precio' },
    { label: 'Monto Total', def: 'montoTotal', dataKey: 'montoTotal' },
  ]

  constructor(){}

  ngOnInit(): void {
  }

}
