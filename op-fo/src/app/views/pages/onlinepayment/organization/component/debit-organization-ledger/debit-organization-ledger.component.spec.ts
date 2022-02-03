import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DebitOrganizationLedgerComponent } from './debit-organization-ledger.component';

describe('DebitOrganizationLedgerComponent', () => {
  let component: DebitOrganizationLedgerComponent;
  let fixture: ComponentFixture<DebitOrganizationLedgerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DebitOrganizationLedgerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DebitOrganizationLedgerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
