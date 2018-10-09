import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {Community} from '../../../../models/community';
import {mergeMap} from 'rxjs/operators';
import {forkJoin, of} from 'rxjs';
import {CommunitiesUserSearchComponent} from '../communities-user-search/communities-user-search.component';
import {CommunityService} from '../../../../services/crud/community.service';
import {NotificationsService} from 'angular2-notifications';

/**
 * A modal for inviting users to a community.
 */
@Component({
  selector: 'cbl-communities-invite-user-modal',
  templateUrl: './communities-invite-user-modal.component.html',
  styleUrls: ['./communities-invite-user-modal.component.scss']
})
export class CommunitiesInviteUserModalComponent {

  /**
   * The community to which to invite the new members.
   */
  @Input() community: Community;

  @ViewChild('userSearch') userSearch: CommunitiesUserSearchComponent;

  public isOpen = false;
  public isLoading = false;

  constructor(private communityService: CommunityService,
              private notifications: NotificationsService) {
  }

  /**
   * Opens the modal.
   */
  open() {
    this.isOpen = true;
  }

  /**
   * Closes the modal.
   */
  close() {
    this.isOpen = false;
    this.userSearch.reset();
  }

  /**
   * Invites all selected users to the community.
   */
  invite() {
    this.isLoading = true;
    const invitationRequests = [];
    this.userSearch.getUsernames().map(username => {
      invitationRequests.push(this.communityService.inviteUser({
        user: username,
        community: this.community.id
      }));
    });
    if (invitationRequests.length > 0) {
      forkJoin(invitationRequests).subscribe(() => {
        this.isLoading = false;
        this.notifications.success('User eingeladen', 'Die ausgewählten User wurden erfolgreich eingeladen!');
        this.close();
      });
    } else {
      this.notifications.error('Keine User ausgewählt', 'Du hast keine User zum Einladen ausgewählt!');
      this.isLoading = false;
    }
  }

}
