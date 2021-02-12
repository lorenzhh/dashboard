import { createAction, props } from '@ngrx/store';
import { Catalogue } from 'app/shared/catalogues/catalogue.model';

export namespace CatalougeActions {
    export const Load = createAction('[Catalogue] Load');
    export const Loaded = createAction('[Catalogue] Loaded', props<{ payload: Catalogue[] }>());
    export const LoadError = createAction('[Catalogue] Load Error', props<{ payload: Catalogue[] }>());

    export const Add = createAction('[Catalogue] Add', props<{ formData: FormData }>());
    export const Added = createAction('[Catalogue] Added', props<Catalogue>());
    export const AddError = createAction('[Catalogue] Add Error', props<Catalogue>());

    export const Delete = createAction('[Catalogue] Delete', props<Catalogue>());
    export const Deleted = createAction('[Catalogue] Deleted', props<Catalogue>());
    export const DeleteError = createAction('[Catalogue] Delete Error', props<Catalogue>());

    export const Download = createAction('[Catalogue] Download', props<Catalogue>());
    export const Downloaded = createAction('[Catalogue] Downloaded', props<Catalogue>());
    export const DownloadError = createAction('[Catalogue] Download Error', props<Catalogue>());

    export const Approve = createAction('[Catalogue] Approve', props<Catalogue>());
    export const Approved = createAction('[Catalogue] Approved', props<Catalogue>());
    export const ApproveError = createAction('[Catalogue] Approve Error', props<Catalogue>());

    export const Select = createAction('[Catalogue] Select', props<Catalogue>());
}
