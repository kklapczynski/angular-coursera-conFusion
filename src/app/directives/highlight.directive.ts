import { Directive, HostListener, Renderer2, ElementRef } from '@angular/core';

@Directive({
  selector: '[appHighlight]'
})
export class HighlightDirective {
  // inject ElementRef - a reference to the DOM element, that directive is added to
  // ElementRef.nativeElement property gives direct access to that element
  constructor( private el: ElementRef, private renderer: Renderer2) { }
  // by default Angular renders template to the DOM
  // Renederer2 is used to be able to use this code for other platforms than browser
  // = render to something other than DOM
  @HostListener('mouseenter') onMouseEnter() {
    this.renderer.addClass(this.el.nativeElement, 'highlight');
  }
  // HostListener lets subscribe to events on DOM element that directive is added to
  // this could have been done with pure JS eventListeners and DOM API, but it's not good practice in Angular
  @HostListener('mouseleave') onMouseLeave() {
    this.renderer.removeClass(this.el.nativeElement, 'highlight');
  }
}
