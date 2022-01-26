import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import {UsersService} from '../services/users.service';

@Component({
  selector: 'app-forgot-pass',
  templateUrl: './forgot-pass.component.html',
  styleUrls: ['./forgot-pass.component.css']
})
export class ForgotPassComponent implements OnInit {


//!--VARIABLES------------------------------------------------------------------------------------------

requestinfo:any = {
  email : ""
};

msj:any = {};

//!--VARIABLES------------------------------------------------------------------------------------------

  constructor(private _HttpService: UsersService,
    private _router:Router,
    private _route:ActivatedRoute,
    ) { }

  ngOnInit(): void {
  }

  request_recover_pass(event:any):void{
    this.msj = {};
    this._HttpService.reqEmail(this.requestinfo)
    .subscribe((data:any)=>{
      this.msj = data
    },(error=>{
      this.msj = error.error
    }))
  }



}
