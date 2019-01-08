import {Component, Input, OnInit} from '@angular/core';
import {UserService} from '../../../../services/crud/user.service';
import {Observable} from 'rxjs';
import {User} from '../../../../models/user';
import {Community} from '../../../../models/community';

@Component({
  selector: 'cbl-communities-user-search',
  templateUrl: './communities-user-search.component.html',
  styleUrls: ['./communities-user-search.component.scss']
})
export class CommunitiesUserSearchComponent implements OnInit {

  /**
   * Invited users from this community will be excluded.
   */
  @Input() excludeAlreadyInvitedUsers: Community = null;

  public userResource: Observable<User[]>;
  public selectedUsers: User[] = [];

  constructor(private userService: UserService) {
  }

  /**
   * Sets the initial user resource to an empty search.
   */
  ngOnInit() {
    this.reset();
  }

  /**
   * Refreshes the user resource observable that feeds the typeahead.
   * @param query Query string for the typeahead
   */
  public refreshUserResource(query: string) {
    if (this.excludeAlreadyInvitedUsers !== null) {
      this.userResource = this.userService.searchUninvitedUsers(query, this.excludeAlreadyInvitedUsers);
    } else {
      this.userResource = this.userService.searchUsers(query);
    }
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

  /**
   * Resets the component.
   */
  public reset() {
    this.selectedUsers = [];
    this.refreshUserResource('');
  }

}
