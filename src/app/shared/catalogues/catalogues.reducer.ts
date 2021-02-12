import { ActionReducer, createReducer, on } from '@ngrx/store';
import { Catalogue } from 'app/shared/catalogues/catalogue.model';
import { CatalougeActions } from './catalogues.actions';

export interface State {
    catalogue: Catalogue;
    catalogues: Catalogue[];
    isLoading: boolean;
    selected: Catalogue;
}

const initialState: State = {
    catalogue: null,
    catalogues: [],
    isLoading: false,
    selected: null
};

export const reducer: ActionReducer<State> = createReducer(
    initialState,
    on(
        CatalougeActions.Load,
        CatalougeActions.LoadError,
        CatalougeActions.Add,
        CatalougeActions.AddError,
        CatalougeActions.Delete,
        CatalougeActions.DeleteError,
        CatalougeActions.Approve,
        CatalougeActions.ApproveError,
        (state, action) => {
            state = {
                ...state,
                isLoading: true
            };
            return state;
        }
    ),
    on(CatalougeActions.Loaded, (state, action) => {
        state = {
            ...state,
            catalogues: action.payload,
            isLoading: false
        };
        return state;
    }),
    on(CatalougeActions.Added, (state, action) => {
        state = {
            ...state,
            catalogues: [action, ...state.catalogues],
            isLoading: false
        };
        return state;
    }),
    on(CatalougeActions.Deleted, (state, action) => {
        state = {
            ...state,
            catalogues: state.catalogues.filter(catalogue => catalogue.id !== action.id),
            isLoading: false
        };
        return state;
    }),
    on(CatalougeActions.Approved, (state, action) => {
        state = {
            ...state,
            isLoading: false,
            catalogues: state.catalogues.map(catalogue =>
                catalogue.id === action.id ? action : catalogue
            )
        };
        return state;
    }),
    on(CatalougeActions.Select, (state, action) => {
        state = {
            ...state,
            selected: action,
            isLoading: false
        };
        return state;
    })
);
