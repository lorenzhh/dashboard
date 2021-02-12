import { InjectionToken } from '@angular/core';
import { routerReducer } from '@ngrx/router-store';
import { ActionReducerMap } from '@ngrx/store';
import { reducer as CatalogueReducer } from 'app/shared/catalogues/catalogues.reducer';
import { reducer as layoutReducer } from 'app/shared/layout/layout.reducer';
import { AppState } from 'app/shared/store/app.model';
import { reducer as userReducer } from 'app/shared/user/user.reducer';

export const reducers: ActionReducerMap<AppState> = {
    router: routerReducer,
    layout: layoutReducer,
    user: userReducer,
    catalogue: CatalogueReducer
};

export const REDUCERS_TOKEN = new InjectionToken<ActionReducerMap<AppState>>(
    'Registered Reducers'
);
Object.assign(REDUCERS_TOKEN, reducers);
