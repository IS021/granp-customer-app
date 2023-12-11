import { Component, OnInit, NgZone, inject } from '@angular/core';
import { IonApp, IonContent, IonRouterOutlet, IonSpinner } from '@ionic/angular/standalone';
import { AuthService } from '@auth0/auth0-angular';
import { mergeMap } from 'rxjs/operators';
import { Browser } from '@capacitor/browser';
import { App } from '@capacitor/app';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { Capacitor } from '@capacitor/core';
import { asyncScheduler, BehaviorSubject } from 'rxjs';
import { NgIf, AsyncPipe } from '@angular/common';

import { ChatService, ProfileService } from 'granp-lib';
import { ShellService } from './shell.service';
import { ToastController } from '@ionic/angular';


@Component({
    selector: 'app-root',
    templateUrl: 'app.component.html',
    styleUrls: ['app.component.scss'],
    standalone: true,
    imports: [IonApp, IonRouterOutlet, IonContent, IonSpinner, NgIf, AsyncPipe],
})
export class AppComponent {
    auth = inject(AuthService);
    ngZone = inject(NgZone);
    router = inject(Router);
    chatService = inject(ChatService);
    profileService = inject(ProfileService);
    shell = inject(ShellService);
    toastController = inject(ToastController);

    /* loggedIn$ = this.auth.isAuthenticated$; */

    ngOnInit(): void {

        // If not logged in redirect to login page
        /* this.loggedIn$.subscribe((loggedIn) => {
            if (!loggedIn) {
                this.router.navigate(['/login']);
            } else {
                this.shell.showLoader();
                this.profileService.isComplete().then((isComplete) => {
                    if (!isComplete) {
                        this.router.navigate(['/registration']);
                        this.shell.hideLoader();
                    } else {
                        this.router.navigate(['/tabs']);
                        this.chatService.connect();
                        this.shell.hideLoader();
                    }
                });
            }
        }); */

        this.auth.error$.subscribe((error) => {
            if (error) {
                this.toastController.create({
                    message: error.message,
                    duration: 3000,
                    position: 'top',
                    color: 'danger'
                }).then((toast) => {
                    toast.present();
                });
            }
        });

        // Use Capacitor's App plugin to subscribe to the `appUrlOpen` event
        App.addListener('appUrlOpen', ({ url }) => {
            // Must run inside an NgZone for Angular to pick up the changes
            // https://capacitorjs.com/docs/guides/angular
            this.ngZone.run(() => {
                if (url?.startsWith(environment.auth0.authorizationParams.redirect_uri)) {
                    this.shell.showLoader();
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
                                    // this.router.navigate(['/tabs']);
                                    this.shell.hideLoader();
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
                        this.shell.hideLoader();
                    }
                } else {
                    this.shell.hideLoader();
                }
            });
        });
    }
}

