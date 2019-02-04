import {Component, EventEmitter, Input, Output, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {TourService} from '../../../../services/crud/tour.service';
import {Tour} from '../../../../models/tour';
import {numberValidator} from '../../../../utility/validators/number.validator';
import {toNumber} from '../../../../utility/conversion/to-number';
import {CblNotificationsService} from '../../../../services/core/cbl-notifications.service';
import {NavNotificationsService} from '../../../../services/core/nav-notifications.service';
import {User} from '../../../../models/user';
import {ClrForm} from '@clr/angular';
import {AppEventsService} from '../../../../services/core/app-events.service';

/**
 * A modal for starting a tour.
 */
@Component({
  selector: 'cbl-start-tour-modal',
  templateUrl: './start-tour-modal.component.html',
  styleUrls: ['./start-tour-modal.component.scss']
})
export class StartTourModalComponent {

  /**
   * Reference to the clarity form instance.t
   */
  @ViewChild(ClrForm) clrForm;

  /**
   * The id of the community in which to create a tour.
   */
  @Input() communityId: number;

  /**
   * Emits the created tour.
   */
  @Output() tourStarted: EventEmitter<Tour> = new EventEmitter();

  public startTourForm: FormGroup;
  public isOpen = false;
  public isLoading = false;
  public lastEndKm: number;
  public lastTourLoading = true;
  public startKmInconsistent = false;
  public startKmInconsistencyChecked = false;
  public passengers: User[] = [];

  constructor(private fb: FormBuilder,
              private appEvents: AppEventsService,
              private notifications: CblNotificationsService,
              private navNotifications: NavNotificationsService,
              private tourService: TourService) {
  }

  /**
   * Builds the start tour form.
   */
  private buildForm() {
    this.startTourForm = this.fb.group({
      startKm: [String(this.lastEndKm), [Validators.required, numberValidator()]]
    });
  }

  /**
   * Opens the modal.
   */
  public open() {
    this.isOpen = true;
    this.tourService.getLatestCommunityTour(this.communityId).subscribe(latestTour => {
      this.lastEndKm = latestTour.endKm;
      this.lastTourLoading = false;
      this.buildForm();
    }, err => {
      if (err === 'NO_TOUR_EXISTING') {
        this.lastEndKm = 0;
        this.lastTourLoading = false;
        this.buildForm();
      }
    });
  }

  /**
   * Closes the modal.
   */
  public close() {
    this.isOpen = false;
    this.lastTourLoading = true;
    this.passengers = [];
    this.startKmInconsistencyChecked = false;
    this.startKmInconsistent = false;
  }

  /**
   * Checks the consistency of the start km field. It is assumed to be consistent if it is exactly the same as the last end km.
   * If no inconsistency is found, the next step (sending the form) is performed automatically. Else a warning is shown and the
   * user must confirm the inconsistency.
   */
  public checkStartKmConsistency() {
    this.startKmInconsistent = toNumber(this.startTourForm.get('startKm').value) !== toNumber(this.lastEndKm);
    this.startKmInconsistencyChecked = true;
    if (!this.startKmInconsistent) {
      this.addTour();
    }
  }

  /**
   * Persists the new tour on the server and closes the modal.
   */
  public addTour() {
    if (this.startTourForm.valid) {
      this.isLoading = true;
      const newTour = new Tour();
      newTour.startKm = toNumber(this.startTourForm.get('startKm').value);
      newTour.passengers = this.passengers;
      this.tourService.createTour(this.communityId, newTour).subscribe(tour => {
        this.tourStarted.emit(tour);
        this.appEvents.dispatchTourStartedEvent(tour);
        this.close();
        this.notifications.success('Fahrt gestartet', 'Deine Fahrt wurde als gestartet eingetragen.');
        this.navNotifications.loadNotifications();
        this.isLoading = false;
      }, () => {
        this.isOpen = false;
        this.isLoading = false;
        this.close();
      });
    } else {
      this.clrForm.markAsDirty();
    }
  }

}
