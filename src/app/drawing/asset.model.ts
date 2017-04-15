import { IAsset, IDrawable, CanvasProperties } from '.';
import { Dimensions, Coordinates } from '../spatial';
import { IGeometricShape, Rectangle } from '../geometry';
import { Obj, Num } from '../utils';
import { Gravity } from '../physics';

export abstract class Asset implements IDrawable, IAsset {

  public solid: boolean;
  public dims: Dimensions;
  public coords: Coordinates;
  public context: CanvasRenderingContext2D;
  public gravity: Gravity;
  public bounds: IGeometricShape;
  public properties: CanvasProperties;

  constructor(context: CanvasRenderingContext2D) {
    if(Obj.isNullOrUndefined(context)) {
      throw Error('context is null or undefined');
    }

    this.context = context;
    this.solid = false;
    this.dims = new Dimensions(10, 10);
    this.coords = new Coordinates(0, 0);
    this.properties = new CanvasProperties();
  }

  public draw(): void {}

  public move(xSpeed: number, ySpeed: number): void {
    this.coords.move(xSpeed, ySpeed);
  }

  public setCoordinates(x: number, y: number): void {
    if(Num.isNaN(x) || Num.isNaN(y)) {
      throw Error('x and y must be valid integers');
    }
    this.coords.x = x;
    this.coords.y = y;
  }

  public setBounds(): void {
    this.bounds = new Rectangle(
      this.coords.x, 
      this.coords.y, 
      this.dims.width, 
      this.dims.height
    );
  }

  public drawBounds(): void {
    this.context.beginPath();
    this.context.strokeStyle = '#0f0';
    this.context.rect(this.coords.x, this.coords.y, this.dims.width, this.dims.height);
    this.context.stroke();
    this.context.closePath();
  }
}