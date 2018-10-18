import { FinancesModule } from './finances.module';

describe('FinancesModule', () => {
  let financesModule: FinancesModule;

  beforeEach(() => {
    financesModule = new FinancesModule();
  });

  it('should create an instance', () => {
    expect(financesModule).toBeTruthy();
  });
});
