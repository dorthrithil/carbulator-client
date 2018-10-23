import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Community} from '../../../../models/community';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {startKmValidator} from '../../../../utility/validators/start-km.validator';
import {TourService} from '../../../../services/crud/tour.service';
import {Tour} from '../../../../models/tour';
import {NotificationsService} from 'angular2-notifications';
import {numberValidator} from '../../../../utility/validators/number.validator';

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

  constructor(private fb: FormBuilder,
              private notifications: NotificationsService,
              private tourService: TourService) {
  }


  /**
   * Builds the start tour form.
   */
  private buildForm() {
    this.startTourForm = this.fb.group({
      startKm: [String(this.lastEndKm), [Validators.required, numberValidator(), startKmValidator(this.lastEndKm)]]
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
  }

  /**
   * Persists the new tour on the server and closes the modal.
   */
  public addTour() {
    if (this.startTourForm.valid) {
      this.isLoading = true;
      const newTour = new Tour();
      newTour.startKm = this.startTourForm.get('startKm').value.replace(',', '.');
      this.tourService.createTour(this.communityId, newTour).subscribe(tour => {
        this.tourStarted.emit(tour);
        this.close();
        this.notifications.success('Fahrt gestartet', 'Deine Fahrt wurde als gestartet eingetragen.');
      }, () => {
        this.isOpen = false;
        this.close();
      });
    }
  }

}
