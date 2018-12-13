import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {Tour} from '../../../../models/tour';
import {sortAndLimit} from '../../../../utility/sorting/sort-and-limit';
import {sortTours} from '../../../../utility/sorting/sort-tours';
import {Observable} from 'rxjs';
import {StartTourModalComponent} from '../start-tour-modal/start-tour-modal.component';

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

  /**
   * Loads all tours for the community on component initialization.
   */
  ngOnInit() {
    this.tourResource.subscribe(tours => {
      this.tours = tours;
      sortAndLimit(this.tours, sortTours, 0, 'DESC');
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

}
