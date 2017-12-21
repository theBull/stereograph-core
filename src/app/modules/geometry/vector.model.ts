import { Point } from '.';

export class Vector extends Point {
  
  constructor(x: number, y: number) {
    super(x, y);
  }

  public add(vector: Vector): Vector {
    return new Vector(this.x += vector.x, this.y += vector.y);
  }

  public subtract(vector: Vector): Vector {
    return new Vector(this.x -= vector.x, this.y -= vector.y);
  }

  public length(): number {
    return Math.sqrt(this.x * this.x + this.y * this.y);
  }

  public multiply(multiplier: number): Vector {
    return new Vector(this.x *= multiplier, this.y *= multiplier);
  }

  /**
   * Allows us to determine a vector coming 90º from any
   * vector.
   * @param  {Vector} vector [description]
   * @return {number}        [description]
   */
  public cross(vector: Vector): number {
    return this.x * vector.y - this.y * vector.x;
  }

  /**
   * Allows us to determine whether two vectors are pointing
   * in the same direction.
   * @param  {Vector} vector [description]
   * @return {number}        [description]
   */
  public dot(vector: Vector): number {
    return this.x * vector.x + this.y * vector.y;
  }
}