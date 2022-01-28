import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BillTypeComponent } from './bill-type.component';

describe('BillTypeComponent', () => {
  let component: BillTypeComponent;
  let fixture: ComponentFixture<BillTypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BillTypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BillTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
