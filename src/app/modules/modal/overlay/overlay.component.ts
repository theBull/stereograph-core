import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-overlay',
  template: `<div (click)="click()" class="overlay"></div>`,
  styles: [`:host .overlay{position:fixed;z-index:9998;background-color:rgba(0,0,0,.5);height:100%;width:100%;top:0;left:0}:host .overlay-blocking{pointer-events:none}`]
})
export class OverlayComponent {

  @Output() public onClick = new EventEmitter<void>();

  constructor() { }

  public click(): void {
    this.onClick.emit();
  }
}
