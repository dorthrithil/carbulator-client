import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {PayoffDetailComponent} from '../finances/components/payoff-detail/payoff-detail.component';
import {NotificationsListComponent} from './components/notifications-list/notifications-list.component';
import {ChangelogComponent} from '../changelog/changelog.component';
import {ChangelogEntryComponent} from '../changelog/changelog-entry/changelog-entry.component';
import {AccountComponent} from './components/account/account.component';
import {ChangePasswordComponent} from './components/change-password/change-password.component';

const accountRoutes: Routes = [
  {
    path: '',
    component: AccountComponent,
    children: [
      {
        path: 'notifications',
        component: NotificationsListComponent,
      },
      {
        path: 'change-password',
        component: ChangePasswordComponent,
      },
      {
        path: '**',
        redirectTo: '/404'
      }
    ]
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(accountRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class AccountRoutingModule { }
