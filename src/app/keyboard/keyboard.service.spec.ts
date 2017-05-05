import { TestBed, inject } from '@angular/core/testing';
import { KeyboardService } from '.';

describe('KeyboardService', () => {
  let service = new KeyboardService();

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [KeyboardService]
    });
  });

  it('should create', () => {
    expect(service).toBeTruthy();
  });
});
