import { Component, OnInit, TemplateRef } from '@angular/core';
import { DialogService } from '../module/dialog/service/dialog.service';
import { MatDialogRef } from '@angular/material/dialog';
import { DialogComponent } from '../module/dialog/dialog.component';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DataGlobalService } from '../module/view-data/services/data-global.service';
import Swal from 'sweetalert2';


interface Pago {
  cedula: string;
  nombre_propietario: string;
  fecha_cita: string;
  hora_cita: string;
  tipo_servicio: string;
  descripcion_servicio: string;
  descuento: string;
  precio: string;
  pago: string;
  forma_pago: string;
}

@Component({
  selector: 'app-pago',
  templateUrl: './pago.component.html',
  styleUrls: ['./pago.component.css']
})
export class PagoComponent implements OnInit {



  myData$: any[] = [
    {
      cedula: "1234567890",
      nombre_propietario: "Juan Pérez",
      fecha_cita: "2024-04-10",
      hora_cita: "10:00",
      tipo_servicio: "Vacunación",
      descripcion_servicio: "Vacuna antirrábica y desparasitación",
      descuento: "0",
      precio: "50",
      pago: "50",
      forma_pago: "Efectivo"
    },
    {
      cedula: "0987654321",
      nombre_propietario: "María González",
      fecha_cita: "2024-04-12",
      hora_cita: "15:30",
      tipo_servicio: "Consulta",
      descripcion_servicio: "Revisión general y control de peso",
      descuento: "10",
      precio: "80",
      pago: "70",
      forma_pago: "Tarjeta de crédito"
    },
    {
      cedula: "1357902468",
      nombre_propietario: "Ana Martínez",
      fecha_cita: "2024-04-15",
      hora_cita: "09:00",
      tipo_servicio: "Peluquería",
      descripcion_servicio: "Corte de pelo y baño",
      descuento: "5",
      precio: "70",
      pago: "65",
      forma_pago: "Transferencia bancaria"
    },
    {
      cedula: "2468013579",
      nombre_propietario: "Pedro Rodríguez",
      fecha_cita: "2024-04-18",
      hora_cita: "11:30",
      tipo_servicio: "Vacunación",
      descripcion_servicio: "Vacuna múltiple y análisis de sangre",
      descuento: "0",
      precio: "60",
      pago: "60",
      forma_pago: "Efectivo"
    },
    {
      cedula: "9876543210",
      nombre_propietario: "Laura Díaz",
      fecha_cita: "2024-04-20",
      hora_cita: "14:00",
      tipo_servicio: "Consulta",
      descripcion_servicio: "Examen de rutina y prescripción de medicamentos",
      descuento: "0",
      precio: "75",
      pago: "75",
      forma_pago: "Efectivo"
    },
    {
      cedula: "5432167890",
      nombre_propietario: "Roberto Fernández",
      fecha_cita: "2024-04-22",
      hora_cita: "16:30",
      tipo_servicio: "Peluquería",
      descripcion_servicio: "Baño y cepillado",
      descuento: "15",
      precio: "90",
      pago: "75",
      forma_pago: "Tarjeta de débito"
    },
    {
      cedula: "6789012345",
      nombre_propietario: "Carlos López",
      fecha_cita: "2024-04-25",
      hora_cita: "08:00",
      tipo_servicio: "Vacunación",
      descripcion_servicio: "Vacuna antiparasitaria y control de pulgas",
      descuento: "0",
      precio: "55",
      pago: "55",
      forma_pago: "Efectivo"
    },
    {
      cedula: "4321098765",
      nombre_propietario: "Elena Ruiz",
      fecha_cita: "2024-04-28",
      hora_cita: "12:00",
      tipo_servicio: "Consulta",
      descripcion_servicio: "Revisión de rutina y análisis de orina",
      descuento: "0",
      precio: "70",
      pago: "70",
      forma_pago: "Efectivo"
    },
    {
      cedula: "0123456789",
      nombre_propietario: "José García",
      fecha_cita: "2024-05-01",
      hora_cita: "09:30",
      tipo_servicio: "Peluquería",
      descripcion_servicio: "Corte de uñas y limpieza de oídos",
      descuento: "0",
      precio: "45",
      pago: "45",
      forma_pago: "Efectivo"
    },
    {
      cedula: "5678901234",
      nombre_propietario: "Marta Sánchez",
      fecha_cita: "2024-05-05",
      hora_cita: "13:30",
      tipo_servicio: "Vacunación",
      descripcion_servicio: "Vacuna antiparasitaria y control de garrapatas",
      descuento: "0",
      precio: "60",
      pago: "60",
      forma_pago: "Efectivo"
    }
  ];

  tableColumns = [
    { label: 'Cedula', def: 'Cedula', dataKey: 'cedula' },
    { label: 'Nombre', def: 'Nombre', dataKey: 'nombre_propietario' },
    { label: 'Fecha Cita', def: 'fecha_cita', dataKey: 'fecha_cita' },
    { label: 'Hora Cita', def: 'hora_cita', dataKey: 'hora_cita' },
    { label: 'Tipo Servicio', def: 'tipo_servicio', dataKey: 'tipo_servicio' },
    { label: 'Descripción del Servicio', def: 'descripcion_servicio', dataKey: 'descripcion_servicio' },
    { label: 'Forma de Pago', def: 'forma_pago', dataKey: 'forma_pago' },
    { label: 'Descuento', def: 'descuento', dataKey: 'descuento' },
    { label: 'Precio', def: 'precio', dataKey: 'precio' },
    { label: 'Monto Total', def: 'pago', dataKey: 'pago' },
  ]

  private matDialogRef!: MatDialogRef<DialogComponent>;

  item = {
    cedula: "",
    nombre_propietario: "",
    fecha_cita: "",
    hora_cita: "",
    tipo_servicio: "",
    descripcion_servicio: "",
    descuento: "",
    precio: "",
    pago: "",
    forma_pago: ""
  }

  formCreateItem: FormGroup = this.formBuilder.group(
    {
      'cedula': [this.item.cedula, [Validators.required, Validators.pattern('^[0-9]{3}-[0-9]{6}-[0-9]{4}[A-Z]$')]],
      'nombrePropietario': [this.item.nombre_propietario, Validators.required],
      'fechaCita': [this.item.fecha_cita, Validators.required],
      'horaCita': [this.item.hora_cita, [Validators.required, Validators.pattern('^(?:[0-1]?[0-9]|2[0-3]):[0-5][0-9]$')]],
      'tipoServicio': [this.item.tipo_servicio, Validators.required],
      'descripcionServicio': [this.item.descripcion_servicio, Validators.required],
      'formaPago': [this.item.forma_pago, Validators.required],
      'descuento': [this.item.descuento, [Validators.required, Validators.pattern('^(0(\.[0-9]{1,2})?|0\.9[0-9]|0\.99)$')]],
      'precio': [this.item.precio, Validators.required],
      'pago': [this.item.pago, Validators.required]
    }
  )


  formGetCreateItem(fr: string) {
    return this.formCreateItem.get(fr) as FormControl;
  }

  constructor(private dialogService: DialogService,
    private formBuilder: FormBuilder,
    private dataGlobalservice: DataGlobalService
  ) { }

  ngOnInit(): void {
    this.dataGlobalservice.$itemView.subscribe(item => {
      this.item = item
    })
  }

  openDialogWithTemplate(template: TemplateRef<any>) {
    this.matDialogRef = this.dialogService.openDialogWithTemplate({ template });

    this.matDialogRef.afterClosed().subscribe((res) => {
    });
  }

  cancelDialogResult() {
    this.matDialogRef.close()
  }

  viewFormNull() {
    Swal.fire({
      title: "Opción no habilitada",
      html: `
       <img src="https://cdn-icons-png.flaticon.com/512/11046/11046410.png" alt="Error" style="width: 100px; height: 100px;">
      `,
      showCloseButton: true,

      focusConfirm: false,
      confirmButtonText: `
      <i class="fa-solid fa-person-digging"></i> OK!
      `,
      confirmButtonAriaLabel: "Thumbs up, great!",
      imageWidth: 120,
    });
  }

  saveData() {

    const objeto = this.myData$.find(obj => obj.cedula == this.item.cedula)

    if (objeto.precio < Number(this.item.pago)) {

      let restante = Number(this.item.pago) - objeto.precio
      Swal.fire({
        title: "La cantidad a pagar es superior al precio del servicio",
        text: "El restante a regresar es " + restante + ". El pago se ajustara al precio del servicio",
        icon: "warning"
      }).then((result) => {
        if (result.isConfirmed) {
          this.item.pago = objeto.precio
          Swal.fire({
            title: "¿Estas segura?",
            text: "¡No podrás revertir esto!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "¡Sí, Realiza el pago!"
          }).then((result) => {

            if (result.isConfirmed) {

              let indice = this.myData$.findIndex(objeto => objeto.cedula === this.item.cedula);


              if (indice !== -1) {
                this.myData$[indice] = { ...this.item }
                this.myData$ = [...this.myData$]
              }



              this.formCreateItem.reset()
              this.cancelDialogResult()

              Swal.fire({
                title: "¡Guardado!",
                text: "La información ha sido guardado.",
                icon: "success"
              });
            }
          });
        }
      })

    }



  }

  onInputChange(event: KeyboardEvent) {
    const data = (event.target as HTMLInputElement).value
    if (data !== '') {

      const objeto = this.myData$.find(obj => obj.cedula == this.item.cedula)
      console.log(objeto)
      if (objeto) {
        this.item.precio = (objeto.precio - (objeto.precio * Number(this.item.descuento))).toString()
      }

    }
  }

}
