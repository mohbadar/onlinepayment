import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrganizationBalanceSheetComponent } from './organization-balance-sheet.component';

describe('OrganizationBalanceSheetComponent', () => {
  let component: OrganizationBalanceSheetComponent;
  let fixture: ComponentFixture<OrganizationBalanceSheetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrganizationBalanceSheetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrganizationBalanceSheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
