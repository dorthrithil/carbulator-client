import {Component, Input, OnInit} from '@angular/core';
import {icon, latLng, marker, tileLayer} from 'leaflet';
import {timer} from 'rxjs';

/**
 * A component that displays a map of a parking position.
 */
@Component({
  selector: 'cbl-parking-position-map',
  templateUrl: './parking-position-map.component.html',
  styleUrls: ['./parking-position-map.component.scss']
})
export class ParkingPositionMapComponent implements OnInit {

  /**
   * Parking position lat long string as it is stored in the database (comma separated).
   */
  @Input() rawParkingPosition: string;
  /**
   * Number of milliseconds to defer the rendering of the map. Helpful for rendering a map in a modal where the height and width is
   * initialized only after opening the modal.
   */
  @Input() deferredRenderingTime: 0;

  public options;
  public layers;
  public renderMap = false;

  /**
   *
   */
  ngOnInit() {
    const coords = this.rawParkingPosition.split(', ');
    this.options = {
      layers: [
        tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png')
      ],
      zoom: 15,
      center: latLng(Number(coords[0]), Number(coords[1]))
    };

    this.layers = [
      marker([Number(coords[0]), Number(coords[1])], {
        icon: icon({
          iconSize: [25, 41],
          iconAnchor: [13, 41],
          iconUrl: 'leaflet/marker-icon.png',
          shadowUrl: 'leaflet/marker-shadow.png'
        })
      })
    ];

    // Deferred rendering to work around tiles not loading bug when width changes
    timer(this.deferredRenderingTime).subscribe(() => {
      this.renderMap = true;
    });
  }

}
