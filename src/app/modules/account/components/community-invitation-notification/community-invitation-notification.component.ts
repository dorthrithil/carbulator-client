import {Component, Input, OnInit} from '@angular/core';
import {Notification} from '../../../../models/notification';
import {CommunityService} from '../../../../services/crud/community.service';
import {CblNotificationsService} from '../../../../services/core/cbl-notifications.service';

@Component({
  selector: 'cbl-community-invitation-notification',
  templateUrl: './community-invitation-notification.component.html',
  styleUrls: ['./community-invitation-notification.component.scss']
})
export class CommunityInvitationNotificationComponent {

  @Input() invitation: Notification;

  public acceptLoading = false;
  public rejectLoading = false;

  constructor(private communityService: CommunityService,
              private notifications: CblNotificationsService) {
  }

  /**
   * Accept the community invitation.
   */
  accept() {
    this.acceptLoading = true;
    this.communityService.acceptCommunityInvitation(this.invitation.subject).subscribe(() => {
      this.acceptLoading = false;
      this.notifications.success('Einladung angenommen', `Du bist jetzt Teil der Gruppe ${this.invitation.subject.name}.`);
      this.invitation.isOpen = false;
    });
  }

  /**
   * Reject the community invitation.
   */
  reject() {
    this.rejectLoading = true;
    this.communityService.declineCommunityInvitation(this.invitation.subject).subscribe(() => {
      this.rejectLoading = false;
      this.notifications.success('Einladung abgelehnt',
        `Du hast die Einladung zur Gruppe ${this.invitation.subject.name} abgelehnt.`);
      this.invitation.isOpen = false;
    });
  }

}
