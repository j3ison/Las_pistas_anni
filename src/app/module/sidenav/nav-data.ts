import { Router } from '@angular/router';
import { INavbarData } from './helper';

export const navbarData: INavbarData[] = [
    {
        routeLink: 'inicio',
        icon: 'fa-solid fa-house',
        label: 'Inicio',
       
    },
    {
        routeLink: 'mascotas',
        icon: 'fa-solid fa-dog',
        label: 'Mascota',
        
    },
    {
        routeLink: 'reservas',
        icon: 'fa-solid fa-calendar-days',
        label: 'Reservas',
        
    },
    {
        routeLink: 'servicios',
        icon: 'fa-solid fa-briefcase',
        label: 'Servicios',
        
    }, {
        routeLink: 'productos',
        icon: 'fa-solid fa-boxes-stacked',
        label: 'Producto',
       
    }, {
        routeLink: 'pago',
        icon: 'fa-solid fa-money-bill',
        label: 'Pago',
       
    }
];

// <i class="fa-regular fa-paste"></i>
