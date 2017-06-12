/**
 * @fileoverview This file is generated by the Angular template compiler.
 * Do not edit.
 * @suppress {suspiciousCode,uselessCode,missingProperties,missingOverride}
 */
 /* tslint:disable */


import * as import0 from '@angular/core';
import * as import1 from '../../../../../src/app/modal/testing/test-modal.module';
import * as import2 from '@angular/common';
import * as import3 from '../../../../../src/app/modal/testing/modal.mock.service';
import * as import4 from '../../../../../src/app/modal/testing/component-resolver.mock.service';
import * as import5 from './test-modal.component.ngfactory';
import * as import6 from '../../../../../src/app/modal/services/component-resolver.service';
class TestModalModuleInjector extends import0.ɵNgModuleInjector<import1.TestModalModule> {
  _CommonModule_0:import2.CommonModule;
  _TestModalModule_1:import1.TestModalModule;
  __NgLocalization_2:import2.NgLocaleLocalization;
  __ModalMockService_3:import3.ModalMockService;
  __ComponentResolverMockService_4:import4.ComponentResolverMockService;
  constructor(parent:import0.Injector) {
    super(parent,[import5.TestModalComponentNgFactory],([] as any[]));
  }
  get _NgLocalization_2():import2.NgLocaleLocalization {
    if ((this.__NgLocalization_2 == null)) { (this.__NgLocalization_2 = new import2.NgLocaleLocalization(this.parent.get(import0.LOCALE_ID))); }
    return this.__NgLocalization_2;
  }
  get _ModalMockService_3():import3.ModalMockService {
    if ((this.__ModalMockService_3 == null)) { (this.__ModalMockService_3 = new import3.ModalMockService(this.parent.get(import6.ComponentResolverService))); }
    return this.__ModalMockService_3;
  }
  get _ComponentResolverMockService_4():import4.ComponentResolverMockService {
    if ((this.__ComponentResolverMockService_4 == null)) { (this.__ComponentResolverMockService_4 = new import4.ComponentResolverMockService(this.componentFactoryResolver)); }
    return this.__ComponentResolverMockService_4;
  }
  createInternal():import1.TestModalModule {
    this._CommonModule_0 = new import2.CommonModule();
    this._TestModalModule_1 = new import1.TestModalModule();
    return this._TestModalModule_1;
  }
  getInternal(token:any,notFoundResult:any):any {
    if ((token === import2.CommonModule)) { return this._CommonModule_0; }
    if ((token === import1.TestModalModule)) { return this._TestModalModule_1; }
    if ((token === import2.NgLocalization)) { return this._NgLocalization_2; }
    if ((token === import3.ModalMockService)) { return this._ModalMockService_3; }
    if ((token === import4.ComponentResolverMockService)) { return this._ComponentResolverMockService_4; }
    return notFoundResult;
  }
  destroyInternal():void {
  }
}
export const TestModalModuleNgFactory:import0.NgModuleFactory<import1.TestModalModule> = new import0.NgModuleFactory<any>(TestModalModuleInjector,import1.TestModalModule);
//# sourceMappingURL=data:application/json;base64,eyJmaWxlIjoiL1VzZXJzL3N0ZXJlb2dyYXBoL2ZyYW1ld29yay9jb3JlL3NyYy9hcHAvbW9kYWwvdGVzdGluZy90ZXN0LW1vZGFsLm1vZHVsZS5uZ2ZhY3RvcnkudHMiLCJ2ZXJzaW9uIjozLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJuZzovLy9Vc2Vycy9zdGVyZW9ncmFwaC9mcmFtZXdvcmsvY29yZS9zcmMvYXBwL21vZGFsL3Rlc3RpbmcvdGVzdC1tb2RhbC5tb2R1bGUudHMiXSwic291cmNlc0NvbnRlbnQiOlsiICJdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7In0=