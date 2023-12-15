import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'registration',
        loadComponent: () => import('./pages/registration/registration.page').then(m => m.RegistrationPage),
    },
    {
        path: '',
        loadChildren: () => import('./pages/tabs/tabs.routes').then((m) => m.routes),
    },
    {
        path: '',
        loadChildren: () => import('granp-lib').then((m) => m.granpRoutes),
    },
    {
        path: 'professional-details',
        loadComponent: () => import('./pages/professional-details/professional-details.page').then(m => m.ProfessionalDetailsPage)
    },
    {
        path: 'info-reservation',
        loadComponent: () => import('./pages/info-reservation/info-reservation.page').then(m => m.InfoReservationPage)
    },
    {
        path: 'search-result',
        loadComponent: () => import('./pages/search-result/search-result.page').then(m => m.SearchResultPage)
    },
    {
        path: 'reservation/:id',
        loadComponent: () => import('./pages/reservation/reservation.page').then(m => m.ReservationPage)
    },

];
