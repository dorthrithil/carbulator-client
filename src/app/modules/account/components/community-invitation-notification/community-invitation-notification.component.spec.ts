import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommunityInvitationNotificationComponent } from './community-invitation-notification.component';

describe('CommunityInvitationNotificationComponent', () => {
  let component: CommunityInvitationNotificationComponent;
  let fixture: ComponentFixture<CommunityInvitationNotificationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CommunityInvitationNotificationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommunityInvitationNotificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
