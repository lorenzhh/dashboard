import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { StoreModule } from '@ngrx/store';
import { SimpleNotificationsModule } from 'angular2-notifications';
import { AppComponent } from 'app/app.component';
import { reducers, REDUCERS_TOKEN } from 'app/shared/store/reducers';
import { NavigationComponent } from 'app/shared/ui/navigation/navigation.component';
import { expectElementFromFixture } from 'ngx-test-helpers';

describe('AppComponent', () => {
    let fixture: ComponentFixture<AppComponent>;

    beforeEach(
        waitForAsync(() => {
            TestBed.configureTestingModule({
                imports: [
                    SimpleNotificationsModule.forRoot(),
                    BrowserAnimationsModule,
                    RouterTestingModule,
                    StoreModule.forRoot(REDUCERS_TOKEN)
                ],
                declarations: [AppComponent, NavigationComponent],
                providers: [
                    {
                        provide: REDUCERS_TOKEN,
                        useValue: reducers
                    }
                ]
            }).compileComponents();
        })
    );

    beforeEach(() => {
        fixture = TestBed.createComponent(AppComponent);
        fixture.detectChanges();
    });

    it(
        'should create the app',
        waitForAsync(() => {
            const app = fixture.debugElement.componentInstance;
            expect(app).toBeTruthy();
        })
    );

    it(`renders the router outlet`, () => {
        expectElementFromFixture(fixture, 'router-outlet').not.toBeNull();
    });

    it(`renders the navigation`, () => {
        expectElementFromFixture(fixture, 'app-navigation').not.toBeNull();
    });

    it(`renders the simple-notifications`, () => {
        expectElementFromFixture(fixture, 'simple-notifications').not.toBeNull();
    });
});
