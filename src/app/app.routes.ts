import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'registration',
        loadComponent: () => import('./pages/registration/registration.page').then(m => m.RegistrationPage),
    },
    {
        path: 'login',
        loadComponent: () => import('granp-lib').then((m) => m.LoginPage),
    },
    {
        path: '',
        loadChildren: () => import('./pages/tabs/tabs.routes').then((m) => m.routes),
    }
];
