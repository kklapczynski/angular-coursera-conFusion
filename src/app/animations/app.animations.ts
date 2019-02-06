import { trigger, state, style, animate, transition } from '@angular/animations';

export function visibility() {
    return trigger('visibility', [
        state('shown', style({
          transform: 'scale(1.0)',
          opacity: 1
        })),
        state('hidden', style({
          transform: 'scale(0)',
          opacity: 0
        })),
        transition('* => *', animate('0.5s ease-in-out'))
    ])
}

export function flyInOut() {
    return trigger('flyInOut', [
        state('*', style({ opacity: 1, transform: 'translateX(0)'})),
        transition(':enter', [
            style({ transform: 'translateX(-100%)', opacity: 0 }),
            animate('500ms ease-in')
        ]),
        transition(':leave', [
            animate('500ms ease-out', style({ transform: 'translateX(100%)', opacity: 0}))
        ])
    ]);
    // TODO: animation doesn't work well, cause when route changes component is added
    // dispayed as a block (see component files) so previous one jumps down under new one, so no fly
    // effect achieved; fixed / absolute positioning should be used
    // but then there is problem of overlapping with footer

    // good example of trigger: https://medium.com/google-developer-experts/angular-2-animate-router-transitions-6de179e00204
}

export function expand() {
    return trigger('expand', [
        state('*', style({opacity: 1, transform: 'trnaslateX(0%)'})),
        transition(':enter', [
            style({opacity: 0, transform: 'translateY(-50%)'}),
            animate('0.5s ease-in', style({opacity: 1, transform: 'translateX(0%)'}))
        ])
    ])
}