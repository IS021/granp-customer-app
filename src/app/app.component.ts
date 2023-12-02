import { Component, OnInit, NgZone, inject } from '@angular/core';
import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone';
import { AuthService } from '@auth0/auth0-angular';
import { mergeMap } from 'rxjs/operators';
import { Browser } from '@capacitor/browser';
import { App } from '@capacitor/app';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { Capacitor } from '@capacitor/core';
import { asyncScheduler, BehaviorSubject } from 'rxjs';
import { NgIf, AsyncPipe } from '@angular/common';

import { ChatService } from 'granp-lib';


@Component({
    selector: 'app-root',
    templateUrl: 'app.component.html',
    standalone: true,
    imports: [IonApp, IonRouterOutlet, NgIf, AsyncPipe],
})
export class AppComponent {
    auth = inject(AuthService);
    ngZone = inject(NgZone);
    router = inject(Router);
    chatService = inject(ChatService);

    loggedIn$ = this.auth.isAuthenticated$;

    // handle this manually as the loader should be displayed immediately once the app
    // is opened via the auth0 redirect uri
    isAuth0Loading$ = new BehaviorSubject<boolean>(false);

    ngOnInit(): void {

        // If not logged in redirect to login page
        this.loggedIn$.subscribe((loggedIn) => {
            if (!loggedIn) {
                this.router.navigate(['/login']);
            } else {
                this.router.navigate(['/tabs']);
                this.chatService.connect();
            }
        });

        // Use Capacitor's App plugin to subscribe to the `appUrlOpen` event
        App.addListener('appUrlOpen', ({ url }) => {
            // Must run inside an NgZone for Angular to pick up the changes
            // https://capacitorjs.com/docs/guides/angular
            this.ngZone.run(() => {
                if (url?.startsWith(environment.auth0.authorizationParams.redirect_uri)) {
                    this.isAuth0Loading$.next(true);
                    // If the URL is an authentication callback URL.
                    if (
                        url.includes('state=') &&
                        (url.includes('error=') || url.includes('code='))
                    ) {
                        // Call handleRedirectCallback and close the browser
                        this.auth
                            .handleRedirectCallback(url)
                            .pipe(
                                mergeMap(() => {
                                    // browser close only works on iOS right now
                                    if (Capacitor.getPlatform() === 'ios') {
                                        // add promise rejection handler to account for app being opened not via the in-app browser
                                        return Browser.close().catch(() => {
                                            return Promise.resolve();
                                        })
                                    }
                                    return Promise.resolve();
                                })
                            )
                            .subscribe(() => {
                                // wait for next tick
                                asyncScheduler.schedule(() => {
                                    // redirect to profile when logging in              // TODO
                                    // Check if the user registration is complete
                                    // If not redirect to registration page
                                    this.router.navigate(['/tabs']);
                                    this.isAuth0Loading$.next(false);
                                })
                            });
                    } else {
                        // browser close only works on iOS right now
                        if (Capacitor.getPlatform() === 'ios') {
                            // add promise rejection handler to account for app being opened not via the in-app browser
                            Browser.close().catch(() => {
                                return Promise.resolve();
                            })
                        }
                        // redirect to home when logging out
                        this.router.navigate(['/login']);                                    // TODO
                        this.isAuth0Loading$.next(false);
                    }
                } else {
                    this.isAuth0Loading$.next(false);
                }
            });
        });
    }
}

