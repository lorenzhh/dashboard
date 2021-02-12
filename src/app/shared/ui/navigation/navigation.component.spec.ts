import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { NavBarService } from 'app/shared/services/nav-bar.service';
import { NavigationComponent } from './navigation.component';

describe('NavigationComponent', () => {
    let component: NavigationComponent;
    let fixture: ComponentFixture<NavigationComponent>;

    beforeEach(
        waitForAsync(() => {
            TestBed.configureTestingModule({
                imports: [NavBarService],
                declarations: [NavigationComponent]
            }).compileComponents();
        })
    );

    beforeEach(() => {
        fixture = TestBed.createComponent(NavigationComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should be created', () => {
        expect(component).toBeTruthy();
    });
});
