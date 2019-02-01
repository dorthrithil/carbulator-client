import {Component, EventEmitter, Output, ViewChild} from '@angular/core';
import {Tour} from '../../../../models/tour';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {TourService} from '../../../../services/crud/tour.service';
import {latlongValidator} from '../../../../utility/validators/latlong.validator';
import {AuthService} from '../../../../services/core/auth.service';
import {Observable} from 'rxjs';
import {numberValidator} from '../../../../utility/validators/number.validator';
import {toNumber} from '../../../../utility/conversion/to-number';
import {endKmValidator} from '../../../../utility/validators/end-km.validator';
import {CblNotificationsService} from '../../../../services/core/cbl-notifications.service';
import {ClrForm} from '@clr/angular';
import {AppEventsService} from '../../../../services/core/app-events.service';
import {ParkingPositionMapComponent} from '../parking-position-map/parking-position-map.component';
import {latLng} from 'leaflet';
import {GeocodingService} from '../../../../services/crud/geocoding.service';
import {GeocodingResult} from '../../../../models/geocoding-result';

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
   * Reference to the clarity form instance.
   */
  @ViewChild(ClrForm) clrForm;
  /**
   * Reference to the parking position map component.
   */
  @ViewChild(ParkingPositionMapComponent) parkingPositionMap;

  /**
   * Emits the finished tour.
   */
  @Output() tourFinished: EventEmitter<Tour> = new EventEmitter();

  public finishTourForm: FormGroup;
  public isOpen = false;
  public isLoading = false;
  public tour: Tour;
  public geoLocationLoading: boolean;
  public geoCodingLoading: boolean;
  public geocodingQuery = '';
  public geocodingResults: GeocodingResult[] = [];

  constructor(private fb: FormBuilder,
              private auth: AuthService,
              private geocodingServie: GeocodingService,
              private appEvents: AppEventsService,
              private notifications: CblNotificationsService,
              private tourService: TourService) {
  }


  /**
   * Builds the finish tour form.
   */
  private buildForm() {
    this.finishTourForm = this.fb.group({
      endKm: [this.tour.startKm, [Validators.required, numberValidator(), endKmValidator(this.tour.startKm)]],
      comment: ['', [Validators.maxLength(120)]],
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
  }

  /**
   * Reads the geo location from the browser.
   */
  public getGeoLocation() {
    if (navigator.geolocation) {
      this.geoLocationLoading = true;
      navigator.geolocation.getCurrentPosition(position => {
        this.geoLocationLoading = false;
        const lng = position.coords.longitude;
        const lat = position.coords.latitude;
        this.parkingPositionMap.setMapCoords(latLng(lat, lng));
        this.finishTourForm.get('parkingPosition').setValue(`${lat}, ${lng}`);
      }, err => {
        console.error(err);
        this.geoLocationLoading = false;
        this.notifications.error('Fehler', 'GPS gestützte Positionsermittlung fehlgeschlagen.');
      }, {timeout: 10000});
    } else {
      this.notifications.error('Fehler', 'Dein Browser unterstützt keine GPS gestützte Positionsermittlung.');
      this.geoLocationLoading = false;
    }
  }

  /**
   * Closes the modal.
   */
  public close() {
    this.isOpen = false;
    this.tour = null;
    this.isLoading = false;
  }

  /**
   * Marks the tour as finished on the server and closes the modal.
   */
  public finishTour() {
    if (this.finishTourForm.valid) {
      this.isLoading = true;
      this.tour.endKm = toNumber(this.finishTourForm.get('endKm').value);
      this.tour.comment = this.finishTourForm.get('comment').value;
      this.tour.parkingPosition = this.finishTourForm.get('parkingPosition').value;
      let finishRequest: Observable<Tour>;
      if (this.isOwner()) {
        finishRequest = this.tourService.finishTour(this.tour);
      } else {
        finishRequest = this.tourService.forceFinishTour(this.tour);
      }
      finishRequest.subscribe(tour => {
        this.tourFinished.emit(tour);
        this.appEvents.dispatchTourFinishedEvent(tour);
        this.close();
        this.notifications.success('Fahrt beendet', 'Die Fahrt wurde erfolgreich als beendet eingetragen.');
      }, () => {
        this.close();
      });
    } else {
      this.clrForm.markAsDirty();
    }
  }

  /**
   * Check if the owner of the tour is the logged in user.
   */
  public isOwner(): boolean {
    return this.auth.isLoggedInUser(this.tour.owner);
  }

  /**
   * Geocodes the geocoding query.
   */
  public geocode() {
    this.geoCodingLoading = true;
    this.geocodingServie.geocode(this.geocodingQuery).subscribe(res => {
      this.geocodingResults = res;
      this.geoCodingLoading = false;
    }, err => {
      this.geoCodingLoading = false;
    });
  }

}
