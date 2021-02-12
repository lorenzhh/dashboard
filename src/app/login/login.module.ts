import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginRoutingModule } from 'app/login/login-routing.module';
import { LoginComponent } from 'app/login/login.component';
import { SignInComponent } from 'app/login/sign-in/sign-in.component';
import { UiModule } from 'app/shared/ui/ui.module';

@NgModule({
    declarations: [LoginComponent, SignInComponent],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
        LoginRoutingModule,
        UiModule
    ]
})
export class LoginModule {}
