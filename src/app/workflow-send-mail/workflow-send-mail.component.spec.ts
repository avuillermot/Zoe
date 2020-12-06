import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkflowSendMailComponent } from './workflow-send-mail.component';

describe('WorkflowSendMailComponent', () => {
  let component: WorkflowSendMailComponent;
  let fixture: ComponentFixture<WorkflowSendMailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WorkflowSendMailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkflowSendMailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
