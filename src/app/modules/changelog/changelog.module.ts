import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ChangelogComponent} from './changelog.component';
import {ChangelogRoutingModule} from './changelog-routing.module';
import {ChangelogEntryComponent} from './changelog-entry/changelog-entry.component';
import {SharedModule} from '../shared/shared.module';
import {ClarityModule} from '@clr/angular';

@NgModule({
  imports: [
    CommonModule,
    ChangelogRoutingModule,
    ClarityModule,
    SharedModule
  ],
  declarations: [
    ChangelogComponent,
    ChangelogEntryComponent,
  ],
})
export class ChangelogModule {
}
