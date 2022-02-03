import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreditOrganizationLedgerComponent } from './credit-organization-ledger.component';

describe('CreditOrganizationLedgerComponent', () => {
  let component: CreditOrganizationLedgerComponent;
  let fixture: ComponentFixture<CreditOrganizationLedgerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreditOrganizationLedgerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreditOrganizationLedgerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
