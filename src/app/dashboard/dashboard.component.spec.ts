import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { Store, StoreModule } from '@ngrx/store';
import { DashboardComponent } from 'app/dashboard/dashboard.component';
import { ServicesModule } from 'app/shared/services/services.module';
import { SpinnerComponent } from 'app/shared/ui/spinner/spinner.component';
import { DialogService } from 'ng2-bootstrap-modal';
import { expectElementFromFixture } from 'ngx-test-helpers';
import { PipesModule } from '../shared/ui/pipes/pipes.module';
import { CatalogueComponent } from './catalogue/catalogue.component';
import { FilterButtonComponent } from './filter-button/filter-button.component';
import { SearchButtonComponent } from './search-button/search-button.component';
import { UploadButtonComponent } from './upload-button/upload-button.component';

describe('Dashboard', () => {
    let fixture: ComponentFixture<DashboardComponent>;

    beforeEach(
        waitForAsync(() => {
            TestBed.configureTestingModule({
                imports: [
                    ReactiveFormsModule,
                    ServicesModule,
                    RouterTestingModule,
                    PipesModule,
                    StoreModule.forRoot({})
                ],
                declarations: [
                    DashboardComponent,
                    SpinnerComponent,
                    SearchButtonComponent,
                    FilterButtonComponent,
                    CatalogueComponent,
                    UploadButtonComponent
                ],
                providers: [DialogService, Store]
            }).compileComponents();
        })
    );

    beforeEach(() => {
        fixture = TestBed.createComponent(DashboardComponent);
        fixture.detectChanges();
    });

    it(`renders the app-catalogue List`, () => {
        expectElementFromFixture(fixture, 'app-catalogue').not.toBeNull();
    });
});
