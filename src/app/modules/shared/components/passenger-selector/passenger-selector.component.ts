import {Component, Input, OnInit} from '@angular/core';
import {User} from '../../../../models/user';
import {Observable} from 'rxjs';
import {AuthService} from '../../../../services/core/auth.service';
import {UserService} from '../../../../services/crud/user.service';
import {map} from 'rxjs/operators';

/**
 * A component that let's you select passengers from a typeahead.
 */
@Component({
  selector: 'cbl-passenger-selector',
  templateUrl: './passenger-selector.component.html',
  styleUrls: ['./passenger-selector.component.scss']
})
export class PassengerSelectorComponent implements OnInit {

  /**
   * Array of passengers to add new passengers to.
   */
  @Input() passengers: User[];
  /**
   * Community from which to load the passengers.
   */
  @Input() communityId: number;

  public passengerResource: Observable<User[]>;

  constructor(private authService: AuthService,
              private userService: UserService) {
  }

  /**
   * Initializes the passenger resource on component initialization.
   */
  ngOnInit() {
    this.passengerResource = this.userService.getCommunityUsers(this.communityId).pipe(
      map(passengers => passengers.filter(passenger => passenger.id !== this.authService.loggedInUser.id))
    );
  }

  /**
   * Removes the given passenger from the list of selected passengers.
   * @param passenger Passenger to remove.
   */
  public removePassenger(passenger: User) {
    this.passengers.splice(this.passengers.indexOf(passenger), 1);
  }

}
