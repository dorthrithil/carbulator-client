import {Component, Input, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {sortAndLimit} from '../../../../utility/sorting/sort-and-limit';
import {User} from '../../../../models/user';
import {sortUsers} from '../../../../utility/sorting/sort-users';
import {Community} from '../../../../models/community';
import {UserService} from '../../../../services/crud/user.service';

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

  /**
   * If this field is provided, there will be the possibility to add members to the community via the datagrid action bar.
   */
  @Input() community: Community;

  public users: User[];
  public invitedUsers: User[] = [];
  public isLoading = true;

  constructor(private userService: UserService) {
  }

  /**
   * Loads all users for the community on component initialization.
   */
  ngOnInit() {
    this.userResource.subscribe(users => {
      this.users = users;
      this.isLoading = false;
      sortAndLimit(this.users, sortUsers, 0, 'DESC');
    });
    if (this.community) {
      this.updateInvitedUsers();
    }
  }

  /**
   * Updates the list of invited users.
   */
  updateInvitedUsers() {
    this.userService.getInvitedUsers(this.community).subscribe(users => {
      this.invitedUsers = users;
    });
  }

}
