import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// ---
// Services
// ---
import { MouseService } from '.';

@NgModule({
  imports: [
    CommonModule
  ],
  providers: [MouseService],
  declarations: []
})
export class MouseModule { }
