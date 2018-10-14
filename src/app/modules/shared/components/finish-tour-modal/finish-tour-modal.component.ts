import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Tour} from '../../../../models/tour';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {NotificationsService} from 'angular2-notifications';
import {TourService} from '../../../../services/crud/tour.service';
import {startKmValidator} from '../../../../utility/validators/start-km.validator';
import {latlongValidator} from '../../../../utility/validators/latlong.validator';

/**
 * A modal to finish a tour.
 */
@Component({
  selector: 'cbl-finish-tour-modal',
  templateUrl: './finish-tour-modal.component.html',
  styleUrls: ['./finish-tour-modal.component.scss']
})
export class FinishTourModalComponent {

  /**
   * Emits the finished tour.
   */
  @Output() tourFinished: EventEmitter<Tour> = new EventEmitter();

  public finishTourForm: FormGroup;
  public isOpen = false;
  public isLoading = false;
  public tour: Tour;
  public geoLocationLoading: boolean;

  constructor(private fb: FormBuilder,
              private notifications: NotificationsService,
              private tourService: TourService) {
  }


  /**
   * Builds the finish tour form.
   */
  private buildForm() {
    this.finishTourForm = this.fb.group({
      endKm: [this.tour.startKm, [Validators.required, startKmValidator(this.tour.startKm)]],
      comment: [''],
      parkingPosition: [null, [latlongValidator(true)]]
    });
  }

  /**
   * Opens the modal.
   * @param tour The tour that should get finished.
   */
  public open(tour: Tour) {
    this.tour = tour;
    this.isOpen = true;
    this.buildForm();
    this.getGeoLocation();

  }

  /**
   * Reads the geo location from the browser.
   */
  private getGeoLocation() {
    if (navigator.geolocation) {
      this.geoLocationLoading = true;
      navigator.geolocation.getCurrentPosition(position => {
        this.geoLocationLoading = false;
        const lng = position.coords.longitude;
        const lat = position.coords.latitude;
        this.finishTourForm.get('parkingPosition').setValue(`${lat}, ${lng}`);
      }, err => {
        console.error(err);
        this.geoLocationLoading = false;
        this.notifications.error('GPS gestützte Positionsermittlung fehlgeschlagen.');
      }, {timeout: 10000});
    } else {
      this.notifications.error('Dein Browser unterstützt keine GPS gestützte Positionsermittlung.');
      this.geoLocationLoading = false;
    }
  }

  /**
   * Closes the modal.
   */
  public close() {
    this.isOpen = false;
    this.tour = null;
  }

  /**
   * Marks the tour as finished on the server and closes the modal.
   */
  public finishTour() {
    if (this.finishTourForm.valid) {
      this.isLoading = true;
      this.tour.endKm = this.finishTourForm.get('endKm').value;
      this.tour.comment = this.finishTourForm.get('comment').value;
      this.tour.parkingPosition = this.finishTourForm.get('parkingPosition').value;
      this.tourService.finishTour(this.tour).subscribe(tour => {
        this.tourFinished.emit(tour);
        this.close();
        this.notifications.success('Fahrt beendet', 'Die Fahrt wurde ergolreich als beendet eingetragen.');
      }, () => {
        this.isOpen = false;
        this.close();
      });
    }
  }

}
