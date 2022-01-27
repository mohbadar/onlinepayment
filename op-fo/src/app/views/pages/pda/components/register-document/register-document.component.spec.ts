import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterDocumentComponent } from './register-document.component';

describe('RegisterDocumentComponent', () => {
  let component: RegisterDocumentComponent;
  let fixture: ComponentFixture<RegisterDocumentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisterDocumentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterDocumentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
