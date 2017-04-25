import { Point, IPhysicalObject } from '.';
import { Gravity } from '../physics';

export abstract class PhysicalObject {
  public x: number;
  public y: number;
  public width: number;
  public height: number;
  public radius?: number;
  public solid: boolean;
  public px: number;
  public py: number;
  public gravity: Gravity;

  public move(x: number, y: number): void {
    this.px = this.x;
    this.py = this.y;
    this.x += x;
    this.y += y;
  }
  public toPrevious(): void {
    this.x = this.px;
    this.y = this.py;
  }
  
  public abstract pointInside(point: Point): boolean;
  public abstract intersect(shape: IPhysicalObject);
}