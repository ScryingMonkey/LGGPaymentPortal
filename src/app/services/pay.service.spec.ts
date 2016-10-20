/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { PayService } from './pay.service';

describe('Service: Pay', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PayService]
    });
  });

  it('should ...', inject([PayService], (service: PayService) => {
    expect(service).toBeTruthy();
  }));
});
