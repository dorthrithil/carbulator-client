import {Component, OnInit, ViewChild} from '@angular/core';
import {CommunityService} from '../../../../services/crud/community.service';
import {Community} from '../../../../models/community';
import {Observable} from 'rxjs';
import {MessageResponse} from '../../../../services/crud/auth-crud.service';
import {CommunitiesRenameModalComponent} from '../communities-rename-modal/communities-rename-modal.component';
import {MobileDetectionService} from '../../../../services/core/mobile-detection.service';
import {NotificationsService} from 'angular2-notifications';

/**
 * A datagrid showing all communities that a user is part of.
 */
@Component({
  selector: 'cbl-communities-list',
  templateUrl: './communities-list.component.html',
  styleUrls: ['./communities-list.component.scss']
})
export class CommunitiesListComponent implements OnInit {

  /**
   * Reference to the renaming modal.
   */
  @ViewChild('renameModal') renameModal: CommunitiesRenameModalComponent;

  public communities: Community[] = [];
  public isLoading = true;
  public confirmDeletionModalOpen = false;
  public deleteCommunityRequest: Observable<MessageResponse> = null;

  constructor(private communityService: CommunityService,
              private notifications: NotificationsService,
              public mobileDetection: MobileDetectionService) {
  }

  /**
   * Loads all communities for a user on component initialization.
   */
  ngOnInit() {
    this.loadCommunities();
  }

  /**
   * Loads the list of communities.
   */
  loadCommunities() {
    this.isLoading = true;
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

  /**
   * Marks the given community as favourite and then reloads the data.
   * @param community Community to mark as favourite.
   */
  public markAsFavourite(community: Community) {
    this.isLoading = true;
    this.communityService.markCommunityAsFavourite(community).subscribe(() => {
      this.notifications.success('Gruppe als Favorit markiert', 'Die Gruppe ist ab jetzt im Dashboard verfügbar.');
      this.loadCommunities();
    });
  }

}
