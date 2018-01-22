import { TestBed, inject } from '@angular/core/testing';

import { DateConverterService } from './date-converter.service';

describe('DateConverterService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DateConverterService]
    });
  });

  it('should ...', inject([DateConverterService], (service: DateConverterService) => {
    expect(service).toBeTruthy();
  }));
});
