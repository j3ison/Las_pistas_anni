import { Router } from '@angular/router';
import { INavbarData } from './helper';

export const navbarData: INavbarData[] = [
    {
        routeLink: 'dashboard',
        icon: 'fa-solid fa-house',
        label: 'Inicio',
       
    },
    {
        routeLink: 'client',
        icon: 'fa-regular fa-address-card',
        label: 'Cliente',
        
    },
    {
        routeLink: 'employee',
        icon: 'fa-solid fa-users-line',
        label: 'Empleado',
        
    },
    {
        routeLink: 'employee',
        icon: 'fa-solid fa-users-line',
        label: 'Empleado',
        items: [
            {
                routeLink: 'employee/employee',
                icon: 'fa-solid fa-user-tie',
                label: 'Empleados',
                
            },
            {
                routeLink: 'employee/user',
                icon: 'fa-solid fa-user-lock',
                label: 'Usuarios',
            },
        ],
       
    }, {
        routeLink: 'invoice',
        icon: 'fa-solid fa-file-invoice',
        label: 'Factura',
       
    }, {
        routeLink: 'pay',
        icon: 'fa-solid fa-coins',
        label: 'Pago',
       
    }, {
        routeLink: 'eye-exam',
        icon: 'fa-solid fa-hospital-user',
        label: 'Examen de vista',
        
    },{
        routeLink: 'product',
        icon: 'fa-solid fa-glasses',
        label: 'Producto',
        items: [
            {
                routeLink: 'product/inventory',
                icon: 'fa-solid fa-warehouse',
                label: 'Inventario',
                
            },
            {
                routeLink: 'product/add',
                icon: 'fa-solid fa-plus',
                label: 'Agregar Producto',
                
            }
        ],
       
    },  {
        routeLink: 'register-product',
        icon: 'fa-sharp fa-solid fa-cabinet-filing',
        label: 'Registrar Producto',
        items: [
            {
                routeLink: 'register-product/list',
                icon: 'fa-solid fa-list',
                label: 'Lista de registros',
                
            },
            {
                routeLink: 'register-product/addRegister',
                icon: 'fa-solid fa-plus',
                label: 'Agregar Registro',
            }
        ],
       
    },{
        routeLink: 'order',
        icon: 'fa-solid fa-truck-field',
        label: 'Orden Pedido',
        
    }
];

// <i class="fa-regular fa-paste"></i>
