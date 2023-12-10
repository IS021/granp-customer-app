import { Component, inject } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, NavController, IonButton } from '@ionic/angular/standalone';
import { ProfessionalCardComponent } from 'src/app/components/professional-card/professional-card.component';

import { Gender, Profession, ProfessionalPublicResponse } from 'granp-lib';

@Component({
    selector: 'app-tab2',
    templateUrl: 'tab2.page.html',
    styleUrls: ['tab2.page.scss'],
    standalone: true,
    imports: [IonHeader, IonToolbar, IonTitle, IonContent, IonButton, ProfessionalCardComponent]
})
export class Tab2Page {

    navCtrl = inject(NavController);
    
    constructor() { }

    openPage(route: string) {
        this.navCtrl.navigateForward(route);
    }

}
