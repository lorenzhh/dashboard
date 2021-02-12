import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { InternetConnectionCheckService } from 'app/shared/services/internet-connection-check.service';
import { NavBarService } from 'app/shared/services/nav-bar.service';

@NgModule({
    imports: [CommonModule],

    declarations: [],

    providers: [InternetConnectionCheckService, NavBarService]
})
export class ServicesModule {}
