import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { CatalogueListComponent } from './catalogue-list.component';

describe('CatalogueListComponent', () => {
    let component: CatalogueListComponent;
    let fixture: ComponentFixture<CatalogueListComponent>;

    beforeEach(
        waitForAsync(() => {
            TestBed.configureTestingModule({
                declarations: [CatalogueListComponent]
            }).compileComponents();
        })
    );

    beforeEach(() => {
        fixture = TestBed.createComponent(CatalogueListComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should be created', () => {
        expect(component).toBeTruthy();
    });
});
