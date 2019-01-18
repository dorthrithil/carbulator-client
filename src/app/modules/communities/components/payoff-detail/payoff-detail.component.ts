import {Component, OnInit} from '@angular/core';
import {PayoffService} from '../../../../services/crud/payoff.service';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {knownErrors} from '../../../../utility/errors/known-errors';
import {Payoff} from '../../../../models/payoff';

/**
 * A component that shows a payoff in cards.
 */
@Component({
  selector: 'cbl-payoff-detail',
  templateUrl: './payoff-detail.component.html',
  styleUrls: ['./payoff-detail.component.scss']
})
export class PayoffDetailComponent implements OnInit {

  public payoff: Payoff;
  public loadingPayoff = true;

  constructor(private payoffService: PayoffService,
              private router: Router,
              private route: ActivatedRoute) {
  }

  /**
   * Loads the payoff for the component.
   */
  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      const id = params['id'];
      if (Number(id)) {
        this.payoffService.getPayoff(id).subscribe(payoff => {
          this.payoff = payoff;
          this.loadingPayoff = false;
        }, err => {
          if (err === knownErrors.UNAUTHORIZED.message) {
            this.router.navigate(['/401']);
          }
        });
      } else {
        this.router.navigate(['/404']);
      }
    });
  }

}
