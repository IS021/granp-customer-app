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
    loadComponent: () => import('./pages/professional-details/professional-details.page').then( m => m.ProfessionalDetailsPage)
  },
  {
    path: 'search-page',
    loadComponent: () => import('./pages/search-page/search-page.page').then( m => m.SerachPagePage)
  },  {
    path: 'modify-profile',
    loadComponent: () => import('./pages/modify-profile/modify-profile.page').then( m => m.ModifyProfilePage)
  },



];
