import { Component } from '@angular/core';
import { ModalService, TestModalComponent } from './modal';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'CORE';

  constructor(private _modalService: ModalService) {}

  public openModal(): void {
    this._modalService.open<TestModalComponent>(TestModalComponent);
  }
}
