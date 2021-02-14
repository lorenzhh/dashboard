import { HttpClientModule } from '@angular/common/http';
import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { AppRoutingModule } from 'app/app-routing';
import { AppComponent } from 'app/app.component';
import { effects } from 'app/shared/store/effects';
import { reducers, REDUCERS_TOKEN } from 'app/shared/store/reducers';
import { SharedModule } from './shared/shared.module';

@NgModule({
    declarations: [AppComponent],
    imports: [
        BrowserModule,
        HttpClientModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        EffectsModule.forRoot(effects),
        StoreModule.forRoot(REDUCERS_TOKEN),
        StoreDevtoolsModule.instrument({ maxAge: 50 }),
        SharedModule.forRoot()
    ],

    providers: [
        { provide: REDUCERS_TOKEN, useValue: reducers },
        { provide: LOCALE_ID, useValue: 'de-DE' }
    ],

    bootstrap: [AppComponent]
})
export class AppModule {}
