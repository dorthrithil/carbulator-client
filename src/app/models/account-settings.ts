/**
 * Model of account settings.
 */
export class AccountSettings {

  public autoLoadParkingPlaceGPSLocation: boolean;
  public parkingPlaceRequired: boolean;

  /**
   * Parses account settings from JSON to an AccountSettings object.
   * @param src Source JSON representation of account settings.
   * @return Created AccountSettings object.
   */
  public static fromJson(src: any): AccountSettings {
    const accountSettings = new AccountSettings();
    accountSettings.autoLoadParkingPlaceGPSLocation = src['auto_load_parking_place_gps_location'];
    accountSettings.parkingPlaceRequired = src['parking_place_required'];
    return accountSettings;
  }

  /**
   * Returns account settings in a format that can be safely JSON stringified to the required server format.
   * @param src Source AccountSettings object.
   * @return AccountSettings JSON representation.
   */
  public static toJsonReadyFormat(src: AccountSettings): any {
    return {
      'auto_load_parking_place_gps_location': src.autoLoadParkingPlaceGPSLocation,
      'parking_place_required': src.parkingPlaceRequired
    };
  }

}
