import * as Utils from '.';

export class Arr {

  /**
   * Returns whether the given array has elements
   * @param  {any[]}   arr The array to check
   * @return {boolean}     True if the array has elements, otherwise false
   */
  public static hasElements(arr: any[]): boolean {
    return Utils.Obj.isNotNullOrUndefined(arr) &&
      arr.length > 0;
  }

  /**
   * Returns whether the array is of the given length
   * @param  {any[]}   arr    The array to check
   * @param  {number}  length The target length
   * @return {boolean}        True if the array is of the given length, otherwise false
   */
  public static isOfLength(arr: any[], length: number): boolean {
    return Utils.Obj.isNotNullOrUndefined(arr) && arr.length === length;
  }

  /**
   * Returns whether the given array is empty
   * @param  {any[]}   arr The array to check
   * @return {boolean}     True if the array is empty, otherwise false
   */
  public static isEmpty(arr: any[]): boolean {
    return !Arr.hasElements(arr);
  }

  /**
   * Returns whether the given object is an array
   * @param  {any}     obj The object to check
   * @return {boolean}     True if the object is an array, otherwise false
   */
  public static isArray(obj: any): boolean {
    return Object.prototype.toString.call(obj) === '[object Array]';
  }
}