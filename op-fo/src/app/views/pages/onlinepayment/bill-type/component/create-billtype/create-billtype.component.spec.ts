import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateBilltypeComponent } from './create-billtype.component';

describe('CreateBilltypeComponent', () => {
  let component: CreateBilltypeComponent;
  let fixture: ComponentFixture<CreateBilltypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateBilltypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateBilltypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
