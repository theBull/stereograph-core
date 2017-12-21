import { IPhysicalObject } from '../geometry';

export class Gravity {
  private _gravity: number;
  private _object: IPhysicalObject;

  constructor(gravity: number, obj: IPhysicalObject) {
    this._gravity = gravity;
    this._object = obj;
  }

  public apply(): void {
    this._object.move(0, this._gravity);
  }
}