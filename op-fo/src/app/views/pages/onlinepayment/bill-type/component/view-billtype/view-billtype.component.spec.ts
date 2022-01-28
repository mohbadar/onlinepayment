import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewBilltypeComponent } from './view-billtype.component';

describe('ViewBilltypeComponent', () => {
  let component: ViewBilltypeComponent;
  let fixture: ComponentFixture<ViewBilltypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewBilltypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewBilltypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
