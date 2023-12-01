import { Component, inject } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, NavController, IonButton } from '@ionic/angular/standalone';
import { ExploreContainerComponent } from '../explore-container/explore-container.component';

@Component({
    selector: 'app-tab2',
    templateUrl: 'tab2.page.html',
    styleUrls: ['tab2.page.scss'],
    standalone: true,
    imports: [IonHeader, IonToolbar, IonTitle, IonContent, ExploreContainerComponent, IonButton]
})
export class Tab2Page {

    navCtrl = inject(NavController);

    constructor() { }

    openPage() {
        this.navCtrl.navigateForward('/registration');
    }

}
