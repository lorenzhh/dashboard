import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Catalogue } from 'app/shared/catalogues/catalogue.model';

@Component({
    selector: 'app-catalogue',
    templateUrl: './catalogue.component.html',
    styleUrls: ['./catalogue.component.css']
})
export class CatalogueComponent {
    @Input() catalogues: Catalogue[];
    @Output() downloadAction = new EventEmitter();
    @Output() deleteAction = new EventEmitter();
    @Output() approveAction = new EventEmitter();
    @Output() selectAction = new EventEmitter();
}
