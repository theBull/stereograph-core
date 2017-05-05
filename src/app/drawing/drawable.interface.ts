import {Dimensions, Coordinates} from '../spatial';

export interface IDrawable {

  x: number;
  y: number;
  width: number;
  height: number;
  color: string;

  /**
   * Must have a context in order to draw an object
   * @type {CanvasRenderingContext2D}
   */
  context: CanvasRenderingContext2D;

  /**
   * A method to draw the object
   */
  draw(): void;
}