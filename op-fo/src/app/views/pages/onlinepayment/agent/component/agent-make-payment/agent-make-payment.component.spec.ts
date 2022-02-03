import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgentMakePaymentComponent } from './agent-make-payment.component';

describe('AgentMakePaymentComponent', () => {
  let component: AgentMakePaymentComponent;
  let fixture: ComponentFixture<AgentMakePaymentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgentMakePaymentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgentMakePaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
