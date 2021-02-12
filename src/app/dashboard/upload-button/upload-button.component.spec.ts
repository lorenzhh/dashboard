import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { UploadButtonComponent } from './upload-button.component';

describe('UploadButtonComponent', () => {
    let component: UploadButtonComponent;
    let fixture: ComponentFixture<UploadButtonComponent>;

    beforeEach(
        waitForAsync(() => {
            TestBed.configureTestingModule({
                declarations: [UploadButtonComponent]
            }).compileComponents();
        })
    );

    beforeEach(() => {
        fixture = TestBed.createComponent(UploadButtonComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should be created', () => {
        expect(component).toBeTruthy();
    });
});
