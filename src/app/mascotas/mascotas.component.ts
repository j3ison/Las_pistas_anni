import { Component, OnInit, TemplateRef } from '@angular/core';
import { DialogService } from '../module/dialog/service/dialog.service';
import { MatDialogRef } from '@angular/material/dialog';
import { DialogComponent } from '../module/dialog/dialog.component';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DataGlobalService } from '../module/view-data/services/data-global.service';
import { renderChunkContent } from '@fullcalendar/core/internal';
import Swal from 'sweetalert2';



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
      fecha_nacimiento: '2018-05-20',
      especie: 'Perro',
      sexo: 'Macho',
      nombre_mascota: 'Max',
      historial: 'Vacunas al día',
      nombre_propietario: 'Juan',
      direccion: 'Calle 123',
      cedula: '1234567890',
      telefono: '123456789'
    },
    {
      idMascota: 2,
      idPropietario: 1,
      fecha_nacimiento: '2019-02-10',
      especie: 'Gato',
      sexo: 'Hembra',
      nombre_mascota: 'Luna',
      historial: 'Desparasitación realizada',
      nombre_propietario: 'Juan',
      direccion: 'Calle 123',
      cedula: '1234567890',
      telefono: '123456789'
    },
    {
      idMascota: 3,
      idPropietario: 2,
      fecha_nacimiento: '2020-10-15',
      especie: 'Perro',
      sexo: 'Hembra',
      nombre_mascota: 'Bella',
      historial: 'Control veterinario anual',
      nombre_propietario: 'María',
      direccion: 'Avenida 456',
      cedula: '0987654321',
      telefono: '987654321'
    },
    {
      idMascota: 4,
      idPropietario: 3,
      fecha_nacimiento: '2017-08-03',
      especie: 'Gato',
      sexo: 'Macho',
      nombre_mascota: 'Simba',
      historial: 'Esterilización realizada',
      nombre_propietario: 'Pedro',
      direccion: 'Carrera 789',
      cedula: '1357924680',
      telefono: '246801357'
    },
    {
      idMascota: 5,
      idPropietario: 4,
      fecha_nacimiento: '2019-11-25',
      especie: 'Perro',
      sexo: 'Macho',
      nombre_mascota: 'Rocky',
      historial: 'Vacunas al día',
      nombre_propietario: 'Ana',
      direccion: 'Avenida 246',
      cedula: '9753106428',
      telefono: '369852147'
    },
    {
      idMascota: 6,
      idPropietario: 5,
      fecha_nacimiento: '2016-04-12',
      especie: 'Perro',
      sexo: 'Macho',
      nombre_mascota: 'Bruno',
      historial: 'Control de peso mensual',
      nombre_propietario: 'Luis',
      direccion: 'Calle 789',
      cedula: '7531902468',
      telefono: '258369147'
    },
    {
      idMascota: 7,
      idPropietario: 6,
      fecha_nacimiento: '2018-09-30',
      especie: 'Gato',
      sexo: 'Hembra',
      nombre_mascota: 'Mia',
      historial: 'Desparasitación realizada',
      nombre_propietario: 'Sofía',
      direccion: 'Carrera 135',
      cedula: '3698521470',
      telefono: '147258369'
    },
    {
      idMascota: 8,
      idPropietario: 7,
      fecha_nacimiento: '2020-02-18',
      especie: 'Perro',
      sexo: 'Macho',
      nombre_mascota: 'Coco',
      historial: 'Vacunas al día',
      nombre_propietario: 'Elena',
      direccion: 'Avenida 753',
      cedula: '8523691470',
      telefono: '369147258'
    },
    {
      idMascota: 9,
      idPropietario: 8,
      fecha_nacimiento: '2017-06-08',
      especie: 'Perro',
      sexo: 'Hembra',
      nombre_mascota: 'Luna',
      historial: 'Control veterinario anual',
      nombre_propietario: 'Diego',
      direccion: 'Calle 369',
      cedula: '1472583690',
      telefono: '852369147'
    },
    {
      idMascota: 10,
      idPropietario: 8,
      fecha_nacimiento: '2019-12-20',
      especie: 'Gato',
      sexo: 'Hembra',
      nombre_mascota: 'Luna',
      historial: 'Esterilización realizada',
      nombre_propietario: 'Diego',
      direccion: 'Calle 369',
      cedula: '1472583690',
      telefono: '852369147'
    },
  ];

  tableColumns = [
    { label: 'Cedula', def: 'Cedula', dataKey: 'cedula' },
    { label: 'Nombre', def: 'Nombre', dataKey: 'nombre_propietario' },
    { label: 'Telefono', def: 'Telefono', dataKey: 'telefono' },
    { label: 'Dirección', def: 'Direccion', dataKey: 'direccion' },
    { label: 'ID Mascota', def: 'idMascota', dataKey: 'idMascota' },
    { label: 'Nombre Mascota', def: 'NombreMascota', dataKey: 'nombre_mascota' },
    { label: 'Fecha Nacimiento', def: 'fecha_nacimiento', dataKey: 'fecha_nacimiento' },
    { label: 'Especie', def: 'especie', dataKey: 'especie' },
    { label: 'Sexo', def: 'sexo', dataKey: 'sexo' },
    { label: 'Historial', def: 'historial', dataKey: 'historial' },
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
      'fechaNacimiento': ['', Validators.nullValidator],
      'historial': ['', Validators.nullValidator]
    }
  )

  formGetCreateItem(fr: string) {
    return this.formCreateItem.get(fr) as FormControl;
  }

  itemUpdate: any = {}

  formUpdateItem: FormGroup = this.formBuilder.group(
    {
      'cedula': [this.itemUpdate.cedula, [Validators.required, Validators.pattern('^[0-9]{3}-[0-9]{6}-[0-9]{4}[A-Z]$')]],
      'nombrePropietario': [this.itemUpdate.nombre_propietario, Validators.required],
      'telefono': [this.itemUpdate.telefono, [Validators.required, Validators.pattern('^[5|7-9][0-9]{7}$')]],
      'direccion': [this.itemUpdate.direccion, Validators.required],
      'nombreMascota': [this.itemUpdate.nombre_mascota, Validators.required],
      'sexo': [this.itemUpdate.sexo, Validators.required],
      'especie': [this.itemUpdate.especie, Validators.required],
      'fechaNacimiento': [this.itemUpdate.fecha_nacimiento, Validators.required],
      'historial': [this.itemUpdate.historial, Validators.required]
    }
  )

  formGetUpdateItem(fr: string) {
    return this.formUpdateItem.get(fr) as FormControl;
  }



  // validaciones
  // validarCedula() {
  //   return (control: { value: any; }) => {
  //     const cedulaRegex = /^[0-9]{8}[A-Z]$/;
  //     const valor = control.value;
  //     if (!valor) {
  //       return null;
  //     }
  //     if (!cedulaRegex.test(valor)) {
  //       return { invalidCedula: true };
  //     }
  //     return null;
  //   };
  // }

  // validarTelefono() {
  //   return (control: { value: any }) => {
  //     const telefonoRegex = /^[5|7-9][0-9]{7}$/;
  //     const valor = control.value;
  //     if (!valor) {
  //       return null;
  //     }
  //     if (!telefonoRegex.test(valor)) {
  //       return { invalidCedula: true };
  //     }
  //     return null;
  //   }
  // }

  //---------------------------Fin de validaciones----------------------------

  constructor(private dialogService: DialogService,
    private formBuilder: FormBuilder,
    private dataGlobalservice: DataGlobalService) { }

  ngOnInit(): void {
    this.dataGlobalservice.$itemView.subscribe(item => {
      this.itemUpdate = item
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

        const numeros = this.myData$.map(objeto => objeto.idMascota);
        const id = Math.max(...numeros) + 1

        console.log(id)

        this.myData$ = [...this.myData$, {
          idMascota: id,
          idPropietario: 1,
          fecha_nacimiento: this.formCreateItem.get('fechaNacimiento')?.value,
          especie: this.formCreateItem.get('especie')?.value,
          sexo: this.formCreateItem.get('sexo')?.value,
          nombre_mascota: this.formCreateItem.get('nombreMascota')?.value,
          historial: this.formCreateItem.get('historial')?.value,
          nombre_propietario: this.formCreateItem.get('nombrePropietario')?.value,
          direccion: this.formCreateItem.get('direccion')?.value,
          cedula: this.formCreateItem.get('cedula')?.value,
          telefono: this.formCreateItem.get('telefono')?.value
        }]

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


  updateData(){

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
        
        let indice = this.myData$.findIndex(objeto => objeto.idMascota === this.itemUpdate.idMascota);

        console.log(indice)
        if(indice !== -1){
          this.myData$[indice] = this.itemUpdate
          this.myData$ = [...this.myData$]
        }

        this.cancelDialogResult()
        

        Swal.fire({
          title: "¡Actualizado!",
          text: "La información ha sido actualizada.",
          icon: "success"
        });
      }
    });

  }

}
