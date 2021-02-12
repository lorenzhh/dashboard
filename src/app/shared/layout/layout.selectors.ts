import { AppState } from 'app/shared/store/app.model';

export function getActiveView() {
    return (state: AppState) => state.layout.active;
}
