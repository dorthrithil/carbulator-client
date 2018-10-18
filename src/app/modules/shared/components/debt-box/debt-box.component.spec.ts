import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DebtBoxComponent } from './debt-box.component';

describe('DebtBoxComponent', () => {
  let component: DebtBoxComponent;
  let fixture: ComponentFixture<DebtBoxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DebtBoxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DebtBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
