import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {Tour} from '../../../../models/tour';
import {sortAndLimit} from '../../../../utility/sorting/sort-and-limit';
import {sortTours} from '../../../../utility/sorting/sort-tours';
import {Observable} from 'rxjs';
import {StartTourModalComponent} from '../start-tour-modal/start-tour-modal.component';
import {AppEventsService} from '../../../../services/core/app-events.service';
import {MobileDetectionService} from '../../../../services/core/mobile-detection.service';
import {TourService} from '../../../../services/crud/tour.service';
import {CblNotificationsService} from '../../../../services/core/cbl-notifications.service';
import {AuthService} from '../../../../services/core/auth.service';
import {map} from 'rxjs/operators';

/**
 * Component for showing a datagrid of tours. As the tour resource is kept as an input, this is reusable for community or user views.
 */
@Component({
  selector: 'cbl-tours-datagrid',
  templateUrl: './tours-datagrid.component.html',
  styleUrls: ['./tours-datagrid.component.scss']
})
export class ToursDatagridComponent implements OnInit {

  /**
   * Observable that resolves to an array of tours.
   */
  @Input() tourResource: Observable<Tour[]>;

  /**
   * ID of a community. If this field is provided, there will be the possibility to start tours via the datagrid action bar.
   */
  @Input() communityId: number;

  /**
   * Reference to the start tour modal.
   */
  @ViewChild('startTourModal') startTourModal: StartTourModalComponent;

  public tours: Tour[];
  public isLoading = true;
  public deleteTourModalOpen = false;
  public deleteTourRequest: Observable<void>;

  constructor(private appEvents: AppEventsService,
              private notifications: CblNotificationsService,
              private tourService: TourService,
              public auth: AuthService,
              public mobileDetection: MobileDetectionService) {
  }


  /**
   * Loads all tours for the community on component initialization.
   */
  ngOnInit() {
    this.tourResource.subscribe(tours => {
      this.tours = tours;
      this.isLoading = false;
      sortAndLimit(this.tours, sortTours, 0, 'DESC');
    });
    this.appEvents.tourFinished.subscribe(tour => {
      this.addTour(tour);
    });
  }

  /**
   * Adds a tour to the list of tours.
   * @param tour Tour to add to the list.
   */
  public addTour(tour: Tour) {
    this.tours.push(tour);
    sortAndLimit(this.tours, sortTours, 0, 'DESC');
  }

  /**
   * Deletes the given tour and removes it from the list.
   * @param tour Tour to delete.
   */
  public deleteTour(tour: Tour) {
    this.deleteTourModalOpen = true;
    this.deleteTourRequest = this.tourService.deleteTour(tour).pipe(map(() => {
      this.tours.splice(this.tours.indexOf(tour), 1);
      this.notifications.success('Fahrt gelöscht', 'Die Fahrt wurde erfolgreich gelöscht.');
    }));
  }

}
