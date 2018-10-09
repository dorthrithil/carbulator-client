import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommunityMemberCardComponent } from './community-member-card.component';

describe('CommunityMemberCardComponent', () => {
  let component: CommunityMemberCardComponent;
  let fixture: ComponentFixture<CommunityMemberCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CommunityMemberCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommunityMemberCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
