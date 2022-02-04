import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateThirdPartyIntegrationComponent } from './update-third-party-integration.component';

describe('UpdateThirdPartyIntegrationComponent', () => {
  let component: UpdateThirdPartyIntegrationComponent;
  let fixture: ComponentFixture<UpdateThirdPartyIntegrationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateThirdPartyIntegrationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateThirdPartyIntegrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
