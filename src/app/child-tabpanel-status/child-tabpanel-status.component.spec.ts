import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChildTabpanelStatusComponent } from './child-tabpanel-status.component';

describe('ChildTabpanelStatusComponent', () => {
  let component: ChildTabpanelStatusComponent;
  let fixture: ComponentFixture<ChildTabpanelStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChildTabpanelStatusComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChildTabpanelStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
