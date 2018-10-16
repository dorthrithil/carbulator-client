import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateRefuelModalComponent } from './create-refuel-modal.component';

describe('CreateRefuelModalComponent', () => {
  let component: CreateRefuelModalComponent;
  let fixture: ComponentFixture<CreateRefuelModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateRefuelModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateRefuelModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
