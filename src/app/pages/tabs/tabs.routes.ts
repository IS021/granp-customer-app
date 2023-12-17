import { Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

export const routes: Routes = [
    {
        path: 'tabs',
        component: TabsPage,
        children: [
            {
                path: 'chats',
                loadComponent: () =>
                    import('granp-lib').then((m) => m.ChatListPage),
            },
            {
                path: 'search',
                loadComponent: () =>
                    import('../search-page/search.page').then((m) => m.SearchPage),
            },
            {
                path: 'calendar',
                loadComponent: () =>
                    import('granp-lib').then((m) => m.CalendarPage),
            },
            {
                path: 'profile',
                loadComponent: () =>
                    import('../modify-profile/modify-profile.page').then((m) => m.ModifyProfilePage),
            },
            {
                path: '',
                redirectTo: '/tabs/search',
                pathMatch: 'full',
            },
        ],
    },
];
