import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-calls',
  templateUrl: './calls.component.html',
  styleUrls: ['./calls.component.css']
})
export class CallsComponent implements OnInit {

  constructor(
    private _router:Router,
    private _route:ActivatedRoute,
    ) { }

  ngOnInit(): void {
    this.protectURL();
  }

  protectURL():void{
    const admintype = sessionStorage.getItem('userAdminType');
    if(!admintype){
      this._router.navigate( ['/'] )
    }
  }

}
