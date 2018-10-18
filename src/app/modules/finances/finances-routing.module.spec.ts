import { FinancesRoutingModule } from './finances-routing.module';

describe('FinancesRoutingModule', () => {
  let financesRoutingModule: FinancesRoutingModule;

  beforeEach(() => {
    financesRoutingModule = new FinancesRoutingModule();
  });

  it('should create an instance', () => {
    expect(financesRoutingModule).toBeTruthy();
  });
});
