import {Component} from '@angular/core';
import {Tour} from '../../../../models/tour';

/**
 * A modal showing the comment of a tour.
 */
@Component({
  selector: 'cbl-comment-modal',
  templateUrl: './comment-modal.component.html',
  styleUrls: ['./comment-modal.component.scss']
})
export class CommentModalComponent {

  public isOpen = false;
  public isLoading = false;
  public tour: Tour;

  /**
   * Opens the modal.
   * @param tour The tour to show the parking position for.
   */
  public open(tour: Tour) {
    this.tour = tour;
    this.isOpen = true;

  }

  /**
   * Closes the modal.
   */
  public close() {
    this.isOpen = false;
    this.tour = null;
    this.isLoading = false;
  }

}
