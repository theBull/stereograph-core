/* tslint:disable:no-unused-variable */

import { Component } from '@angular/core';
import { TestBed, async, inject, ComponentFixture } from '@angular/core/testing';
import { 
  ModalService,
  ComponentResolverService 
} from '.';
import { ModalComponent } from '../';
import { ModalActionType } from '../enums';
import { OverlayComponent } from '../overlay';
import { 
  ComponentResolverMockService,
  TestModalModule,
  TestModalComponent 
} from '../testing';

describe('ModalService', () => {
  let modalService: ModalService = null;
  let modalComponentModalService: modalService = null;
  let componentResolverService: ComponentResolverService = null;
  let modalComponent: ModalComponent;
  let fixture: ComponentFixture<ModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        TestModalModule
      ],
      declarations: [
        ModalComponent,
        OverlayComponent
      ],
      providers: [
        ModalService,
        {
          provide: ComponentResolverService,
          useClass: ComponentResolverMockService
        }
      ]
    }).compileComponents();
    fixture = TestBed.createComponent(ModalComponent);
    modalComponent = fixture.componentInstance;
    modalComponentModalService = fixture.debugElement.injector.get(ModalService);
    fixture.detectChanges();
  });

  beforeEach(inject([ModalService, ComponentResolverService], 
    (service: ModalService, componentResolver: ComponentResolverService) => {
      modalService = service;
      componentResolverService = componentResolver;
    }));

  it('should be created properly', () => {
    expect(modalService).toBeTruthy();
  });

  it('should throw an error if no wrapper is defined', () => {
    modalService.wrapper = null;
    expect(() => { 
      modalService.open<TestModalComponent>(TestModalComponent) 
    }).toThrowError();
  });

  it('should create a child component when opening', () => {
    modalService.setWrapper(modalComponent.wrapper);
    modalService.open<TestModalComponent>(TestModalComponent);
    expect(modalService.modalComponent).toBeDefined();
    let modalChildComponent = document.querySelector('#test-modal-component');
    expect(modalChildComponent).toBeDefined();
  });

  it('should have an ok button by default', () => {
    let okButton = modalService.buttons.getButtonByType(ModalActionType.OK);
    expect(okButton).toBeDefined();
    expect(okButton.type).toBe(ModalActionType.OK);
  });

  it('should have a cancel button by default', () => {
    let cancelButton = modalService.buttons.getButtonByType(ModalActionType.Cancel);
    expect(cancelButton).toBeDefined();
    expect(cancelButton.type).toBe(ModalActionType.Cancel);
  });

  it('should destroy child component on close', () => {
    modalService.setWrapper(modalComponent.wrapper);
    modalService.open<TestModalComponent>(TestModalComponent);
    expect(modalService.modalComponent).toBeDefined();
  });
});