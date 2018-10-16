import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RefuelBoxComponent } from './refuel-box.component';

describe('RefuelBoxComponent', () => {
  let component: RefuelBoxComponent;
  let fixture: ComponentFixture<RefuelBoxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RefuelBoxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RefuelBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
