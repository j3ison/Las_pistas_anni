import { Component, OnInit, TemplateRef } from '@angular/core';
import { DialogService } from '../module/dialog/service/dialog.service';
import { MatDialogRef } from '@angular/material/dialog';
import { DialogComponent } from '../module/dialog/dialog.component';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DataGlobalService } from '../module/view-data/services/data-global.service';
import Swal from 'sweetalert2';
import { ApiDataService } from '../api/api-data.service';


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



  myData$: any[] = []

  tableColumns = [
    { label: 'Cedula', def: 'Cedula', dataKey: 'Cedula_Propietario' },
    { label: 'Nombre', def: 'Nombre', dataKey: 'Nombre_Propietario' },
    { label: 'Fecha Cita', def: 'fecha_cita', dataKey: 'Fecha_Cita' },
    { label: 'Hora Cita', def: 'hora_cita', dataKey: 'Hora_Cita' },
    { label: 'Tipo Servicio', def: 'tipo_servicio', dataKey: 'Tipo_Servicio' },
    { label: 'Descripción del Servicio', def: 'descripcion_servicio', dataKey: 'Descripcion_Servicio' },
    { label: 'Forma de Pago', def: 'forma_pago', dataKey: 'Forma_Pago' },
    { label: 'Descuento', def: 'descuento', dataKey: 'Descuento' },
    { label: 'Precio', def: 'precio', dataKey: 'Precio' },
    { label: 'Monto Total', def: 'pago', dataKey: 'Pago' },
  ]

  private matDialogRef!: MatDialogRef<DialogComponent>;

  item = {
    Cedula_Propietario: "",
    Nombre_Propietario: "",
    Fecha_Cita: "",
    Hora_Cita: "",
    Tipo_Servicio: "",
    Descripcion_Servicio: "",
    Descuento: "",
    Precio: "",
    Pago: "",
    Forma_Pago: ""
  }

  formCreateItem: FormGroup = this.formBuilder.group(
    {
      'cedula': [this.item.Cedula_Propietario, [Validators.required, Validators.pattern('^[0-9]{3}-[0-9]{6}-[0-9]{4}[A-Z]$')]],
      'nombrePropietario': [this.item.Nombre_Propietario, Validators.required],
      'fechaCita': [this.item.Fecha_Cita, Validators.required],
      'horaCita': [this.item.Hora_Cita, [Validators.required, Validators.pattern('^(?:[0-1]?[0-9]|2[0-3]):[0-5][0-9]$')]],
      'tipoServicio': [this.item.Tipo_Servicio, Validators.required],
      'descripcionServicio': [this.item.Descripcion_Servicio, Validators.required],
      'formaPago': [this.item.Forma_Pago, Validators.required],
      'descuento': [this.item.Descuento, [Validators.required, Validators.pattern('^(0(\.[0-9]{1,2})?|0\.9[0-9]|0\.99)$')]],
      'precio': [this.item.Precio, Validators.required],
      'pago': [this.item.Pago, Validators.required]
    }
  )


  formGetCreateItem(fr: string) {
    return this.formCreateItem.get(fr) as FormControl;
  }

  constructor(private dialogService: DialogService,
    private formBuilder: FormBuilder,
    private dataGlobalservice: DataGlobalService,
    private apiService: ApiDataService
  ) { }

  ngOnInit(): void {
    this.dataGlobalservice.$itemView.subscribe(item => {
      this.item = item
    })

    this.apiService.getData("infoPago/pagos").subscribe(data => {
      console.log(data)
      this.myData$ = data
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

    const objeto = this.myData$.find(obj => obj.cedula == this.item.Cedula_Propietario)

    if (objeto.Precio < Number(this.item.Pago)) {

      let restante = Number(this.item.Pago) - objeto.Precio
      Swal.fire({
        title: "La cantidad a pagar es superior al precio del servicio",
        text: "El restante a regresar es " + restante + ". El pago se ajustara al precio del servicio",
        icon: "warning"
      }).then((result) => {
        if (result.isConfirmed) {
          this.item.Pago = objeto.Precio
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

              let indice = this.myData$.findIndex(objeto => objeto.Cedula_Propietario === this.item.Cedula_Propietario);


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

      const objeto = this.myData$.find(obj => obj.cedula == this.item.Cedula_Propietario)
      console.log(objeto)
      if (objeto) {
        this.item.Precio = (objeto.precio - (objeto.precio * Number(this.item.Descuento))).toString()
      }

    }
  }

}
