import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateFeemodelComponent } from './create-feemodel.component';

describe('CreateFeemodelComponent', () => {
  let component: CreateFeemodelComponent;
  let fixture: ComponentFixture<CreateFeemodelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateFeemodelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateFeemodelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
