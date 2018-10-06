import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommunitiesWizardCarComponent } from './communities-wizard-car.component';

describe('CommunitiesWizardCarComponent', () => {
  let component: CommunitiesWizardCarComponent;
  let fixture: ComponentFixture<CommunitiesWizardCarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CommunitiesWizardCarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommunitiesWizardCarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
