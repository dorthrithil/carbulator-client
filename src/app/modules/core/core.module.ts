import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {ClarityModule} from '@clr/angular';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NavigationComponent} from './components/navigation/navigation.component';
import {DashboardComponent} from '../dashboard/components/dashboard/dashboard.component';
import {LoginComponent} from './components/login/login.component';
import {CoreComponent} from './components/core/core.component';
import {NotFoundComponent} from './components/not-found/not-found.component';
import {CoreRoutingModule} from './core-routing.module';
import { DynamicContentAreaDirective } from '../../directives/dynamic-content-area.directive';

@NgModule({
  declarations: [
    CoreComponent,
    NavigationComponent,
    LoginComponent,
    NotFoundComponent,
    DynamicContentAreaDirective
  ],
  imports: [
    BrowserModule,
    ClarityModule,
    BrowserAnimationsModule,
    CoreRoutingModule
  ],
  providers: [],
  bootstrap: [
    CoreComponent
  ]
})
export class CoreModule {
}
