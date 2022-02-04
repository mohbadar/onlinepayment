import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListThirdPartyIntegrationComponent } from './list-third-party-integration.component';

describe('ListThirdPartyIntegrationComponent', () => {
  let component: ListThirdPartyIntegrationComponent;
  let fixture: ComponentFixture<ListThirdPartyIntegrationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListThirdPartyIntegrationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListThirdPartyIntegrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
