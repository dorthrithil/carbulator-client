import {Directive, TemplateRef} from '@angular/core';

/**
 * Directive for conveniently getting the modal text in the confirm modal.
 */
@Directive({selector: '[cblConfirmModalText]'})
export class ConfirmModalTextDirective {
  constructor(public cblConfirmModalTextTemplateRef: TemplateRef<any>) {}
}
