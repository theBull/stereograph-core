import { Point } from '.';
import { Gravity } from '../physics';

export interface IPhysicalObject {
  x: number;
  y: number;
  width: number;
  height: number;
  radius?: number;
  solid: boolean;
  px: number;
  py: number;
  gravity: Gravity;
  pointInside(point: Point): boolean;
  intersect(shape: IPhysicalObject);
  move(xSpeed: number, ySpeed: number): void;
  toPrevious(): void;
}