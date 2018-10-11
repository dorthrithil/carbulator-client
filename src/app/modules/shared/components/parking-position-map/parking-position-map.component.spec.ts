import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ParkingPositionMapComponent } from './parking-position-map.component';

describe('ParkingPositionMapComponent', () => {
  let component: ParkingPositionMapComponent;
  let fixture: ComponentFixture<ParkingPositionMapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ParkingPositionMapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ParkingPositionMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
