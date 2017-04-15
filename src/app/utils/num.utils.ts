import * as Utils from '.';

export class Num {
  
  public static isNaN(...nums: any[]): boolean {
    if(!nums || nums.length == 0) {
      return true;
    }
    for(let i = 0; i < nums.length; i++) {
      let num = nums[i];
      if(Utils.Obj.isNullOrUndefined(num) || isNaN(num)) {
        return true;
      }
    }
    return false;
  }
  public static isNegative(...args: number[]): boolean {
    return !Num.isNonNegative(...args);
  }
  public static isNonNegative(...args: number[]): boolean {
    args.forEach((num: number) => {
      if (Utils.Obj.isNullOrUndefined(num) && num < 0) {
        return false;
      };
    });
    return true;
  }
  public static sameSign(a: number, b: number): boolean {
    return a * b >= 0;
  }
}