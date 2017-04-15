import { Injectable } from '@angular/core';
import { Message } from '.';

@Injectable()
export class WebSocketService {

  private readonly _protocol = 'ws://';
  private readonly _host = 'localhost:';
  private readonly _port = 8001;

  private _client: any;
  private _messageCallback: Function;
  private _connectedCallback: Function;

  constructor() {
    this._client = new WebSocket(`${this._protocol}${this._host}${this._port}`, 'echo-protocol');
    this._messageCallback = () => { console.log('default message'); }
  }

  public initialize(
    connectedCallback: Function, 
    messageCallback: Function
  ) {

    this._connectedCallback = connectedCallback;
    this._messageCallback = messageCallback;

    this._client.onopen = (connection) => {
        
        console.log('WebSocket Client Connected');

        if(this._connectedCallback) {
          this._connectedCallback(connection);
        }
    };

    this._client.onerror = (error) => {
        console.log("Connection Error: " + error.toString());
    };
    
    this._client.onclose = () => {
        console.log('echo-protocol Connection Closed');
    };
    
    this._client.onmessage = (event) => {
        let message = new Message();
        message.fromJson(JSON.parse(event.data));

        console.log(message);
        if(this._messageCallback) {
          this._messageCallback(message);
        }            
    };
  }

  public sendMessage(message: Message): void {
    this._client.send(JSON.stringify(message));
  }
}
