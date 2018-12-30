import {Component, Input, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {Task} from '../../../../models/task';
import {sortAndLimit} from '../../../../utility/sorting/sort-and-limit';
import {sortTasks} from '../../../../utility/sorting/sort-tasks';
import {FormMode} from '../../../../utility/constants/form-constants';

/**
 * A component for showing a list of tasks.
 */
@Component({
  selector: 'cbl-tasks-datagrid',
  templateUrl: './tasks-datagrid.component.html',
  styleUrls: ['./tasks-datagrid.component.scss']
})
export class TasksDatagridComponent implements OnInit {

  /**
   * Observable that resolves to an array of tasks.
   */
  @Input() taskResource: Observable<Task[]>;

  /**
   * ID of a community. If this field is provided, there will be the possibility to add tasks via the datagrid action bar.
   */
  @Input() communityId: number;

  public tasks: Task[];
  public isLoading = true;
  public selectedTask: Task;
  public formModes = FormMode;

  /**
   * Loads all tasks for the community on component initialization.
   */
  ngOnInit() {
    this.taskResource.subscribe(tasks => {
      this.tasks = tasks;
      this.isLoading = false;
      sortAndLimit(this.tasks, sortTasks, 0, 'DESC');
    });
  }

  /**
   * Removes the given task from the list of tasks.
   * @param task Task to remove.
   */
  public removeTask(task: Task) {
    this.tasks.splice(this.tasks.indexOf(task), 1);
  }

  /**
   * Adds a task to the list of tasks.
   * @param task Task top add.
   */
  public addTask(task: Task) {
    this.tasks.push(task);
    sortAndLimit(this.tasks, sortTasks, 0, 'DESC');
  }

}
