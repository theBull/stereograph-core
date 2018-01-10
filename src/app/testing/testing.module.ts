import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalTestingComponent } from './modal-testing/modal-testing.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [ModalTestingComponent],
  exports: [ModalTestingComponent],
  entryComponents: [ModalTestingComponent]
})
export class TestingModule { }
