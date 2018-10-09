import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {CommunitiesListComponent} from './components/communities-list/communities-list.component';
import {CommunitiesDetailComponent} from './components/communities-detail/communities-detail.component';

const communitiesRoutes: Routes = [
  {
    path: '',
    component: CommunitiesListComponent,
  },
  {
    path: ':id',
    component: CommunitiesDetailComponent,
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
