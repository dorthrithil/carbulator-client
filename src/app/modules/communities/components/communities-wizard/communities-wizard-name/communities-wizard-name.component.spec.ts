import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommunitiesWizardNameComponent } from './communities-wizard-name.component';

describe('CommunitiesWizardNameComponent', () => {
  let component: CommunitiesWizardNameComponent;
  let fixture: ComponentFixture<CommunitiesWizardNameComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CommunitiesWizardNameComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommunitiesWizardNameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
