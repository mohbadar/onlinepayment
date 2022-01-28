import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DebitAgentAccountComponent } from './debit-agent-account.component';

describe('DebitAgentAccountComponent', () => {
  let component: DebitAgentAccountComponent;
  let fixture: ComponentFixture<DebitAgentAccountComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DebitAgentAccountComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DebitAgentAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
