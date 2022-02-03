import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GenerateDateBasedStatementComponent } from './generate-date-based-statement.component';

describe('GenerateDateBasedStatementComponent', () => {
  let component: GenerateDateBasedStatementComponent;
  let fixture: ComponentFixture<GenerateDateBasedStatementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GenerateDateBasedStatementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GenerateDateBasedStatementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
