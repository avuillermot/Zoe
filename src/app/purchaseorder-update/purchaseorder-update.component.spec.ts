import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchaseorderUpdateComponent } from './purchaseorder-update.component';

describe('PurchaseorderUpdateComponent', () => {
  let component: PurchaseorderUpdateComponent;
  let fixture: ComponentFixture<PurchaseorderUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PurchaseorderUpdateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PurchaseorderUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
