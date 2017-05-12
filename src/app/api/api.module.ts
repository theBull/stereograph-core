import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule, JsonpModule } from '@angular/http';
import { ApiService } from '.';

@NgModule({
  imports: [
    CommonModule,
    HttpModule,
    JsonpModule
  ],
  providers: [ApiService],
  declarations: []
})
export class ApiModule {}
