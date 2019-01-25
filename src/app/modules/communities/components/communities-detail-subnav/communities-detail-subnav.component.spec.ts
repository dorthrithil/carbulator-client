import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {CommunitiesDetailSubnavComponent} from './communities-detail-subnav.component';

describe('CommunitiesDetailSubnavComponent', () => {
  let component: CommunitiesDetailSubnavComponent;
  let fixture: ComponentFixture<CommunitiesDetailSubnavComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CommunitiesDetailSubnavComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommunitiesDetailSubnavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
