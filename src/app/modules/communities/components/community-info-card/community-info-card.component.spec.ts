import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommunityInfoCardComponent } from './community-info-card.component';

describe('CommunityInfoCardComponent', () => {
  let component: CommunityInfoCardComponent;
  let fixture: ComponentFixture<CommunityInfoCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CommunityInfoCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommunityInfoCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
