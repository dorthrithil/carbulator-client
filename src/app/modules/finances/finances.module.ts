import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PayoffDetailComponent } from './components/payoff-detail/payoff-detail.component';
import {FinancesRoutingModule} from './finances-routing.module';
import {SharedModule} from '../shared/shared.module';
import { PayoffDebtCardComponent } from './components/payoff-debt-card/payoff-debt-card.component';
import { PayoffTourCardComponent } from './components/payoff-tour-card/payoff-tour-card.component';
import { PayoffRefuelCardComponent } from './components/payoff-refuel-card/payoff-refuel-card.component';

@NgModule({
  imports: [
    CommonModule,
    FinancesRoutingModule,
    SharedModule
  ],
  declarations: [
    PayoffDetailComponent,
    PayoffDebtCardComponent,
    PayoffTourCardComponent,
    PayoffRefuelCardComponent
  ]
})
export class FinancesModule { }
