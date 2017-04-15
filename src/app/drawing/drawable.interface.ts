import {Dimensions, Coordinates} from '../spatial';

export interface IDrawable {

  /**
   * Whether or not the current drawable triggers
   * a collision when intersecting with another solid
   * asset
   * @type {boolean}
   */
  solid: boolean;

  /**
   * Must have a context in order to draw an object
   * @type {CanvasRenderingContext2D}
   */
  context: CanvasRenderingContext2D;

  /**
   * The dimensions of the object (height, width, etc.)
   * @type {Dimensions}
   */
  dims: Dimensions;

  /**
   * The coordinates, or location, of the object
   * @type {Coordinates}
   */
  coords: Coordinates;

  /**
   * A method to draw the object
   */
  draw(): void;
}