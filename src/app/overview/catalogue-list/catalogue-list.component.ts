import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Catalogue } from 'app/shared/catalogues/catalogue.model';
import * as moment from 'moment';
import { Moment } from 'moment';

@Component({
    selector: 'app-catalogue-list',
    templateUrl: './catalogue-list.component.html',
    styleUrls: ['./catalogue-list.component.css']
})
export class CatalogueListComponent {
    @Input() catalogues: Catalogue[];
    @Output() catalogueSelected = new EventEmitter();
    @Input() title: string;
    today: moment.Moment = moment();
    end: moment.Moment = moment()
        .add(365, 'days')
        .endOf('day');

    isGreen(date: Moment) {
        date = moment(date);
        return date.isAfter(this.today) && !date.isBefore(this.end);
    }

    isYellow(date: Moment) {
        date = moment(date);
        return date.isAfter(this.today) && date.isBefore(this.end);
    }
}
