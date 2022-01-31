import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DuplicateSlipPrintComponent } from './duplicate-slip-print.component';

describe('DuplicateSlipPrintComponent', () => {
  let component: DuplicateSlipPrintComponent;
  let fixture: ComponentFixture<DuplicateSlipPrintComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DuplicateSlipPrintComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DuplicateSlipPrintComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
