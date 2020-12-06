import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChildTabpanelDetailComponent } from './child-tabpanel-detail.component';

describe('ChildTabpanelDetailComponent', () => {
  let component: ChildTabpanelDetailComponent;
  let fixture: ComponentFixture<ChildTabpanelDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChildTabpanelDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChildTabpanelDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
