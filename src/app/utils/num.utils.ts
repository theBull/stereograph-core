import { Obj } from '.';

export class Num {

  /**
   * Returns whether the given value is a number
   * @param  {any}     value The value to check
   * @return {boolean}       True if the value is a number, otherwise false
   */
  public static isNumber(value: any): boolean {
    return Obj.isNotNullOrUndefined(value) && typeof value === "number" && !isNaN(value);
  }
  
  /**
   * Returns whether any of the numbers in the given list of arguments
   * are not a number.
   * @param  {any[]}   ...nums A list of number arguments to check
   * @return {boolean}         True if there exists at least one number in the list
   * that is not a number.
   */
  public static isNaN(...nums: any[]): boolean {
    if(!nums || nums.length == 0) {
      return true;
    }

    let test = false;
    nums.forEach((num: number) => {
      if(!Num.isNumber(num)) {
        test = true;
      }
    });
    return test;
  }

  /**
   * Returns whether any of the given arguments are negative numbers
   * @param  {number[]} ...args The list of arguments to check
   * @return {boolean}          True if at least 1 argument is a negative number
   */
  public static isNegative(...args: number[]): boolean {
    return !Num.isNonNegative(...args);
  }

  /**
   * Returns whether all of the given arguments are non-negative numbers
   * @param  {number[]} ...args The list of arguments to check
   * @return {boolean}          True if all arguments are non-negative numbers
   */
  public static isNonNegative(...args: number[]): boolean {
    let test = true;
    args.forEach((num: number) => {
      if (Num.isNumber(num) && num < 0) {
        test = false;
      };
    });
    return test;
  }

  /**
   * Returns whether the two given numbers have the same mathematical sign.
   * @param  {number}  a The first value to compare
   * @param  {number}  b The second value to compare
   * @return {boolean}   True if both numbers have the same sign, otherwise false
   */
  public static sameSign(a: number, b: number): boolean {
    return a * b >= 0;
  }

  /**
   * Returns a dictionary of enum name as a string to its enum value as a number
   * @param  {any} list The enum list to iterate
   * @return {any}      The resulting enum set
   */
  public static getEnumDictionary(list: any): any {
    let names = Num.getEnumNames(list);
    let enums = Num.getEnumValues(list);
    let dictionary = {};

    for(let i = 0; i < names.length; i++) {
      dictionary[names[i]] = enums[i];
    }

    return dictionary;
  }

  /**
   * Returns an enum list as an array of enum string names
   * @param  {any}      list The enum list to iterate
   * @return {string[]}      The array of enum names as strings
   */
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

  /**
   * Returns a list of enum values as an array of numbers
   * @param  {any}      list The enum list to iterate
   * @return {number[]}      The resulting array of enum value numbers
   */
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