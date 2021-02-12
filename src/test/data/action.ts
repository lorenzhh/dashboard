import { Action } from '@ngrx/store';
import { cloneDeep } from 'test/helpers/clone-deep.helper';

interface EmptyAction {
    type: undefined;
    payload: undefined;
}

const emptyAction: EmptyAction = {
    type: undefined,
    payload: undefined
};

const actions = {
    emptyAction
};

export function getEmptyAction(): Action {
    return cloneDeep(actions.emptyAction);
}
