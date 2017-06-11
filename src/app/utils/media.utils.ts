export class Media {
  public static getImageType(url: string): string {
    let matches = url.match(
      /((\.png)|(\.jpg)|(\.jpeg)|(\.gif)){1}$/);
    return !matches || matches.length == 0 ? 
      null : `image/${matches[0].replace('.', '')}`;
  }

  public static isAudioType(type: string): boolean {
    return [
      'audio/wav', 
      'audio/mpeg', 
      'audio/ogg'
    ].indexOf(type) > -1;
  }
}