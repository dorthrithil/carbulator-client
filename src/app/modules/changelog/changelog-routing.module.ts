import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {ChangelogComponent} from './changelog.component';
import {ChangelogEntryComponent} from './changelog-entry/changelog-entry.component';

const changelogRoutes: Routes = [
  {
    path: '',
    component: ChangelogComponent,
    children: [
      {
        path: '',
        component: ChangelogEntryComponent,
        pathMatch: 'full'
      },
      {
        path: ':versionNumber',
        component: ChangelogEntryComponent,
      },
      {
        path: '**',
        redirectTo: '/404'
      }
    ]
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(changelogRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class ChangelogRoutingModule {
}
