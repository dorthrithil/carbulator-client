import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommunitiesInviteUserModalComponent } from './communities-invite-user-modal.component';

describe('CommunitiesInviteUserModalComponent', () => {
  let component: CommunitiesInviteUserModalComponent;
  let fixture: ComponentFixture<CommunitiesInviteUserModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CommunitiesInviteUserModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommunitiesInviteUserModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
