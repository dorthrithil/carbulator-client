import {Component, Input, OnInit} from '@angular/core';
import {icon, LatLng, latLng, marker, tileLayer} from 'leaflet';
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
  /**
   * If set to true, the marker can be repositioned by clicking on the map.
   */
  @Input() dynamic = false;

  public options;
  public layers;
  public renderMap = false;
  public leafletCenter: LatLng = null;
  public zoom = 5;

  /**
   * Initializes the parking position if passed from component input params and configures the leaflet map.
   */
  ngOnInit() {

    if (this.rawParkingPosition) {
      const coords = this.rawParkingPosition.split(', ');
      this.setMapCoords(latLng(Number(coords[0]), Number(coords[1])));
    } else {
      this.setMapCoords(latLng(50.897909, 10.791994), 5, false);
    }

    this.options = {
      layers: [
        tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png')
      ]
    };

    // Deferred rendering to work around tiles not loading bug when width changes
    timer(this.deferredRenderingTime).subscribe(() => {
      this.renderMap = true;
    });
  }

  /**
   * Sets new coordinates for the map.
   * @param coords Coordinates to use.
   * @param zoom Zoom level.
   * @param setMarker If true, a marker will be shown at the coordinates.
   */
  public setMapCoords(coords: LatLng, zoom = 15, setMarker = true) {
    this.leafletCenter = coords;
    this.zoom = zoom;
    if (setMarker) {
      this.layers = [
        marker(coords, {
          icon: icon({
            iconSize: [25, 41],
            iconAnchor: [13, 41],
            iconUrl: 'leaflet/marker-icon.png',
            shadowUrl: 'leaflet/marker-shadow.png'
          })
        })
      ];
    } else {
      this.layers = [];
    }
  }

  /**
   * Sets the map coordinates to the point of click if the map is set to dynamic mode.
   * @param event Leaflet event.
   */
  public onLeafletClick(event) {
    if (this.dynamic) {
      this.setMapCoords(event.latlng);
    }
  }

}
