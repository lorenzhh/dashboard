import { CataloguesEffects } from 'app/shared/catalogues/catalogues.effects';
import { RouterEffects } from 'app/shared/router/router.effects';
import { UserEffects } from 'app/shared/user/user.effects';

export const effects = [RouterEffects, UserEffects, CataloguesEffects];
