import { Injectable } from '@angular/core';
import { CallbackSet } from '../execution';
import { Obj } from '../utils';
import { KeyCode } from '.';

@Injectable()
export class KeyboardService {

  private _isListening: boolean;
  private _isKeyPressed: boolean;
  private _history: number[];
  private _shiftPressed: boolean;
  private _metaPressed: boolean;
  private _callbacks: CallbackSet;

  constructor() { 
    this._isListening = true;
    this._history = [];
    this._shiftPressed = false;
    this._metaPressed = false;
    this._isKeyPressed = false;
    this._callbacks = new CallbackSet();
  }

  public listen(toListen?: boolean): void {
    // defaults to true if not passed
    this._isListening = toListen === false ? false : true; 

    if(this._isListening === false) {
      document.removeEventListener('keydown');
      document.removeEventListener('keyup');
    } else {
       document.addEventListener('keyup', (e) => {

        console.log(`keyup: ${e.which}`);

        if(Obj.isNullOrUndefined(KeyCode[e.which]))
          return;

        this._history.splice(this.getIndex(e.which), 1);

        this._isKeyPressed = this._history.length === 0;
        this._shiftPressed = false;
        this._metaPressed = false;

        if(this.isBrowserRefreshKey(e.which))
          return;
      });

      document.addEventListener('keydown', (e) => {
        this._shiftPressed = e.shiftKey;
        this._metaPressed = e.metaKey;
        this._isKeyPressed = true;

        console.log(`keydown: ${e.which}`);

        let metaKey = this._metaPressed;
        let shift = this._shiftPressed ? 'shift' : '';

        if(Obj.isNullOrUndefined(KeyCode[e.which]))
          return;

        // only add key code to history once
        if(this.getIndex(e.which) < 0) {
          this._history.push(e.which);
        }

        if(this._callbacks.hasValue(e.which)) {
          this._callbacks.get(e.which)(e.shiftKey);
        }

        if(this.isBrowserRefreshKey(e.which))
          return;

      });
    }
  }

  public isBrowserRefreshKey(keyCode: number): boolean {
    return this._metaPressed && keyCode === KeyCode.R;
  }

  public onKeyCode(keyCode: number, callback: Function) {
    this._callbacks.add(keyCode, callback);
  }
  public getIndex(keyCode: number): number {
    return this._history.indexOf(keyCode);
  }
  public getHistory(): number[] {
    return this._history;
  }

  public getHistoryKeys(): string[] {
    let keys = [];
    for(let i = this._history.length - 1; i >= 0; i--) {
      let keyCode = this._history[i];
      keys.push(KeyCode[keyCode]);
    }
    return keys;
  }

  public getLastKeyCode(): number {
    return this._history[this._history.length - 1];
  }

  public getLastKey(): string {
    return KeyCode[this.getLastKeyCode()];
  }

  public getShiftPressed(): boolean {
    return this._shiftPressed;
  }

}
