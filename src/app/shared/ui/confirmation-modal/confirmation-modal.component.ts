import { Component, HostListener } from '@angular/core';

export interface PromptModel {
    title: string;
    body: string;
    information: string;
    option: string;
}

@Component({
    selector: 'app-confirmation-modal',
    templateUrl: './confirmation-modal.component.html',
    styleUrls: ['./confirmation-modal.component.css']
})
export class ConfirmationModalComponent {
    title: string;
    body: string;
    information: string;
    option: string;

    confirmModal() {}

    closeModal() {}

    @HostListener('document:keydown', ['$event'])
    handleKeyboardEvent(event: KeyboardEvent) {}
}
