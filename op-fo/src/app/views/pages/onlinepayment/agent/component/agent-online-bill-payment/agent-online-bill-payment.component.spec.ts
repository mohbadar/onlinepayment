import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgentOnlineBillPaymentComponent } from './agent-online-bill-payment.component';

describe('AgentOnlineBillPaymentComponent', () => {
  let component: AgentOnlineBillPaymentComponent;
  let fixture: ComponentFixture<AgentOnlineBillPaymentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgentOnlineBillPaymentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgentOnlineBillPaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
