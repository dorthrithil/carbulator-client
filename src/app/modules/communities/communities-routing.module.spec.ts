import { CommunitiesRoutingModule } from './communities-routing.module';

describe('CommunitiesRoutingModule', () => {
  let communitiesRoutingModule: CommunitiesRoutingModule;

  beforeEach(() => {
    communitiesRoutingModule = new CommunitiesRoutingModule();
  });

  it('should create an instance', () => {
    expect(communitiesRoutingModule).toBeTruthy();
  });
});
