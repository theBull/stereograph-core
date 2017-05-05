import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// ---
// Services
// ---
import { KeyboardService } from '.';

@NgModule({
  imports: [
    CommonModule
  ],
  providers: [KeyboardService],
  declarations: []
})
export class KeyboardModule { }
