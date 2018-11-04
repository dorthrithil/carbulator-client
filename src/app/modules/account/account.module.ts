import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {CommunityInvitationNotificationComponent} from './components/community-invitation-notification/community-invitation-notification.component';
import {AccountRoutingModule} from './account-routing.module';
import { NotificationsListComponent } from './components/notifications-list/notifications-list.component';
import {ClarityModule} from '@clr/angular';
import {SharedModule} from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    AccountRoutingModule,
    ClarityModule,
    SharedModule
  ],
  declarations: [
    CommunityInvitationNotificationComponent,
    NotificationsListComponent
  ]
})
export class AccountModule { }
