export class Obj {

  /**
   * Returns whether the given object is not null and not undefined
   * @param  {any}     obj The object to test
   * @return {boolean}     True if the object is not null or undefined, otherwise false
   */
  public static isNotNullOrUndefined(obj: any): boolean {
    return obj !== null && obj !== undefined;
  }

  /**
   * Returns whether the given object is null or undefined
   * @param  {any}     obj The object to test
   * @return {boolean}     True if the object is null or undefined, otherwise false
   */
  public static isNullOrUndefined(obj: any): boolean {
    return !Obj.isNotNullOrUndefined(obj);
  }

  /**
   * Returns a clone of the given object
   * @param  {any} obj The object to clone
   * @return {any}     A clone of the object
   */
  public static clone(obj: any): any {
    return JSON.parse(JSON.stringify(obj));
  }

  /**
   * Returns whether the two objects are equal
   * @param  {any}     obj1 The first object to compare
   * @param  {any}     obj2 The second object to compare
   * @return {boolean}      True of both objects contain the same keys and values, otherwise false
   */
  public static equals(obj1: any, obj2: any): boolean {
    return JSON.stringify(obj1) === JSON.stringify(obj2);
  }

  /**
   * Returns whether the given object has the given key
   * @param  {any}           obj The object to test
   * @param  {string|number} key The key to test for
   * @return {boolean}           True if the key exists in the object, otherwise false
   */
  public static hasKey(obj: any, key: string|number): boolean {
    return Obj.isNotNullOrUndefined(obj) && obj.hasOwnProperty(key);
  }
}