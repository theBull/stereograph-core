import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { ApiService } from '.';

@NgModule({
  imports: [
    CommonModule,
    HttpModule
  ],
  providers: [ApiService],
  declarations: []
})
export class ApiModule {}
