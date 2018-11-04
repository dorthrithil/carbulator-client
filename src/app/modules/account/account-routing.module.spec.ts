import { AccountRoutingModule } from './account-routing.module';

describe('AccountRoutingModule', () => {
  let accountRoutingModule: AccountRoutingModule;

  beforeEach(() => {
    accountRoutingModule = new AccountRoutingModule();
  });

  it('should create an instance', () => {
    expect(accountRoutingModule).toBeTruthy();
  });
});
