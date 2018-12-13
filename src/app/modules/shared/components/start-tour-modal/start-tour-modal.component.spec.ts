import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {StartTourModalComponent} from './start-tour-modal.component';

describe('StartTourModalComponent', () => {
  let component: StartTourModalComponent;
  let fixture: ComponentFixture<StartTourModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StartTourModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StartTourModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
