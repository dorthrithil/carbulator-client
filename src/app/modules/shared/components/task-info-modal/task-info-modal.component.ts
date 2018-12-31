import {Component, Input} from '@angular/core';
import {Task} from '../../../../models/task';

/**
 * Info modal for tasks.
 */
@Component({
  selector: 'cbl-task-info-modal',
  templateUrl: './task-info-modal.component.html',
  styleUrls: ['./task-info-modal.component.scss']
})
export class TaskInfoModalComponent {

  /**
   * The task to show in the modal.
   */
  @Input() task: Task;
  /**
   * True if the modal is open.
   */
  @Input() isOpen = false;

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
