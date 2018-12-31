import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {MomentFilterComponent} from './moment-filter.component';

describe('MomentFilterComponent', () => {
  let component: MomentFilterComponent;
  let fixture: ComponentFixture<MomentFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MomentFilterComponent]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MomentFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
