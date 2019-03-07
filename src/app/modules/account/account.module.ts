import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CommunityInvitationNotificationComponent} from './components/community-invitation-notification/community-invitation-notification.component';
import {AccountRoutingModule} from './account-routing.module';
import {NotificationsListComponent} from './components/notifications-list/notifications-list.component';
import {ClarityModule} from '@clr/angular';
import {SharedModule} from '../shared/shared.module';
import {AccountComponent} from './components/account/account.component';
import {ChangePasswordComponent} from './components/change-password/change-password.component';
import {RunningTourNotificationComponent} from './components/running-tour-notification/running-tour-notification.component';
import {TaskInstanceNotificationComponent} from './components/task-instance-notification/task-instance-notification.component';
import {AccountSettingsComponent} from './components/account-settings/account-settings.component';


@NgModule({
  imports: [
    CommonModule,
    AccountRoutingModule,
    ClarityModule,
    SharedModule
  ],
  declarations: [
    CommunityInvitationNotificationComponent,
    NotificationsListComponent,
    AccountComponent,
    ChangePasswordComponent,
    RunningTourNotificationComponent,
    TaskInstanceNotificationComponent,
    AccountSettingsComponent
  ]
})
export class AccountModule {
}
