import { Component, OnInit } from '@angular/core';
import { addDays, startOfDay } from 'date-fns';
import { CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';


interface ProductBarras {
  title: string;
  count: number[];
  labels: string[];
}

interface Cita {
  propietario: string;
  cedula: string;
  telefono: string;
  ubicacion: string;
  fecha: string;
  hora: string;
  tipoServicio: string;
  descripcion: string;
  precio: number;
  nombreMascota: string;
  id_servicio: number;
}

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css'],
  
})
export class InicioComponent implements OnInit {

  ProductosMasVendidos: any[] = [];

  citas: any[] = [
    {
      propietario: 'Juan Perez',
      cedula: '1234567890',
      telefono: '555-123-4567',
      ubicacion: 'Calle Principal, Ciudad',
      fecha: '2024-04-01',
      hora: '09:00',
      tipoServicio: 'Vacunación',
      descripcion: 'Vacuna anual para perros',
      precio: 50,
      nombreMascota: 'Bobby',
      id_servicio: 1,
    },
    {
      propietario: 'María Rodriguez',
      cedula: '0987654321',
      telefono: '555-987-6543',
      ubicacion: 'Avenida Central, Pueblo',
      fecha: '2024-04-04',
      hora: '10:30',
      tipoServicio: 'Baño y corte de pelo',
      descripcion: 'Baño completo y corte de pelo para gatos',
      precio: 40,
      nombreMascota: 'Luna',
      id_servicio: 2,
    },
    {
      propietario: 'Carlos González',
      cedula: '5678901234',
      telefono: '555-234-5678',
      ubicacion: 'Plaza Principal, Villa',
      fecha: '2024-04-03',
      hora: '14:00',
      tipoServicio: 'Consulta veterinaria',
      descripcion: 'Consulta para chequeo general',
      precio: 30,
      nombreMascota: 'Max',
      id_servicio: 3,
    },
    {
      propietario: 'Ana Martínez',
      cedula: '3456789012',
      telefono: '555-345-6789',
      ubicacion: 'Callejón de las Flores, Pueblo',
      fecha: '2024-04-04',
      hora: '11:00',
      tipoServicio: 'Desparasitación',
      descripcion: 'Desparasitación para cachorros',
      precio: 25,
      nombreMascota: 'Rocky',
      id_servicio: 4,
    },
    {
      propietario: 'Laura Gómez',
      cedula: '6789012345',
      telefono: '555-456-7890',
      ubicacion: 'Avenida del Bosque, Ciudad',
      fecha: '2024-04-05',
      hora: '16:30',
      tipoServicio: 'Consulta veterinaria',
      descripcion: 'Revisión de salud para aves',
      precio: 35,
      nombreMascota: 'Piolín',
      id_servicio: 3,
    },

    // Sexto elemento
    {
      propietario: 'Pedro Sánchez',
      cedula: '4567890123',
      telefono: '555-567-8901',
      ubicacion: 'Calle del Río, Pueblo',
      fecha: '2024-04-06',
      hora: '13:45',
      tipoServicio: 'Vacunación',
      descripcion: 'Vacuna contra la rabia para gatos',
      precio: 55,
      nombreMascota: 'Tigre',
      id_servicio: 1,
    },

    // Séptimo elemento
    {
      propietario: 'Lucía Fernández',
      cedula: '2345678901',
      telefono: '555-678-9012',
      ubicacion: 'Plaza del Mercado, Villa',
      fecha: '2024-04-07',
      hora: '10:00',
      tipoServicio: 'Baño y corte de pelo',
      descripcion: 'Baño con productos naturales para perros',
      precio: 45,
      nombreMascota: 'Lucky',
      id_servicio: 2,
    },

    // Octavo elemento
    {
      propietario: 'David López',
      cedula: '9012345678',
      telefono: '555-789-0123',
      ubicacion: 'Avenida Central, Pueblo',
      fecha: '2024-04-08',
      hora: '15:15',
      tipoServicio: 'Desparasitación',
      descripcion: 'Tratamiento antipulgas para cachorros',
      precio: 30,
      nombreMascota: 'Rex',
      id_servicio: 4,
    },

    // Noveno elemento
    {
      propietario: 'Elena Martín',
      cedula: '1234567890',
      telefono: '555-890-1234',
      ubicacion: 'Calle de las Flores, Ciudad',
      fecha: '2024-04-09',
      hora: '09:45',
      tipoServicio: 'Consulta veterinaria',
      descripcion: 'Control de peso para conejos',
      precio: 40,
      nombreMascota: 'Bugs',
      id_servicio: 3,
    },

    // Décimo elemento
    {
      propietario: 'Sofía Pérez',
      cedula: '7890123456',
      telefono: '555-901-2345',
      ubicacion: 'Plaza Mayor, Villa',
      fecha: '2024-04-10',
      hora: '12:00',
      tipoServicio: 'Vacunación',
      descripcion: 'Vacuna contra la parvovirosis para cachorros',
      precio: 60,
      nombreMascota: 'Firulais',
      id_servicio: 1,
    },
    // Otros 6 elementos con valores diferentes
    // Puedes continuar agregando más citas aquí
  ];

  ProductBarrasSelling: ProductBarras = {
    title: "",
    count: [],
    labels: [],
  }

  view: string = 'month';
  viewDate: Date = new Date();
  events: any[] = [
    {
      start: startOfDay(new Date()),
      title: 'Evento 1'
    },
    {
      start: addDays(startOfDay(new Date()), 1),
      title: 'Evento 2'
    },
    {
      start: startOfDay(new Date(this.citas[1].fecha))
    }
    // Agrega más eventos según sea necesario
  ];

  calendarOptions: CalendarOptions = {
    plugins: [dayGridPlugin],
    initialView: 'dayGridMonth',
    weekends: true,
    events: [
      { title: 'evento 1', start: new Date() },
      { title: 'evento 2', start: new Date(this.citas[1].fecha) },
      { title: 'evento 3', start: new Date(this.citas[2].fecha) },

    ]
  };


  ngOnInit(): void {
    // for (let i = 0; i < 10; i++) {
    //   const cita: Cita = {
    //     propietario: `Propietario${i}`,
    //     cedula: `Cedula${i}`,
    //     telefono: `Telefono${i}`,
    //     ubicacion: `Ubicacion${i}`,
    //     fecha: `Fecha${i}`,
    //     hora: `Hora${i}`,
    //     tipoServicio: `TipoServicio${i}`,
    //     descripcion: `Descripcion${i}`,
    //     precio: i * 10 + 5, // Precio aleatorio
    //     nombreMascota: `Mascota${i}`,
    //   };

    //   this.citas.push(cita);
    // }

    console.log(new Date(this.citas[1].fecha))
  }

  LoadMostProductsSenlling() {

    const resultado = this.citas.reduce((acumulador, cita) => {
      const { id_servicio, precio } = cita;
      if (!acumulador[id_servicio]) {
        acumulador[id_servicio] = 0;
      }
      acumulador[id_servicio] += precio;
      return acumulador;
    }, {});

    const arregloSumaCantidad = Object.keys(resultado).map((id_servicio) => ({
      id_servicio: "id_servicio: " + parseInt(id_servicio),
      sumaCantidad: resultado[id_servicio]
    }));

    const top10 = arregloSumaCantidad.sort((a, b) => b.sumaCantidad - a.sumaCantidad).slice(0, 4);

    this.ProductosMasVendidos = top10;

    const top10Num = top10.map(a => a.sumaCantidad)
    const top10label = top10.map(a => a.id_servicio)


    this.ProductBarrasSelling.count = top10Num
    this.ProductBarrasSelling.labels = top10label
    this.ProductBarrasSelling.title = "Servicios mas usados"

    // this.dataService
    //   .getData('detallefactura').subscribe((data: any[]) => {
    //     //console.log(data);

    //     const resultado = data.reduce((acumulador, objeto) => {
    //       const { codProducto, cantidad } = objeto;
    //       if (!acumulador[codProducto]) {
    //         acumulador[codProducto] = 0;
    //       }
    //       acumulador[codProducto] += cantidad;
    //       return acumulador;
    //     }, {});

    //     const arregloSumaCantidad = Object.keys(resultado).map((codProducto) => ({
    //       codProducto: "Código: " + parseInt(codProducto),
    //       sumaCantidad: resultado[codProducto]
    //     }));

    //     const top10 = arregloSumaCantidad.sort((a, b) => b.sumaCantidad - a.sumaCantidad).slice(0, 10);

    //     //console.log('Top 10:', top10);

    //     this.ProductosMasVendidos = top10;

    //     const top10Num = top10.map(a => a.sumaCantidad)
    //     const top10label = top10.map(a => a.codProducto)

    //     this.ProductBarrasSelling.count = top10Num
    //     this.ProductBarrasSelling.labels = top10label
    //     this.ProductBarrasSelling.title = "Productos más vendidos"

    //   this.dataService
    //     .getData('Producto').subscribe((data: any[]) => {

    //       //console.log(data);

    //       const nuevoArreglo = top10.map(objeto1 => {
    //         const objeto2 = data.find(objeto => "Código: " + parseInt(objeto.codProducto) === objeto1.codProducto);
    //         if (objeto2) {
    //           return { codProducto: objeto1.codProducto, descripcion: objeto2.descripcion };
    //         }
    //         return { codProducto: objeto1.codProducto, descripcion: null };
    //       }).map(objeto => objeto);

    //       //console.log('Arreglo con campos comunes:', nuevoArreglo);
    //       // this.DescripcionProductoVendidos = nuevoArreglo;
    //     })
    // }
    // );

  }






}
