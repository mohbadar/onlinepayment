import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmBillPaymentComponent } from './confirm-bill-payment.component';

describe('ConfirmBillPaymentComponent', () => {
  let component: ConfirmBillPaymentComponent;
  let fixture: ComponentFixture<ConfirmBillPaymentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfirmBillPaymentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmBillPaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
