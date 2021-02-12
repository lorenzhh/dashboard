import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PipesModule } from 'app/shared/ui/pipes/pipes.module';
import { UiModule } from 'app/shared/ui/ui.module';
import { WelcomeRoutingModule } from 'app/welcome/welcome-routing.module';
import { WelcomeComponent } from 'app/welcome/welcome.component';

@NgModule({
    imports: [CommonModule, UiModule, WelcomeRoutingModule, PipesModule],

    declarations: [WelcomeComponent]
})
export class WelcomeModule {}
