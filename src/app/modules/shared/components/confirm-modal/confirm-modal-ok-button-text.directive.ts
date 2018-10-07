import {Directive, TemplateRef} from '@angular/core';

/**
 * Directive for conveniently getting the ok button text in the confirm modal.
 */
@Directive({selector: '[cblConfirmModalOKButtonText]'})
export class ConfirmModalOKButtonTextDirective {
  constructor(public cblConfirmModalOKButtonTextTemplateRef: TemplateRef<any>) {}
}
