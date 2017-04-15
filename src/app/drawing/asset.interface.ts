import { IDrawable, CanvasProperties } from '.';
import { Dimensions, Coordinates } from '../spatial';
import { IGeometricShape } from '../geometry';
import { Obj, Num } from '../utils';
import { Gravity } from '../physics';

export interface IAsset {

  solid: boolean;
  dims: Dimensions;
  coords: Coordinates;
  context: CanvasRenderingContext2D;
  gravity: Gravity;
  bounds: IGeometricShape;
  properties: CanvasProperties;

  draw(): void;
  move(xSpeed: number, ySpeed: number): void;
  setCoordinates(x: number, y: number): void;
}