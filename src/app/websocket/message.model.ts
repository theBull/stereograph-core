export class Message {
  private _text: string;
  private _name: string;

  constructor() {}

  public setName(name: string): void {
    this._name = name;
  }
  public getName(): string {
    return this._name;
  }
  public setText(text: string): void {
    this._text = text;
  }
  public getText(): string {
    return this._text;
  }

  public toJson(): any {
    return {
      name: this._name,
      text: this._text
    }
  }

  public fromJson(json: any): void {
    if(!json)
      return;

    this._name = json.name;
    this._text = json.text;
  }
}