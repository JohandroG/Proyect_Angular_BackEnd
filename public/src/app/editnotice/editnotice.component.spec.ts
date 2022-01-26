import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditnoticeComponent } from './editnotice.component';

describe('EditnoticeComponent', () => {
  let component: EditnoticeComponent;
  let fixture: ComponentFixture<EditnoticeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditnoticeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditnoticeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
