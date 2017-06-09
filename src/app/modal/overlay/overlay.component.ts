import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-overlay',
  templateUrl: './overlay.component.html',
  styleUrls: ['./overlay.component.css']
})
export class OverlayComponent {

  @Output() public onClick = new EventEmitter<void>();

  constructor() { }

  public click(event: any): void {
    this.onClick.emit();
  }
}
