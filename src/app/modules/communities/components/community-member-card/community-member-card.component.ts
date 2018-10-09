import {Component, Input, OnInit} from '@angular/core';
import {User} from '../../../../models/user';
import {Community} from '../../../../models/community';

/**
 * A card that shows all users of the community.
 */
@Component({
  selector: 'cbl-community-member-card',
  templateUrl: './community-member-card.component.html',
  styleUrls: ['./community-member-card.component.scss']
})
export class CommunityMemberCardComponent {

  @Input() community: Community;

}
