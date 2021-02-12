import { ActionReducer, createReducer, on } from '@ngrx/store';
import { LayoutActions } from 'app/shared/layout/layout.actions';
import { Layout } from 'app/shared/layout/layout.model';

export interface State {
    active: Layout;
}

const initialState: State = {
    active: null
};

export const reducer: ActionReducer<State> = createReducer(
    initialState,
    on(LayoutActions.SetActive, (state, action) => {
        state = {
            ...state,
            active: action.layout
        };
        return state;
    })
);
