import { NgModule, CUSTOM_ELEMENTS_SCHEMA, ComponentFactory } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TestModalModule } from './testing';

/**
 * Components
 */
import { ModalComponent } from '.';
import { OverlayComponent } from './overlay';

/**
 * Services
 */
import { 
  ModalService,
  ComponentResolverService,
} from './services';

@NgModule({
  imports: [
    CommonModule,
    TestModalModule
  ],
  declarations: [
    ModalComponent,
    OverlayComponent
  ],
  entryComponents: [
    OverlayComponent
  ],
  providers: [
    ModalService,
    ComponentResolverService
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
  exports: [
    ModalComponent
  ]
})
export class ModalModule { }
