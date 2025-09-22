import { trigger, state, style, transition, animate, query, stagger, keyframes } from '@angular/animations';

// Fade in/out animation
export const fadeInOut = trigger('fadeInOut', [
  state('in', style({ opacity: 1 })),
  state('out', style({ opacity: 0 })),
  transition('in => out', [animate('300ms ease-in')]),
  transition('out => in', [animate('300ms ease-out')])
]);

// Slide in from left
export const slideInLeft = trigger('slideInLeft', [
  state('in', style({ transform: 'translateX(0)' })),
  transition('void => *', [
    style({ transform: 'translateX(-100%)' }),
    animate('500ms ease-out')
  ])
]);

// Slide in from right
export const slideInRight = trigger('slideInRight', [
  state('in', style({ transform: 'translateX(0)' })),
  transition('void => *', [
    style({ transform: 'translateX(100%)' }),
    animate('500ms ease-out')
  ])
]);

// Scale in animation
export const scaleIn = trigger('scaleIn', [
  state('in', style({ transform: 'scale(1)' })),
  transition('void => *', [
    style({ transform: 'scale(0)' }),
    animate('300ms ease-out')
  ])
]);

// Card hover animation
export const cardHover = trigger('cardHover', [
  state('normal', style({ transform: 'scale(1)' })),
  state('hovered', style({ transform: 'scale(1.05)' })),
  transition('normal <=> hovered', animate('200ms ease-in-out'))
]);

// List item stagger animation
export const listStagger = trigger('listStagger', [
  transition('* => *', [
    query(':enter', [
      style({ opacity: 0, transform: 'translateY(20px)' }),
      stagger('100ms', [
        animate('400ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ])
    ], { optional: true })
  ])
]);

// Button click animation
export const buttonClick = trigger('buttonClick', [
  state('normal', style({ transform: 'scale(1)' })),
  state('clicked', style({ transform: 'scale(0.95)' })),
  transition('normal <=> clicked', animate('100ms ease-in-out'))
]);

// Loading spinner animation
export const loadingSpinner = trigger('loadingSpinner', [
  transition(':enter', [
    animate('600ms ease-in-out', keyframes([
      style({ transform: 'rotate(0deg)', offset: 0 }),
      style({ transform: 'rotate(360deg)', offset: 1 })
    ]))
  ])
]);

// Form field focus animation
export const formFieldFocus = trigger('formFieldFocus', [
  state('unfocused', style({
    transform: 'scale(1)',
    'box-shadow': '0 2px 4px rgba(0,0,0,0.1)'
  })),
  state('focused', style({
    transform: 'scale(1.02)',
    'box-shadow': '0 4px 12px rgba(0,123,255,0.3)'
  })),
  transition('unfocused <=> focused', animate('200ms ease-in-out'))
]);
