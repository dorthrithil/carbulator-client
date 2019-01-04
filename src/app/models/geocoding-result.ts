import {latLng, LatLng} from 'leaflet';


/**
 * Model of a result from geocoding.
 */
export class GeocodingResult {

  latitude: number;
  longitude: number;
  address: string;
  country: string;
  county: string;
  countryCode: string;
  state: string;
  houseNumber: string;
  postal: string;
  town: string;
  type: string;
  street: string;
  latLng: LatLng;

  /**
   * Creates a GeocodingResult from a server response.
   * @param src Parsed JSON from the server.
   * @return Parsed GeocodingResult.
   */
  static fromJson(src: any): GeocodingResult {
    const geocodingResult = new GeocodingResult();
    geocodingResult.latitude = src['lat'];
    geocodingResult.longitude = src['lng'];
    geocodingResult.address = src['address'];
    geocodingResult.country = src['country'];
    geocodingResult.county = src['county'];
    geocodingResult.countryCode = src['country_code'];
    geocodingResult.state = src['state'];
    geocodingResult.houseNumber = src['house_number'];
    geocodingResult.postal = src['postal'];
    geocodingResult.town = src['town'];
    geocodingResult.type = src['type'];
    geocodingResult.street = src['street'];
    geocodingResult.latLng = latLng(geocodingResult.latitude, geocodingResult.longitude);
    return geocodingResult;
  }

}
