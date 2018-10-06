import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommunitiesListComponent } from './components/communities-list/communities-list.component';
import {CommunitiesRoutingModule} from './communities-routing.module';
import {ClarityModule} from '@clr/angular';
import {SharedModule} from '../shared/shared.module';
import { CommunitiesWizardComponent } from './components/communities-wizard/communities-wizard.component';
import { CommunitiesWizardNameComponent } from './components/communities-wizard/communities-wizard-name/communities-wizard-name.component';
import { CommunitiesWizardCarComponent } from './components/communities-wizard/communities-wizard-car/communities-wizard-car.component';
import { CommunitiesWizardUsersComponent } from './components/communities-wizard/communities-wizard-users/communities-wizard-users.component';

@NgModule({
  imports: [
    CommonModule,
    CommunitiesRoutingModule,
    ClarityModule,
    SharedModule
  ],
  declarations: [CommunitiesListComponent, CommunitiesWizardComponent, CommunitiesWizardNameComponent, CommunitiesWizardCarComponent, CommunitiesWizardUsersComponent]
})
export class CommunitiesModule { }
