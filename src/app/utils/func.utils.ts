import * as Utils from '.';

export class Func {
  public static isNotAFunction(fn: Function): boolean {
    return Utils.Obj.isNullOrUndefined(fn) || typeof fn !== 'function';
  }

  public static isAFunction(fn: Function): boolean {
    return !Func.isNotAFunction(fn);
  }
}