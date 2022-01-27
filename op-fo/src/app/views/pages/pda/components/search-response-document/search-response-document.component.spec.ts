import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchResponseDocumentComponent } from './search-response-document.component';

describe('SearchResponseDocumentComponent', () => {
  let component: SearchResponseDocumentComponent;
  let fixture: ComponentFixture<SearchResponseDocumentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchResponseDocumentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchResponseDocumentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
