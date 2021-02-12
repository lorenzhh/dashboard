import { NavigationExtras } from '@angular/router';
import { createAction, props } from '@ngrx/store';

export interface Go {
    path: any[];
    query?: object;
    extras?: NavigationExtras;
}
export namespace RouterActions {
    export const GO = createAction('[Router] Go', props<Go>());
    export const BACK = createAction('[Router] Back');
    export const FORWARD = createAction('[Router] Forward');
}
