import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { UiModule } from 'app/shared/ui/ui.module';
import { WelcomeRoutingModule } from 'app/welcome/welcome-routing.module';
import { WelcomeComponent } from 'app/welcome/welcome.component';

@NgModule({
    imports: [CommonModule, UiModule, WelcomeRoutingModule, SharedModule],
    declarations: [WelcomeComponent]
})
export class WelcomeModule {}
