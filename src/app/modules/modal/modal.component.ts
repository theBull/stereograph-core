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
  selector: 'sg-modal',
  //template: `<div [hidden]="!modalService().visible"><div class="container"><div class="modal"><div class="wrapper" #wrapper><div class="close" (click)="close()"><span class="ti-close"></span></div></div><div class="buttons"><button [hidden]="!button.visible" *ngFor="let button of modalService().buttons.toArray()" class="{{button.class}}" (click)="button.action()">{{button.text}}</button></div></div><app-overlay (onClick)="overlayClick($event)"></app-overlay></div></div>`,
  templateUrl: './modal.component.html',
  //styles: [`.container{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-pack:center;-ms-flex-pack:center;justify-content:center;-webkit-box-align:center;-ms-flex-align:center;align-items:center;height:100%;width:100%;position:fixed;top:0;left:0}.modal{min-height:3em;-ms-flex-item-align:center;align-self:center;background-color:#e6e7e8;border:1px solid #333;border-radius:2px;padding:1em;width:85vw;max-height:75vh;-webkit-box-shadow:0 0 .5em rgba(0,0,0,.5);box-shadow:0 0 .5em rgba(0,0,0,.5);z-index:9999}.modal,.wrapper{position:relative}.buttons,.close{position:absolute}.close{top:0;right:0;cursor:pointer;z-index:9999;color:#000;padding:.5em .5em .25em}.close:hover{background-color:rgba(220,221,222,.9);color:#333}.buttons{height:auto;bottom:0;left:0;width:100%;padding:1em}.modal-button-align-left{float:left}.modal-button-align-right{float:right}.modal-button{font-size:1.2em;padding:.15em .5em .25em;margin:.25em;cursor:pointer;vertical-align:top;min-height:2em;min-width:4em}.modal-button-success{background-color:#58bb76;color:#fffefd;border:1px solid #2a854d}.modal-button-success:hover{background-color:#81ab80}.modal-button-primary{background-color:#1db0ed;color:#fffefd;border:1px solid #1582b2}.modal-button-primary:hover{background-color:#099cd9}.modal-button-warn{background-color:#ffb82e;color:#333;border:1px solid #e67c00}.modal-button-warn:hover{background-color:#e5a712;color:#000}.modal-button-normal{background-color:#d8d8d8;color:#333;border:1px solid #646464}.modal-button-normal:hover{background-color:#b4b4b4;color:#555}`]
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit, AfterViewInit {

  @ViewChild('wrapper', {read: ViewContainerRef}) wrapper;

  constructor(@Inject(ModalService) private _modalService: IModalService) {}

  public ngOnInit(): void {
  }

  public modalService(): IModalService {
    return this._modalService;
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
    this._modalService.close();
  }
}
