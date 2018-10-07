import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommunitiesRenameModalComponent } from './communities-rename-modal.component';

describe('CommunitiesRenameModalComponent', () => {
  let component: CommunitiesRenameModalComponent;
  let fixture: ComponentFixture<CommunitiesRenameModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CommunitiesRenameModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommunitiesRenameModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
