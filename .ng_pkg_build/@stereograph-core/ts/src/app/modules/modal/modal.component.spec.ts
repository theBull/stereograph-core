 /* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ModalComponent } from './';
import { 
  ModalService,
  ComponentResolverService
} from './services';
import { 
  ComponentResolverMockService,
  ModalMockService 
} from './testing';

describe('ModalComponent', () => {
  let component: ModalComponent;
  let fixture: ComponentFixture<ModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ModalComponent
      ],
      providers: [
        {
          provide: ModalService,
          useClass: ModalMockService 
        },
        {
          provide: ComponentResolverService,
          useClass: ComponentResolverMockService
        }
      ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should not exist when its visiblity flag is false', () => {
    component.setVisibility(false);
    let element = document.querySelector('modal');
    expect(element).toBeNull();
  });

  it('should exist when its visibility flag is true', () => {
    component.setVisibility(true);
    let element = document.querySelector('modal');
    expect(element).toBeDefined();
  });

  it('should not have contents by default', () => {
    component.setVisibility(true);
    let element = document.querySelector('modal > .wrapper');
    expect(element).toBeDefined();
  });
});
