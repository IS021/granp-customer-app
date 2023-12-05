import { Component, inject } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, NavController, IonButton } from '@ionic/angular/standalone';
import { ExploreContainerComponent } from '../explore-container/explore-container.component';
import { ProfessionalCardComponent } from 'src/app/components/professional-card/professional-card.component';
import { Gender } from 'src/app/models/Gender';
import { Profession } from 'src/app/models/Profession';
import { Professional } from 'src/app/models/professionalPublicResponse.model';

@Component({
    selector: 'app-tab2',
    templateUrl: 'tab2.page.html',
    styleUrls: ['tab2.page.scss'],
    standalone: true,
    imports: [IonHeader, IonToolbar, IonTitle, IonContent, ExploreContainerComponent, IonButton, ProfessionalCardComponent]
})
export class Tab2Page {

    navCtrl = inject(NavController);

    professionalSelected: Professional={
        profilePicture: 'https://res.cloudinary.com/teepublic/image/private/s--FIor6wdk--/c_fit,g_north_west,h_840,w_840/co_c62b29,e_outline:40/co_c62b29,e_outline:inner_fill:1/co_ffffff,e_outline:40/co_ffffff,e_outline:inner_fill:1/co_bbbbbb,e_outline:3:1000/c_mpad,g_center,h_1260,w_1260/b_rgb:eeeeee/c_limit,f_jpg,h_630,q_90,w_630/v1608275710/production/designs/17539365_0.jpg',
        firstName: 'Johnny',
        lastName: 'Sins',
        birthDate: '31/12/1978',
        age: 44,
        gender: Gender.Male,
        email: 'jhonny_tuttofare_sins@granpmail.com',
        phoneNumber: '6909006990',
    
        description: 'Tutto fare, devoto ai clienti e pronto a soddisfarli al meglio, se mi cercate online troverete registrazioini fatte dai miei clienti soddisfatti del lavoro.',
    
        profession: Profession.Nurse,
        address: 'Via dei Brazzers, 69, Mellitto, 70124',
        isVerified: false,
        hourlyRate: 20,
        longTimeJob: false,
        shortTimeJob: true,
    
      };

    constructor() { }

    openPage(route: string) {
        this.navCtrl.navigateForward(route);
    }

}
