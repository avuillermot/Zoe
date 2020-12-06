import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChildDocumentHeaderComponent } from './child-document-header.component';

describe('ChildDocumentHeaderComponent', () => {
  let component: ChildDocumentHeaderComponent;
  let fixture: ComponentFixture<ChildDocumentHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChildDocumentHeaderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChildDocumentHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
