import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForgotPass2Component } from './forgot-pass2.component';

describe('ForgotPass2Component', () => {
  let component: ForgotPass2Component;
  let fixture: ComponentFixture<ForgotPass2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ForgotPass2Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ForgotPass2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
