import { NavigationExtras } from '@angular/router';
import { createAction, props } from '@ngrx/store';

export interface NavigateOptions {
    path: any[];
    query?: object;
    extras?: NavigationExtras;
}
export namespace RouterActions {
    export const Navigate = createAction('[Router] Navigate', props<NavigateOptions>());
    export const NavigateSuccess = createAction('[Router] Navigate Success');
    export const NavigateError = createAction('[Router] Navigate Error');
    export const Back = createAction('[Router] Back');
    export const BackSuccess = createAction('[Router] Back Success');
    export const BackError = createAction('[Router] Back Error');

    export const Forward = createAction('[Router] Forward');
    export const ForwardSuccess = createAction('[Router] Forward Success');
    export const ForwardError = createAction('[Router] Forward Error');
}
