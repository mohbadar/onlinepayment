import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewFeemodelComponent } from './view-feemodel.component';

describe('ViewFeemodelComponent', () => {
  let component: ViewFeemodelComponent;
  let fixture: ComponentFixture<ViewFeemodelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewFeemodelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewFeemodelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
