import { createFeatureSelector, createSelector } from '@ngrx/store';
import { State } from './user.reducer';

export const UserState = createFeatureSelector<State>('user');

export const currentUser = createSelector(
    UserState,
    state => state.user
);

export const isLoading = createSelector(
    UserState,
    state => state.isLoading
);
