import { ViewContainerRef, Type, ComponentRef } from '@angular/core';
import { ModalButtonList } from '../models';
import { ModalActionType } from '../enums';
import { List } from 'app/collections';

export interface IModalService {

  buttons: ModalButtonList;
  visible: boolean;
  wrapper: ViewContainerRef;
  modalComponent: ComponentRef<any>;
  overlayIsBlocking: boolean;
  closeCallbacks: List<Function>;
  completeCallbacks: List<Function>;

  setOverlayBlocking(overlayBlocking: boolean): void;
  isOverlayBlocking(): boolean;
  overlayClick(): void;
  isVisible(): boolean;
  setVisibility(isVisible: boolean): void;
  onButtonClick(type: ModalActionType, action: Function): void;
  open<T>(component: Type<T>, blocking?: boolean): void;
  close(): void;
  onClose(callback: Function): void;
  complete(): void;
  onComplete(callback: Function): void;
  setWrapper(wrapper: ViewContainerRef): void;
}