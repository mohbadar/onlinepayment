import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListBilltypeComponent } from './list-billtype.component';

describe('ListBilltypeComponent', () => {
  let component: ListBilltypeComponent;
  let fixture: ComponentFixture<ListBilltypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListBilltypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListBilltypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
