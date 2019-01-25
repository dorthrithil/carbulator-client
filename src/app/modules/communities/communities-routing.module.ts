import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {CommunitiesListComponent} from './components/communities-list/communities-list.component';
import {CommunitiesDetailComponent} from './components/communities-detail/communities-detail.component';
import {CommunitiesComponent} from './components/communities/communities.component';
import {CommunitiesDetailTabviewComponent} from './components/communities-detail-tabview/communities-detail-tabview.component';
import {PayoffDetailComponent} from './components/payoff-detail/payoff-detail.component';
import {CommunitiesDetailSubnavComponent} from './components/communities-detail-subnav/communities-detail-subnav.component';
import {CommunityCalendarComponent} from './components/community-calendar/community-calendar.component';
import {CommunitiesDetailWrapperComponent} from './components/communities-detail-wrapper/communities-detail-wrapper.component';

const communitiesRoutes: Routes = [
  {
    path: '',
    component: CommunitiesComponent,
    children: [
      {
        path: '',
        component: CommunitiesListComponent,
      },
      {
        path: ':id',
        component: CommunitiesDetailSubnavComponent,
        children: [
          {
            path: '',
            redirectTo: 'details'
          },
          {
            path: 'details',
            component: CommunitiesDetailWrapperComponent,
            children: [
              {
                path: '',
                component: CommunitiesDetailComponent
              },
              {
                path: 'tabview/:tabid',
                component: CommunitiesDetailTabviewComponent,
              },
              {
                path: 'payoffs/:payoffid',
                component: PayoffDetailComponent,
              },
            ]
          },
          {
            path: 'calendar',
            component: CommunityCalendarComponent
          }
        ]
      }
    ]
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
export class CommunitiesRoutingModule {
}
