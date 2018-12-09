import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {CommunitiesDetailTabviewComponent} from './communities-detail-tabview.component';

describe('CommunitiesDetailTabviewComponent', () => {
  let component: CommunitiesDetailTabviewComponent;
  let fixture: ComponentFixture<CommunitiesDetailTabviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CommunitiesDetailTabviewComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommunitiesDetailTabviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
