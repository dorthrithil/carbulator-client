import {Component, OnInit} from '@angular/core';
import {CommunityService} from '../../../../services/crud/community.service';
import {Community} from '../../../../models/community';

@Component({
  selector: 'cbl-communities-list',
  templateUrl: './communities-list.component.html',
  styleUrls: ['./communities-list.component.scss']
})
export class CommunitiesListComponent implements OnInit {

  public communities: Community[] = [];
  public isLoading = true;

  constructor(private communityService: CommunityService) {
  }

  ngOnInit() {
    this.communityService.getCommunities().subscribe(communities => {
      this.communities = communities;
      this.isLoading = false;
    });
  }

}
