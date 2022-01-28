import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProvinceUserRelationComponent } from './province-user-relation.component';

describe('ProvinceUserRelationComponent', () => {
  let component: ProvinceUserRelationComponent;
  let fixture: ComponentFixture<ProvinceUserRelationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProvinceUserRelationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProvinceUserRelationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
