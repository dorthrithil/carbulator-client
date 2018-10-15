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

  constructor(private communityService: CommunityService) {
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
   * Removes the deleted community from the list.
   * @param community Community that should get removed.
   */
  public onCommunityDeleted(community: Community) {
    this.communities.splice(this.communities.indexOf(community), 1);
  }

}