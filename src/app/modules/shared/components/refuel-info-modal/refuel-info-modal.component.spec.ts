import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RefuelInfoModalComponent } from './refuel-info-modal.component';

describe('RefuelInfoModalComponent', () => {
  let component: RefuelInfoModalComponent;
  let fixture: ComponentFixture<RefuelInfoModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RefuelInfoModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RefuelInfoModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
