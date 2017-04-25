import { Obj } from '.';

export class Num {
  
  public static isNaN(...nums: any[]): boolean {
    if(!nums || nums.length == 0) {
      return true;
    }
    for(let i = 0; i < nums.length; i++) {
      let num = nums[i];
      if(Obj.isNullOrUndefined(num) || isNaN(num)) {
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
      if (Obj.isNullOrUndefined(num) && num < 0) {
        return false;
      };
    });
    return true;
  }
  public static sameSign(a: number, b: number): boolean {
    return a * b >= 0;
  }

  public static getEnumDictionary(list: any): any {
    let names = Num.getEnumNames(list);
    let enums = Num.getEnumValues(list);
    let dictionary = {};

    for(let i = 0; i < names.length; i++) {
      dictionary[names[i]] = enums[i];
    }

    return dictionary;
  }

  public static getEnumNames(list: any): string[] {
    if(Obj.isNullOrUndefined(list)) {
      throw Error('Enum list is null or undefined; cannot get names');
    }
    let names = [];

    for(let k in list) {
      let value = list[k];
      if(Num.isNaN(value)) {
        names.push(value);
      }
    }

    return names;
  }

  public static getEnumValues(list: any): number[] {
    if(Obj.isNullOrUndefined(list)) {
      throw Error('Enum list is null or undefined; cannot get values');
    }

    let enums = [];

    for(let k in list) {
      let value = list[k];
      if(!Num.isNaN(value)) {
        enums.push(value);
      }
    }

    return enums;
  }
}