import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { PipesModule } from 'app/shared/ui/pipes/pipes.module';
import { CatalogueComponent } from './catalogue.component';

describe('CatalogueComponent', () => {
    let component: CatalogueComponent;
    let fixture: ComponentFixture<CatalogueComponent>;

    beforeEach(
        waitForAsync(() => {
            TestBed.configureTestingModule({
                imports: [PipesModule],
                declarations: [CatalogueComponent]
            }).compileComponents();
        })
    );

    beforeEach(() => {
        fixture = TestBed.createComponent(CatalogueComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should be created', () => {
        expect(component).toBeTruthy();
    });
});
