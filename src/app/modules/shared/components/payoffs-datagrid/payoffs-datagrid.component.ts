import {Component, Input, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {sortAndLimit} from '../../../../utility/sorting/sort-and-limit';
import {Payoff} from '../../../../models/payoff';
import {sortPayoffs} from '../../../../utility/sorting/sort-payoffs';
import {PayoffService} from '../../../../services/crud/payoff.service';
import {CblNotificationsService} from '../../../../services/core/cbl-notifications.service';
import {Router} from '@angular/router';

/**
 * A component that shows a datagrid of payoffs.
 */
@Component({
  selector: 'cbl-payoffs-datagrid',
  templateUrl: './payoffs-datagrid.component.html',
  styleUrls: ['./payoffs-datagrid.component.scss']
})
export class PayoffsDatagridComponent implements OnInit {

  /**
   * Observable that resolves to an array of payoffs.
   */
  @Input() payoffResource: Observable<Payoff[]>;

  /**
   * ID of a community. If this field is provided, there will be the possibility to add payoffs via the datagrid action bar.
   */
  @Input() communityId: number;

  public payoffs: Payoff[];
  public confirmPayoffModalOpen = false;
  public createPayoffRequest: Observable<Payoff>;

  constructor(private payoffService: PayoffService,
              private notifications: CblNotificationsService,
              private router: Router) {
  }

  /**
   * Loads all payoffs for the community on component initialization.
   */
  ngOnInit() {
    this.payoffResource.subscribe(payoffs => {
      this.payoffs = payoffs;
      sortAndLimit(this.payoffs, sortPayoffs, 0, 'DESC');
    });
  }

  /**
   * Opens the confirmation modal for creating a payoff.
   */
  public createPayoff() {
    this.createPayoffRequest = this.payoffService.createPayoff(this.communityId);
    this.confirmPayoffModalOpen = true;
  }

  /**
   * Processes a successfully creates payoff.
   * @param payoff Created payoff.
   */
  public onPayoffConfirm(payoff) {
    this.notifications.success('Abrechnung fertig', 'Alle offenen Fahrten und Tankfüllungen wurden verrechnet.');
    this.router.navigate(['finances', 'payoffs', payoff.id]);
  }


}
