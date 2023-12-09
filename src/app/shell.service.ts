import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ShellService {

    isLoading$ = new BehaviorSubject<boolean>(false);

    constructor() { }

    showLoader() {
        this.isLoading$.next(true);
    }

    hideLoader() {
        this.isLoading$.next(false);
    }
}
