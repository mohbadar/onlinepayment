import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterThirdPartyIntegrationComponent } from './register-third-party-integration.component';

describe('RegisterThirdPartyIntegrationComponent', () => {
  let component: RegisterThirdPartyIntegrationComponent;
  let fixture: ComponentFixture<RegisterThirdPartyIntegrationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisterThirdPartyIntegrationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterThirdPartyIntegrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
