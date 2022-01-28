import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BillDetailRepesentationComponent } from './bill-detail-repesentation.component';

describe('BillDetailRepesentationComponent', () => {
  let component: BillDetailRepesentationComponent;
  let fixture: ComponentFixture<BillDetailRepesentationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BillDetailRepesentationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BillDetailRepesentationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
