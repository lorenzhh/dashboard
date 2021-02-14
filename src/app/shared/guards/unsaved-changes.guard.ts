import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class UnsavedChangesGuard implements CanDeactivate<any> {
    constructor() {}

    canDeactivate(component: any) {
        return false;
    }
}
