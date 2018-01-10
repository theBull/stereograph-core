import { Component } from '@angular/core';
import { ModalService } from './modules/modal';
import { ModalTestingComponent } from './testing/modal-testing/modal-testing.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private _modalService: ModalService) {}
  public testModal(): void {
    this._modalService.open<ModalTestingComponent>(ModalTestingComponent, false);
  }
}
