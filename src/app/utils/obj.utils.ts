export class Obj {
  public static isNotNullOrUndefined(obj: any): boolean {
    return obj !== null && obj !== undefined;
  }

  public static isNullOrUndefined(obj: any): boolean {
    return !Obj.isNotNullOrUndefined(obj);
  }
}