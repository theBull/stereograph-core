import * as Utils from '.';

export class Arr {
  public static hasElements(arr: any[]): boolean {
    return Utils.Obj.isNotNullOrUndefined(arr) &&
      arr.length > 0;
  }

  public static isOfLength(arr: any[], length: number): boolean {
    return Utils.Obj.isNotNullOrUndefined(arr) && arr.length === length;
  }

  public static isEmpty(arr: any[]): boolean {
    return !Arr.hasElements(arr);
  }
}