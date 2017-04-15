import { Str, Num, Obj } from '../utils';

export class Set<T> {

  private _set: {};
  private _size: number;

  constructor() {
    this._set = {};
    this._size = 0;
  }

  /**
   * Adds the given value at the given key
   * @param {string} key   [description]
   * @param {T}      value [description]
   */
  public add(key: string|number, value: T): void {
    if(Obj.isNullOrUndefined(key))
      throw Error('Key is null or undefined');

    if(Obj.isNullOrUndefined(value))
      throw Error('Value is null or undefined');

    this._set[key] = value;
    this._size++;
  }

  /**
   * Gets the value at the given key
   * @param  {string|number} key [description]
   * @return {T}                 [description]
   */
  public get(key: string|number): T {
    return this._set[key];
  }

  /**
   * Sets the given value at the given key
   * @param {string|number} key   [description]
   * @param {T}             value [description]
   */
  public set(key: string|number, value: T): void {
    this._set[key] = value;
  }

  /**
   * Removes the value at the given key
   * @param  {string|number} key [description]
   * @return {T}                 [description]
   */
  public remove(key: string|number): T {
    if(!this._set.hasOwnProperty(key))
      throw Error(`Key ${key} does not exist in set`);

    let value = this._set[key];
    delete this._set[key];
    this._size--;
    return value;
  }

  /**
   * The size of the set
   * @return {number} [description]
   */
  public size(): number {
    return this._size;
  }

  /**
   * Executes the given predicate for each item in the set
   * @param {Function} predicate [description]
   */
  public forEach(predicate: Function): void {
    for(let key in this._set) {
      let value = this._set[key];
      predicate(key, value);
    }
  }

  /**
   * Returns whether the given key exists in the set
   * @param {string|number} key [description]
   */
  public exists(key: string|number) {
    return this._set.hasOwnProperty(key);
  }

  /**
   * Returns whether or not a value exists (non-null and non-undefined) at
   * the given key
   * @param {string|number} key [description]
   */
  public hasValue(key: string|number) {
    return this.exists(key) && Obj.isNotNullOrUndefined(this.get(key));
  }
}