import { Component, OnInit } from '@angular/core';

interface Producto {
  idServicio: string;
  tipoServicio: string;
  descripcion: string;
  precio: string;
  productos: string;
}

@Component({
  selector: 'app-servicios',
  templateUrl: './servicios.component.html',
  styleUrls: ['./servicios.component.css']
})
export class ServiciosComponent implements OnInit{
  
  myData$: any[] = [
    {
      idServicio: "1",
      tipoServicio: "Consulta",
      descripcion: "Consulta veterinaria de rutina",
      precio: "50",
      productos: "Vacuna para gatos,Desparasitante para perros"
    },
    {
      idServicio: "2",
      tipoServicio: "Vacunación",
      descripcion: "Vacuna antirrábica para perros",
      precio: "30",
      productos: "Vacuna antirrábica"
    },
    {
      idServicio: "3",
      tipoServicio: "Cirugía",
      descripcion: "Esterilización de gatos",
      precio: "100",
      productos: "Esterilización, Antibióticos"
    },
    {
      idServicio: "4",
      tipoServicio: "Consulta",
      descripcion: "Revisión de salud de aves",
      precio: "40",
      productos: "Alimento especial para aves"
    },
    {
      idServicio: "5",
      tipoServicio: "Vacunación",
      descripcion: "Vacuna contra la parvovirosis para cachorros",
      precio: "25",
      productos: "Vacuna contra la parvovirosis"
    },
    {
      idServicio: "6",
      tipoServicio: "Baño y Corte de Pelo",
      descripcion: "Baño y corte de pelo para perros de raza pequeña",
      precio: "35",
      productos: "Shampoo especial para perros, Corte de pelo"
    },
    {
      idServicio: "7",
      tipoServicio: "Consulta",
      descripcion: "Consulta para conejos",
      precio: "45",
      productos: "Heno para conejos,Suplemento vitamínico"
    },
    {
      idServicio: "8",
      tipoServicio: "Vacunación",
      descripcion: "Vacuna contra la rabia para gatos",
      precio: "30",
      productos: "Vacuna contra la rabia"
    },
    {
      idServicio: "9",
      tipoServicio: "Cirugía",
      descripcion: "Cirugía de emergencia para perros",
      precio: "150",
      productos: "Anestesia general, Cirugía"
    },
    {
      idServicio: "10",
      tipoServicio: "Consulta",
      descripcion: "Consulta de control para reptiles",
      precio: "50",
      productos: "Alimento para reptiles,Suplemento mineral"
    }
  ];

  tableColumns = [
    { label: 'ID Servicio', def: 'idServicio', dataKey: 'idServicio' },
    { label: 'Tipo de Servicio', def: 'tipoServicio', dataKey: 'tipoServicio' },
    { label: 'Descripción', def: 'descripcion', dataKey: 'descripcion' },
    { label: 'Preció', def: 'precio', dataKey: 'precio' },
    { label: 'Productos', def: 'productos', dataKey: 'productos' },
  ]


  ngOnInit(): void {
  }

}
