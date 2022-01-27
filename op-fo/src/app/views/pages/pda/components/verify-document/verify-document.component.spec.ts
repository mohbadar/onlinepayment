import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VerifyDocumentComponent } from './verify-document.component';

describe('VerifyDocumentComponent', () => {
  let component: VerifyDocumentComponent;
  let fixture: ComponentFixture<VerifyDocumentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerifyDocumentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerifyDocumentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
