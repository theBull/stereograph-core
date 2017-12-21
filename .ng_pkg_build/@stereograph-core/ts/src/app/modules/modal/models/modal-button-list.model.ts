import { List } from '../../collections';
import { ModalActionType } from '../enums';
import { ModalButton } from '.';

export class ModalButtonList extends List<ModalButton> {
  constructor() {
    super();
  }

  /**
   * Searches the button list for all buttons matching the given type
   * @param  {ModalActionType} type The type of button to retrieve
   * @return {ModalButton[]}         The matching button(s)
   */
  public getButtonsByType(type: ModalActionType): ModalButton[] {
    return this.filter((button: ModalButton, index: number) => {
      return button.type === type;
    });
  }

  /**
   * Searches the button list for buttons with the matching type and returns the first match
   * @param  {ModalActionType} type The type of button to retrieve
   * @return {ModalButton}           The matching button
   */
  public getButtonByType(type: ModalActionType): ModalButton {
    return this.filterFirst((button: ModalButton, index: number) => {
      return button.type === type;
    });
  }
}