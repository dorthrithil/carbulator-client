import {Component, Input} from '@angular/core';
import {Task} from 'src/app/models/task';

/**
 * Component for showing a task in a box.
 */
@Component({
  selector: 'cbl-task-box',
  templateUrl: './task-box.component.html',
  styleUrls: ['./task-box.component.scss']
})
export class TaskBoxComponent {

  /**
   * The task to show in the box.
   */
  @Input() task: Task;

}
