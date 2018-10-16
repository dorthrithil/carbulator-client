import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommunityRefuelCardComponent } from './community-refuel-card.component';

describe('CommunityRefuelCardComponent', () => {
  let component: CommunityRefuelCardComponent;
  let fixture: ComponentFixture<CommunityRefuelCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CommunityRefuelCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommunityRefuelCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
