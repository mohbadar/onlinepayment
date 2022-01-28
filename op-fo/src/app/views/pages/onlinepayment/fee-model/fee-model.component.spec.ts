import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FeeModelComponent } from './fee-model.component';

describe('FeeModelComponent', () => {
  let component: FeeModelComponent;
  let fixture: ComponentFixture<FeeModelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FeeModelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FeeModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
