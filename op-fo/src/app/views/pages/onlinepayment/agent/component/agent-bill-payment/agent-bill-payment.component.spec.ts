import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgentBillPaymentComponent } from './agent-bill-payment.component';

describe('AgentBillPaymentComponent', () => {
  let component: AgentBillPaymentComponent;
  let fixture: ComponentFixture<AgentBillPaymentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgentBillPaymentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgentBillPaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
