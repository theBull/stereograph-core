import { Component } from '@angular/core';
import { ModalService, TestModalComponent } from './modal';

@Component({
  selector: 'app-root',
  template: `<h1>{{title}}</h1><modal></modal><button (click)="openModal()">Modal</button>`,
  styles: [``]
})
export class AppComponent {
  title = 'CORE';

  constructor(private _modalService: ModalService) {}

  public openModal(): void {
    this._modalService.open<TestModalComponent>(TestModalComponent);
  }
}
