import { Component, OnInit, TemplateRef } from '@angular/core';
import { DialogComponent } from '../module/dialog/dialog.component';
import { MatDialogRef } from '@angular/material/dialog';
import { DialogService } from '../module/dialog/service/dialog.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DataGlobalService } from '../module/view-data/services/data-global.service';
import Swal from 'sweetalert2';
import { isEmpty } from 'rxjs';

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

  myData$: any[] = [
    {
      idServicio: "1",
      tipoServicio: "Consulta",
      descripcion: "Consulta veterinaria de rutina",
      precio: "50",
      productos: "Vacuna para gatos,Desparasitante para perros"
    },
    {
      idServicio: "2",
      tipoServicio: "Vacunación",
      descripcion: "Vacuna antirrábica para perros",
      precio: "30",
      productos: "Vacuna antirrábica"
    },
    {
      idServicio: "3",
      tipoServicio: "Cirugía",
      descripcion: "Esterilización de gatos",
      precio: "100",
      productos: "Esterilización, Antibióticos"
    },
    {
      idServicio: "4",
      tipoServicio: "Consulta",
      descripcion: "Revisión de salud de aves",
      precio: "40",
      productos: "Alimento especial para aves"
    },
    {
      idServicio: "5",
      tipoServicio: "Vacunación",
      descripcion: "Vacuna contra la parvovirosis para cachorros",
      precio: "25",
      productos: "Vacuna contra la parvovirosis"
    },
    {
      idServicio: "6",
      tipoServicio: "Baño y Corte de Pelo",
      descripcion: "Baño y corte de pelo para perros de raza pequeña",
      precio: "35",
      productos: "Shampoo especial para perros, Corte de pelo"
    },
    {
      idServicio: "7",
      tipoServicio: "Consulta",
      descripcion: "Consulta para conejos",
      precio: "45",
      productos: "Heno para conejos,Suplemento vitamínico"
    },
    {
      idServicio: "8",
      tipoServicio: "Vacunación",
      descripcion: "Vacuna contra la rabia para gatos",
      precio: "30",
      productos: "Vacuna contra la rabia"
    },
    {
      idServicio: "9",
      tipoServicio: "Cirugía",
      descripcion: "Cirugía de emergencia para perros",
      precio: "150",
      productos: "Anestesia general, Cirugía"
    },
    {
      idServicio: "10",
      tipoServicio: "Consulta",
      descripcion: "Consulta de control para reptiles",
      precio: "50",
      productos: "Alimento para reptiles,Suplemento mineral"
    }
  ];

  tableColumns = [
    { label: 'ID Servicio', def: 'idServicio', dataKey: 'idServicio' },
    { label: 'Tipo de Servicio', def: 'tipoServicio', dataKey: 'tipoServicio' },
    { label: 'Descripción', def: 'descripcion', dataKey: 'descripcion' },
    { label: 'Preció', def: 'precio', dataKey: 'precio' },
    { label: 'Productos', def: 'productos', dataKey: 'productos' },
  ]


  private matDialogRef!: MatDialogRef<DialogComponent>;
  private matDialogRefProducto!: MatDialogRef<DialogComponent>;

  itemsProductos: any[] = []

  formCreateItem: FormGroup = this.formBuilder.group(
    {
      'tipoServicio': ['', Validators.nullValidator],
      'descripcion': ['', Validators.required],
      'precio': ['', Validators.required],
      // 'productos': ['', Validators.required]
    }
  )

  formGetCreateItem(fr: string) {
    return this.formCreateItem.get(fr) as FormControl;
  }

  item: any = {
    idServicio:0,
    tipoServicio:'',
    descripcion:'',
    precio:0,
    producto:''
  }

  formUpdateItem: FormGroup = this.formBuilder.group(
    {
      'tipoServicio': ['', Validators.nullValidator],
      'descripcion': ['', Validators.required],
      'precio': ['', Validators.required],
      // 'productos': ['', Validators.required]
    }
  )

  formGetUpdateItem(fr: string) {
    return this.formUpdateItem.get(fr) as FormControl;
  }

  tableColumnsProducto = [
    { label: 'ID Producto', def: 'idProducto', dataKey: 'idProducto' },
    { label: 'Nombre', def: 'nombre', dataKey: 'nombre' },
    { label: 'Descripción', def: 'descripcion', dataKey: 'descripcion' },
    { label: 'Marca', def: 'marca', dataKey: 'marca' },
    { label: 'Precio', def: 'precio', dataKey: 'precio' }
  ]

  productoVal: any[] = [
    {
      idProducto: 2,
      nombre: 'Desparasitante',
      descripcion: 'Desparasitante mensual para perros y gatos',
      marca: 'VetPlus',
      precio: 150
    },
    {
      idProducto: 3,
      nombre: 'Alimento para perros',
      descripcion: 'Alimento balanceado para perros adultos',
      marca: 'NutriPet',
      precio: 300
    },
    {
      idProducto: 4,
      nombre: 'Arena sanitaria',
      descripcion: 'Arena para gatos que absorbe olores',
      marca: 'FreshCat',
      precio: 50
    },
    {
      idProducto: 5,
      nombre: 'Collar antipulgas',
      descripcion: 'Collar repelente de pulgas y garrapatas',
      marca: 'ProtectoPet',
      precio: 80
    },
    {
      idProducto: 6,
      nombre: 'Juguete para perros',
      descripcion: 'Pelota de goma para jugar con perros',
      marca: 'PetFun',
      precio: 15
    },
    {
      idProducto: 7,
      nombre: 'Camita para gatos',
      descripcion: 'Camita suave y cómoda para gatos',
      marca: 'CozyCats',
      precio: 35
    },
    {
      idProducto: 8,
      nombre: 'Shampoo hipoalergénico',
      descripcion: 'Shampoo suave para pieles sensibles',
      marca: 'SensitiveGroom',
      precio: 100
    },
    {
      idProducto: 9,
      nombre: 'Snacks para entrenamiento',
      descripcion: 'Premios pequeños para incentivar el entrenamiento',
      marca: 'TrainTreats',
      precio: 25
    },
    {
      idProducto: 10,
      nombre: 'Champú antipulgas',
      descripcion: 'Champú para eliminar pulgas y garrapatas',
      marca: 'BioCare',
      precio: 120
    }
  ]

  modeChange = true;

  obtenerProducto($event: any) {
    const data = { ...$event }

    data.cantidad = 1
    if(this.itemsProductos.filter(obj => obj.nombre === data.nombre).length <= 0){
      
      this.itemsProductos = [...this.itemsProductos, data]
      this.modeChange = true
    }
    else
    {
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

  onInputChange(event: any,index:number) {
    
    const data = (event.target as HTMLInputElement).value
    if(data !== ''){
      // console.log((event.target as HTMLInputElement).value)

      const objeto = this.productoVal.find(obj => obj.nombre == this.itemsProductos[index].nombre)
      if(objeto){
        this.itemsProductos[index].precio = Number(data) * objeto.precio

        this.item.precio = this.itemsProductos.reduce((total, elemento) => total + elemento.precio, 0) + (this.itemsProductos.reduce((total, elemento) => total + elemento.precio, 0) * 0.20)
      }
      
    }
  }

  eliminarProducto(index:number){
    Swal.fire({
      title: "¿Estas segura?",
      text: "¡No podrás revertir esto!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "¡Sí, bórralo!"
    }).then((result) => {

      this.itemsProductos.splice(index, 1);

      if (result.isConfirmed) {
        Swal.fire({
          title: "¡Eliminado!",
          text: "El producto ha sido eliminado.",
          icon: "success"
        });
      }
    });
  }






  constructor(private dialogService: DialogService,
    private dialogServiceProducto: DialogService,
    private formBuilder: FormBuilder,
    private dataGlobalservice: DataGlobalService) { }

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

  openDialogWithTemplateProduct(template: TemplateRef<any>) {
    this.matDialogRefProducto = this.dialogServiceProducto.openDialogWithTemplate({ template });

    this.matDialogRefProducto.afterClosed().subscribe((res) => {
    });
  }

  cancelDialogResultProduct() {
    this.matDialogRefProducto.close()
  }

}
