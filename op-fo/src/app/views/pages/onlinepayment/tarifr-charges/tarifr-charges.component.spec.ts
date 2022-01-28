import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TarifrChargesComponent } from './tarifr-charges.component';

describe('TarifrChargesComponent', () => {
  let component: TarifrChargesComponent;
  let fixture: ComponentFixture<TarifrChargesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TarifrChargesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TarifrChargesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
