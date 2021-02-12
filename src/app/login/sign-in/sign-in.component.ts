import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'app-sign-in',
    templateUrl: './sign-in.component.html',
    styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {
    @Input() isLoading: boolean;
    @Output() signInSubmitted = new EventEmitter();
    loginForm: FormGroup;

    constructor(private formBuilder: FormBuilder) {}

    ngOnInit(): void {
        this.loginForm = this.formBuilder.group({
            username: [
                null,
                Validators.compose([
                    Validators.required,
                    Validators.minLength(1),
                    Validators.maxLength(90)
                ])
            ],
            password: [
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
