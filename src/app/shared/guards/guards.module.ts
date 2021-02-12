import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AuthGuard } from 'app/shared/guards/auth.guard';

@NgModule({
    imports: [CommonModule],
    declarations: [],

    providers: [AuthGuard]
})
export class GuardsModule {}
