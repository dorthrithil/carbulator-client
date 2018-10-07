import {Directive, TemplateRef} from '@angular/core';

/**
 * Directive for conveniently getting the modal title in the confirm modal.
 */
@Directive({selector: '[cblConfirmModalTitle]'})
export class ConfirmModalTitleDirective {
  constructor(public cblConfirmModalTitleTemplateRef: TemplateRef<any>) {}
}
