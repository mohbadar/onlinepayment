import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ThirdPartyIntegrationComponent } from './third-party-integration.component';

describe('ThirdPartyIntegrationComponent', () => {
  let component: ThirdPartyIntegrationComponent;
  let fixture: ComponentFixture<ThirdPartyIntegrationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ThirdPartyIntegrationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ThirdPartyIntegrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
