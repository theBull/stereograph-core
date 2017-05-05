import { Num } from '../utils';

export class Coordinates {
  
  // current x and y
  public x: number;
  public y: number;

  // previous x and y
  public px: number;
  public py: number;

  constructor(x: number, y: number) {
    if(Num.isNaN(x, y)) {
      throw Error('X and Y must be valid numbers');
    }
    this.x = x;
    this.y = y;
    this.px = this.x;
    this.py = this.y;
  }

  public setY(y: number): void {
    this.y = y;
  }

  public move(xSpeed: number, ySpeed: number): void {
    this.px = this.x;
    this.py = this.y;
    this.x += xSpeed;
    this.y += ySpeed;
  }

  public toPrevious(): void {
    this.x = this.px;
    this.y = this.py;
  }
}