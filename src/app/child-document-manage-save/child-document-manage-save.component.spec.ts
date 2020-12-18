import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChildDocumentManageSaveComponent } from './child-document-manage-save.component';

describe('ChildDocumentManageSaveComponent', () => {
  let component: ChildDocumentManageSaveComponent;
  let fixture: ComponentFixture<ChildDocumentManageSaveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChildDocumentManageSaveComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChildDocumentManageSaveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
