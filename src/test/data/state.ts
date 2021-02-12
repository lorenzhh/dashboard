import { cloneDeep } from 'lodash';
import { AppState } from 'app/shared/store/app.model';

const emptyState: AppState = {
    layout: {
        active: null
    },
    catalogue: {
        catalogue: null,
        catalogues: null,
        isLoading: false,
        selectedCatalogue: null
    },

    user: {
        user: null,
        isLoading: false
    },
    router: {
        state: null,
        navigationId: null
    }
};

const initialState = cloneDeep(emptyState);

export function getEmptyState() {
    return cloneDeep(emptyState);
}

export function getInitialState() {
    return cloneDeep(initialState);
}
