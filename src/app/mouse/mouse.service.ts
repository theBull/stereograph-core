import { Injectable } from '@angular/core';
import { Mouse, MouseState } from '.';
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
  private _state: MouseState;
  private _press: MouseState;
  private _stateTimer: any;

  constructor() { 
    this._isListening = false;
    this._mouse = new Mouse();
    this._callbacks = new CallbackSet();
    this._bounds = new Set<Bounds>();
    this._state = MouseState.Still;
    this._press = MouseState.Up;
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
    let bounds = this._bounds.first(name);
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

        this._state = MouseState.Moving;
        clearTimeout(this._stateTimer);
        this._stateTimer = setTimeout(() => {
          this._state = MouseState.Still;

        }, 100);
        
        if(this._callbacks.hasValue('mousemove')) {
          this._callbacks.each('mousemove', (handler: Function, i: number) => {
            handler(event);
          });
        }
      });

      document.addEventListener('click', (event: MouseEvent) => {
        if(this._callbacks.hasValue('click')) {
          this._callbacks.each('click', (handler: Function, i: number) => {
            handler(event);
          });
        }
      });

      document.addEventListener('mousedown', (event: MouseEvent) => {
        this._press = MouseState.Down;
        if(this._callbacks.hasValue('mousedown')) {
          this._callbacks.each('mousedown', (handler: Function, i: number) => {
            handler(event);
          });
        }
      });

      document.addEventListener('mouseup', (event: MouseEvent) => {
        this._press = MouseState.Up;
        if(this._callbacks.hasValue('mouseup')) {
          this._callbacks.each('mouseup', (handler: Function, i: number) => {
            handler(event);
          });
        }
      });
    }
  }

  public getState(): MouseState {
    return this._state;
  }

  public onClick(callback: Function): void {
    this._callbacks.add('click', callback);
  }

  public onMousemove(callback: Function): void {
    this._callbacks.add('mousemove', callback);
  }

  public onMousedown(callback: Function): void {
    this._callbacks.add('mousedown', callback);
  }

  public onMouseup(callback: Function): void {
    this._callbacks.add('mouseup', callback);
  }

  public getMouse(): Mouse {
    return this._mouse;
  }
}
