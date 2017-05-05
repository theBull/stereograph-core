import { Obj } from '../utils';

export class Map<T> {

  private _items: any;
  private _size: number;

  constructor() {
    this._items = {};
    this._size = 0;
  }

  /**
   * Populates this map with the corresponding values
   * in the given object.
   * @param {any} from [description]
   */
  public populate(from: any): void {
    if(Obj.isNullOrUndefined(from)) {
      return;
    }
    for(let key in from) {
      if(from.hasOwnProperty(key)) {
        this._items[key] = from[key];
      }
    }
  }

  /**
   * Seeds the values in the given object with the
   * corresponding values in this map.
   * @param {any} to [description]
   */
  public seed(to: any): void {
    if(Obj.isNullOrUndefined(to)) {
      return;
    }
    this.forEach((value: any, key: string) => {
      if(to.hasOwnProperty(key)) {
        to[key] = value;
      }
    });
  }

  /**
   * Iterates over each item in the map, skipping
   * any entries whose key is null.
   * @param {Function} predicate A function to call on each iteration
   */
  public forEach(predicate: Function): void {
    for(let key in this._items) {
      if(Obj.isNullOrUndefined(key)) {
        continue;
      }
      predicate(this._items[key], key);
    }
  }
}