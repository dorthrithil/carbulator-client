import {Component, EventEmitter, Input, Output, ViewChild} from '@angular/core';
import {ClrForm} from '@clr/angular';
import {Task} from '../../../../models/task';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CblNotificationsService} from '../../../../services/core/cbl-notifications.service';
import {TaskService} from '../../../../services/crud/task.service';
import {FormMode} from '../../../../utility/constants/form-constants';

/**
 * A modal for creating and updating tasks.
 */
@Component({
  selector: 'cbl-task-form-modal',
  templateUrl: './task-form-modal.component.html',
  styleUrls: ['./task-form-modal.component.scss']
})
export class TaskFormModalComponent {

  /**
   * Reference to the clarity form instance.
   */
  @ViewChild(ClrForm) clrForm;

  /**
   * The id of the community in which to create a task.
   */
  @Input() communityId: number;

  /**
   * Emits the created task.
   */
  @Output() taskAdded: EventEmitter<Task> = new EventEmitter();
  /**
   * Emits the updated task.
   */
  @Output() taskUpdated: EventEmitter<Task> = new EventEmitter();

  public taskForm: FormGroup;
  public isOpen = false;
  public isLoading = false;
  public formMode: FormMode;
  public formModes = FormMode;

  private task: Task;

  constructor(private fb: FormBuilder,
              private notifications: CblNotificationsService,
              private taskService: TaskService) {
  }


  /**
   * Builds the task form.
   */
  private buildForm() {
    this.taskForm = this.fb.group({
      name: [this.task.name, [Validators.required]],
      description: [this.task.description],
    });
  }

  /**
   * Opens the modal.
   */
  public open(formMode: FormMode, task: Task = new Task()) {
    this.isOpen = true;
    this.task = task;
    this.formMode = formMode;
    this.buildForm();
  }

  /**
   * Closes the modal.
   */
  public close() {
    this.isOpen = false;
    this.isLoading = false;
  }

  /**
   * Persists the task on the server and closes the modal.
   */
  public save() {
    if (this.taskForm.valid) {
      this.isLoading = true;
      this.task.name = this.taskForm.get('name').value;
      this.task.description = this.taskForm.get('description').value;

      if (this.formMode === FormMode.CREATE) {
        this.taskService.createTask(this.communityId, this.task).subscribe(task => {
          this.taskAdded.emit(task);
          this.close();
          this.notifications.success('Aufgabe erstellt', 'Die Aufgabe wurde erstellt.');
        }, () => {
          this.isOpen = false;
          this.close();
        });
      }

      if (this.formMode === FormMode.UPDATE) {
        this.taskService.updateTask(this.task).subscribe(task => {
          this.taskUpdated.emit(task);
          this.close();
          this.notifications.success('Aufgabe gespeichert', 'Die Änderungen wurden übernommen.');
        }, () => {
          this.isOpen = false;
          this.close();
        });
      }

    } else {
      this.clrForm.markAsDirty();
    }
  }

}
