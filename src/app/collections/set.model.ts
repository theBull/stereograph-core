import { Str, Num, Obj, Arr, Func } from '../utils';

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
  public add(key: string|number, ...value: T[]): void {
    if(Obj.isNullOrUndefined(key))
      throw Error(`Key: '${key}' is null or undefined`);

    if(Obj.isNullOrUndefined(this._set[key])) {
      this._set[key] = [];
    }

    // If value is null, nullify the whole value at set and
    // deduct original length from size.
    if(Obj.isNullOrUndefined(value) || 
      (Obj.isNullOrUndefined(value[0]) && value.length == 1)) {
      this._size -= this._set[key].length;
      this._set[key] = null;
      return;
    }

    // Multiple arguments passed to add to the set
    if(Arr.isArray(value)) {
      for(let i = 0; i < value.length; i++) {
        this._add(key, value[i]);
      }
    }

    // Single element being added to set
    else {
      this._add(key, value[0]);
    } 
  }

  /**
   * Private add method
   * @param {string|number} key   [description]
   * @param {T}             value [description]
   */
  private _add(key: string|number, value: T): void {
    this._set[key].push(value);
    this._size++;
  }

  /**
   * Gets the value at the given key
   * @param  {string|number} key [description]
   * @return {T}                 [description]
   */
  public get(key: string|number): T[] {
    if(Obj.isNullOrUndefined(key)) {
      throw Error(`Key: '${key}' is null or undefined`);
    }
    return this._set[key];
  }

  /**
   * Returns the first item in the set of items at the given key
   * @param  {string|number} key The key to retrieve
   * @return {T}                 The first item in the set of items
   */
  public first(key: string|number): T {
    let items = this.get(key);
    return Obj.isNullOrUndefined(items) || Arr.isEmpty(items) ? null : items[0];
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
      throw Error(`Key: '${key}' does not exist in set`);

    let value = this._set[key];
    delete this._set[key];
    this._size--;
    return value;
  }

  /**
   * Pops the last item off of the set of items at the given key
   * @param  {string|number} key The key for the set to pop
   * @return {T}                 The item popped off the end of the set
   */
  public pop(key: string|number): T {
    let value = this.get(key);

    if(Obj.isNullOrUndefined(value)) {
      return null;
    }

    let item = value.pop();
    this._size--;
    return item;
  }

  /**
   * Reveals the last item in the list for the given key
   * @param  {string|number} key The key to check for
   * @return {T}                 The last item in the list
   */
  public peek(key: string|number): T {
    let value = this.get(key);
    if(Obj.isNullOrUndefined(value)) {
      return null;
    }
    return value[value.length - 1];
  }

  /**
   * Empties the set
   */
  public empty(): void {
    this._set = {};
    this._size = 0;
  }
  /**
   * The size of the set
   * @return {number} [description]
   */
  public size(key?: string|number): number {
    if(Obj.isNullOrUndefined(key)) {
      return this._size;
    }

    let value = this.get(key);
    if(Obj.isNullOrUndefined(value)) {
      throw Error(`Value is null or undefined at key: '${key}'`);
    }

    return value.length;
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
   * Iterates over each item in the set belonging to the given key
   * @param {string|number} key       The key to iterate through
   * @param {Function}      predicate The function to call for each item
   */
  public each(key: string|number, predicate: Function): void {
    if(Obj.isNullOrUndefined(key)) {
      throw Error(`Key: '${key}' is null or undefined`);
    }

    if(Func.isNotAFunction(predicate)) {
      throw Error('The given predicate is not a function');
    }

    let items = this.get(key);
    if(Obj.isNullOrUndefined(items)) {
      return;
    }
    items.forEach((item: T, index: number) => {
      predicate(item, index);
    });
  }

  /**
   * Returns whether the given key exists in the set
   * @param {string|number} key [description]
   */
  public exists(key: string|number) {
    return this._set.hasOwnProperty("" + key);
  }

  /**
   * Returns whether or not a value exists (non-null and non-undefined) at
   * the given key
   * @param {string|number} key [description]
   */
  public hasValue(key: string|number) {
    return this.exists(key) && Obj.isNotNullOrUndefined(this.get(key));
  }

  public toList(): any {
    return this._set;
  }

  /**
   * Returns the list as json
   * @return {any} A valid json object
   */
  public toJson(): any {
    return this.toList();
  }

  /**
   * Deserializes the given json and populates the set.
   * @param {any} json The json to deserialize
   */
  public fromJson(json: any): void {
    if(Obj.isNullOrUndefined(json)) {
      this.empty();
      return;
    }

    for(let key in json) {
      let value = json[key];
      if(!Arr.isArray(value)) {
        let list = Obj.isNullOrUndefined(value) ? null : [value];
        this._set[key] = list;
        this._size++;
      } else {
        this._set[key] = value;
        this._size += value.length;
      }
    }
  }
}