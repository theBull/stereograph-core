import { Rand, Obj, Arr } from '../utils';

export class List<T extends any> {

  private _itemIds: string [];
  private _size: number;
  public items: T[];

  constructor() {
    this.items = <T[]>[];
    this._itemIds = [];
    this._size = 0;
  }


  public addOne(item: T, guid?: string): void {
    item['_list_item_id'] = item['_list_item_id'] || guid || Rand.guid();
    this._itemIds.push(item['_list_item_id']);
    this.items.push(item);
    this._size++; 
  }

  /**
   * Adds an item (or multiple item arguments) to the
   * list.
   *
   * NOTE: this list enforces unique items - if the item
   * already exists in the list, it will be overwritten.
   * 
   * @param {T[]} ...itemArgs The item(s) to add
   */
  public add(...itemArgs: T[]): void {
    if(!itemArgs || itemArgs.length == 0) {
      return;
    }
    for(let i = 0; i < itemArgs.length; i++) {
      let item = itemArgs[i];
      if(!item) {
        continue;
      }
      if(this.contains(item)) {
        this.replaceAtIndex(item, this.indexOf(item));
      } else {
        this.addOne(item);
      }     
    }   
  }

  /**
   * Removes the given item from the list and
   * returns that item
   * @param  {T} item The item to remove
   * @return {T}      The removed item
   */
  public remove(item: T): T {
    if (Obj.isNullOrUndefined(item)) {
      return null;
    }

    let indexToRemove = -1;
    const itemToRemove = this.items.filter((element, index) => {
      const test = element._list_item_id === item._list_item_id;
      if (test && indexToRemove < 0) {
        indexToRemove = index;
      }
      return test;
    });

    if (Obj.isNullOrUndefined(itemToRemove) || indexToRemove < 0) {
      return null;
    }
    return this.removeAtIndex(indexToRemove);
  }

  /**
   * Removes each item from the array, starting from the end,
   * and passes the item into the provided callback, once
   * for each item.
   * @param {Function} callback A callback function to execute over each removed item
   */
  public removeEach(callback: Function): void {
    while(this.hasElements()) {
      callback(this.items.pop());
    }
  }

  /**
   * Removes the first item in the list
   * @return {T} the removed item
   */
  public removeFirst(): T {
    return this.removeAtIndex(0);
  }

  /**
   * Removes the item at the given index
   * @param  {number} index index at which to remove the item
   * @return {T}            the removed item
   */
  public removeAtIndex(index: number): T {
    const sliceItems = this.items.splice(index, 1);
    if (Obj.isNullOrUndefined(sliceItems) || Arr.isEmpty(sliceItems)) {
      return null;
    }
    const sliceItem = sliceItems[0];
    this._itemIds.splice(this._itemIds.indexOf(sliceItem._list_item_id), 1);

    this._size--;
    return sliceItem;
  }

  /**
   * Replaces the item in the list at the given index.
   * If there is no item at that index, nothing happens.
   * @param {T} item The item to replace
   * @return {T}     The item replaced
   */
  public replaceAtIndex(item: T, index: number): T {
    if(!item) {
      return;
    }
    let replacedItem = null;
    if(this.hasElementAtIndex(index)) {
      replacedItem = this.items[index];
      this.items[index] = item;
      this._itemIds[this._itemIds.indexOf(replacedItem._list_item_id)] = item._list_item_id;
    }
    return replacedItem;
  }

  /**
   * Returns the first element in the list
   * @return {T} the first element
   */
  public first(): T {
    return this.items ? this.items[0] : null;
  }

  /**
   * Returns the last element in the list
   * @return {T} The last element
   */
  public last(): T {
    return this.items ? this.items[this.size() -1] : null;
  }

  /**
   * Gets the given item from the list
   * @param  {T} item The item to get
   * @return {T}      The item, if it exists in the list
   */
  public get(guid: string): T {
    return this.filterFirst((item: T, index: number) => {
      return item._list_item_id === guid;
    });
  }

  /**
   * Returns the index of the given item, if it exists,
   * otherwise -1.
   * @param  {T}      item The item to search for
   * @return {number}      The item index
   */
  public indexOf(item: T): number {   
    let matchingIndex = -1;
    if(item) {
      this.forEach((element: T, index: number) => {
        if(element._list_item_id == item._list_item_id) {
          matchingIndex = index;
        }
      });
    }
    return matchingIndex;
  }

  /**
   * Returns whether the given item exists in the list
   * @param  {T}       item the item to search for
   * @return {boolean}      true if the item exists, otherwise false
   */
  public contains(item: T): boolean {
    return this.indexOf(item) > -1;
  }

  /**
   * The size of the list
   * @return {number} Size of the list
   */
  public size(): number {
    return this.items ? this.items.length : 0;
  }

  /**
   * Returns whether the list has any elements
   * @return {boolean} true if the list has elements, otherwise false
  */ 
  public hasElements(): boolean {
    return this.size() > 0;
  }

  /**
   * Returns whether the list has an element at the given index
   * @param  {number}  index the index to check
   * @return {boolean}       true if there is an element, otherwise false
   */
  public hasElementAtIndex(index: number): boolean {
    let item = this.items[index];
    return index < this.size() &&
      index >= 0 && 
      Obj.isNotNullOrUndefined(item) &&
      this._itemIds.indexOf(item._list_item_id) >= 0;
  }

  /**
   * Returns whether the list is empty
   * @return {boolean} true if the list is empty, otherwise false
   */
  public isEmpty(): boolean {
    return !this.hasElements();
  }

  /**
   * Empties the entire list
   * @return {T[]} Returns the list of items
   */
  public empty(): T[] {
    let items = this.items;
    this.items = [];
    this._itemIds = [];
    this._size = 0;
    return items;
  }

  /**
   * Concatenates the given list items on to this list's array of items.
   * Optionally, you can pass in a predicate function to run to prevent
   * certain items from being concatenated if the predicate function returns
   * falsy.
   * @param  {List<T>} The list to add to this current list
   * @param  {Function} An optional condition function which determines which elements get ignored
   * @return {List<T>} Returns the concatenated list
   */
  public concat(list: List<T>, ignoreConditionPredicate?: Function): List<T> {
    if (!list) {
        list = new List<T>();
      } else if (!list.items) {
        list.items = [];
      }

    // check that the incoming items haven't been already
    // added to the current list of items
    for (let i = 0; i < list.items.length; i++) {
      const item = list.items[i];
      if (item) {

        // if the item has not yet been added to the list of items...        
        if (this._itemIds.indexOf(item._list_item_id) < 0) {
          if (ignoreConditionPredicate && ignoreConditionPredicate(item, i)) {
            console.log('ignore items', item);
            // if the condition predicate exists and returns a falsy value,
            // simply continue; do not add the items onto the current list.
            continue;
          }

          // push it onto the items array
          // (our predicate condition has passed, or didn't exist)
          // and track that the id has been used
          this.addOne(item);
        }
      }
    }
    return this;
  }

  /**
   * Iterates over the list of items and calls the given
   * function for each item, receiving the current item and its index
   * @param {Function} predicate The function to call
   */
  public forEach(predicate: Function): void {
    if(!predicate) {
      return;
    }
    for(let i = 0; i < this.items.length; i++) {
      predicate(this.items[i], i);
    }
  }

  /**
   * Filters the list by the return function defined
   * in the given function, returning an array of items
   * for which the given test is true
   * @param  {Function} predicate The test function
   * @return {T[]}                a list of items that meet the given criteria
   */
  public filter(predicate: Function): T[] {
    let results: T[] = [];
    if(!predicate) {
      return results;
    }
    
    for(let i = 0; i < this.items.length; i++) {
      let item = this.items[i];
      if(predicate(item, i)) {
        results.push(item);
      }
    }

    return results;
  }

  /**
   * Filters the items (see the `filter` method) and returns the
   * first result.
   * @param  {Function} predicate the test function
   * @return {T}                  the first result
   */
  public filterFirst(predicate: Function): T {
    let results = this.filter(predicate);
    return !results || results.length == 0 ? null : results[0];
  }

  /**
   * Returns this list as an array literal.
   * @return {T[]} The array of items
   */
  public toJson(): T[] {
    return this.toArray();
  }

  /**
   * Return the array of items.
   * @return {T[]} [description]
   */
  public toArray(): T[] {
    return this.items;
  }

  /**
   * Populates this list with the items in the given array
   * literal.
   * @param {T[]} items The array of items to populate this list with
   * @param {T}   clone @TODO
   */
  public fromJson(items: T[], clone?: T): void {
    if(!items) {
      return;
    }
    for(var i = 0; i < items.length; i++) {
      let item = items[i];
      if(item) {
        this.add(item); 
      }     
    }
  }  

}