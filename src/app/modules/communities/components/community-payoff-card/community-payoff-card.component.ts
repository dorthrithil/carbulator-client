import {Component, Input, OnInit} from '@angular/core';
import {PayoffService} from '../../../../services/crud/payoff.service';
import {NotificationsService} from 'angular2-notifications';
import {Payoff} from '../../../../models/payoff';
import {sortAndLimit} from '../../../../utility/sorting/sort-and-limit';
import {sortPayoffs} from '../../../../utility/sorting/sort-payoffs';
import {Router} from '@angular/router';
import {CblNotificationsService} from '../../../../services/core/cbl-notifications.service';

/**
 * Component that shows a list of payoffs in a card.
 */
@Component({
  selector: 'cbl-community-payoff-card',
  templateUrl: './community-payoff-card.component.html',
  styleUrls: ['./community-payoff-card.component.scss']
})
export class CommunityPayoffCardComponent implements OnInit {

  /**
   * Id of the community to fetch the payoffs for.
   */
  @Input() communityId: number;

  public payoffs: Payoff[];

  constructor(private payoffService: PayoffService,
              private router: Router,
              private notifications: CblNotificationsService) {
  }

  /**
   * Loads all payoffs for the community on component initialization.
   */
  ngOnInit() {
    this.payoffService.getPayoffs(this.communityId).subscribe(payoffs => {
      this.payoffs = payoffs;
      sortAndLimit(this.payoffs, sortPayoffs, 5, 'DESC');
    });
  }

  /**
   * Adds a payoff to the list of payoffs.
   * @param payoff Payoff to add to the list.
   */
  public addPayoff(payoff: Payoff) {
    this.payoffs.unshift(payoff);
    sortAndLimit(this.payoffs, sortPayoffs, 5, 'DESC');
  }

  /**
   * Creates a new payoff on the server.
   */
  createPayoff() {
    this.payoffService.createPayoff(this.communityId).subscribe(payoff => {
      this.addPayoff(payoff);
      this.notifications.success('Abrechnung fertig', 'Alle offenen Fahrten und Tankfüllungen wurden verrechnet.');
      this.router.navigate(['finances', 'payoffs', payoff.id]);
    });
  }

}
