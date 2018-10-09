import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommunitiesDetailComponent } from './communities-detail.component';

describe('CommunitiesDetailComponent', () => {
  let component: CommunitiesDetailComponent;
  let fixture: ComponentFixture<CommunitiesDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CommunitiesDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommunitiesDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
