import {BrowserModule} from '@angular/platform-browser';
import {LOCALE_ID, NgModule} from '@angular/core';

import {ClarityModule, ClrFormsNextModule} from '@clr/angular';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NavigationComponent} from './components/navigation/navigation.component';
import {LoginComponent} from './components/login/login.component';
import {CoreComponent} from './components/core/core.component';
import {NotFoundComponent} from './components/not-found/not-found.component';
import {CoreRoutingModule} from './core-routing.module';
import {DynamicContentAreaDirective} from '../../directives/dynamic-content-area.directive';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {JWTInterceptor} from '../../utility/http-interceptors/jwt.interceptor';
import {ContentTypeInterceptor} from '../../utility/http-interceptors/content-type.interceptor';
import {SimpleNotificationsModule} from 'angular2-notifications';
import {AppLevelAlertsComponent} from './components/app-level-alerts/app-level-alerts.component';
import {MomentPipe} from '../../pipes/moment.pipe';
import {MinutesRemainingPipe} from '../../pipes/minutes-remaining.pipe';
import {RegisterComponent} from './components/register/register.component';
import {ErrorHandlerInterceptor} from '../../utility/http-interceptors/error.interceptor';
import {SharedModule} from '../shared/shared.module';
import { UnauthorizedComponent } from './components/unauthorized/unauthorized.component';
import { ImprintComponent } from './components/imprint/imprint.component';
import { DataPrivacyStatementComponent } from './components/data-privacy-statement/data-privacy-statement.component';
import { AboutComponent } from './components/about/about.component';

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CoreRoutingModule,
    HttpClientModule,
    SimpleNotificationsModule.forRoot(),
    SharedModule
  ],
  declarations: [
    CoreComponent,
    NavigationComponent,
    LoginComponent,
    NotFoundComponent,
    DynamicContentAreaDirective,
    AppLevelAlertsComponent,
    MinutesRemainingPipe,
    RegisterComponent,
    UnauthorizedComponent,
    ImprintComponent,
    DataPrivacyStatementComponent,
    AboutComponent,
  ],
  providers: [
    {
      provide: LOCALE_ID,
      useValue: 'de'
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JWTInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ContentTypeInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorHandlerInterceptor,
      multi: true
    }
  ],
  bootstrap: [
    CoreComponent
  ]
})
export class CoreModule {
}
