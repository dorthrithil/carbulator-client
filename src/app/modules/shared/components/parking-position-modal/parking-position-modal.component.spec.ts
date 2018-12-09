import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ParkingPositionModalComponent} from './parking-position-modal.component';

describe('ParkingPositionModalComponent', () => {
  let component: ParkingPositionModalComponent;
  let fixture: ComponentFixture<ParkingPositionModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ParkingPositionModalComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ParkingPositionModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
