import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {CommunitiesUserSearchComponent} from './communities-wizard-users.component';

describe('CommunitiesWizardUsersComponent', () => {
  let component: CommunitiesUserSearchComponent;
  let fixture: ComponentFixture<CommunitiesUserSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CommunitiesUserSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommunitiesUserSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
