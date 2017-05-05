import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// ---
// Services
// ---
import { WebSocketService } from '.';

@NgModule({
  imports: [
    CommonModule
  ],
  providers: [WebSocketService],
  declarations: []
})
export class WebSocketModule { }
