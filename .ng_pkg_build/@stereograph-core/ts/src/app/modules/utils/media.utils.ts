import { Str } from '.';

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

  public static dataUrlToBlob(dataUrl: string, mimeType: string): Blob {
    const binary = atob(dataUrl.split(',')[1]);
    let array = [];
    for (let i = 0; i < binary.length; i++) {
      array.push(binary.charCodeAt(i));
    }

    return new Blob([new Uint8Array(array)], {type: mimeType});
  }

  public static dataUrlToFile(imageUrl: string, mimeType: string, imageName?: string): File {
    let blob = Media.dataUrlToBlob(imageUrl, mimeType);
    let photoId = Str.isEmptyString(imageName) ? `photo-${Date.now()}` : imageName;
    return new File([blob], photoId, {type: mimeType});
  }
}
