import { 
  ModalActionType, 
  ModalButtonAlignment,
  ModalButtonSeverity 
} from '../enums';
import { 
  ModalClassObjity,
  OK_DIALOG_CLASS,
  CANCEL_DIALOG_CLASS,
  CLOSE_DIALOG_CLASS,
  EXECUTE_DIALOG_CLASS,
  MISC_DIALOG_CLASS,
  DIALOG_BUTTON_ALIGN_RIGHT, 
  DIALOG_BUTTON_ALIGN_LEFT,
  NORMAL_DIALOG_BUTTON_CLASS,
  WARN_DIALOG_BUTTON_CLASS,
  PRIMARY_DIALOG_BUTTON_CLASS,
  SUCCESS_DIALOG_BUTTON_CLASS
} from '../const';
import { Obj, Func } from '../../utils';

export class ModalButton {

  public text: string;
  public action: Function;
  public visible: boolean;
  public severity: ModalButtonSeverity;
  public class: string;
  public type: ModalActionType;
  public alignment: ModalButtonAlignment;

  constructor(
    text: string, 
    type: ModalActionType, 
    alignment?: ModalButtonAlignment,
    severity?: ModalButtonSeverity,
    action?: Function,
    visible?: boolean
  ) {
    this._checkButtonInitialization(text, type);
    this.text = text;
    this.visible = visible === true;
    this.class = 'modal-button';
    this.setType(type);
    this.setSeverity(
      Obj.isNotNullOrUndefined(severity) ? severity : ModalButtonSeverity.Normal
    );
    this.setAlignment(
      Obj.isNotNullOrUndefined(alignment) ? alignment : ModalButtonAlignment.Right
    );
    this.setAction(
      Obj.isNotNullOrUndefined(action) ? action : (() => {
        console.log('Default button action', this);
      }));
  }

  public setType(type: ModalActionType): void {
    if(Obj.isNullOrUndefined(type)) {
      throw Error('Type is null or undefined');
    }
    this.type = type;

    // Remove existing type class
    this.removeClass(OK_DIALOG_CLASS);
    this.removeClass(CANCEL_DIALOG_CLASS);
    this.removeClass(CLOSE_DIALOG_CLASS);
    this.removeClass(EXECUTE_DIALOG_CLASS);
    this.removeClass(MISC_DIALOG_CLASS);
    this.addClass(ModalClassObjity.getButtonClass(this.type));
  }

  /**
   * Sets the severity class of the button
   * @param {ModalButtonSeverity} severity The severity of the button
   */
  public setSeverity(severity: ModalButtonSeverity): void {
    if(Obj.isNullOrUndefined(severity)) {
      throw Error('Severity is null or undefined');
    }
    this.severity = severity;

    // Remove existing severity class
    this.removeClass(PRIMARY_DIALOG_BUTTON_CLASS);
    this.removeClass(WARN_DIALOG_BUTTON_CLASS);
    this.removeClass(NORMAL_DIALOG_BUTTON_CLASS);
    this.removeClass(SUCCESS_DIALOG_BUTTON_CLASS);
    this.addClass(ModalClassObjity.getSeverityClass(this.severity));
  }

  /**
   * Sets the alignment of the button
   * @param {ModalButtonAlignment} alignment The alignment of the button
   */
  public setAlignment(alignment: ModalButtonAlignment): void {
    if(Obj.isNullOrUndefined(alignment)) {
      throw Error('Alignment is null or undefined');
    }
    this.alignment = alignment;

    // Remove the existing alignment class
    this.removeClass(DIALOG_BUTTON_ALIGN_RIGHT);
    this.removeClass(DIALOG_BUTTON_ALIGN_LEFT);
    this.addClass(ModalClassObjity.getAlignmentClass(this.alignment));
  }

  /**
   * Sets the action which occurs when the button is invoked
   * @param {Function} action A callback function to execute
   */
  public setAction(action: Function): void {
    this._checkButtonEventAction(action);
    this.action = action;
  }

  /**
   * Adds the given class to the button's class list
   * @param {string} className The class to add
   */
  public addClass(className: string): void {
    this.class += ` ${className}`;
  }

  /**
   * Removes the given class from the button's class list
   * @param {string} className The class to remove
   */
  public removeClass(className: string): void {
    // Remove any previous alignment classes
    this.class.replace(className, '');
  }

  /**
   * Checks the event action function for the given event and throws an error
   * if the function is null or undefined.
   * @param {string}   eventName The event for which the action is given.
   * @param {Function} action    The action callback function for the event.
   */
  private _checkButtonEventAction(action: Function): void {
    if(Obj.isNullOrUndefined(action) || Func.isNotAFunction(action)) {
      throw Error(`${this.text} action cannot be null or undefined.`);
    }
  }

  /**
   * Ensures the constructor parameters passed into the Modal Button are valid.
   * @param {string}            text The text to display in the button
   * @param {ModalActionType} type The type of button
   */
  private _checkButtonInitialization(text: string, type: ModalActionType): void {
    if(Obj.isNullOrUndefined(text)) {
      throw Error('Text is null or undefined for ModalButton');
    }
    if(Obj.isNullOrUndefined(type)) {
      throw Error('Type is null or undefined for ModalButton');
    }
  }
}