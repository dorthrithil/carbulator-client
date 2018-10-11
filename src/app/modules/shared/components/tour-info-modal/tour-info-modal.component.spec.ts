import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TourInfoModalComponent } from './tour-info-modal.component';

describe('TourInfoModalComponent', () => {
  let component: TourInfoModalComponent;
  let fixture: ComponentFixture<TourInfoModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TourInfoModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TourInfoModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
