import { TestBed, inject } from '@angular/core/testing';

import { WebSocketService } from '.';

describe('WebSocketService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [WebSocketService]
    });
  });

  it('should ...', inject([WebSocketService], (service: WebSocketService) => {
    expect(service).toBeTruthy();
  }));
});
