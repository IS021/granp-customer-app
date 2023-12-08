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
                path: 'tab2',
                loadComponent: () =>
                    import('../tab2/tab2.page').then((m) => m.Tab2Page),
            },
            {
                path: 'calendar',
                loadComponent: () =>
                    import('granp-lib').then((m) => m.CalendarPage),
            },
            {
                path: '',
                redirectTo: '/tabs/search',
                pathMatch: 'full',
            },
        ],
    },
];
