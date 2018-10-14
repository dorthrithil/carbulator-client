import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FinishTourModalComponent } from './finish-tour-modal.component';

describe('FinishTourModalComponent', () => {
  let component: FinishTourModalComponent;
  let fixture: ComponentFixture<FinishTourModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FinishTourModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FinishTourModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
