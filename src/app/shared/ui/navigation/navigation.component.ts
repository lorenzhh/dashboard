import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NavBarService } from 'app/shared/services/nav-bar.service';

@Component({
    selector: 'app-navigation',
    templateUrl: './navigation.component.html',
    styleUrls: ['./navigation.component.css']
})
export class NavigationComponent {
    @Output() logoutButtonClicked = new EventEmitter();
    @Input() internetConnectionAvailable: boolean;

    constructor(readonly nav: NavBarService) {}
}
