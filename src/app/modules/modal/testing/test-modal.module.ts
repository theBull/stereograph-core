import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * Components
 */
import { TestModalComponent } from '.';

/**
 * Services
 */
import { ModalMockService } from '.';
import { ComponentResolverMockService } from '.';

@NgModule({
  imports: [
    CommonModule
  ],
  providers: [
    ModalMockService,
    ComponentResolverMockService
  ],
  declarations: [
    TestModalComponent
  ],
  entryComponents: [
    TestModalComponent
  ]
})
export class TestModalModule { }
