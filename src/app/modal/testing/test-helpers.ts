import { Inject, ComponentFactoryResolver } from '@angular/core';
import { 
  ComponentResolverService, 
  ModalService 
} from '../services';
import { 
  ComponentResolverMockService,
  ModalMockService 
} from './';
import { 
  IComponentResolverService, 
  IModalService 
} from '../interfaces';

export class ModalTestHelpers {
  /**
   * Returns a new component resolver service
   * @return {ComponentResolverService} [description]
   */
  public static getComponentResolverService(): IComponentResolverService {
    return new ComponentResolverService(Inject(ComponentFactoryResolver));
  }

  /**
   * Returns a new mock component resolver service
   * @return {ComponentResolverMockService} [description]
   */
  public static getComponentResolverMockService(): IComponentResolverService {
    return new ComponentResolverMockService(Inject(ComponentFactoryResolver));
  }

  /**
   * Returns a new modal service
   * @return {IModalService} The newly instantiated Modal service
   */
  public static getModalService(): IModalService {
    return new ModalService(ModalTestHelpers.getComponentResolverService());
  }

  /**
   * Returns a new mock modal service
   * @return {IModalService} The newly instantiated mock modal service
   */
  public static getModalMockService(): IModalService {
    return new ModalMockService(ModalTestHelpers.getComponentResolverMockService());
  }
}