import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewnoticeComponent } from './newnotice.component';

describe('NewnoticeComponent', () => {
  let component: NewnoticeComponent;
  let fixture: ComponentFixture<NewnoticeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewnoticeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewnoticeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
