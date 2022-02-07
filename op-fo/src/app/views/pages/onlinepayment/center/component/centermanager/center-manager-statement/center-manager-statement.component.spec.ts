import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CenterManagerStatementComponent } from './center-manager-statement.component';

describe('CenterManagerStatementComponent', () => {
  let component: CenterManagerStatementComponent;
  let fixture: ComponentFixture<CenterManagerStatementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CenterManagerStatementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CenterManagerStatementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
