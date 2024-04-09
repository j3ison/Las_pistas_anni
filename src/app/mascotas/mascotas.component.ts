import { Component, OnInit } from '@angular/core';



interface MascotaPropietario {
  idMascota: number;
  idPropietario: number;
  fechaNacimiento: Date; 
  especie: string;
  sexo: string;
  nombreMascota: string;
  historial: string;
  nombrePropietario: string;
  direccion: string;
  cedula: string;
  telefono: string;
}


@Component({
  selector: 'app-mascotas',
  templateUrl: './mascotas.component.html',
  styleUrls: ['./mascotas.component.css']
})
export class MascotasComponent implements OnInit {
  myData$: any[] = [
    {
      idMascota: 1,
      idPropietario: 1,
      fechaNacimiento: '2018-05-20',
      especie: 'Perro',
      sexo: 'Macho',
      nombreMascota: 'Max',
      historial: 'Vacunas al día',
      nombrePropietario: 'Juan',
      direccion: 'Calle 123',
      cedula: '1234567890',
      telefono: '123456789'
    },
    {
      idMascota: 2,
      idPropietario: 1,
      fechaNacimiento: '2019-02-10',
      especie: 'Gato',
      sexo: 'Hembra',
      nombreMascota: 'Luna',
      historial: 'Desparasitación realizada',
      nombrePropietario: 'Juan',
      direccion: 'Calle 123',
      cedula: '1234567890',
      telefono: '123456789'
    },
    {
      idMascota: 3,
      idPropietario: 2,
      fechaNacimiento: '2020-10-15',
      especie: 'Perro',
      sexo: 'Hembra',
      nombreMascota: 'Bella',
      historial: 'Control veterinario anual',
      nombrePropietario: 'María',
      direccion: 'Avenida 456',
      cedula: '0987654321',
      telefono: '987654321'
    },
    {
      idMascota: 4,
      idPropietario: 3,
      fechaNacimiento: '2017-08-03',
      especie: 'Gato',
      sexo: 'Macho',
      nombreMascota: 'Simba',
      historial: 'Esterilización realizada',
      nombrePropietario: 'Pedro',
      direccion: 'Carrera 789',
      cedula: '1357924680',
      telefono: '246801357'
    },
    {
      idMascota: 5,
      idPropietario: 4,
      fechaNacimiento: '2019-11-25',
      especie: 'Perro',
      sexo: 'Macho',
      nombreMascota: 'Rocky',
      historial: 'Vacunas al día',
      nombrePropietario: 'Ana',
      direccion: 'Avenida 246',
      cedula: '9753106428',
      telefono: '369852147'
    },
    {
      idMascota: 6,
      idPropietario: 5,
      fechaNacimiento: '2016-04-12',
      especie: 'Perro',
      sexo: 'Macho',
      nombreMascota: 'Bruno',
      historial: 'Control de peso mensual',
      nombrePropietario: 'Luis',
      direccion: 'Calle 789',
      cedula: '7531902468',
      telefono: '258369147'
    },
    {
      idMascota: 7,
      idPropietario: 6,
      fechaNacimiento: '2018-09-30',
      especie: 'Gato',
      sexo: 'Hembra',
      nombreMascota: 'Mia',
      historial: 'Desparasitación realizada',
      nombrePropietario: 'Sofía',
      direccion: 'Carrera 135',
      cedula: '3698521470',
      telefono: '147258369'
    },
    {
      idMascota: 8,
      idPropietario: 7,
      fechaNacimiento: '2020-02-18',
      especie: 'Perro',
      sexo: 'Macho',
      nombreMascota: 'Coco',
      historial: 'Vacunas al día',
      nombrePropietario: 'Elena',
      direccion: 'Avenida 753',
      cedula: '8523691470',
      telefono: '369147258'
    },
    {
      idMascota: 9,
      idPropietario: 8,
      fechaNacimiento: '2017-06-08',
      especie: 'Perro',
      sexo: 'Hembra',
      nombreMascota: 'Luna',
      historial: 'Control veterinario anual',
      nombrePropietario: 'Diego',
      direccion: 'Calle 369',
      cedula: '1472583690',
      telefono: '852369147'
    },
    {
      idMascota: 10,
      idPropietario: 8,
      fechaNacimiento: '2019-12-20',
      especie: 'Gato',
      sexo: 'Hembra',
      nombreMascota: 'Luna',
      historial: 'Esterilización realizada',
      nombrePropietario: 'Diego',
      direccion: 'Calle 369',
      cedula: '1472583690',
      telefono: '852369147'
    },
  ];

  tableColumns = [
    { label: 'Cedula', def: 'Cedula', dataKey: 'cedula' },
    { label: 'Nombre', def: 'Nombre', dataKey: 'nombrePropietario' },
    { label: 'Telefono', def: 'Telefono', dataKey: 'telefono' },
    { label: 'Dirección', def: 'Direccion', dataKey: 'direccion' },
    { label: 'ID Mascota', def: 'idMascota', dataKey: 'idMascota' },
    { label: 'Nombre Mascota', def: 'NombreMascota', dataKey: 'nombreMascota' },
    { label: 'Fecha Nacimiento', def: 'fechaNacimiento', dataKey: 'fechaNacimiento' },
    { label: 'Especie', def: 'especie', dataKey: 'especie' },
    { label: 'Sexo', def: 'sexo', dataKey: 'sexo' },
    { label: 'Historial', def: 'historial', dataKey: 'historial' },
  ]


  constructor(){}

  ngOnInit(): void {

  }

}
