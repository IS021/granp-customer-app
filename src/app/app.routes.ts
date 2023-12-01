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
        path: 'details',
        loadComponent: () => import('./pages/customer-details/customer-details.page').then(m => m.CustomerDetailsPage),
    },  {
    path: 'professional-details',
    loadComponent: () => import('./pages/professional-details/professional-details.page').then( m => m.ProfessionalDetailsPage)
  },

];
