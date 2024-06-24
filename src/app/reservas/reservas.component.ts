import { Component, OnInit, TemplateRef } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { DialogComponent } from '../module/dialog/dialog.component';
import { DialogService } from '../module/dialog/service/dialog.service';
import { ApiDataService } from '../api/api-data.service';
import { DataGlobalService } from '../module/view-data/services/data-global.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

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

  myData$: any[] = []
  valChange = 0

  myDataMascotas : any[] = []
  myDataServicios : any[] = []

  item = {
    Id_Propietario:0,
    Id_reserva:0,
    Cedula: "",
    Nombre_Propietario: "",
    Telefono: "",
    Direccion: "",
    Nombre_Mascota: "",
    Fecha_Cita: "",
    Hora_Cita: "",
    Precio_Producto: "",
    Ubicacion:'',
    Tipo_Servicio: "",
    Descripcion_Servicio: ""
  }
  tableColumns = [
    { label: 'Cedula', def: 'Cedula', dataKey: 'Cedula' },
    { label: 'Nombre', def: 'Nombre', dataKey: 'Nombre_Propietario' },
    { label: 'Telefono', def: 'Telefono', dataKey: 'Telefono' },
    { label: 'Dirección', def: 'Direccion', dataKey: 'Direccion' },
    { label: 'Nombre Mascota', def: 'NombreMascota', dataKey: 'Nombre_Mascota' },
    { label: 'Fecha', def: 'fecha', dataKey: 'Fecha_Cita' },
    { label: 'Hora', def: 'hora', dataKey: 'Hora_Cita' },
    { label: 'Ubicación', def: 'Ubicacion', dataKey: 'Ubicacion' },
    { label: 'Precio', def: 'precio', dataKey: 'Precio_Producto' },
    { label: 'Tipo Servicio', def: 'tipoServicio', dataKey: 'Tipo_Servicio' },
    { label: 'Descripción', def: 'descripcion', dataKey: 'Descripcion_Servicio' },
  ]

  tableColumnsMascota = [
    { label: 'Cedula', def: 'Cedula', dataKey: 'Cedula' },
    { label: 'Nombre', def: 'Nombre', dataKey: 'Nombre_Propietario' },
    { label: 'Telefono', def: 'Telefono', dataKey: 'Telefono' },
    { label: 'Dirección', def: 'Direccion', dataKey: 'Direccion' },
    { label: 'ID Mascota', def: 'idMascota', dataKey: 'ID_Mascota' },
    { label: 'Nombre Mascota', def: 'NombreMascota', dataKey: 'Nombre_Mascota' },
  ]
  
  tableColumnsServicio = [
    { label: 'ID Servicio', def: 'idServicio', dataKey: 'id_servicio' },
    { label: 'Tipo de Servicio', def: 'tipoServicio', dataKey: 'tipo_servicio' },
    { label: 'Descripción', def: 'descripcion', dataKey: 'descripcion' },
    { label: 'Preció', def: 'precio', dataKey: 'precio' },
    { label: 'Productos', def: 'productos', dataKey: 'Productos' },
  ]

  itemMascota = {
    Cedula:0,
    Nombre_Propietario:'',
    Telefono:'',
    Direccion:'',
    ID_Mascota:'',
    Nombre_Mascota:'',
    Id_Propietario:0
  }

  itemServicio ={
    id_servicio:0,
    tipo_servicio:'',
    descripcion:'',
    precio:0,
    Productos:''
  }

  formCreateItem: FormGroup = this.formBuilder.group(
    {
      'ubicacion': [this.item.Ubicacion, Validators.required],
      'fechaCita': [this.item.Fecha_Cita, Validators.required],
      'horaCita': [this.item.Hora_Cita, [Validators.required, Validators.pattern('^(?:[0-1]?[0-9]|2[0-3]):[0-5][0-9]$')]],
    }
  )


  formGetCreateItem(fr: string) {
    return this.formCreateItem.get(fr) as FormControl;
  }
  
  private matDialogRef!: MatDialogRef<DialogComponent>;

  constructor(private dialogService: DialogService,
    private apiService: ApiDataService,
    private dataGlobalservice: DataGlobalService,
    private formBuilder: FormBuilder
  ){}

  ngOnInit(): void {
    this.dataGlobalservice.$itemView.subscribe(item => {
      this.item = item
      if(item){
        console.log(item)
        this.itemMascota = this.myDataMascotas.find(obj => obj.Id_Propietario == item.Id_Propietario)
        this.itemServicio = this.myDataServicios.find(obj => obj.id_servicio == item.id_servicio)


        this.formCreateItem.patchValue({
          'ubicacion':this.item.Ubicacion,
          'fechaCita':this.item.Fecha_Cita,
          'horaCita':this.item.Hora_Cita
        })

      }else{
        console.log('sss')
        this.itemMascota= {
          Cedula:0,
          Nombre_Propietario:'',
          Telefono:'',
          Direccion:'',
          ID_Mascota:'',
          Nombre_Mascota:'',
          Id_Propietario:0
        }

        this.itemServicio ={
          id_servicio:0,
          tipo_servicio:'',
          descripcion:'',
          precio:0,
          Productos:''
        }

        this.formCreateItem.patchValue({
          'ubicacion':'',
          'fechaCita':'',
          'horaCita':''
        })
      }

    })
    
    this.apiService.getData("detalleReserva/detalle-reservas").subscribe(data => {
      
      this.myData$ = data
    })

    this.apiService.getData("historialMascota/historial-mascotas").subscribe(data => {
      this.myDataMascotas = data
    })

    this.apiService.getData("infoServicio/servicios").subscribe(data => {
      this.myDataServicios = data
    })
  }

  cancelarTabla(){
    this.valChange = 0
  }

  obtenerMascota(data:any){
    this.valChange = 0
    this.itemMascota = data
  }
  
  obtenerServicio(data:any){
    this.valChange = 0
    this.itemServicio = data
  }

  openDialogWithTemplate(template: TemplateRef<any>) {
    this.matDialogRef = this.dialogService.openDialogWithTemplate({ template });

    this.matDialogRef.afterClosed().subscribe((res) => {
    });
  }

  cancelDialogResult() {
    this.matDialogRef.close()
  }

  saveData() {
    Swal.fire({
      title: "¿Estas segura?",
      text: "¡No podrás revertir esto!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "¡Sí, Actualizalo!"
    }).then((result) => {

      if (result.isConfirmed) {

        this.apiService.postData('detalleReserva/insertar-reserva', {
          nombre: this.itemMascota.Nombre_Mascota,
          ubicacion: this.formCreateItem.get('ubicacion')?.value,
          id_propietario: this.itemMascota.Id_Propietario,
          fecha: this.formCreateItem.get('fechaCita')?.value,
          hora: this.formCreateItem.get('horaCita')?.value,
          id_pago: null,
          id_servicio: this.itemServicio.id_servicio,

        }).then((result) => {
          if (result) {
            Swal.fire({
              title: "¡Guardado!",
              text: "La información ha sido guardado.",
              icon: "success"
            });
            this.formCreateItem.reset()

            this.cancelDialogResult()

            this.apiService.getData("detalleReserva/detalle-reservas").subscribe(data => {
      
              this.myData$ = data
            })
          } else {

          }
        })
      }
    });
  }

  updateData() {
    Swal.fire({
      title: "¿Estas segura?",
      text: "¡No podrás revertir esto!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "¡Sí, Guardalo!"
    }).then((result) => {

      if (result.isConfirmed) {

        this.apiService.postData('detalleReserva/actualizar-reserva', {
          id_reserva:this.item.Id_reserva,
          nombre: this.itemMascota.Nombre_Mascota,
          ubicacion: this.formCreateItem.get('ubicacion')?.value,
          id_propietario: this.itemMascota.Id_Propietario,
          fecha: this.formCreateItem.get('fechaCita')?.value,
          hora: this.formCreateItem.get('horaCita')?.value,
          id_pago: null,
          id_servicio: this.itemServicio.id_servicio,

        }).then((result) => {
          if (result) {
            Swal.fire({
              title: "¡Guardado!",
              text: "La información ha sido guardado.",
              icon: "success"
            });
            this.formCreateItem.reset()

            this.cancelDialogResult()

            this.apiService.getData("detalleReserva/detalle-reservas").subscribe(data => {
              this.myData$ = data
            })
          } else {

          }
        })
      }
    });
  }

}
