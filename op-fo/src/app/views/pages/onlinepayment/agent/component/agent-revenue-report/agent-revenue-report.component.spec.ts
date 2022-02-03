import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgentRevenueReportComponent } from './agent-revenue-report.component';

describe('AgentRevenueReportComponent', () => {
  let component: AgentRevenueReportComponent;
  let fixture: ComponentFixture<AgentRevenueReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgentRevenueReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgentRevenueReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
