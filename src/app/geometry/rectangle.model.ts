import { Point, IGeometricShape } from '.';

export class Rectangle implements IGeometricShape {
  
  public x: number;
  public y: number;
  public width: number;
  public height: number;

  constructor(x: number, y: number, width: number, height: number) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  }

  public pointInside(point: Point): boolean {
    return (point.x >= this.x && point.x <= this.x + this.width) && 
      (point.y >= this.y && point.y <= this.y + this.height);
  }

  public intersect(rect: Rectangle): boolean {
    return (this.x < rect.x + rect.width && 
            this.x + this.width > rect.x &&
            this.y < rect.y + rect.height &&
            this.y + this.height > rect.y);
  }
}