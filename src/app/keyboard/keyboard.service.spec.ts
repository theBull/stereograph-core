import { TestBed, inject } from '@angular/core/testing';
import { KeyInputService } from './key-input.service';

describe('KeyInputService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [KeyInputService]
    });
  });

  it('should ...', inject([KeyInputService], (service: KeyInputService) => {
    expect(service).toBeTruthy();
  }));
});
