import { Component, TemplateRef } from '@angular/core';
import { DialogComponent } from '../module/dialog/dialog.component';
import { MatDialogRef } from '@angular/material/dialog';
import { DialogService } from '../module/dialog/service/dialog.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DataGlobalService } from '../module/view-data/services/data-global.service';
import Swal from 'sweetalert2';

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
  myData$: any[] = [
    {
      idProducto: "1",
      nombre: "Desparasitante",
      descripcion: "Desparasitante mensual para perros y gatos",
      tipoProducto: "B",
      marca: "VetPlus",
      precio: "150",
      cantidad: "15"
    },
    {
      idProducto: "2",
      nombre: "Alimento para perros",
      descripcion: "Alimento balanceado para perros adultos",
      tipoProducto: "B",
      marca: "NutriPet",
      precio: "300",
      cantidad: "20"
    },
    {
      idProducto: "3",
      nombre: "Arena sanitaria",
      descripcion: "Arena para gatos que absorbe olores",
      tipoProducto: "A",
      marca: "FreshCat",
      precio: "50",
      cantidad: "10"
    },
    {
      idProducto: "4",
      nombre: "Collar antipulgas",
      descripcion: "Collar repelente de pulgas y garrapatas",
      tipoProducto: "B",
      marca: "ProtectoPet",
      precio: "80",
      cantidad: "30"
    },
    {
      idProducto: "5",
      nombre: "Juguete para perros",
      descripcion: "Pelota de goma para jugar con perros",
      tipoProducto: "B",
      marca: "Canon",
      precio: "599",
      cantidad: "12"
    },
    {
      idProducto: "6",
      nombre: "Camita para gatos",
      descripcion: "Camita suave y cómoda para gatos",
      tipoProducto: "B",
      marca: "SensitiveGroom",
      precio: "199",
      cantidad: "25"
    },
    {
      idProducto: "7",
      nombre: "Shampoo hipoalergénico",
      descripcion: "Shampoo suave para pieles sensibles",
      tipoProducto: "A",
      marca: "SensitiveGroom",
      precio: "399",
      cantidad: "8"
    },
    {
      idProducto: "8",
      nombre: "Snacks para entrenamiento",
      descripcion: "Premios pequeños para incentivar el entrenamiento",
      tipoProducto: "B",
      marca: "TrainTreats",
      precio: "129",
      cantidad: "18"
    },
    {
      idProducto: "9",
      nombre: "Champú antipulgas",
      descripcion: "Champú para eliminar pulgas y garrapatas",
      tipoProducto: "A",
      marca: "BioCare",
      precio: "120",
      cantidad: "5"
    }
  ];

  tableColumns = [
    { label: 'ID Producto', def: 'idProducto', dataKey: 'idProducto' },
    { label: 'Nombre', def: 'nombre', dataKey: 'nombre' },
    { label: 'Descripción', def: 'descripcion', dataKey: 'descripcion' },
    { label: 'Tipo Producto', def: 'tipoProducto', dataKey: 'tipoProducto' },
    { label: 'Marca', def: 'marca', dataKey: 'marca' },
    { label: 'Precio', def: 'precio', dataKey: 'precio' },
    { label: 'cantidad', def: 'cantidad', dataKey: 'cantidad' }
  ]

  private matDialogRef!: MatDialogRef<DialogComponent>;

  formCreateItem: FormGroup = this.formBuilder.group(
    {
      'idProducto': ['', [Validators.nullValidator]],
      'nombre': ['', Validators.required],
      'descipcion': ['', [Validators.required]],
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
      'idProducto': [this.itemUpdate.idProducto, Validators.nullValidator],
      'nombre': [this.itemUpdate.nombre, Validators.required],
      'descripcion': [this.itemUpdate.descripcion, Validators.required],
      'tipoProducto': [this.itemUpdate.tipoProducto, Validators.required],
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

        const numeros = this.myData$.map(objeto => objeto.idProducto);
        const id = Math.max(...numeros) + 1

        console.log(id)

        this.myData$ = [...this.myData$, {
          idProducto: id,
          nombre: this.formCreateItem.get('nombre')?.value,
          descripcion: this.formCreateItem.get('descripcion')?.value,
          tipoProducto: this.formCreateItem.get('tipoProducto')?.value,
          marca: this.formCreateItem.get('marca')?.value,
          precio: this.formCreateItem.get('precio')?.value,
          cantidad: this.formCreateItem.get('cantidad')?.value
        }]

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
        
        let indice = this.myData$.findIndex(objeto => objeto.idProducto === this.itemUpdate.idProducto);

        console.log(indice)
        if(indice !== -1){
          this.myData$[indice] = {...this.itemUpdate}
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
