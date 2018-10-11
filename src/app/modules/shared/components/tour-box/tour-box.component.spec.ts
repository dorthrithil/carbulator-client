import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TourBoxComponent } from './tour-box.component';

describe('TourBoxComponent', () => {
  let component: TourBoxComponent;
  let fixture: ComponentFixture<TourBoxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TourBoxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TourBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
