import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchaseorderSearchComponent } from './purchaseorder-search.component';

describe('PurchaseorderSearchComponent', () => {
  let component: PurchaseorderSearchComponent;
  let fixture: ComponentFixture<PurchaseorderSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PurchaseorderSearchComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PurchaseorderSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
