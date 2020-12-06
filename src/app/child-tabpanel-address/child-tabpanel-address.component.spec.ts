import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChildTabpanelAddressComponent } from './child-tabpanel-address.component';

describe('ChildTabpanelAddressComponent', () => {
  let component: ChildTabpanelAddressComponent;
  let fixture: ComponentFixture<ChildTabpanelAddressComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChildTabpanelAddressComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChildTabpanelAddressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
