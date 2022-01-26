import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';


@Component({
  selector: 'app-search-notice',
  templateUrl: './search-notice.component.html',
  styleUrls: ['./search-notice.component.css']
})
export class SearchNoticeComponent implements OnInit {

  value = '';

  search = new FormControl('');


  constructor() { }

  ngOnInit(): void {
    this.search.valueChanges.pipe(
      debounceTime(300)
    )
    .subscribe(value => this.searchEmmitter.emit(value));
  }

  @Output('search') searchEmmitter = new EventEmitter<string>()


}
