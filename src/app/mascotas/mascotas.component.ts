import { Component, OnInit, TemplateRef } from '@angular/core';
import { DialogService } from '../module/dialog/service/dialog.service';
import { MatDialogRef } from '@angular/material/dialog';
import { DialogComponent } from '../module/dialog/dialog.component';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DataGlobalService } from '../module/view-data/services/data-global.service';
import { renderChunkContent } from '@fullcalendar/core/internal';
import Swal from 'sweetalert2';
import { ApiDataService } from '../api/api-data.service';



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
  myData$: any[] = []

  tableColumns = [
    { label: 'Cedula', def: 'Cedula', dataKey: 'Cedula' },
    { label: 'Nombre', def: 'Nombre', dataKey: 'Nombre_Propietario' },
    { label: 'Telefono', def: 'Telefono', dataKey: 'Telefono' },
    { label: 'Dirección', def: 'Direccion', dataKey: 'Direccion' },
    { label: 'ID Mascota', def: 'idMascota', dataKey: 'ID_Mascota' },
    { label: 'Nombre Mascota', def: 'NombreMascota', dataKey: 'Nombre_Mascota' },
    { label: 'Fecha Nacimiento', def: 'fecha_nacimiento', dataKey: 'Fecha_Nacimiento' },
    { label: 'Especie', def: 'especie', dataKey: 'Especie' },
    { label: 'Sexo', def: 'sexo', dataKey: 'Sexo' },
    // { label: 'Historial', def: 'historial', dataKey: 'historial' },
  ]

  private matDialogRef!: MatDialogRef<DialogComponent>;


  formCreateItem: FormGroup = this.formBuilder.group(
    {
      'cedula': ['', [Validators.nullValidator, Validators.pattern('^[0-9]{3}-[0-9]{6}-[0-9]{4}[A-Z]$')]],
      'nombrePropietario': ['', Validators.required],
      'telefono': ['', [Validators.required, Validators.pattern('^[5|7-9][0-9]{7}$')]],
      'direccion': ['', Validators.required],
      'nombreMascota': ['', Validators.required],
      'sexo': ['', Validators.required],
      'especie': ['', Validators.required],
      'raza': ['', Validators.required],
      'fechaNacimiento': ['', Validators.nullValidator],
      // 'historial': ['', Validators.nullValidator]
    }
  )

  formGetCreateItem(fr: string) {
    return this.formCreateItem.get(fr) as FormControl;
  }

  itemUpdate: any = {}

  formUpdateItem: FormGroup = this.formBuilder.group(
    {
      'cedula': [this.itemUpdate.Cedula, [Validators.required, Validators.pattern('^[0-9]{3}-[0-9]{6}-[0-9]{4}[A-Z]$')]],
      'nombrePropietario': [this.itemUpdate.Nombre_Propietario, Validators.required],
      'telefono': [this.itemUpdate.Telefono, [Validators.required, Validators.pattern('^[5|7-9][0-9]{7}$')]],
      'direccion': [this.itemUpdate.Direccion, Validators.required],
      'nombreMascota': [this.itemUpdate.Nombre_Mascota, Validators.required],
      'sexo': [this.itemUpdate.Sexo, Validators.required],
      'especie': [this.itemUpdate.Especie, Validators.required],
      'fechaNacimiento': [this.itemUpdate.Fecha_Nacimiento, Validators.required],
      'raza': [this.itemUpdate.Raza, Validators.required]
    }
  )

  formGetUpdateItem(fr: string) {
    return this.formUpdateItem.get(fr) as FormControl;
  }

  constructor(private dialogService: DialogService,
    private formBuilder: FormBuilder,
    private dataGlobalservice: DataGlobalService,
    private apiService: ApiDataService) { }

  ngOnInit(): void {
    this.dataGlobalservice.$itemView.subscribe(item => {
      this.itemUpdate = item


      if (item){
        console.log(this.itemUpdate)
        this.formUpdateItem.patchValue({
          'cedula': this.itemUpdate.Cedula,
          'nombrePropietario': this.itemUpdate.Nombre_Propietario,
          'telefono': this.itemUpdate.Telefono,
          'direccion': this.itemUpdate.Direccion,
          'nombreMascota': this.itemUpdate.Nombre_Mascota,
          'sexo': this.itemUpdate.Sexo,
          'especie': this.itemUpdate.Especie,
          'fechaNacimiento': this.itemUpdate.Fecha_Nacimiento,
          'raza': this.itemUpdate.Raza
        });

      }





    })

    this.apiService.getData("historialMascota/historial-mascotas").subscribe(data => {
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
    if (this.matDialogRef)
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
    Swal.fire({
      title: "¿Estas segura?",
      text: "¡No podrás revertir esto!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "¡Sí, Guardalo!"
    }).then((result) => {

      console.log({
        fecha_nacimiento: this.formCreateItem.get('fechaNacimiento')?.value,
        especie: this.formCreateItem.get('especie')?.value,
        sexo: this.formCreateItem.get('sexo')?.value,
        nombre_mascota: this.formCreateItem.get('nombreMascota')?.value,
        raza: this.formCreateItem.get('raza')?.value,
        nombre_propietario: this.formCreateItem.get('nombrePropietario')?.value,
        direccion: this.formCreateItem.get('direccion')?.value,
        cedula: this.formCreateItem.get('cedula')?.value,
        telefono: this.formCreateItem.get('telefono')?.value
      })

      if (result.isConfirmed) {

        this.apiService.postData('historialMascota/insertar-mascota', {
          fecha_nacimiento: this.formCreateItem.get('fechaNacimiento')?.value,
          especie: this.formCreateItem.get('especie')?.value,
          sexo: this.formCreateItem.get('sexo')?.value,
          nombre_mascota: this.formCreateItem.get('nombreMascota')?.value,
          raza: this.formCreateItem.get('raza')?.value,
          nombre_propietario: this.formCreateItem.get('nombrePropietario')?.value,
          direccion: this.formCreateItem.get('direccion')?.value,
          cedula: this.formCreateItem.get('cedula')?.value,
          telefono: this.formCreateItem.get('telefono')?.value
        }).then((result) => {
          if (result) {
            Swal.fire({
              title: "¡Guardado!",
              text: "La información ha sido guardado.",
              icon: "success"
            });
            this.formCreateItem.reset()

            this.cancelDialogResult()
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
      confirmButtonText: "¡Sí, Actualizalo!"
    }).then((result) => {

      if (result.isConfirmed) {

        this.apiService.postData('historialMascota/actualizar-mascota', {
          id_mascota: this.itemUpdate.ID_Mascota,
          // id_propietario: this.itemUpdate.Id_Propietario,
          fecha_nacimiento: this.formUpdateItem.get('fechaNacimiento')?.value,
          especie: this.formUpdateItem.get('especie')?.value,
          sexo: this.formUpdateItem.get('sexo')?.value,
          nombre_mascota: this.formUpdateItem.get('nombreMascota')?.value,
          raza: this.formUpdateItem.get('raza')?.value,
          nombre_propietario: this.formUpdateItem.get('nombrePropietario')?.value,
          direccion: this.formUpdateItem.get('direccion')?.value,
          cedula: this.formUpdateItem.get('cedula')?.value,
          telefono: this.formUpdateItem.get('telefono')?.value
        }).then((result) => {
          if (result) {
            Swal.fire({
              title: "¡Guardado!",
              text: "La información ha sido guardado.",
              icon: "success"
            });
            this.formUpdateItem.reset()

            this.cancelDialogResult()
            
            this.apiService.getData("historialMascota/historial-mascotas").subscribe(data => {
              console.log(data)
              this.myData$ = data
            })
          } else {

          }
        })
      }
    });

  }

}
