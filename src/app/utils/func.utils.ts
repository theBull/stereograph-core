import { Obj } from '.';

export class Func {

  /**
   * Returns whether the given argument is not a function
   * @param  {Function} fn The argument to check
   * @return {boolean}     True if the given argument is not a function, otherwise false
   */
  public static isNotAFunction(arg: any): boolean {
    return Obj.isNullOrUndefined(arg) || typeof arg !== 'function';
  }

  /**
   * Returns whether the given argument is a function
   * @param  {Function} fn The argument to check
   * @return {boolean}     True if the given argument is a function, otherwise false
   */
  public static isAFunction(arg: any): boolean {
    return !Func.isNotAFunction(arg);
  }
}