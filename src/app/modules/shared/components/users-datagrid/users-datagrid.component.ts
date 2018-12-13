import {Component, Input, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {sortAndLimit} from '../../../../utility/sorting/sort-and-limit';
import {User} from '../../../../models/user';
import {sortUsers} from '../../../../utility/sorting/sort-users';

/**
 * A component that shows all members of a community.
 */
@Component({
  selector: 'cbl-users-datagrid',
  templateUrl: './users-datagrid.component.html',
  styleUrls: ['./users-datagrid.component.scss']
})
export class UsersDatagridComponent implements OnInit {

  /**
   * Observable that resolves to an array of users.
   */
  @Input() userResource: Observable<User[]>;

  public users: User[];
  public isLoading = true;

  /**
   * Loads all users for the community on component initialization.
   */
  ngOnInit() {
    this.userResource.subscribe(users => {
      this.users = users;
      this.isLoading = false;
      sortAndLimit(this.users, sortUsers, 0, 'DESC');
    });
  }

}
