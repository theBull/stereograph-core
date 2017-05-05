export class CanvasProperties {

  /**
   * Colors, Styles, and Shadows
   * @type {string}
   */
  public fillStyle: string;
  public strokeStyle: string;
  public shadowColor: string;
  public shadowBlur: number;
  public shadowOffsetX: number;
  public shadowOffsetY: number;

  /**
   * Line Styles
   */
  public lineCap: string;
  public lineJoin: string;
  public lineWidth: number;
  public miterLimit: number;

  /**
   * Text
   */
  public font: string;
  public textAlign: string;
  public textBaseline: string;

  /**
   * Allows any boolean operations to trigger
   * their default values if doing a check
   * for undefined
   */
  public reset(): void {
    this.fillStyle = undefined;
    this.strokeStyle = undefined;
    this.shadowColor = undefined;
    this.shadowBlur = undefined;
    this.shadowOffsetX = undefined;
    this.shadowOffsetY = undefined;
    this.lineCap = undefined;
    this.lineJoin = undefined;
    this.lineWidth = undefined;
    this.miterLimit = undefined;
    this.font = undefined;
    this.textAlign = undefined;
    this.textBaseline = undefined;
  }
}