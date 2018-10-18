import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {PayoffDetailComponent} from './components/payoff-detail/payoff-detail.component';


const financesRoutes: Routes = [
  {
    path: 'payoffs/:id',
    component: PayoffDetailComponent,
  },
  {
    path: '**',
    redirectTo: '/404'
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(financesRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class FinancesRoutingModule {
}
