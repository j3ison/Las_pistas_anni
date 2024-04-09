import { Component } from '@angular/core';

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
      nombre: "Laptop HP Pavilion",
      descripcion: "Laptop con pantalla táctil de 15.6 pulgadas, procesador Intel Core i5, 8 GB de RAM y 256 GB de almacenamiento SSD.",
      tipoProducto: "Electrónico",
      marca: "HP",
      precio: "$899.99",
      cantidad: "15"
    },
    {
      idProducto: "2",
      nombre: "Smartphone Samsung Galaxy S21",
      descripcion: "Teléfono inteligente con pantalla Dynamic AMOLED de 6.2 pulgadas, cámara de 64 MP, procesador Exynos 2100 y 128 GB de almacenamiento.",
      tipoProducto: "Electrónico",
      marca: "Samsung",
      precio: "$999.99",
      cantidad: "20"
    },
    {
      idProducto: "3",
      nombre: "Televisor Sony Bravia 4K",
      descripcion: "Televisor LED de 65 pulgadas con resolución 4K Ultra HD, HDR, Android TV y compatibilidad con Google Assistant.",
      tipoProducto: "Electrónico",
      marca: "Sony",
      precio: "$1499.99",
      cantidad: "10"
    },
    {
      idProducto: "4",
      nombre: "Silla de Oficina Ergonómica",
      descripcion: "Silla ajustable con soporte lumbar, reposabrazos acolchados y base giratoria de 360 grados.",
      tipoProducto: "Mueble",
      marca: "Herman Miller",
      precio: "$299.99",
      cantidad: "30"
    },
    {
      idProducto: "5",
      nombre: "Cámara Canon EOS Rebel T7",
      descripcion: "Cámara réflex digital con sensor CMOS de 24.1 MP, procesador DIGIC 4+ y grabación de video Full HD.",
      tipoProducto: "Electrónico",
      marca: "Canon",
      precio: "$599.99",
      cantidad: "12"
    },
    {
      idProducto: "6",
      nombre: "Cafetera Nespresso Vertuo",
      descripcion: "Cafetera de cápsulas con tecnología Centrifusion para preparar café, espresso, cappuccino y más.",
      tipoProducto: "Electrodoméstico",
      marca: "Nespresso",
      precio: "$199.99",
      cantidad: "25"
    },
    {
      idProducto: "7",
      nombre: "Set de Herramientas Bosch",
      descripcion: "Set de herramientas eléctricas con taladro, sierra circular, linterna, baterías y estuche de transporte.",
      tipoProducto: "Herramienta",
      marca: "Bosch",
      precio: "$399.99",
      cantidad: "8"
    },
    {
      idProducto: "8",
      nombre: "Mochila North Face Recon",
      descripcion: "Mochila resistente al agua con compartimento para laptop, correas acolchadas y múltiples bolsillos.",
      tipoProducto: "Accesorio",
      marca: "The North Face",
      precio: "$129.99",
      cantidad: "18"
    },
    {
      idProducto: "9",
      nombre: "Monitor Curvo Samsung Odyssey G7",
      descripcion: "Monitor de juegos curvo de 27 pulgadas con resolución QHD, frecuencia de actualización de 240 Hz y tecnología de sincronización G-Sync.",
      tipoProducto: "Electrónico",
      marca: "Samsung",
      precio: "$699.99",
      cantidad: "5"
    },
    {
      idProducto: "10",
      nombre: "Teclado Mecánico Corsair K95 RGB Platinum XT",
      descripcion: "Teclado mecánico para juegos con interruptores Cherry MX Speed, retroiluminación RGB, y teclas macro programables.",
      tipoProducto: "Periférico",
      marca: "Corsair",
      precio: "$179.99",
      cantidad: "15"
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
}
