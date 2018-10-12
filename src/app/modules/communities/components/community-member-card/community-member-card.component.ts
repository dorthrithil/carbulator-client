import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {Community} from '../../../../models/community';
import {UserService} from '../../../../services/crud/user.service';
import {User} from '../../../../models/user';

/**
 * A card that shows all users of the community.
 */
@Component({
  selector: 'cbl-community-member-card',
  templateUrl: './community-member-card.component.html',
  styleUrls: ['./community-member-card.component.scss']
})
export class CommunityMemberCardComponent implements OnChanges {

  /**
   * The community to show the members for.
   */
  @Input() community: Community;

  public invitedUsers: User[] = [];

  constructor(private userService: UserService) {
  }

  /**
   * Updates the list of invited users if there is a new valid community.
   * @param changes Simple changes of the comopent.
   */
  ngOnChanges(changes: SimpleChanges) {
    if (changes['community']) {
      if (typeof this.community !== 'undefined') {
        this.updateInvitedUsers();
      }
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
