import {Component, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {CarService} from '../../../../services/crud/car.service';
import {CommunitiesWizardCarComponent} from './communities-wizard-car/communities-wizard-car.component';
import {mergeMap} from 'rxjs/operators';
import {CommunitiesWizardNameComponent} from './communities-wizard-name/communities-wizard-name.component';
import {CommunityService} from '../../../../services/crud/community.service';
import {CommunitiesWizardUsersComponent} from './communities-wizard-users/communities-wizard-users.component';
import {forkJoin, of} from 'rxjs';
import {ClrWizard} from '@clr/angular';
import {NotificationsService} from 'angular2-notifications';
import {Community} from '../../../../models/community';

/**
 * A community invitation.
 */
export interface CommunityInvitation {
  user: string;
  community: number;
}

@Component({
  selector: 'cbl-communities-wizard',
  templateUrl: './communities-wizard.component.html',
  styleUrls: ['./communities-wizard.component.scss']
})
export class CommunitiesWizardComponent {

  @ViewChild('car') carPage: CommunitiesWizardCarComponent;
  @ViewChild('name') namePage: CommunitiesWizardNameComponent;
  @ViewChild('users') usersPage: CommunitiesWizardUsersComponent;
  @ViewChild('wizard') wizard: ClrWizard;

  @Output('communityCreated') communityCreated: EventEmitter<Community>;

  public isOpen = false;
  public isLoading = false;

  constructor(private carService: CarService,
              private notificationsService: NotificationsService,
              private communityService: CommunityService) {
    this.communityCreated = new EventEmitter<Community>();
  }

  /**
   * Finishes the wizard and thereby resets it.
   */
  public closeAndReset() {
    this.isOpen = false;
    this.wizard.finish();
  }

  /**
   * Opens the wizard.
   */
  public open() {
    this.isOpen = true;
  }

  /**
   * Saves the community on the server in the following steps:
   * 1. Save car
   * 2. Save community
   * 3. Invite users
   */
  public save() {
    this.isLoading = true;
    const carRequest = this.carService.createCar(this.carPage.getCar());
    const communityRequest = carRequest.pipe(mergeMap(car => {
      const community = this.namePage.getCommunity();
      community.car = car;
      return this.communityService.createCommunity(community);
    }));
    let newCommunity: Community;
    const invitationRequestCollection = communityRequest.pipe(mergeMap(community => {
      newCommunity = community;
      const invitationRequests = [of(null)]; // Add one dummy request so we don't get stuck here if there are no invitations
      this.usersPage.getUsernames().map(username => {
        invitationRequests.push(this.communityService.inviteUser({
          user: username,
          community: community.id
        }));
      });
      return forkJoin(invitationRequests);
    }));
    invitationRequestCollection.subscribe(() => {
      this.isLoading = false;
      this.communityCreated.emit(newCommunity);
      this.notificationsService.success('Gruppe erstellt', 'Deine Gruppe wurde erfolgreich erstellt!');
      this.closeAndReset();
    });
  }

}
