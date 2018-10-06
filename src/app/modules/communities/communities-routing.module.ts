import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {DashboardComponent} from '../dashboard/components/dashboard/dashboard.component';
import {CommunitiesListComponent} from './components/communities-list/communities-list.component';

const communitiesRoutes: Routes = [
  {
    path: '',
    component: CommunitiesListComponent,
  },
  {
    path: '**',
    redirectTo: '/404'
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(communitiesRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class CommunitiesRoutingModule { }
