import {Component, Input, OnInit} from '@angular/core';
import {Tour} from '../../../../models/tour';
import {DomSanitizer, SafeStyle} from '@angular/platform-browser';
import {getSeverityColor} from '../../../../utility/color/color-scheme-functions';

/**
 * A component that displays a tour in a box.
 */
@Component({
  selector: 'cbl-tour-box',
  templateUrl: './tour-box.component.html',
  styleUrls: ['./tour-box.component.scss']
})
export class TourBoxComponent {

  /**
   * The tour to show in the box.
   */
  @Input() tour: Tour;

  constructor(private sanitizer: DomSanitizer) {
  }

  /**
   * Returns a color that is coloured more red the longer the tour was.
   */
  public getKmSeverityBorderColor(): SafeStyle {
    return this.sanitizer.bypassSecurityTrustStyle(getSeverityColor(this.tour.totalKm, 0, 250));
  }

}
