export class Str {
  public static readonly EMPTY = '';
  
  public static isNotEmptyString(string: string): boolean {
    return string && string !== '';
  }
  public static isEmptyString(string: string): boolean {
    return !Str.isNotEmptyString(string);
  }
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