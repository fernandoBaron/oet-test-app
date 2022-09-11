import { TestBed } from '@angular/core/testing';

import { AuthAnonymousValidateGuard } from './auth-anonymous-validate.guard';

describe('AuthAnonymousValidateGuard', () => {
  let guard: AuthAnonymousValidateGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AuthAnonymousValidateGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
