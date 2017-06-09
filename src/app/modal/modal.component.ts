import { 
  Component, 
  OnInit, 
  Inject, 
  ViewChild, 
  ViewContainerRef, 
  AfterViewInit 
} from '@angular/core';
import { 
  ModalService,
  ComponentResolverService 
} from './services';
import { 
  IModalService 
} from './interfaces';

@Component({
  selector: 'modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit, AfterViewInit {

  @ViewChild('wrapper', {read: ViewContainerRef}) wrapper;

  constructor(@Inject(ModalService) private _modalService: IModalService) {}

  public ngOnInit(): void {
  }

  /**
   * Initializes the modal service with this component
   * as the wrapper element
   */
  public ngAfterViewInit() {
    this._modalService.setWrapper(this.wrapper);
  }

  /**
   * Sets the visibility of the modal
   * @param {boolean} isVisible True if visible, otherwise false
   */
  public setVisibility(isVisible: boolean): void {
    this._modalService.setVisibility(isVisible);
  }

  /**
   * Click event bound to the overlay which causes the modal to close.
   * @param {any} event Default javascript click event object
   */
  public overlayClick(event: any) {
    this._modalService.overlayClick();
  }

  /**
   * Click handler which calls the modal service's close method.
   */
  public close(): void {
    console.log('closing modal');
    this._modalService.close();
  }
}
