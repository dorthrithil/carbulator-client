import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {IsLoggedInGuard} from '../../guards/is-logged-in.guard';
import {IsLoggedOutGuard} from '../../guards/is-logged-out.guard';
import {LoginComponent} from './components/login/login.component';
import {DashboardModule} from '../dashboard/dashboard.module';
import {NotFoundComponent} from './components/not-found/not-found.component';
import {RegisterComponent} from './components/register/register.component';
import {CommunitiesModule} from '../communities/communities.module';
import {UnauthorizedComponent} from './components/unauthorized/unauthorized.component';
import {FinancesModule} from '../finances/finances.module';
import {ImprintComponent} from './components/imprint/imprint.component';
import {DataPrivacyStatementComponent} from './components/data-privacy-statement/data-privacy-statement.component';
import {AboutComponent} from './components/about/about.component';

const coreRoutes: Routes = [
  {
    path: 'dashboard',
    loadChildren: '../dashboard/dashboard.module#DashboardModule',
    canActivate: [IsLoggedInGuard]
  },
  {
    path: 'finances',
    loadChildren: '../finances/finances.module#FinancesModule',
    canActivate: [IsLoggedInGuard]
  },
  {
    path: 'communities',
    loadChildren: '../communities/communities.module#CommunitiesModule',
    canActivate: [IsLoggedInGuard]
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [IsLoggedOutGuard]
  },
  {
    path: 'register',
    component: RegisterComponent,
    canActivate: [IsLoggedOutGuard]
  },
  {
    path: 'imprint',
    component: ImprintComponent,
    canActivate: [IsLoggedInGuard]
  },
  {
    path: 'data-privacy-statement',
    component: DataPrivacyStatementComponent,
    canActivate: [IsLoggedInGuard]
  },
  {
    path: 'about',
    component: AboutComponent,
    canActivate: [IsLoggedInGuard]
  },
  {
    path: '404',
    component: NotFoundComponent,
    canActivate: [IsLoggedInGuard]
  },
  {
    path: '401',
    component: UnauthorizedComponent,
    canActivate: [IsLoggedInGuard]
  },
  {
    path: '',
    redirectTo: '/dashboard',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: '/404'
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(coreRoutes)
  ],
  providers: [
    IsLoggedInGuard,
    IsLoggedOutGuard
  ],
  exports: [
    RouterModule
  ]
})
export class CoreRoutingModule {
}
