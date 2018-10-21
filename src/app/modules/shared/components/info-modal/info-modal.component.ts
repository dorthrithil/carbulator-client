import {Component, ContentChild, EventEmitter, Input, Output, TemplateRef} from '@angular/core';
import {InfoModalTextDirective} from './info-modal-text.directive';

/**
 * A modal wrapper for displaying a text.
 */
@Component({
  selector: 'cbl-info-modal',
  templateUrl: './info-modal.component.html',
  styleUrls: ['./info-modal.component.less']
})
export class InfoModalComponent {

  @Output() isOpenChange: EventEmitter<boolean> = new EventEmitter<boolean>();

  @Input() isOpen: boolean;

  @ContentChild(InfoModalTextDirective) public cblInfoModalText: InfoModalTextDirective;


  /**
   * Cancels the modal.
   */
  closeModal() {
    this.isOpen = false;
  }

  /**
   * Getter for the text.
   * @return Text TemplateRef
   */
  public get text(): TemplateRef<any> {
    return this.cblInfoModalText.cblInfoModalTextTemplateRef;
  }

}
