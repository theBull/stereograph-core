import { Num } from '../utils';

export class Dimensions {
  public width: number;
  public height: number;
  
  constructor(width: number, height: number) {
    this.width = Num.isNaN(width) ? 0 : width;
    this.height = Num.isNaN(height) ? 0 : height;
  }
}