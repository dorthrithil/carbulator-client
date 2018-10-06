import {Component, OnInit} from '@angular/core';
import {UserService} from '../../../../../services/crud/user.service';
import {Observable} from 'rxjs';
import {User} from '../../../../../models/user';

@Component({
  selector: 'cbl-communities-wizard-users',
  templateUrl: './communities-wizard-users.component.html',
  styleUrls: ['./communities-wizard-users.component.scss']
})
export class CommunitiesWizardUsersComponent implements OnInit {

  public userResource: Observable<User[]>;
  public selectedUsers: User[] = [];

  constructor(private userService: UserService) {
  }

  /**
   * Sets the initial user resource to an empty search.
   */
  ngOnInit() {
    this.refreshUserResource('');
  }

  /**
   * Refreshes the user resource observable that feeds the typeahead.
   * @param query Query string for the typeahead
   */
  private refreshUserResource(query: string) {
    this.userResource = this.userService.searchUsers(query);
  }

  /**
   * Removes the given user from the list of selected users.
   * @param user User to remove.
   */
  public removeUser(user: User) {
    this.selectedUsers.splice(this.selectedUsers.indexOf(user), 1);
  }

  /**
   * Returns all usernames of the selected users.
   * @return Array of usernames.
   */
  public getUsernames(): string[] {
    return this.selectedUsers.map(user => user.username);
  }

}
