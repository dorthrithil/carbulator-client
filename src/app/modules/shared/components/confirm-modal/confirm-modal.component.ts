import {Component, ContentChild, EventEmitter, Input, Output, TemplateRef} from '@angular/core';
import {ConfirmModalOKButtonTextDirective} from './confirm-modal-ok-button-text.directive';
import {ConfirmModalCancelButtonTextDirective} from './confirm-modal-cancel-button-text.directive';
import {ConfirmModalTextDirective} from './confirm-modal-text.directive';
import {ConfirmModalTitleDirective} from './confirm-modal-title.directive';
import {Observable, of} from 'rxjs';

/**
 * A modal wrapper for displaying a simple confirmation message.
 */
@Component({
  selector: 'cbl-confirm-modal',
  templateUrl: './confirm-modal.component.html',
  styleUrls: ['./confirm-modal.component.less']
})
export class ConfirmModalComponent {

  @Output() confirm: EventEmitter<any> = new EventEmitter<any>();
  @Output() cancel: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() isOpenChange: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() actionError: EventEmitter<any> = new EventEmitter<any>();

  @Input() isOpen: boolean;
  @Input() action: Observable<any> = of(null);
  @Input() confirmButtonIsDanger = false;

  @ContentChild(ConfirmModalTextDirective) public cblConfirmModalText: ConfirmModalTextDirective;
  @ContentChild(ConfirmModalTitleDirective) public cblConfirmModalTitle: ConfirmModalTitleDirective;
  @ContentChild(ConfirmModalOKButtonTextDirective) public cblConfirmModalOKButtonText: ConfirmModalOKButtonTextDirective;
  @ContentChild(ConfirmModalCancelButtonTextDirective) public cblConfirmModalCancelButtonTextTitle: ConfirmModalCancelButtonTextDirective;

  public isLoading = false;

  /**
   * Confirms the modal.
   */
  confirmModal() {
    this.isLoading = true;
    this.action.subscribe(res => {
      this.isLoading = false;
      this.isOpen = false;
      this.isOpenChange.emit(this.isOpen);
      this.confirm.emit(res);
    }, err => {
      this.isLoading = false;
      this.isOpen = false;
      this.isOpenChange.emit(this.isOpen);
      this.actionError.emit(err);
    });
  }

  /**
   * Cancels the modal.
   */
  cancelModal() {
    this.isOpen = false;
    this.isOpenChange.emit(this.isOpen);
    this.cancel.emit();
  }

  /**
   * Getter for the title.
   * @return Title TemplateRef
   */
  public get title(): TemplateRef<any> {
    return this.cblConfirmModalTitle.cblConfirmModalTitleTemplateRef;
  }

  /**
   * Getter for the text.
   * @return Text TemplateRef
   */
  public get text(): TemplateRef<any> {
    return this.cblConfirmModalText.cblConfirmModalTextTemplateRef;
  }

  /**
   * Getter for the OK button text.
   * @return OK Button Text TemplateRef
   */
  public get okButtonText(): TemplateRef<any> {
    return this.cblConfirmModalOKButtonText.cblConfirmModalOKButtonTextTemplateRef;
  }

  /**
   * Getter for the cancel button text.
   * @return Cancel Button Text TemplateRef
   */
  public get cancelButtonText(): TemplateRef<any> {
    return this.cblConfirmModalCancelButtonTextTitle.cblConfirmModalCancelButtonTextTemplateRef;
  }

}
