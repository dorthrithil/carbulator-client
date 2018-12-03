import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {Community} from '../../../../models/community';
import {CommunityService} from '../../../../services/crud/community.service';
import {knownErrors} from '../../../../utility/errors/known-errors';
import {TourService} from '../../../../services/crud/tour.service';
import {Tour} from '../../../../models/tour';
import {AuthService} from '../../../../services/core/auth.service';
import {User} from '../../../../models/user';
import {CblNotificationsService} from '../../../../services/core/cbl-notifications.service';
import {Observable} from 'rxjs';
import {MessageResponse} from '../../../../services/crud/auth-crud.service';
import {NavNotificationsService} from '../../../../services/core/nav-notifications.service';

/**
 * A component that shows community details in cards.
 */
@Component({
  selector: 'cbl-communities-detail',
  templateUrl: './communities-detail.component.html',
  styleUrls: ['./communities-detail.component.scss']
})
export class CommunitiesDetailComponent implements OnInit {

  public community: Community;
  public communityId: number;
  public loadingCommunity = true;
  public runningTour: Tour;
  public cancelTourModalOpen = false;
  public deleteTourRequest: Observable<MessageResponse>;

  constructor(private route: ActivatedRoute,
              private auth: AuthService,
              private router: Router,
              private tourService: TourService,
              private notifications: CblNotificationsService,
              private navNotifications: NavNotificationsService,
              private communityService: CommunityService) {
  }

  /**
   * Loads the requested community. If it doesn't exist, a redirect to 404 happens. If you are not a member of the community, a redirect
   * to 401 happens.
   */
  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      const id = params['id'];
      if (Number(id)) {
        this.communityId = id;
        this.communityService.getCommunity(id).subscribe(community => {
          this.community = community;
          this.loadingCommunity = false;
        }, err => {
          if (err === knownErrors.UNAUTHORIZED.message) {
            this.router.navigate(['/401']);
          }
        });
        this.tourService.getRunningCommunityTours(this.communityId).subscribe(runningTours => {
          this.runningTour = runningTours[0];
          if (this.runningTour) {
            this.deleteTourRequest = this.tourService.deleteTour(this.runningTour);
          }
        });
      } else {
        this.router.navigate(['/404']);
      }
    });
  }

  /**
   * Returns true if the given user is the logged in user.
   * @param user User to check the identity for.
   * @return True if the given user is the logged in user.
   */
  public isLoggedInUser(user: User): boolean {
    return this.auth.isLoggedInUser(user);
  }

  /**
   * Removes the running tour.
   */
  public clearRunningTour() {
    this.runningTour = null;
  }

  /**
   * Adds the given tour as a running tour.
   * @param tour Tour to set as running tour.
   */
  public addRunningTour(tour: Tour) {
    if (tour.endKm === null || typeof tour.endKm === 'undefined') {
      this.runningTour = tour;
      this.deleteTourRequest = this.tourService.deleteTour(this.runningTour);
    }
  }

  /**
   * Opebs the cancel tour modal.
   */
  public openCancelTourModal() {
    this.cancelTourModalOpen = true;
  }

  /**
   * Removes the current running tour.
   */
  public onRunningTourCanceled() {
    this.runningTour = null;
    this.navNotifications.loadNotifications();
  }

}
