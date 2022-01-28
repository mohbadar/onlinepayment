import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateFeemodelComponent } from './update-feemodel.component';

describe('UpdateFeemodelComponent', () => {
  let component: UpdateFeemodelComponent;
  let fixture: ComponentFixture<UpdateFeemodelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateFeemodelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateFeemodelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
