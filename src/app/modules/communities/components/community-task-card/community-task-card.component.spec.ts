import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {CommunityTaskCardComponent} from './community-task-card.component';

describe('CommunityTaskCardComponent', () => {
  let component: CommunityTaskCardComponent;
  let fixture: ComponentFixture<CommunityTaskCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CommunityTaskCardComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommunityTaskCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
