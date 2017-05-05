import { IDrawable, CanvasProperties, Canvas } from '.';
import { Dimensions, Coordinates } from '../spatial';
import { IPhysicalObject } from '../geometry';
import { Obj, Num } from '../utils';
import { Gravity } from '../physics';

export interface IAsset extends IDrawable {
  
  obj: IPhysicalObject;
  canvas: Canvas;
  context: CanvasRenderingContext2D;
  properties: CanvasProperties;

  draw(): void;
}