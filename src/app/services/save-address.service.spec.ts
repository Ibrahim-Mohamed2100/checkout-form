import { TestBed } from '@angular/core/testing';

import { SaveAddressService } from './save-address.service';

describe('SaveAddressService', () => {
  let service: SaveAddressService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SaveAddressService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
