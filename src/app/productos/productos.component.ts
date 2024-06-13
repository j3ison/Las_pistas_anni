import { Component, TemplateRef } from '@angular/core';
import { DialogComponent } from '../module/dialog/dialog.component';
import { MatDialogRef } from '@angular/material/dialog';
import { DialogService } from '../module/dialog/service/dialog.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DataGlobalService } from '../module/view-data/services/data-global.service';
import Swal from 'sweetalert2';
import { ApiDataService } from '../api/api-data.service';

interface Producto {
  idProducto: string;
  nombre: string;
  descripcion: string;
  tipoProducto: string;
  marca: string;
  precio: string;
  cantidad: string;
}

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent {
  myData$: any[] = []

  tableColumns = [
    { label: 'ID Producto', def: 'idProducto', dataKey: 'id_Producto' },
    { label: 'Nombre', def: 'nombre', dataKey: 'nombre' },
    { label: 'Descripción', def: 'descripcion', dataKey: 'descripcion' },
    { label: 'Marca', def: 'marca', dataKey: 'marca' },
    { label: 'Precio', def: 'precio', dataKey: 'precio' },
    { label: 'Cantidad', def: 'cantidad', dataKey: 'cantidad' }
  ]

  private matDialogRef!: MatDialogRef<DialogComponent>;

  formCreateItem: FormGroup = this.formBuilder.group(
    {
      'idProducto': ['', [Validators.nullValidator]],
      'nombre': ['', Validators.required],
      'descripcion': ['', [Validators.required]],
      'tipoProducto': ['', Validators.required],
      'marca': ['', Validators.required],
      'precio': ['', Validators.required],
      'cantidad': ['', Validators.required]
    }
  )

  formGetCreateItem(fr: string) {
    return this.formCreateItem.get(fr) as FormControl;
  }


  itemUpdate: any = {}

  formUpdateItem: FormGroup = this.formBuilder.group(
    {
      'idProducto': [this.itemUpdate.id_Producto, Validators.nullValidator],
      'nombre': [this.itemUpdate.nombre, Validators.required],
      'descripcion': [this.itemUpdate.descripcion, Validators.required],
      'tipoProducto': [this.itemUpdate.Tipo_Producto, Validators.required],
      'marca': [this.itemUpdate.marca, Validators.required],
      'precio': [this.itemUpdate.precio, Validators.required],
      'cantidad': [this.itemUpdate.cantidad, Validators.required]
    }
  )

  formGetUpdateItem(fr: string) {
    return this.formUpdateItem.get(fr) as FormControl;
  }


  constructor(private dialogService: DialogService,
    private formBuilder: FormBuilder,
    private dataGlobalservice: DataGlobalService,
    private apiService: ApiDataService,
  ) { }

  ngOnInit(): void {
    this.dataGlobalservice.$itemView.subscribe(item => {
      this.itemUpdate = item
    })

    this.apiService.getData("producto/productos").subscribe(data => {
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

      if (result.isConfirmed) {
        // tipoProducto: this.formCreateItem.get('tipoProducto')?.value,

        this.apiService.postData('producto/insertar-producto', {
          nuevo_nombre: this.formCreateItem.get('nombre')?.value,
          nueva_descripcion: this.formCreateItem.get('descripcion')?.value,
          nueva_marca: this.formCreateItem.get('marca')?.value,
          nuevo_precio: this.formCreateItem.get('precio')?.value,
          nueva_cantidad: this.formCreateItem.get('cantidad')?.value
        }).then((result) => {
          if (result) {
            Swal.fire({
              title: "¡Guardado!",
              text: "La información ha sido guardado.",
              icon: "success"
            });
            this.formUpdateItem.reset()

            this.cancelDialogResult()

            this.apiService.getData("producto/productos").subscribe(data => {
              this.myData$ = data
            })
          } else {

          }
        })

        //   idProducto: "1",
        // nombre: "Laptop HP Pavilion",
        // descripcion: "Laptop con pantalla táctil de 15.6 pulgadas, procesador Intel Core i5, 8 GB de RAM y 256 GB de almacenamiento SSD.",
        // tipoProducto: "Electrónico",
        // marca: "HP",
        // precio: "$899.99",
        // cantidad: "15"

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

        this.apiService.postData('producto/actualizar-producto', {
          id_Producto: this.itemUpdate.id_Producto,
          nuevo_nombre: this.formUpdateItem.get('nombre')?.value,
          nueva_descripcion: this.formUpdateItem.get('descripcion')?.value,
          // tipoProducto: this.formUpdateItem.get('tipoProducto')?.value,
          nueva_marca: this.formUpdateItem.get('marca')?.value,
          nuevo_precio: this.formUpdateItem.get('precio')?.value,
          nueva_cantidad: this.formUpdateItem.get('cantidad')?.value
        }).then((result) => {
          if (result) {
            Swal.fire({
              title: "¡Guardado!",
              text: "La información ha sido guardado.",
              icon: "success"
            });
            this.formUpdateItem.reset()

            this.cancelDialogResult()

            this.apiService.getData("producto/productos").subscribe(data => {
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
