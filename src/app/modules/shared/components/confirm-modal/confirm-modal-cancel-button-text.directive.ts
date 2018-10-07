import {Directive, TemplateRef} from '@angular/core';

/**
 * Directive for conveniently getting the cancel button text in the confirm modal.
 */
@Directive({selector: '[cblConfirmModalCancelButtonText]'})
export class ConfirmModalCancelButtonTextDirective {
  constructor(public cblConfirmModalCancelButtonTextTemplateRef: TemplateRef<any>) {}
}
