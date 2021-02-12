import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'app-search-button',
    templateUrl: './search-button.component.html',
    styleUrls: ['./search-button.component.css']
})
export class SearchButtonComponent implements OnInit {
    @Output() searchOption = new EventEmitter();
    searchForm: FormGroup;

    constructor(readonly fb: FormBuilder) {}

    ngOnInit() {
        this.searchForm = this.fb.group({
            id: [
                null,
                Validators.compose([
                    Validators.required,
                    Validators.minLength(1),
                    Validators.maxLength(90)
                ])
            ]
        });
    }
}
