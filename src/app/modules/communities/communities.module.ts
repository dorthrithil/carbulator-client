import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CommunitiesListComponent} from './components/communities-list/communities-list.component';
import {CommunitiesRoutingModule} from './communities-routing.module';
import {ClarityModule} from '@clr/angular';
import {SharedModule} from '../shared/shared.module';
import {CommunitiesWizardComponent} from './components/communities-wizard/communities-wizard.component';
import {CommunitiesWizardNameComponent} from './components/communities-wizard/communities-wizard-name/communities-wizard-name.component';
import {CommunitiesWizardCarComponent} from './components/communities-wizard/communities-wizard-car/communities-wizard-car.component';
import {CommunitiesRenameModalComponent} from './components/communities-rename-modal/communities-rename-modal.component';
import {CommunitiesDetailComponent} from './components/communities-detail/communities-detail.component';
import {CommunityMemberCardComponent} from './components/community-member-card/community-member-card.component';
import {CommunityInfoCardComponent} from './components/community-info-card/community-info-card.component';
import {CommunitiesDeleteModalComponent} from './components/communities-delete-modal/communities-delete-modal.component';
import {CommunitiesInviteUserModalComponent} from './components/communities-invite-user-modal/communities-invite-user-modal.component';
import {CommunitiesUserSearchComponent} from './components/communities-user-search/communities-user-search.component';
import {CommunityTourCardComponent} from './components/community-tour-card/community-tour-card.component';
import {CommunityRefuelCardComponent} from './components/community-refuel-card/community-refuel-card.component';
import {CommunityPayoffCardComponent} from './components/community-payoff-card/community-payoff-card.component';
import {CommunitiesComponent} from './components/communities/communities.component';
import {CommunitiesDetailTabviewComponent} from './components/communities-detail-tabview/communities-detail-tabview.component';
import {CommunityAlertsComponent} from './components/community-alerts/community-alerts.component';

@NgModule({
  imports: [
    CommonModule,
    CommunitiesRoutingModule,
    ClarityModule,
    SharedModule
  ],
  declarations: [
    CommunitiesListComponent,
    CommunitiesWizardComponent,
    CommunitiesWizardNameComponent,
    CommunitiesWizardCarComponent,
    CommunitiesUserSearchComponent,
    CommunitiesRenameModalComponent,
    CommunitiesDetailComponent,
    CommunityMemberCardComponent,
    CommunityInfoCardComponent,
    CommunitiesDeleteModalComponent,
    CommunitiesInviteUserModalComponent,
    CommunityTourCardComponent,
    CommunityRefuelCardComponent,
    CommunityPayoffCardComponent,
    CommunitiesComponent,
    CommunitiesDetailTabviewComponent,
    CommunityAlertsComponent,
  ]
})
export class CommunitiesModule {
}
