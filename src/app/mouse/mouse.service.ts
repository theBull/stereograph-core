import { Injectable } from '@angular/core';
import { Mouse } from '.';
import { CallbackSet } from '../execution';
import { Bounds } from '../spatial';
import { Set } from '../collections';
import { Str, Obj } from '../utils';

@Injectable()
export class MouseService {

  private _bounds: Set<Bounds>;
  private _mouse: Mouse;
  private _isListening: boolean;
  private _callbacks: CallbackSet;

  constructor() { 
    this._isListening = false;
    this._mouse = new Mouse();
    this._callbacks = new CallbackSet();
    this._bounds = new Set<Bounds>();
  }

  public setBounds(name: string, x: number, y: number, width: number, height: number): void {
    if(Str.isEmptyString(name)) {
      throw Error('Name is null or undefined');
    }
    this._bounds.add(name, new Bounds(x, y, width, height));
  }

  public isWithinBounds(name: string): boolean {
    if(Str.isEmptyString(name)) {
      throw Error('Name is null or undefined');
    }
    let bounds = this._bounds.get(name);
    if(Obj.isNullOrUndefined(bounds)) {
      throw Error('Bounds are null or undefined');
    }
    return bounds.isWithin(this._mouse.x, this._mouse.y);
  }

  public listen(toListen?: boolean): void {
    // defaults to true if not passed
    this._isListening = toListen === false ? false : true;

    if(this._isListening === false) {
      // remove event listeners
      document.removeEventListener('mousemove');
    } else {

      // add event listeners
      document.addEventListener('mousemove', (event: MouseEvent) => {
        this._mouse.x = event.pageX;
        this._mouse.y = event.pageY;

        if(this._callbacks.hasValue('mousemove')) {
          this._callbacks.get('mousemove')(event);
        }
      });

      document.addEventListener('click', (event: MouseEvent) => {
        if(this._callbacks.hasValue('click')) {
          this._callbacks.get('click')(event);
        }
      });
    }
  }

  public onClick(callback: Function): void {
    this._callbacks.add('click', callback);
  }

  public onMousemove(callback: Function): void {
    this._callbacks.add('mousemove', callback);
  }

  public getMouse(): Mouse {
    return this._mouse;
  }
}
