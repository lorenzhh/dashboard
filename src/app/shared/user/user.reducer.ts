import { createReducer, on } from '@ngrx/store';
import { UserActions } from 'app/shared/user/user.actions';
import { User } from 'app/shared/user/user.model';

export interface State {
    user: User;
    isLoading: boolean;
}

const initialState: State = {
    user: JSON.parse(localStorage.getItem('currentUser')) ?? undefined,
    isLoading: false
};

export const reducer = createReducer(
    initialState,
    on(UserActions.Authenticate, UserActions.Load, UserActions.Destroy, (state, action) => {
        state = {
            ...state,
            isLoading: true
        };
        return state;
    }),
    on(
        UserActions.Authenticated,
        UserActions.AuthenticateError,
        UserActions.Loaded,
        UserActions.LoadError,
        UserActions.Destroyed,
        UserActions.DestroyError,
        (state, user) => {
            state = {
                ...state,
                user: user,
                isLoading: false
            };

            return state;
        }
    ),
);
