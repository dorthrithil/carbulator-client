import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {CommunitiesDetailWrapperComponent} from './communities-detail-wrapper.component';

describe('CommunitiesDetailWrapperComponent', () => {
  let component: CommunitiesDetailWrapperComponent;
  let fixture: ComponentFixture<CommunitiesDetailWrapperComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CommunitiesDetailWrapperComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommunitiesDetailWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
