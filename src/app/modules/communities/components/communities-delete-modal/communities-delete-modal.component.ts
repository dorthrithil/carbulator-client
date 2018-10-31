import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Community} from '../../../../models/community';
import {tap} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {MessageResponse} from '../../../../services/crud/auth-crud.service';
import {CommunityService} from '../../../../services/crud/community.service';
import {NotificationsService} from 'angular2-notifications';
import {CblNotificationsService} from '../../../../services/core/cbl-notifications.service';

/**
 * A component that shows a modal for confirming deletion of a community.
 */
@Component({
  selector: 'cbl-communities-delete-modal',
  templateUrl: './communities-delete-modal.component.html',
  styleUrls: ['./communities-delete-modal.component.scss']
})
export class CommunitiesDeleteModalComponent {

  /**
   * Emits the community after it has been successfully deleted.
   */
  @Output('deleted') deleted: EventEmitter<Community> = new EventEmitter();

  public confirmDeletionModalOpen = false;
  public deleteCommunityRequest: Observable<MessageResponse> = null;

  constructor(private communityService: CommunityService,
              private notifications: CblNotificationsService) {
  }

  /**
   * Opens the modal for confirming the community deletion.
   * @param community Community that should get deleted.
   */
  public deleteCommunity(community: Community) {
    this.confirmDeletionModalOpen = true;
    this.deleteCommunityRequest = this.communityService.deleteCommunity(community).pipe(tap(() => {
      this.notifications.success('Gruppe gelöscht', 'Die Gruppe wurde erfolgreich gelöscht.');
      this.deleted.emit(community);
    }));
  }

}
