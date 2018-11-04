import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {PayoffDetailComponent} from '../finances/components/payoff-detail/payoff-detail.component';
import {NotificationsListComponent} from './components/notifications-list/notifications-list.component';

const accountRoutes: Routes = [
  {
    path: 'notifications',
    component: NotificationsListComponent,
  },
  {
    path: '**',
    redirectTo: '/404'
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
