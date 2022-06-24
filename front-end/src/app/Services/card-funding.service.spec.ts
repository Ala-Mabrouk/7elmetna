import { TestBed } from '@angular/core/testing';

import { CardFundingService } from './card-funding.service';

describe('CardFundingService', () => {
  let service: CardFundingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CardFundingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
