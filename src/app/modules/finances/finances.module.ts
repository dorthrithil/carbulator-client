import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PayoffDetailComponent } from './components/payoff-detail/payoff-detail.component';
import {FinancesRoutingModule} from './finances-routing.module';
import {SharedModule} from '../shared/shared.module';
import { PayoffDebtCardComponent } from './components/payoff-debt-card/payoff-debt-card.component';

@NgModule({
  imports: [
    CommonModule,
    FinancesRoutingModule,
    SharedModule
  ],
  declarations: [
    PayoffDetailComponent,
    PayoffDebtCardComponent
  ]
})
export class FinancesModule { }
