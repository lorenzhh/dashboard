import { AppState } from 'app/shared/store/app.model';
import { cloneDeep } from 'test/helpers/clone-deep.helper';

const emptyState: AppState = {
    layout: {
        active: null
    },
    catalogue: {
        catalogue: null,
        catalogues: null,
        isLoading: false,
        selected: null
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
