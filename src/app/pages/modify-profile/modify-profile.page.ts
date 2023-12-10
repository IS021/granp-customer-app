import { ChangeDetectorRef, Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import {
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonList,
    IonItem,
    IonLabel,
    IonInput,
    IonAvatar,
    IonRow,
    IonCol,
    IonIcon,
    IonButtons,
    IonButton,
    IonTextarea,
    IonListHeader,
    IonSelect,
    IonSelectOption,
} from '@ionic/angular/standalone';

import {
    CustomerProfileResponse,
    Address,
    Gender,
    ImageSelectorComponent,
    AddressSelectorComponent,
    BirthdateSelectorComponent,
    ProfileService,
    LogoutButtonComponent
} from 'granp-lib';

import { addIcons } from 'ionicons';
import {
    personCircleOutline,
    mail,
    call,
    pencilOutline,
    home,
    calendarOutline,
    maleOutline,
    femaleOutline,
    helpOutline,
    closeOutline,
    checkmarkOutline,
    mailOutline,
} from 'ionicons/icons';

import { MaskitoElementPredicateAsync, MaskitoOptions } from '@maskito/core';
import { MaskitoModule } from '@maskito/angular';
import { ShellService } from 'src/app/shell.service';


@Component({
    selector: 'app-modify-profile',
    templateUrl: './modify-profile.page.html',
    styleUrls: ['./modify-profile.page.scss'],
    standalone: true,
    imports: [
        CommonModule,
        FormsModule,
        MaskitoModule,
        IonHeader,
        IonToolbar,
        IonTitle,
        IonContent,
        IonList,
        IonItem,
        IonLabel,
        IonInput,
        IonAvatar,
        IonRow,
        IonCol,
        IonIcon,
        IonButtons,
        IonButton,
        IonTextarea,
        IonListHeader,
        IonSelect,
        IonSelectOption,
        ImageSelectorComponent,
        AddressSelectorComponent,
        BirthdateSelectorComponent,
        LogoutButtonComponent
    ],
})
export class ModifyProfilePage {
    profileService = inject(ProfileService);
    cdRef = inject(ChangeDetectorRef);
    shell = inject(ShellService);

    customerLogged?: CustomerProfileResponse;

    ionViewWillEnter(): void {
        this.shell.showLoader();
        this.profileService.getProfile<CustomerProfileResponse>().then((profile) => {
            this.customerLogged = profile;
            this.cdRef.detectChanges();
            this.shell.hideLoader();
        });
    }

    editingProfile: boolean = false;

    constructor() {
        addIcons({
            personCircleOutline,
            mail,
            call,
            pencilOutline,
            home,
            calendarOutline,
            maleOutline,
            femaleOutline,
            helpOutline,
            closeOutline,
            checkmarkOutline,
            mailOutline,
        });
    }

    toggleBoolean() {
        this.editingProfile = !this.editingProfile;
    }

    checkGender(): string {
        switch (this.customerLogged?.gender) {
            case Gender.Male:
                return 'Uomo';
            case Gender.Female:
                return 'Donna';
            default:
                return 'Non definito';
        }
    }

    checkGenderIcon(): string {
        switch (this.customerLogged?.gender) {
            case Gender.Male:
                return 'male-outline';
            case Gender.Female:
                return 'female-outline';
            default:
                return 'help-outline';
        }
    }


    readonly phoneMask: MaskitoOptions = {
        mask: ['+', '3', '9', ' ', /\b[1-9]\b/, /\d/, /\d/, ' ', /\d/, /\d/, /\d/, ' ', /\d/, /\d/, /\d/, /\d/],
    };

    readonly maskPredicate: MaskitoElementPredicateAsync = async (el) =>
        (el as HTMLIonInputElement).getInputElement();

    submitChanges() {
        this.editingProfile = false;
        this.profileService.updateProfile(this.customerLogged);
    }
}
