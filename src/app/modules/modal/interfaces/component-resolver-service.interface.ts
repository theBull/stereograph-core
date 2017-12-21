import { ViewContainerRef, ComponentRef, Type } from '@angular/core';

export interface IComponentResolverService {
  createComponent<T>(type: Type<T>, viewContainerRef: ViewContainerRef): ComponentRef<T>;
}