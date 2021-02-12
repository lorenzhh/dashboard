import { ModuleWithProviders, NgModule } from '@angular/core';
import { DatexPipe } from 'app/shared/ui/pipes/datex.pipe';

@NgModule({
    declarations: [DatexPipe],
    exports: [DatexPipe]
})
export class PipesModule {
    static forRoot(): ModuleWithProviders<PipesModule> {
        return {
            ngModule: PipesModule
        };
    }
}
