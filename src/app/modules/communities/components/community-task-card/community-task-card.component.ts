import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Subject} from 'rxjs';
import {AppEventsService} from '../../../../services/core/app-events.service';
import {sortAndLimit} from '../../../../utility/sorting/sort-and-limit';
import {map} from 'rxjs/operators';
import {Task} from 'src/app/models/task';
import {TaskService} from '../../../../services/crud/task.service';
import {sortTasks} from '../../../../utility/sorting/sort-tasks';
import {FormMode} from '../../../../utility/constants/form-constants';

/**
 * Component that shows a card with the five next due tasks.
 */
@Component({
  selector: 'cbl-community-task-card',
  templateUrl: './community-task-card.component.html',
  styleUrls: ['./community-task-card.component.scss']
})
export class CommunityTaskCardComponent implements OnInit, OnDestroy {

  /**
   * Id of the community to fetch the tasks for.
   */
  @Input() communityId: number;

  public tasks: Task[];
  public formModeCreate = FormMode.CREATE;

  private onDestroy: Subject<any> = new Subject();

  constructor(private taskService: TaskService,
              private appEvents: AppEventsService) {
  }

  /**
   * Loads all tasks for the community on component initialization.
   */
  ngOnInit() {
    const taskObservable = this.taskService.getCommunityTasks(this.communityId).pipe(map(tasks => {
      this.tasks = tasks;
      sortAndLimit(this.tasks, sortTasks, 5, 'DESC');
    }));
    taskObservable.subscribe();
    this.appEvents.tourFinished.subscribe(() => {
      taskObservable.subscribe();
    });
  }

  /**
   * Emits the on destroy event on component destruction.
   */
  ngOnDestroy() {
    this.onDestroy.next();
  }

  /**
   * Adds a task to the list of tasks.
   * @param task Task to add to the list.
   */
  public addTask(task: Task) {
    this.tasks.push(task);
    sortAndLimit(this.tasks, sortTasks, 5, 'DESC');
  }

}
