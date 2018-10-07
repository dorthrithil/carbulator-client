import {Component, OnInit, ViewChild} from '@angular/core';
import {CommunityService} from '../../../../services/crud/community.service';
import {Community} from '../../../../models/community';
import {Observable} from 'rxjs';
import {MessageResponse} from '../../../../services/crud/auth-crud.service';
import {tap} from 'rxjs/operators';
import {NotificationsService} from 'angular2-notifications';
import {CommunitiesRenameModalComponent} from '../communities-rename-modal/communities-rename-modal.component';

@Component({
  selector: 'cbl-communities-list',
  templateUrl: './communities-list.component.html',
  styleUrls: ['./communities-list.component.scss']
})
export class CommunitiesListComponent implements OnInit {

  @ViewChild('renameModal') renameModal: CommunitiesRenameModalComponent;

  public communities: Community[] = [];
  public isLoading = true;
  public confirmDeletionModalOpen = false;
  public deleteCommunityRequest: Observable<MessageResponse> = null;

  constructor(private communityService: CommunityService,
              private notifications: NotificationsService) {
  }

  /**
   * Loads all communities for a user on component initialization.
   */
  ngOnInit() {
    this.communityService.getCommunities().subscribe(communities => {
      this.communities = communities;
      this.isLoading = false;
    });
  }

  /**
   * Adds a new community to the list.
   * @param community Community to add to the list.
   */
  public addNewCommunity(community: Community) {
    this.communities.push(community);
  }

  /**
   * Opens the modal for confirming the community deletion.
   * @param community Community that should get deleted.
   */
  public deleteCommunity(community: Community) {
    this.confirmDeletionModalOpen = true;
    this.deleteCommunityRequest = this.communityService.deleteCommunity(community).pipe(tap(() => {
      this.notifications.success('Gruppe gelöscht', 'Die Gruppe wurde erfolgreich gelöscht.');
      this.communities.splice(this.communities.indexOf(community), 1);
    }));
  }

  /**
   * Opens the community rename modal.
   * @param community Community that should get renamed.
   */
  renameCommunity(community: Community) {
    this.renameModal.open(community);
  }

}
