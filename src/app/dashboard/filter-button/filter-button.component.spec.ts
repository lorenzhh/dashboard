import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FilterButtonComponent } from './filter-button.component';

describe('FilterButtonComponent', () => {
    let component: FilterButtonComponent;
    let fixture: ComponentFixture<FilterButtonComponent>;

    beforeEach(
        waitForAsync(() => {
            TestBed.configureTestingModule({
                declarations: [FilterButtonComponent]
            }).compileComponents();
        })
    );

    beforeEach(() => {
        fixture = TestBed.createComponent(FilterButtonComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
