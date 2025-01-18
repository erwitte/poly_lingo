import { TestBed } from '@angular/core/testing';

import { UiTranslatorService } from './ui-translator.service';

describe('UiTranslatorService', () => {
  let service: UiTranslatorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UiTranslatorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
