import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommunitiesWizardComponent } from './communities-wizard.component';

describe('CommunitiesWizardComponent', () => {
  let component: CommunitiesWizardComponent;
  let fixture: ComponentFixture<CommunitiesWizardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CommunitiesWizardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommunitiesWizardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
