import {Component, EventEmitter, Output, ViewChild} from '@angular/core';
import {CarService} from '../../../../services/crud/car.service';
import {CommunitiesWizardCarComponent} from './communities-wizard-car/communities-wizard-car.component';
import {mergeMap} from 'rxjs/operators';
import {CommunitiesWizardNameComponent} from './communities-wizard-name/communities-wizard-name.component';
import {CommunityService} from '../../../../services/crud/community.service';
import {forkJoin, of} from 'rxjs';
import {ClrWizard, ClrWizardPage} from '@clr/angular';
import {Community} from '../../../../models/community';
import {CommunitiesUserSearchComponent} from '../communities-user-search/communities-user-search.component';
import {CblNotificationsService} from '../../../../services/core/cbl-notifications.service';

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

  @ViewChild('car') car: CommunitiesWizardCarComponent;
  @ViewChild('name') name: CommunitiesWizardNameComponent;
  @ViewChild('users') user: CommunitiesUserSearchComponent;
  @ViewChild('wizard') wizard: ClrWizard;
  @ViewChild('namePage') namePage: ClrWizardPage;
  @ViewChild('carPage') carPage: ClrWizardPage;

  @Output('communityCreated') communityCreated: EventEmitter<Community>;

  public isOpen = false;
  public isLoading = false;

  constructor(private carService: CarService,
              private notificationsService: CblNotificationsService,
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
    const carRequest = this.carService.createCar(this.car.getCar());
    const communityRequest = carRequest.pipe(mergeMap(car => {
      const community = this.name.getCommunity();
      community.car = car;
      return this.communityService.createCommunity(community);
    }));
    let newCommunity: Community;
    const invitationRequestCollection = communityRequest.pipe(mergeMap(community => {
      newCommunity = community;
      const invitationRequests = [of(null)]; // Add one dummy request so we don't get stuck here if there are no invitations
      this.user.getUsernames().map(username => {
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

  /**
   * Tries to enter the next page. This will succeed if the current form is valid. Else the form will be marked as dirty.
   */
  public tryNextPage() {
    if (this.namePage === this.wizard.currentPage) {
      this.name.clrForm.markAsDirty();
      if (this.name.isValid) {
        this.wizard.next();
      }
    } else if (this.carPage === this.wizard.currentPage) {
      this.car.clrForm.markAsDirty();
      if (this.car.isValid) {
        this.wizard.next();
      }
    }
  }

}
