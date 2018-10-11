import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommunityTourCardComponent } from './community-tour-card.component';

describe('CommunityTourCardComponent', () => {
  let component: CommunityTourCardComponent;
  let fixture: ComponentFixture<CommunityTourCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CommunityTourCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommunityTourCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
