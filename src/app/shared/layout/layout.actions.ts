import { createAction, props } from '@ngrx/store';
import { Layout } from 'app/shared/layout/layout.model';

export namespace LayoutActions {
    export const SetActive = createAction('[Layout] Set Active', props<{ layout: Layout }>());
}
