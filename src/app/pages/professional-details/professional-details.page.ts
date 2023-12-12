import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
    IonItem,
    IonLabel,
    IonList,
    IonContent,
    IonText,
    IonRow,
    IonCol,
    IonHeader,
    IonToolbar,
    IonBackButton,
    IonButtons,
    IonTitle,
    IonGrid,
    IonButton,
    IonIcon,
    NavController
}
    from '@ionic/angular/standalone'

import { addIcons } from 'ionicons';
import { call, home, personCircleOutline, mailOpenOutline, calendarOutline, medicalOutline, locationOutline, walletOutline, checkmarkOutline, closeOutline, checkmarkDoneCircle, alertCircle, maleOutline, femaleOutline, helpOutline } from 'ionicons/icons';

import { ChatService, Gender, Profession, ProfessionalPublicResponse, SearchService } from 'granp-lib';

import { AvatarComponent } from 'granp-lib';
import { ActivatedRoute } from '@angular/router';
import { ShellService } from 'src/app/shell.service';

@Component({
    selector: 'app-professional-details',
    templateUrl: './professional-details.page.html',
    styleUrls: ['./professional-details.page.scss'],
    standalone: true,
    imports: [CommonModule,
        FormsModule,
        IonItem,
        IonLabel,
        IonList,
        IonContent,
        IonText,
        IonRow,
        IonCol,
        IonHeader,
        IonToolbar,
        IonBackButton,
        IonButtons,
        IonTitle,
        IonGrid,
        IonButton,
        IonIcon,
        AvatarComponent
    ]
})
export class ProfessionalDetailsPage {

    activatedRoute = inject(ActivatedRoute);
    chatService = inject(ChatService);
    navCtrl = inject(NavController);
    searchService = inject(SearchService);
    shell = inject(ShellService);

    professional?: ProfessionalPublicResponse;

    showButtons: boolean = false;

    constructor() {
        addIcons({ call, home, personCircleOutline, mailOpenOutline, calendarOutline, medicalOutline, locationOutline, walletOutline, checkmarkOutline, closeOutline, checkmarkDoneCircle, alertCircle, maleOutline, femaleOutline, helpOutline });
    }

    ngOnInit() {
        this.activatedRoute.queryParams.subscribe(params => {
            // this.professional = JSON.parse(params["professional"]) as ProfessionalPublicResponse;
            const professionalId = params["id"];
            if (professionalId) {
                this.searchService.professionalInfo(professionalId).then((professional) => {
                    this.professional = professional;
                    this.shell.hideLoader();
                });
            }

            this.showButtons = params["showButtons"] == "true";
        });
    }

    ionViewWillEnter() {
        if(this.professional === undefined) {
            this.shell.showLoader();
        }
    }

    startChat() {
        if (this.professional && this.professional.id) {
            console.log("Creating chat with professional " + this.professional.id);
            this.chatService.createChat(this.professional.id).then((chatId) => {
                this.navCtrl.navigateForward(['chat', chatId]);
            });
        } else {
            console.log("Professional not found");
        }
    }

    getProfession(profession?: Profession) {
        switch (profession) {
            case Profession.Doctor:
                return "Dottore";
            case Profession.Nurse:
                return "Infermiere";
            case Profession.Physiotherapist:
                return "Fisioterapista";
            case Profession.Caregiver:
                return "Badante";
            case Profession.Other:
                return "Altro";
            default:
                return "Nessuna professione";
        }
    }

    checkGender(): string {
        switch (this.professional?.gender) {
            case Gender.Male:
                return 'Uomo';
            case Gender.Female:
                return 'Donna';
            default:
                return 'Non definito';
        }
    }

    checkGenderIcon(): string {
        switch (this.professional?.gender) {
            case Gender.Male:
                return 'male-outline';
            case Gender.Female:
                return 'female-outline';
            default:
                return 'help-outline';
        }
    }

}
