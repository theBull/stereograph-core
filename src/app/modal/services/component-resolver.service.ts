import { 
  Injectable,  
  ComponentFactoryResolver,  
  ViewContainerRef,
  Type,
  ComponentRef
} from '@angular/core';
import { Obj } from '../../utils';
import { IComponentResolverService } from '../interfaces';

@Injectable()
export class ComponentResolverService implements IComponentResolverService {

  constructor(private _componentFactoryResolver: ComponentFactoryResolver) { }

  /**
   * Creates and returns a new instance of the given Component
   * @param  {IDialogComponent} component  The Component to create
   * @param  {ViewContainerRef} viewContainer    The view container in which to render the Component
   * @return {ComponentRef<T>}                  The newly instantiated ComponentRef
   */
  public createComponent<T>(
    component: Type<T>,
    viewContainerRef: ViewContainerRef
  ): ComponentRef<T> {

    if(Obj.isNullOrUndefined(component) || Obj.isNullOrUndefined(viewContainerRef)) {
      throw Error('Component Type or View Container is null or undefined');
    }
    let factory = this._componentFactoryResolver.resolveComponentFactory(component);
    let createdComponent = viewContainerRef.createComponent(factory);
    createdComponent.changeDetectorRef.detectChanges();
    return createdComponent;
  }
}
