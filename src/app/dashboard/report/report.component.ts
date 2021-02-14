import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Catalogue } from 'app/shared/catalogues/catalogue.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
    selector: 'app-report',
    templateUrl: './report.component.html',
    styleUrls: ['./report.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ReportComponent implements OnInit {
    public selectedCatalogue$: Observable<Catalogue>;
    constructor(public activatedRoute: ActivatedRoute) {}

    ngOnInit(): void {
        this.selectedCatalogue$ = this.activatedRoute.data.pipe(map(data => data.catalogue));
    }
}
