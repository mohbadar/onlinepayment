import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgentBalanceSheetComponent } from './agent-balance-sheet.component';

describe('AgentBalanceSheetComponent', () => {
  let component: AgentBalanceSheetComponent;
  let fixture: ComponentFixture<AgentBalanceSheetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgentBalanceSheetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgentBalanceSheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
