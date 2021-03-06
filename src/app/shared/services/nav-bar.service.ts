import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { LayoutActions } from 'app/shared/layout/layout.actions';
import { Layout } from 'app/shared/layout/layout.model';
import { AppState } from 'app/shared/store/app.model';

@Injectable({ providedIn: 'root' })
export class NavBarService {
    visible: boolean;

    constructor(readonly store: Store<AppState>) {
        this.visible = false;
    }

    hide() {
        this.visible = false;
    }

    show() {
        this.visible = true;
    }

    toggle() {
        this.visible = !this.visible;
    }

    setActiveView(layout: Layout) {
        this.store.dispatch(LayoutActions.SetActive({ layout }));
    }
}
