import { Component, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'app-upload-button',
    templateUrl: './upload-button.component.html',
    styleUrls: ['./upload-button.component.css']
})
export class UploadButtonComponent {
    @Output() uploadButtonSubmitted = new EventEmitter();
}
