import {
    animate,
    state,
    style,
    transition,
    trigger
} from '@angular/animations';

export const overviewAnimation = trigger('overviewAnimation', [
    state(
        'void',
        style({
            position: 'fixed',
            width: '100%'
        })
    ),

    state(
        '*',
        style({
            width: '100%'
        })
    ),

    transition(':enter', [
        style({
            transform: 'translateX(-100%)'
        }),
        animate(
            '0.7s ease-in-out',
            style({
                transform: 'translateX(0%)'
            })
        )
    ]),

    transition(':leave', [
        style({
            transform: 'translateX(0%)'
        }),
        animate(
            '0.7s ease-in-out',
            style({
                transform: 'translateX(-100%)'
            })
        )
    ])
]);
