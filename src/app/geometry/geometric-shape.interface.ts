import { Point } from '.';

export interface IGeometricShape {
  pointInside(point: Point): boolean;
  intersect(shape: IGeometricShape);
}