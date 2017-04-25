import { Num } from '../utils';
import { Circle, Point, Vector, Intersections, IPhysicalObject, PhysicalObject } from '.';

export class Segment extends PhysicalObject implements IPhysicalObject {

  public vecx: number;
  public vecy: number;

  constructor(x: number, y: number, vecx: number, vecy: number) {
    super();
    this.x = x;
    this.y = y;
    this.vecx = vecx;
    this.vecy = vecy;
  }

  public length(): number {
    let dx = Math.pow(this.vecx, 2);
    let dy = Math.pow(this.vecy, 2);
    return Math.sqrt(dx + dy);
  }

  public normal(): Segment {
    let x1 = this.y;
    let y1 = this.vecx + this.x;
    let y2 = this.x;
    let x2 = this.vecy + this.y;
    return new Segment(x1, y1, x2-x1, y2-y1);
  }

  public center(): Point {
    let x = (this.x * 2 + this.vecx) / 2;
    let y = (this.y * 2 + this.vecy) / 2;
    return new Point(x, y);
  }

  public unit(): Segment {
    return new Segment(0, 0, this.vecx / this.length(), this.vecy / this.length());
  }

  public multiply(multiplier: number): void { 
    this.vecx *= multiplier;
    this.vecy *= multiplier;
  }

  public project(segmentOnto: Segment): Point {
    let vector = new Vector(this.vecx, this.vecy);
    let onto = new Vector(segmentOnto.vecx, segmentOnto.vecy);
    
    // dot product to return a value
    let d = onto.dot(onto);

    if(d > 0) {
      let dproj = vector.dot(onto);
      let multiplier = dproj / d;
      let rx = onto.x * multiplier;
      let ry = onto.y * multiplier;
      return new Point(rx, ry);
    }

    return new Point(0, 0);
  }

  public slope(): number {
    return (this.vecy - this.y) / (this.vecx - this.x);
  }

  public pointInside(point: Point): boolean {
    let circle = new Circle(point.x, point.y, 1);
    return circle.intersect(this);
  }

  public intersect(shape: IPhysicalObject): boolean {
    return this.intersectSegment(<Segment>shape) != null;
  }

  public intersectSegment(segment: Segment): Point {
    
    // line a
    let x1 = this.x;
    let y1 = this.y;
    let x2 = this.x + this.vecx;
    let y2 = this.y + this.vecy;

    // line b
    let x3 = segment.x;
    let y3 = segment.y;
    let x4 = segment.x + segment.vecx;
    let y4 = segment.y + segment.vecy;

    let a1, a2, b1, b2, c1, c2;
    let r1, r2, r3, r4;
    let denom, offset, num;

    a1 = y2 - y1;
    b1 = x1 - x2;
    c1 = (x2 * y1) - (x1 * y2);

    r3 = ((a1 * x3) + (b1 * y3) + c1);
    r4 = ((a1 * x4) + (b1 * y4) + c1);

    if((r3 != 0) && (r4 != 0) && Num.sameSign(r3, r4))
      return null;

    a2 = y4 - y3;
    b2 = x3 - x4;
    c2 = (x4 * y3) - (x3 * y4);
    r1 = (a2 * x1) + (b2 * y1) + c2;
    r2 = (a2 * x2) + (b2 * y2) + c2;

    if((r1 != 0) && (r2 != 0) && Num.sameSign(r1, r2))
      return null;

    // Line segments intersect. Find the intersection point
    denom = (a1 * b2) - (a2 * b1);

    if(denom == 0)
      return null;

    if(denom < 0) {
      offset = -denom / 2;
    } else {
      offset = denom / 2;
    }

    let intx, inty;
    num = (b1 * c2) - (b2 * c1);
    if(num < 0) {
      intx = (num - offset) / denom;
    } else {
      intx = (num + offset) / denom;
    }

    num = (a2 * c1) - (a1 * c2);
    if(num < 0) {
      inty = (num - offset) / denom;
    } else {
      inty = (num + offset) / denom;
    }

    return new Point(intx, inty);
  }
}