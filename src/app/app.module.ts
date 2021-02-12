import { HttpClientModule } from '@angular/common/http';
import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { SimpleNotificationsModule } from 'angular2-notifications';
import { AppRoutingModule } from 'app/app-routing';
import { AppComponent } from 'app/app.component';
import { CataloguesService } from 'app/shared/catalogues/catalogues.service';
import { GuardsModule } from 'app/shared/guards/guards.module';
import { ServicesModule } from 'app/shared/services/services.module';
import { effects } from 'app/shared/store/effects';
import { reducers, REDUCERS_TOKEN } from 'app/shared/store/reducers';
import { NotificationService } from 'app/shared/ui/notification/notification.service';
import { UiModule } from 'app/shared/ui/ui.module';
import { UserService } from 'app/shared/user/user.service';

@NgModule({
    declarations: [AppComponent],

    imports: [
        BrowserModule,
        HttpClientModule,
        ServicesModule,
        AppRoutingModule,
        UiModule,
        GuardsModule,
        BrowserAnimationsModule,
        SimpleNotificationsModule.forRoot(),
        EffectsModule.forRoot(effects),
        StoreModule.forRoot(REDUCERS_TOKEN),
        StoreDevtoolsModule.instrument({ maxAge: 50 })
    ],

    providers: [
        NotificationService,
        UserService,
        CataloguesService,
        { provide: REDUCERS_TOKEN, useValue: reducers },
        { provide: LOCALE_ID, useValue: 'de-DE' }
    ],

    bootstrap: [AppComponent]
})
export class AppModule {}
