import {Component, EventEmitter, Input, OnDestroy, Output, ViewChild} from '@angular/core';
import {ClrForm} from '@clr/angular';
import {Task} from '../../../../models/task';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {CblNotificationsService} from '../../../../services/core/cbl-notifications.service';
import {TaskService} from '../../../../services/crud/task.service';
import {DATEPICKER_FORMATS, FormMode} from '../../../../utility/constants/form-constants';
import {TourService} from '../../../../services/crud/tour.service';
import {numberValidator} from '../../../../utility/validators/number.validator';
import {integerValidator} from '../../../../utility/validators/integer.validator';
import {endKmValidator} from '../../../../utility/validators/end-km.validator';
import {numberMinValidator} from '../../../../utility/validators/number-min.validator';
import {momentValidator} from '../../../../utility/validators/moment.validator';
import {futureMomentValidator} from '../../../../utility/validators/future-moment.validator';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import * as moment from 'moment';
import {toNumber} from '../../../../utility/conversion/to-number';

/**
 * Trigger types for tasks.
 */
enum TaskTrigger {
  TIME = 'Zeit',
  KM = 'Kilometerstand'
}

/**
 * A modal for creating and updating tasks.
 */
@Component({
  selector: 'cbl-task-form-modal',
  templateUrl: './task-form-modal.component.html',
  styleUrls: ['./task-form-modal.component.scss']
})
export class TaskFormModalComponent implements OnDestroy {

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
  public lastTourLoading = true;
  public taskTriggers = [
    TaskTrigger.TIME,
    TaskTrigger.KM
  ];

  private task: Task;
  private lastEndKm: number;
  private timeIntervalControl: FormControl;
  private timeNextInstanceControl: FormControl;
  private kmIntervalControl: FormControl;
  private kmNextInstanceControl: FormControl;
  private onDestroy: Subject<any> = new Subject();

  constructor(private fb: FormBuilder,
              private tourService: TourService,
              private notifications: CblNotificationsService,
              private taskService: TaskService) {
  }

  /**
   * Builds the task form.
   */
  private buildForm() {
    const trigger = this.task.kmInterval ? TaskTrigger.KM : TaskTrigger.TIME;
    this.kmIntervalControl = new FormControl(this.task.kmInterval, [
      numberValidator(),
      numberMinValidator(1),
      Validators.required
    ]);
    this.kmNextInstanceControl = new FormControl(this.task.kmNextInstance, [
      numberValidator(),
      endKmValidator(this.lastEndKm),
      Validators.required
    ]);
    this.timeIntervalControl = new FormControl(this.task.timeInterval, [
      integerValidator(),
      Validators.min(1),
      Validators.required
    ]);
    const timeNextInstance = this.task.timeNextInstance ? this.task.timeNextInstance.format('DD.MM.YYYY') : null;
    this.timeNextInstanceControl = new FormControl(timeNextInstance, [
      momentValidator(DATEPICKER_FORMATS),
      futureMomentValidator(DATEPICKER_FORMATS),
      Validators.required
    ]);
    this.taskForm = this.fb.group({
      name: [this.task.name, [Validators.required, Validators.maxLength(120)]],
      description: [this.task.description, Validators.maxLength(120)],
      trigger: [trigger]
    });
    this.taskForm.get('trigger').valueChanges.pipe(takeUntil(this.onDestroy)).subscribe(() => {
      this.setTriggerFormControls();
    });
    this.setTriggerFormControls();
  }

  /**
   * Sets the forms trigger specific fields based on the current trigger value.
   */
  public setTriggerFormControls() {
    if (this.taskForm.get('trigger').value === TaskTrigger.TIME) {
      this.taskForm.removeControl('kmInterval');
      this.taskForm.removeControl('kmNextInstance');
      this.taskForm.addControl('timeInterval', this.timeIntervalControl);
      this.taskForm.addControl('timeNextInstance', this.timeNextInstanceControl);
    }
    if (this.taskForm.get('trigger').value === TaskTrigger.KM) {
      this.taskForm.removeControl('timeInterval');
      this.taskForm.removeControl('timeNextInstance');
      this.taskForm.addControl('kmInterval', this.kmIntervalControl);
      this.taskForm.addControl('kmNextInstance', this.kmNextInstanceControl);
    }
  }

  /**
   * Fires an onDestroy event on component destruction.
   */
  ngOnDestroy(): void {
    this.onDestroy.next();
  }

  /**
   * Opens the modal.
   */
  public open(formMode: FormMode, task: Task = new Task()) {
    this.isOpen = true;
    this.task = task;
    this.formMode = formMode;
    this.lastTourLoading = true;
    this.tourService.getLatestCommunityTour(this.communityId).subscribe(latestTour => {
      this.lastEndKm = latestTour.endKm;
      if (this.formMode === FormMode.CREATE) {
        this.task.kmNextInstance = toNumber(this.lastEndKm) + 1;
      }
      this.lastTourLoading = false;
      this.buildForm();
    }, err => {
      if (err === 'NO_TOUR_EXISTING') {
        this.lastEndKm = 0;
        this.lastTourLoading = false;
        this.buildForm();
      }
    });
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
      if (this.taskForm.get('trigger').value === TaskTrigger.TIME) {
        this.task.kmNextInstance = null;
        this.task.kmInterval = null;
        this.task.timeInterval = this.taskForm.get('timeInterval').value;
        this.task.timeNextInstance = moment(this.taskForm.get('timeNextInstance').value, DATEPICKER_FORMATS);
      }
      if (this.taskForm.get('trigger').value === TaskTrigger.KM) {
        this.task.kmNextInstance = this.taskForm.get('kmNextInstance').value;
        this.task.kmInterval = this.taskForm.get('kmInterval').value;
        this.task.timeInterval = null;
        this.task.timeNextInstance = null;
      }

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
          console.log(task);
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
