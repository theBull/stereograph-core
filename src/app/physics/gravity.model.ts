import { IAsset } from '../drawing';
import { Collision } from '.';

export class Gravity {
  public readonly gravity = 0.2;
  public gravitySpeed = 0;
  public gravitySpeedMax = 20;
  private _asset: IAsset;

  constructor(asset: IAsset) {
    this._asset = asset;
  }

  public apply(): void {
    if(this.gravitySpeed <= this.gravitySpeedMax) {
      this.gravitySpeed += this.gravity;
      this._asset.move(0, this.gravitySpeed);
    }
  }
}