import { Num } from '../utils';

export class MapCoordinates {

  public lat: number;
  public lng: number;

  constructor(lat: number, lng: number) {
    if(Num.isNaN(lat, lng)) {
      throw Error('Latitude (lat) and Longitude (lng) must be valid numbers');
    }

    this.lat = lat;
    this.lng = lng;
  }

}