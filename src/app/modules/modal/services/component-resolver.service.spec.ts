/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ComponentResolverService } from '.';

describe('ComponentResolverService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ComponentResolverService]
    });
  });

  it('should be creatable', 
    inject([ComponentResolverService], (service: ComponentResolverService) => {
      expect(service).toBeTruthy();
  }));
});
