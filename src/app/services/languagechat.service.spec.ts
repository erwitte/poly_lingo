import { TestBed } from '@angular/core/testing';

import { LanguagechatService } from './languagechat.service';

describe('LanguagechatService', () => {
  let service: LanguagechatService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LanguagechatService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
