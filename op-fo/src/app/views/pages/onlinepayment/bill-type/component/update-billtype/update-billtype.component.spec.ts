import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateBilltypeComponent } from './update-billtype.component';

describe('UpdateBilltypeComponent', () => {
  let component: UpdateBilltypeComponent;
  let fixture: ComponentFixture<UpdateBilltypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateBilltypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateBilltypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
