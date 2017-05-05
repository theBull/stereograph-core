export class Str {

  /**
   * Empty string constant.
   * @type {String}
   */
  public static readonly EMPTY = '';

  /**
   * Returns whether the given value is a string
   * @param  {string}  value the value to check
   * @return {boolean}       True if the value is of type string, otherwise false
   */
  public static isString(value: any): boolean {
    return typeof value === 'string';
  }

  /**
   * Returns whether the given string is NOT an empty string.
   * @param  {string}  string The string to check
   * @return {boolean}        True if the string is not empty, otherwise false.
   */
  public static isNotEmptyString(string: string): boolean {
    return string && string !== '';
  }

  /**
   * Returns whether the given string is an empty string
   * @param  {string}  string The string to check
   * @return {boolean}        True if the string is empty, otherwise false
   */
  public static isEmptyString(string: string): boolean {
    return !Str.isNotEmptyString(string);
  }

  /**
   * Formats the given string by inserting tokens according to the
   * tokenized location of string indices, "{N}", in n-order.
   * @param  {string}             formatString The string with tokenized string indices
   * @param  {(string|number)[]}  ...tokens    The strings to insert at each tokenized index
   * @return {string}                          The formatted string
   */
  public static stringFormat(formatString: string, ...tokens: (string | number)[]): string {
    if (!tokens || tokens.length === 0) {
      return formatString;
    }
    for (let i = 0; i < tokens.length; i++) {
      formatString = formatString.replace(`{${i}}`, tokens[i] + '');
    }
    return formatString;
  }
}