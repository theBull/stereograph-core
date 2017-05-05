import { Coordinates, Dimensions } from '.';
import { Num } from '../utils';

export class Bounds {
  private _coordinates: Coordinates;
  private _dimensions: Dimensions;

  constructor(x: number, y: number, width: number, height: number) {
    if(Num.isNegative(x, y) || Num.isNegative(width, height)) {
      throw Error('x, y, width or height is an invalid number.');
    }
    this._coordinates = new Coordinates(x, y);
    this._dimensions = new Dimensions(width, height);
  }

  public isWithin(x: number, y: number): boolean {
    return x >= this._coordinates.x &&
      y >= this._coordinates.y &&
      x <= this._coordinates.x + this._dimensions.width &&
      y <= this._coordinates.y + this._dimensions.height;
  }
}