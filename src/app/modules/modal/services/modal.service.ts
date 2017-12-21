import { Injectable, ComponentRef, Type, Inject, ViewContainerRef } from '@angular/core';
import { Obj, Func } from '../../utils';
import { List } from '../../collections';
import { ComponentResolverService } from '.';
import { 
  IComponentResolverService,
  IModalService 
} from '../interfaces';
import { OverlayComponent } from '../overlay';
import { 
  ModalActionType,
  ModalButtonAlignment,
  ModalButtonSeverity 
} from '../enums';
import { 
  ModalButton,
  ModalButtonList 
} from '../models';

@Injectable()
export class ModalService implements IModalService {

  public buttons: ModalButtonList;
  public visible: boolean;
  public wrapper: ViewContainerRef;
  public overlayIsBlocking: boolean;
  public modalComponent: ComponentRef<any>;
  public closeCallbacks: List<Function>;
  public completeCallbacks: List<Function>;

  constructor( 
    @Inject(ComponentResolverService) 
    private _componentResolverService: IComponentResolverService
  ) {
    // Nullify the modal component and wrapper to ensure a clean start
    this.wrapper = null;
    this.modalComponent = null;

    // hide modal by default
    this.visible = false;

    // Default - determines whether clicking the overlay has any effect.
    // blocking = true indicates clicking the overlay does *not* close the modal.
    this.overlayIsBlocking = true;

    // Instantiate all default modal buttons
    this.buttons = new ModalButtonList();

    // Wire up the OK button to invoke the primary action
    let okButton = new ModalButton(
      'OK', 
      ModalActionType.OK,
      ModalButtonAlignment.Right,
      ModalButtonSeverity.Primary,
      () => {
        console.log('ok button clicked');
      },
      false
    );

    // Wire up the close button to invoke the close action
    let closeButton = new ModalButton(
      'Close', 
      ModalActionType.Close,
      ModalButtonAlignment.Right,
      ModalButtonSeverity.Normal,
      () => {
        console.log('close button clicked');
        this.close();
      },
      false
    );

    // Wire up the cancel button to have default close functionality
    let cancelButton = new ModalButton(
      'Cancel', 
      ModalActionType.Cancel, 
      ModalButtonAlignment.Right,
      ModalButtonSeverity.Warn,
      () => {
        console.log('cancel button clicked');
        this.close();
      },
      false
    );

    // Wire up the execute button for default execute functionality
    let executeButton = new ModalButton(
      'Execute', 
      ModalActionType.Execute,
      ModalButtonAlignment.Left,
      ModalButtonSeverity.Success,
      () => {
        console.log('Execute button clicked');
      },
      false
    );

    // Add all the default buttons
    this.buttons.add(okButton, cancelButton, closeButton, executeButton);

    // Callback funcion arrays
    this.closeCallbacks = new List<Function>();
    this.completeCallbacks = new List<Function>();
  }

  /**
   * Returns the current modal component, which is the component that is rendered
   * within the modal wrapper.
   * @return {ComponentRef<any>} The component to render inside the modal
   */
  public getModalComponent(): ComponentRef<any> {
    return this.modalComponent;
  }

  /**
   * Returns whether there is currently a modal component specified
   * @return {boolean} True if the child modal component exists, otherwise false
   */
  public hasModalComponent(): boolean {
    return Obj.isNotNullOrUndefined(this.modalComponent);
  }

  /**
   * Sets whether the overlay is blocking (blocking = clicking overlay does *not* close
   * the modal).
   * @param {boolean} overlayBlocking True if clicking the overlay does not close the modal,
   *                                  otherwise, false.
   */
  public setOverlayBlocking(overlayBlocking: boolean): void {
    this.overlayIsBlocking = overlayBlocking === false ? false : this.overlayIsBlocking;
  }

  /**
   * Returns whether the overlay is blocking.
   * @return {boolean} True if cllicking the overlay does *not* close the modal, otherwise false.
   */
  public isOverlayBlocking(): boolean {
    return this.overlayIsBlocking;
  }

  /**
   * Click handler for the overlay click event
   */
  public overlayClick(): void {
    if(!this.isOverlayBlocking()) {
      this.close();
    }
  }

  /**
   * Returns whether or not the modal is visible
   * @return {boolean} True if the modal is visible, otherwise false
   */
  public isVisible(): boolean {
    return this.visible;
  }

  /**
   * Sets whether the modal is visible or not
   * @param {boolean} isVisible True to make the modal visible, otherwise false
   */
  public setVisibility(isVisible: boolean): void {
    this.visible = isVisible === true;
  }

  /**
   * Adds the given button type to the button list
   * @param {string}            name The name of the button
   * @param {string}            text The text to display in the button
   * @param {ModalActionType} type The modal action type of the button
   */
  public addButton(text: string, type: ModalActionType): void {
    this.buttons.add(new ModalButton(text, type));
  }

  /**
   * Adds the given function as a click event handler to the button with the give type
   * @param {ModalActionType} type   The type of button to pass the action to
   * @param {Function}          action The action function to execute when the button is clicked
   */
  public onButtonClick(type: ModalActionType, action: Function): void {
    let button = this.buttons.getButtonByType(type);
    if(Obj.isNullOrUndefined(button)) {
      throw Error(`Button of type ${type} does not exist; 
        you may need to create the button first using .addButton(...)`);
    }
    button.setAction(action);
  }

  /**
   * Opens a new modal window, optionally inserting it into a target container, with a blocking 
   * or non-blocking overlay
   * 
   * @param {Type<T>} componentType  The component type to create which contains a template 
   *                                 to use as the contents of the modal.
   * @param {boolean} blocking       Optionally specify whether the overlay behind the modal
   *                                 is blocking (it blocks click events to the document 
   *                                 beneath the overlay), or non-blocking (the user can close
   *                                 the modal by clicking on the overlay).                                 
   */
  public open<T>(component: Type<T>, blocking?: boolean): void {

    // Ensure the wrapper is valid before attempting to create the modal contents
    this._checkWrapper(this.wrapper);

    // Prevent the modal from opening twice if it's already open
    if(this.visible || Obj.isNotNullOrUndefined(this.modalComponent)) {
      return;
    }
     
    // Show the modal
    this.setVisibility(true);

    // Set overlay blocking; null or undefined will resolve to false.
    this.setOverlayBlocking(blocking);
    
    // Dynamically create the component which contains an element
    // reference to the template that will be rendered in the modal
    this.modalComponent = this._componentResolverService.createComponent<T>(
      component,
      this.wrapper
    );
  }

  /**
   * Closes the modal, destroying the modal child (if exists) and overlay components
   */
  public close(): void {
    if(this.hasModalComponent()) {
      this.modalComponent.destroy();
      this.modalComponent = null;
    }
    this.setVisibility(false);
    console.log('close modal');
    this.closeCallbacks.removeEach(onClose => onClose());
  }

  /**
   * Registers a callback to occur when the modal closes
   * @param {Function} callback The callback to execute
   */
  public onClose(callback: Function): void {
    // Do runtime check
    if(Func.isAFunction(callback)) {
      this.closeCallbacks.add(callback);
    }
  }

  /**
   * Triggers when the modal primary action is completed
   */
  public complete(): void {
    this.close();
    this.completeCallbacks.removeEach(onComplete => onComplete());
  }

  /**
   * Registers callback functions to execute when the modal complete method is invoked
   * @param {Function} callback [description]
   */
  public onComplete(callback: Function): void {
    // Do runtime check
    if(Func.isAFunction(callback)) {
      this.completeCallbacks.add(callback);
    }
  }

  /**
   * Sets the target warpper container in which to inject the modal.
   * @param {ViewContainerRef} wrapper The warpper container
   */
  public setWrapper(wrapper: ViewContainerRef): void {
    this._checkWrapper(wrapper);
    this.wrapper = wrapper;
  }

  /**
   * Checks that there is a valid wrapper, which is a ViewContainerRef,
   * otherwise throws an error
   * @param {ViewContainerRef} wrapper A ViewContainerRef for the modal contents
   */
  private _checkWrapper(wrapper: ViewContainerRef): void { 
    if(Obj.isNullOrUndefined(wrapper)) {
      throw Error('No target container has been specified.');
    }  
  }
}
