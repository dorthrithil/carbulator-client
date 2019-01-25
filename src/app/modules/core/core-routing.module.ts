import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {IsLoggedInGuard} from '../../guards/is-logged-in.guard';
import {IsLoggedOutGuard} from '../../guards/is-logged-out.guard';
import {LoginComponent} from './components/login/login.component';
import {NotFoundComponent} from './components/not-found/not-found.component';
import {RegisterComponent} from './components/register/register.component';
import {UnauthorizedComponent} from './components/unauthorized/unauthorized.component';
import {ImprintComponent} from './components/imprint/imprint.component';
import {DataPrivacyStatementComponent} from './components/data-privacy-statement/data-privacy-statement.component';
import {AboutComponent} from './components/about/about.component';
import {ForgotPasswordComponent} from './components/forgot-password/forgot-password.component';
import {ResetPasswordComponent} from './components/reset-password/reset-password.component';

const coreRoutes: Routes = [
  {
    path: 'dashboard',
    loadChildren: '../dashboard/dashboard.module#DashboardModule',
    canActivate: [IsLoggedInGuard]
  },
  {
    path: 'account',
    loadChildren: '../account/account.module#AccountModule',
    canActivate: [IsLoggedInGuard]
  },
  {
    path: 'communities',
    loadChildren: '../communities/communities.module#CommunitiesModule',
    canActivate: [IsLoggedInGuard]
  },
  {
    path: 'changelog',
    loadChildren: '../changelog/changelog.module#ChangelogModule',
    canActivate: [IsLoggedInGuard]
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [IsLoggedOutGuard]
  },
  {
    path: 'forgot-password',
    component: ForgotPasswordComponent,
    canActivate: [IsLoggedOutGuard]
  },
  {
    path: 'reset-password/:hash',
    component: ResetPasswordComponent,
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
