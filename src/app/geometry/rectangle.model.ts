import { Point, IPhysicalObject, PhysicalObject } from '.';
import { Asset, IAsset } from '../drawing';

export class Rectangle extends PhysicalObject implements IPhysicalObject {

  constructor(x: number, y: number, width: number, height: number) {
    super();
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  }

  public pointInside(point: Point): boolean {
    return (point.x >= this.x && point.x <= this.x + this.width) && 
      (point.y >= this.y && point.y <= this.y + this.height);
  }

  public intersect(shape: IPhysicalObject): boolean {
    return this.intersectRect(<Rectangle>shape);
  }

  public intersectRect(rect: Rectangle): boolean {
    return (this.x < rect.x + rect.width && 
            this.x + this.width > rect.x &&
            this.y < rect.y + rect.height &&
            this.y + this.height > rect.y);
  }
}