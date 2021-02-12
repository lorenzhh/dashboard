import { createAction, props } from '@ngrx/store';
import { User, UserKey } from 'app/shared/user/user.model';
import { Login } from 'app/shared/user/login.model';

export namespace UserActions {
    export const Authenticate = createAction('[User] Authenticate', props<{ login: Login, redirectUrl: string }>());
    export const Authenticated = createAction('[User] Authenticated', props<User>());
    export const AuthenticateError = createAction('[User] Authenticate Error', props<User>());
    export const Load = createAction('[User] Load', props<{ id: UserKey }>());
    export const LoadError = createAction('[User] Load Error', props<User>());
    export const Loaded = createAction('[User] Loaded', props<User>());
    export const Destroy = createAction('[User] Destroy');
    export const Destroyed = createAction('[User] Destroyed', props<User>());
    export const DestroyError = createAction('[User] Destroy Error', props<User>());
    export const Select = createAction('[User] Select');
}
