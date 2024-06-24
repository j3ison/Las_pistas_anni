import { Component, OnInit, TemplateRef } from '@angular/core';
import { DialogComponent } from '../module/dialog/dialog.component';
import { MatDialogRef } from '@angular/material/dialog';
import { DialogService } from '../module/dialog/service/dialog.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DataGlobalService } from '../module/view-data/services/data-global.service';
import Swal from 'sweetalert2';
import { isEmpty } from 'rxjs';
import { ApiDataService } from '../api/api-data.service';
import { dA } from '@fullcalendar/core/internal-common';

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
export class ServiciosComponent implements OnInit {

  myData$: any[] = []

  tableColumns = [
    { label: 'ID Servicio', def: 'idServicio', dataKey: 'id_servicio' },
    { label: 'Tipo de Servicio', def: 'tipoServicio', dataKey: 'tipo_servicio' },
    { label: 'Descripción', def: 'descripcion', dataKey: 'descripcion' },
    { label: 'Preció', def: 'precio', dataKey: 'precio' },
    { label: 'Productos', def: 'productos', dataKey: 'Productos' },
  ]



  private matDialogRef!: MatDialogRef<DialogComponent>;
  private matDialogRefProducto!: MatDialogRef<DialogComponent>;

  itemsProductos: any[] = []

  item = {
    id_servicio: 0,
    tipo_servicio: '',
    descripcion: '',
    precio: 0,
    Productos: [
      { id_producto: 0, cantidad: 0 }
    ]
  }

  formCreateItem: FormGroup = this.formBuilder.group(
    {
      'tipoServicio': [this.item.tipo_servicio, Validators.nullValidator],
      'descripcion': [this.item.descripcion, Validators.required],
      'precio': [this.item.precio, Validators.required],
      // 'productos': [this.item.Productos, Validators.required]
    }
  )

  formGetCreateItem(fr: string) {
    return this.formCreateItem.get(fr) as FormControl;
  }



  formUpdateItem: FormGroup = this.formBuilder.group(
    {
      'tipoServicio': [this.item.tipo_servicio, Validators.nullValidator],
      'descripcion': [this.item.descripcion, Validators.required],
      'precio': [this.item.precio, Validators.required],
    }
  )

  formGetUpdateItem(fr: string) {
    return this.formUpdateItem.get(fr) as FormControl;
  }

  tableColumnsProducto = [
    { label: 'ID Producto', def: 'idProducto', dataKey: 'id_Producto' },
    { label: 'Nombre', def: 'nombre', dataKey: 'nombre' },
    { label: 'Descripción', def: 'descripcion', dataKey: 'descripcion' },
    { label: 'Marca', def: 'marca', dataKey: 'marca' },
    { label: 'Precio', def: 'precio', dataKey: 'precio' },
    { label: 'Cantidad', def: 'cantidad', dataKey: 'cantidad' },
  ]

  productoVal: any[] = []

  modeChange = true;

  obtenerProducto($event: any) {
    const data = { ...$event }

    console.log(data)

    data.cantidad = 1
    if (this.itemsProductos.filter(obj => obj.nombre === data.nombre).length <= 0) {

      this.itemsProductos = [...this.itemsProductos, data]
      this.modeChange = true

      // this.item.precio = this.itemsProductos.reduce((total, elemento) => total + elemento.precio, 0) + (this.itemsProductos.reduce((total, elemento) => total + elemento.precio, 0) * 0.20)



      this.formCreateItem.patchValue({
        'precio': this.itemsProductos.reduce((total, elemento) => total + elemento.precio, 0) + (this.itemsProductos.reduce((total, elemento) => total + elemento.precio, 0) * 0.20),
      })
    }
    else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Este producto ya ha sido agregado anteriormente. Por favor, elige otro o ajusta la cantidad si es necesario.!"
      });
    }

  }

  cancelarTabla() {
    this.modeChange = true
  }

  onInputChange(event: any, index: number) {

    const data = (event.target as HTMLInputElement).value
    if (data !== '') {

      const objeto = this.productoVal.find(obj => obj.nombre == this.itemsProductos[index].nombre)
      if (objeto) {


        this.itemsProductos[index].precio = Number(data) * objeto.precio

        this.formCreateItem.patchValue({
          'precio': this.itemsProductos.reduce((total, elemento) => total + elemento.precio, 0) + (this.itemsProductos.reduce((total, elemento) => total + elemento.precio, 0) * 0.20),
        })
      }

    }
  }

  eliminarProducto(index: number) {
    Swal.fire({
      title: "¿Estas segura?",
      text: "¡No podrás revertir esto!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "¡Sí, bórralo!"
    }).then((result) => {


      if (result.isConfirmed) {
        this.itemsProductos.splice(index, 1);
        Swal.fire({
          title: "¡Eliminado!",
          text: "El producto ha sido eliminado.",
          icon: "success"
        });

        this.formCreateItem.patchValue({
          'precio': this.itemsProductos.reduce((total, elemento) => total + elemento.precio, 0) + (this.itemsProductos.reduce((total, elemento) => total + elemento.precio, 0) * 0.20),
        })
      }
    });
  }

  constructor(private dialogService: DialogService,
    private dialogServiceProducto: DialogService,
    private formBuilder: FormBuilder,
    private dataGlobalservice: DataGlobalService,
    private apiService: ApiDataService) { }

  ngOnInit(): void {

    this.dataGlobalservice.$itemView.subscribe(item => {
      this.item = item

      if (item) {
        this.formCreateItem.patchValue({
          'precio': this.item.precio?this.item.precio:0,
          'tipoServicio': this.item.tipo_servicio,
          'descripcion': this.item.descripcion
        })

        console.log(this.item)
      }
    })

    this.apiService.getData("infoServicio/servicios").subscribe(data => {
      this.myData$ = data
    })

    this.apiService.getData("producto/productos").subscribe(data => {
      this.productoVal = data
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

  openDialogWithTemplateProduct(template: TemplateRef<any>) {
    this.matDialogRefProducto = this.dialogServiceProducto.openDialogWithTemplate({ template });

    this.matDialogRefProducto.afterClosed().subscribe((res) => {
    });
  }

  cancelDialogResultProduct() {
    if (this.matDialogRefProducto) {
      this.matDialogRefProducto.close()
    }
  }

  saveData() {

    let productos = this.itemsProductos.map(item => {
      return {
        id_producto: item.id_Producto,
        cantidad: item.cantidad
      };
    })


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



        this.apiService.postData('infoServicio/insertar-servicio', {
          nuevo_tipo_servicio: this.formCreateItem.get('tipoServicio')?.value,
          nueva_descripcion: this.formCreateItem.get('descripcion')?.value,
          nuevo_precio: this.formCreateItem.get('precio')?.value,
          productos: productos,

        }).then((result) => {
          if (result) {
            Swal.fire({
              title: "¡Guardado!",
              text: "La información ha sido guardado.",
              icon: "success"
            });
            this.formCreateItem.reset()

            this.cancelDialogResult()

            this.itemsProductos = []

            this.apiService.getData("infoServicio/servicios").subscribe(data => {
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
      confirmButtonText: "¡Sí, Actualizalo!"
    }).then((result) => {

      
      if (result.isConfirmed) {


        this.apiService.postData('infoServicio/actualizar-servicio', {
          id_servicio:this.item.id_servicio,
          nuevo_tipo_servicio: this.formUpdateItem.get('tipoServicio')?.value,
          nueva_descripcion: this.formUpdateItem.get('descripcion')?.value,
          nuevo_precio: this.formUpdateItem.get('precio')?.value,

        }).then((result) => {
          if (result) {
            Swal.fire({
              title: "¡Guardado!",
              text: "La información ha sido guardado.",
              icon: "success"
            });
            this.formUpdateItem.reset()

            this.cancelDialogResult()

            this.itemsProductos = []

            this.apiService.getData("infoServicio/servicios").subscribe(data => {
              this.myData$ = data
            })

          } else {

          }
        })
      }
    });
  }

}
