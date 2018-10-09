import {Component, Input, OnInit} from '@angular/core';
import {Community} from '../../../../models/community';
import {Router} from '@angular/router';

/**
 * A component that shows a card with community information.
 */
@Component({
  selector: 'cbl-community-info-card',
  templateUrl: './community-info-card.component.html',
  styleUrls: ['./community-info-card.component.scss']
})
export class CommunityInfoCardComponent {

  /**
   * The community to show the information for.
   */
  @Input() community: Community;

  constructor(private router: Router) {
  }

  /**
   * Navigates to the communities page.
   */
  navigateToCommunities() {
    this.router.navigate(['/communities']);
  }
}
