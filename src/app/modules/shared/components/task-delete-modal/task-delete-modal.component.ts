import {Component, EventEmitter, Output} from '@angular/core';
import {Observable} from 'rxjs';
import {MessageResponse} from '../../../../services/crud/auth-crud.service';
import {CblNotificationsService} from '../../../../services/core/cbl-notifications.service';
import {tap} from 'rxjs/operators';
import {Task} from '../../../../models/task';
import {TaskService} from '../../../../services/crud/task.service';

/**
 * A modal for deleting a task.
 */
@Component({
  selector: 'cbl-task-delete-modal',
  templateUrl: './task-delete-modal.component.html',
  styleUrls: ['./task-delete-modal.component.scss']
})
export class TaskDeleteModalComponent {

  /**
   * Emits the task after it has been successfully deleted.
   */
  @Output() deleted: EventEmitter<Task> = new EventEmitter();

  public confirmDeletionModalOpen = false;
  public deleteTaskRequest: Observable<MessageResponse> = null;

  constructor(private taskService: TaskService,
              private notifications: CblNotificationsService) {
  }

  /**
   * Opens the modal for confirming the task deletion.
   * @param task Task that should get deleted.
   */
  public deleteTask(task: Task) {
    this.confirmDeletionModalOpen = true;
    this.deleteTaskRequest = this.taskService.deleteTask(task).pipe(tap(() => {
      this.notifications.success('Aufgabe gelöscht', 'Die Aufgabe wurde erfolgreich gelöscht.');
      this.deleted.emit(task);
    }));
  }

}
