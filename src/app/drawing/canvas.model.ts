import { Obj } from '../utils';
import { Dimensions } from '../spatial';
import { Asset } from './asset.model';

export class Canvas {
  
  public canvas: HTMLCanvasElement;
  public context: CanvasRenderingContext2D;
  public dimensions: Dimensions;

  constructor(canvas: HTMLCanvasElement) {
    if(Obj.isNullOrUndefined(canvas)) {
      throw Error('Canvas is null or undefined');
    }
    this.canvas = canvas;
    this.context = this.canvas.getContext('2d');
    this.dimensions = new Dimensions(canvas.width, canvas.height);
  }

  /**
   * Clears the canvas
   */
  public clear(): void {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  /**
   * Converts the canvas into a static image
   * @return {ImageData} [description]
   */
  public getImage(): ImageData {
    return this.context.getImageData(
      0, 0, this.canvas.width, this.canvas.height
    );
  }

  /**
   * draws an image to the canvas
   * @param {ImageData} image [description]
   */
  public drawImage(image: ImageData): void {
    this.context.putImageData(image, 0, 0);
  }
}