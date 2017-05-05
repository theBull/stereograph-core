import { IAsset, IDrawable, CanvasProperties, Canvas } from '.';
import { Dimensions, Coordinates } from '../spatial';
import { IPhysicalObject, Rectangle, Point } from '../geometry';
import { Obj, Num } from '../utils';
import { Gravity } from '../physics';

export abstract class Asset implements IAsset {
  
  public x: number;
  public y: number;
  public width: number;
  public height: number;
  public color: string;
  public obj: IPhysicalObject;
  public canvas: Canvas;
  public context: CanvasRenderingContext2D;
  public properties: CanvasProperties;

  constructor(canvas: Canvas) {
    this.x = 0;
    this.y = 0;
    this.width = 0;
    this.height = 0;
    this.color = 'rgba(0, 0, 0, 0)';
    this.obj = null;
    this.canvas = canvas;
    this.context = canvas.context;
    this.properties = new CanvasProperties();
  }

  public setContext(context: CanvasRenderingContext2D): void {
    if(Obj.isNullOrUndefined(context)) {
      throw Error('context is null or undefined');
    }
    this.context = context;
  }

  public draw(): void {
    if(Obj.isNullOrUndefined(this.obj)) {
      throw Error('Obj is null or undefined');
    }
  }
}