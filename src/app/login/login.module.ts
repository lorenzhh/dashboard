import { NgModule } from '@angular/core';
import { LoginRoutingModule } from 'app/login/login-routing.module';
import { LoginComponent } from 'app/login/login.component';
import { SignInComponent } from 'app/login/sign-in/sign-in.component';
import { SharedModule } from 'app/shared/shared.module';

@NgModule({
    declarations: [LoginComponent, SignInComponent],
    imports: [LoginRoutingModule, SharedModule]
})
export class LoginModule {}
