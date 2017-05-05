import { Segment, Vector, IPhysicalObject, PhysicalObject, Point } from '.';

export class Circle extends PhysicalObject implements IPhysicalObject {
  public x: number;
  public y: number;
  public radius: number;
  public radiusLine: Segment;

  constructor(x: number, y: number, radius: number) {
    super();
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.radiusLine = new Segment(this.x, this.y, this.radius, 0);
  }

  public pointInside(point: Point): boolean {
    let segment = new Segment(this.x, this.y, point.x - this.x, point.y - this.y);
    return segment.length() <= this.radiusLine.length();
  }

  public intersect(shape: IPhysicalObject): boolean {
    return this.intersectSegment(<Segment>shape);
  }

  public intersectSegment(segment: Segment): boolean {
    
    let segment2 = new Segment(segment.x, segment.y, this.x-segment.x, this.y-segment.y);
    
    let projectedPoint = segment2.project(segment);
    
    let segment3 = new Segment(segment.x, segment.y, projectedPoint.x, projectedPoint.y);
    
    let segment4 = new Segment(
      this.x, this.y, 
      (segment3.x + segment3.vecx) - this.x,
      (segment3.y + segment3.vecy) - this.y);

    if(segment4.length() <= this.radiusLine.length()) {
      if(segment.length() >= segment3.length()) {

        let a = new Vector(segment.vecx, segment.vecy);
        let b = new Vector(segment3.vecx, segment4.vecy);
        
        if(0 <= b.dot(a)) {
          return true;        
        }
      }
    }

    if(this.pointInside(new Point(segment.x + segment.vecx, segment.y + segment.vecy)) ||
      this.pointInside(new Point(segment.x, segment.y))) {
      return true;
    }
  }
}