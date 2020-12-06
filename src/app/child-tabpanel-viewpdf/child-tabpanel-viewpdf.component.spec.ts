import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChildTabpanelViewpdfComponent } from './child-tabpanel-viewpdf.component';

describe('ChildTabpanelViewpdfComponent', () => {
  let component: ChildTabpanelViewpdfComponent;
  let fixture: ComponentFixture<ChildTabpanelViewpdfComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChildTabpanelViewpdfComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChildTabpanelViewpdfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
