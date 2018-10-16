import {Component, Input, OnInit} from '@angular/core';
import {Tour} from '../../../../models/tour';
import {Refuel} from '../../../../models/refuel';

/**
 * A modal that shows information about a refuel.
 */
@Component({
  selector: 'cbl-refuel-info-modal',
  templateUrl: './refuel-info-modal.component.html',
  styleUrls: ['./refuel-info-modal.component.scss']
})
export class RefuelInfoModalComponent {

  /**
   * The refuel to show in the modal.
   */
  @Input() refuel: Refuel;
  /**
   * True if the modal is open.
   */
  @Input() isOpen = false;

  constructor() {
  }

  /**
   * Closes the modal.
   */
  close() {
    this.isOpen = false;
  }

  /**
   * Opens the modal.
   */
  open() {
    this.isOpen = true;
  }

}
