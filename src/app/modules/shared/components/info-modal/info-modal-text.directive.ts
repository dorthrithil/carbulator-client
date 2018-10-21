import {Directive, TemplateRef} from '@angular/core';

/**
 * Directive for conveniently getting the modal text in the info modal.
 */
@Directive({selector: '[cblInfoModalText]'})
export class InfoModalTextDirective {
  constructor(public cblInfoModalTextTemplateRef: TemplateRef<any>) {}
}
