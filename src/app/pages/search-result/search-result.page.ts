import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonBackButton, IonButtons, IonContent, IonHeader, IonTitle, IonToolbar, NavController } from '@ionic/angular/standalone';
import { ActivatedRoute } from '@angular/router';
import { Profession, ProfessionalPublicResponse, SearchFilter, SearchService } from 'granp-lib';
import { ShellService } from 'src/app/shell.service';
import { ProfessionalCardComponent } from 'src/app/components/professional-card/professional-card.component';
import { NavigationExtras } from '@angular/router';

@Component({
    selector: 'app-search-result',
    templateUrl: './search-result.page.html',
    styleUrls: ['./search-result.page.scss'],
    standalone: true,
    imports: [CommonModule, FormsModule, IonContent, IonHeader, IonToolbar, IonTitle, IonButtons, IonBackButton, ProfessionalCardComponent]
})
export class SearchResultPage {

    activatedRoute = inject(ActivatedRoute);
    searchService = inject(SearchService);
    shell = inject(ShellService);
    navCtrl = inject(NavController);

    results?: ProfessionalPublicResponse[];

    constructor() {
        this.activatedRoute.queryParams.subscribe(params => {
            this.shell.showLoader();

            var filter = JSON.parse(params["filter"]) as SearchFilter;

            this.searchService.search(filter).then((result) => {
                this.results = result;
                this.shell.hideLoader();
            });

        });
    }

    ionPageWillExit() {
        this.shell.hideLoader();
    }

    openDetailPage(professional: ProfessionalPublicResponse) {

        let navigationExtras: NavigationExtras = {
            queryParams: {
                professional: JSON.stringify(professional),
                showButtons: true
            }
        };

        this.navCtrl.navigateForward(['professional-details'], navigationExtras);
    }
}
