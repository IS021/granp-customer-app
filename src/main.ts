import { enableProdMode, importProvidersFrom } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { RouteReuseStrategy, provideRouter } from '@angular/router';
import { IonicRouteStrategy, provideIonicAngular } from '@ionic/angular/standalone';
import { GranpLibModule } from 'granp-lib';
import { AuthModule } from '@auth0/auth0-angular';

import { routes } from './app/app.routes';
import { AppComponent } from './app/app.component';
import { environment } from './environments/environment';

import { defineCustomElements } from '@ionic/pwa-elements/loader';

if (environment.production) {
    enableProdMode();
}

defineCustomElements(window);

bootstrapApplication(AppComponent, {
    providers: [
        { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
        provideIonicAngular(),
        provideRouter(routes),
        importProvidersFrom(AuthModule.forRoot(environment.auth0 as any)),
        importProvidersFrom(GranpLibModule.forRoot(environment.granp)),
    ],
});
