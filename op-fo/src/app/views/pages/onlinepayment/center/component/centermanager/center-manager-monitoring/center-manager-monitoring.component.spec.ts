import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CenterManagerMonitoringComponent } from './center-manager-monitoring.component';

describe('CenterManagerMonitoringComponent', () => {
  let component: CenterManagerMonitoringComponent;
  let fixture: ComponentFixture<CenterManagerMonitoringComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CenterManagerMonitoringComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CenterManagerMonitoringComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
