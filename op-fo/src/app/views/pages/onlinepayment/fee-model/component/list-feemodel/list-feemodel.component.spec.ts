import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListFeemodelComponent } from './list-feemodel.component';

describe('ListFeemodelComponent', () => {
  let component: ListFeemodelComponent;
  let fixture: ComponentFixture<ListFeemodelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListFeemodelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListFeemodelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
