import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommunitiesDeleteModalComponent } from './communities-delete-modal.component';

describe('CommunitiesDeleteModalComponent', () => {
  let component: CommunitiesDeleteModalComponent;
  let fixture: ComponentFixture<CommunitiesDeleteModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CommunitiesDeleteModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommunitiesDeleteModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
