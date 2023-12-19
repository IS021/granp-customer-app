import { Component, OnInit, NgZone, inject } from '@angular/core';
import {
    IonApp,
    IonContent,
    IonRouterOutlet,
    IonSpinner,
    NavController,
} from '@ionic/angular/standalone';
import { AuthService } from '@auth0/auth0-angular';
import { mergeMap } from 'rxjs/operators';
import { Browser } from '@capacitor/browser';
import { App } from '@capacitor/app';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { Capacitor } from '@capacitor/core';
import { asyncScheduler, BehaviorSubject, Subject } from 'rxjs';
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
    navCrtl = inject(NavController);
    chatService = inject(ChatService);
    profileService = inject(ProfileService);
    shell = inject(ShellService);
    toastController = inject(ToastController);

    loggedIn$ = this.auth.isAuthenticated$;

    checkComplete() {
        this.shell.showLoader();
        this.profileService.isComplete().then((isComplete) => {
            console.log('isComplete', isComplete);
            if (!isComplete) {
                this.navCrtl.navigateRoot(['/registration'], { animated: false });
                this.shell.hideLoader();
            } else {
                this.navCrtl.navigateRoot(['/tabs'], { animated: false });
                this.chatService.connect();
                this.shell.hideLoader();
            }
        });
    }

    showError$ = new Subject<string>();

    ngOnInit(): void {
        // If not logged in redirect to login page
        this.loggedIn$.subscribe((loggedIn) => {
            if (!loggedIn) {
                this.navCrtl.navigateRoot(['/login']);
            } else {
                if (!environment.production) {
                    this.checkComplete();
                }
            }
        });

        this.auth.error$.subscribe((error) => {
            if (error) {
                this.showError$.next(error.message);
            }
        });

        this.showError$.subscribe((message) => {
            console.log('Next error: ', message);

            this.ngZone.run(() => {
                this.toastController
                    .create({
                        message: message,
                        duration: 3000,
                        position: 'top',
                        color: 'danger',
                    })
                    .then((toast) => {
                        console.log("Presenting Toast Error: " + message);
                        toast.present();
                    });
            });
        })

        // Use Capacitor's App plugin to subscribe to the `appUrlOpen` event
        App.addListener('appUrlOpen', ({ url }) => {
            // Must run inside an NgZone for Angular to pick up the changes
            // https://capacitorjs.com/docs/guides/angular
            this.ngZone.run(() => {
                if (
                    url?.startsWith(environment.auth0.authorizationParams.redirect_uri)
                ) {
                    console.log(url);
                    // If the URL is an authentication callback URL.
                    if (
                        url.includes('state=') &&
                        (url.includes('error=') || url.includes('code='))
                    ) {
                        this.shell.showLoader();
                        // Call handleRedirectCallback and close the browser
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
                                        });
                                    }
                                    return Promise.resolve();
                                })
                            )
                            .subscribe({
                                next: () => {
                                    // wait for next tick
                                    asyncScheduler.schedule(() => {
                                        // redirect to profile when logging in              // TODO
                                        // Check if the user registration is complete
                                        // If not redirect to registration page
                                        /* this.checkComplete(); */
                                    });
                                },
                                error: (err) => {
                                    // Handle the error here
                                    // console.error("Error in handleRedirectCallback:", err);

                                    // Close the in-app browser
                                    if (Capacitor.getPlatform() === 'ios') {
                                        Browser.close().then(() => {
                                            this.shell.hideLoader();

                                            asyncScheduler.schedule(() => {
                                                this.showError$.next(err.error_description);
                                            });
                                        }).catch(() => {
                                            return Promise.resolve();
                                        });
                                    }
                                }
                            });
                    } else {
                        // browser close only works on iOS right now
                        if (Capacitor.getPlatform() === 'ios') {
                            // add promise rejection handler to account for app being opened not via the in-app browser
                            Browser.close().catch(() => {
                                return Promise.resolve();
                            });
                        }
                        // redirect to home when logging out
                        this.navCrtl.navigateRoot(['/login']); // TODO
                        this.shell.hideLoader();
                    }
                } else {
                    this.shell.hideLoader();
                }
            });
        });
    }

    ngOnDestroy() {
        this.chatService.disconnect();
    }
}
