import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ChangelogEntryComponent} from './changelog-entry.component';

describe('ChangelogEntryComponent', () => {
  let component: ChangelogEntryComponent;
  let fixture: ComponentFixture<ChangelogEntryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChangelogEntryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangelogEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
