import { RouterReducerState } from '@ngrx/router-store';
import { State as catalogueState } from 'app/shared/catalogues/catalogues.reducer';
import { State as LayoutState } from 'app/shared/layout/layout.reducer';
import { State as userState } from 'app/shared/user/user.reducer';

export interface AppState {
    router: RouterReducerState;
    layout: LayoutState;
    user: userState;
    catalogue: catalogueState;
}
