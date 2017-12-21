import * as Utils from '.';

export class Rand {
  public static guid(): string {
    function s4() {
      return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
    }
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
      s4() + '-' + s4() + s4() + s4();
  }
  

  public static getRandomNumber(min: number, max: number): number {
    return Math.random() * (max - min) + min;
  }

  public static getRandomInt(min: number, max: number): number {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max = min)) + min;
  }

  public static getRandomIntInclusive(min: number, max: number): number {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  /**
   * Generates a random hexidecimal color code
   * @param  {number} length (optional) the length of the hex to generate 
   *                         (3 - #fff or 6 - #ffffff). Default is 6.
   * @return {string}        Returns the randomly generated hex color
   */
  public randomHex(length?: number): string {
    if(Utils.Obj.isNullOrUndefined(length) || length % 3 != 0)
      length = 6;

    let hex = '#';
    let values = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 'a', 'b', 'c', 'd', 'e', 'f'];

    for(let i = 0; i <= length; i++) {
      hex += values[Rand.getRandomInt(0, values.length)];
    }
    return hex;
  }
}