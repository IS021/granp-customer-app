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
                redirectTo: '/tabs/tab2',
                pathMatch: 'full',
            },
        ],
    },
];
