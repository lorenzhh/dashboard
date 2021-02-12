import { cloneDeep } from 'lodash';
import { Action } from '@ngrx/store';

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
