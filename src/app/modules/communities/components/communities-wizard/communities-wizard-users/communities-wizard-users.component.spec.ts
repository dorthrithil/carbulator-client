import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommunitiesWizardUsersComponent } from './communities-wizard-users.component';

describe('CommunitiesWizardUsersComponent', () => {
  let component: CommunitiesWizardUsersComponent;
  let fixture: ComponentFixture<CommunitiesWizardUsersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CommunitiesWizardUsersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommunitiesWizardUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
