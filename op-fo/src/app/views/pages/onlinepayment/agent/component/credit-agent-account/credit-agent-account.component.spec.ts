import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreditAgentAccountComponent } from './credit-agent-account.component';

describe('CreditAgentAccountComponent', () => {
  let component: CreditAgentAccountComponent;
  let fixture: ComponentFixture<CreditAgentAccountComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreditAgentAccountComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreditAgentAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
