import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchNoticeComponent } from './search-notice.component';

describe('SearchNoticeComponent', () => {
  let component: SearchNoticeComponent;
  let fixture: ComponentFixture<SearchNoticeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchNoticeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchNoticeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
