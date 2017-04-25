import { Obj } from '../utils';
import { Dimensions } from '../spatial';
import { Asset } from './asset.model';

export class Canvas {
  
  public canvas: HTMLCanvasElement;
  public context: CanvasRenderingContext2D;
  public width: number;
  public height: number;
  public scale: number;

  constructor(canvas: HTMLCanvasElement) {
    if(Obj.isNullOrUndefined(canvas)) {
      throw Error('Canvas is null or undefined');
    }
    this.canvas = canvas;
    this.context = this.canvas.getContext('2d');
    this.width = canvas.width;
    this.height = canvas.height;
    this.scale = 1;
  }

  /**
   * Clears the canvas
   */
  public clear(): void {
    this.context.clearRect(0, 0, this.width, this.height);
  }

  /**
   * Converts the canvas into a static image
   * @return {ImageData} [description]
   */
  public getImage(): ImageData {
    return this.context.getImageData(
      0, 0, this.width, this.height
    );
  }

  /**
   * Creates and returns the canvas data as an HTML png image
   * @return {HTMLImageElement} [description]
   */
  public getPNG(): HTMLImageElement {
    let image = new Image();
    image.src = this.canvas.toDataURL('image/png');
    return image;
  }

  /**
   * draws an image to the canvas
   * @param {ImageData} image [description]
   */
  public drawImage(image: ImageData): void {
    this.context.putImageData(image, 0, 0);
  }
}