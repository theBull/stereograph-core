import { 
  ModalActionType, 
  ModalButtonAlignment,
  ModalButtonSeverity 
} from '../enums';
import { Obj } from '../../utils';

export const OK_DIALOG_CLASS = 'modal-button-ok';
export const CANCEL_DIALOG_CLASS = 'modal-button-cancel';
export const CLOSE_DIALOG_CLASS = 'modal-button-close';
export const EXECUTE_DIALOG_CLASS = 'modal-button-execute';
export const MISC_DIALOG_CLASS = 'modal-button-misc';
export const PRIMARY_DIALOG_BUTTON_CLASS = 'modal-button-primary';
export const SUCCESS_DIALOG_BUTTON_CLASS = 'modal-button-success';
export const WARN_DIALOG_BUTTON_CLASS = 'modal-button-warn';
export const NORMAL_DIALOG_BUTTON_CLASS = 'modal-button-normal';
export const DIALOG_BUTTON_ALIGN_RIGHT = 'modal-button-align-right';
export const DIALOG_BUTTON_ALIGN_LEFT = 'modal-button-align-left';

export class ModalClassObjity {

  /**
   * Returns the severity class of the given severity
   * @param  {ModalButtonSeverity} severity The severity level
   * @return {string}                        The button severity class
   */
  public static getSeverityClass(severity: ModalButtonSeverity): string {
    if(Obj.isNullOrUndefined(severity)) {
      throw Error('Modal button severity is null or undefined');
    }
    switch(severity) {
      case ModalButtonSeverity.Primary:
        return ` ${PRIMARY_DIALOG_BUTTON_CLASS}`;
      case ModalButtonSeverity.Warn:
        return ` ${WARN_DIALOG_BUTTON_CLASS}`;
      case ModalButtonSeverity.Normal:
        return ` ${NORMAL_DIALOG_BUTTON_CLASS}`;
      case ModalButtonSeverity.Success:
        return ` ${SUCCESS_DIALOG_BUTTON_CLASS}`;
      default:
        return ` ${NORMAL_DIALOG_BUTTON_CLASS}`;
    }
  }

  /**
   * Returns the button class of the given button type
   * @param  {ModalActionType} type The button type
   * @return {string}                 The class of the button
   */
  public static getButtonClass(type: ModalActionType): string {
    if(Obj.isNullOrUndefined(type)) {
      throw Error('Modal action type is null or undefined');
    }
    switch(type) {
      case ModalActionType.OK:
        return ` ${OK_DIALOG_CLASS}`;
      case ModalActionType.Cancel:
        return ` ${CANCEL_DIALOG_CLASS}`;
      case ModalActionType.Close:
        return ` ${CLOSE_DIALOG_CLASS}`;
      case ModalActionType.Execute:
        return ` ${EXECUTE_DIALOG_CLASS}`;
      case ModalActionType.Miscellaneous:
        return ` ${MISC_DIALOG_CLASS}`;
      default:
        return ` ${MISC_DIALOG_CLASS}`;
    }
  }

  /**
   * Returns the modal button alignment class
   * @param  {ModalButtonAlignment} alignment [description]
   * @return {string}                           [description]
   */
  public static getAlignmentClass(alignment: ModalButtonAlignment): string {
    if(Obj.isNullOrUndefined(alignment)) {
      throw Error('Modal button alignment is null or undefined');
    }
    switch(alignment) {
      case ModalButtonAlignment.Right:
        return ` ${DIALOG_BUTTON_ALIGN_RIGHT}`;
      case ModalButtonAlignment.Left:
        return ` ${DIALOG_BUTTON_ALIGN_LEFT}`;
      default:
        return '';
    }
  }
}
