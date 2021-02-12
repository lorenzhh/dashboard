import { AppState } from 'app/shared/store/app.model';

export function getCurrentUser() {
    return (state: AppState) => state.user.user;
}

export function getUserIsLoading() {
    return (state: AppState) => state.user.isLoading;
}
