import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommunityPayoffCardComponent } from './community-payoff-card.component';

describe('CommunityPayoffCardComponent', () => {
  let component: CommunityPayoffCardComponent;
  let fixture: ComponentFixture<CommunityPayoffCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CommunityPayoffCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommunityPayoffCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
