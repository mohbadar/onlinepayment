import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewThirdPartyIntegrationComponent } from './view-third-party-integration.component';

describe('ViewThirdPartyIntegrationComponent', () => {
  let component: ViewThirdPartyIntegrationComponent;
  let fixture: ComponentFixture<ViewThirdPartyIntegrationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewThirdPartyIntegrationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewThirdPartyIntegrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
