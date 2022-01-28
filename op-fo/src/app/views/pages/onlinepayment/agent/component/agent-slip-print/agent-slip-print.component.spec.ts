import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgentSlipPrintComponent } from './agent-slip-print.component';

describe('AgentSlipPrintComponent', () => {
  let component: AgentSlipPrintComponent;
  let fixture: ComponentFixture<AgentSlipPrintComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgentSlipPrintComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgentSlipPrintComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
