import { List } from '../collections';
import { IAsset, Asset } from '../drawing';
import { Obj } from '../utils';
import { CollisionDirection } from '.';

export class Collision {

  private _assets: List<IAsset>;
  private _asset: Asset;

  constructor(asset: Asset, assets: List<IAsset>) {
    this._asset = asset;
    this._assets = assets;
  }

  // points
  // segment (line, 2 end points)
  // utility functions

  public detected(): boolean {
    if(Obj.isNullOrUndefined(this._asset) ||
      Obj.isNullOrUndefined(this._assets)) {
      throw Error('Asset or asset list is null or undefined');
    }

    let assets = this._assets.toArray()
    for(let i = 0; i < assets.length; i++) {
      
    }

    return false;
  }
}