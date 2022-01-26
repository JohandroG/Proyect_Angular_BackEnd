import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import {UsersService} from '../services/users.service';


@Component({
  selector: 'app-forgot-pass2',
  templateUrl: './forgot-pass2.component.html',
  styleUrls: ['./forgot-pass2.component.css']
})
export class ForgotPass2Component implements OnInit {

//!--VARIABLES------------------------------------------------------------------------------------------

requestinfo:any = {
  _id : "",
  token: "",
  password: "",
  passwordconf : ""
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
    this._route.params.subscribe((params:any) => this.requestinfo._id = params.id)
    console.log(this.requestinfo._id);
    
    this.msj = {}
    this._HttpService.changePass(this.requestinfo)
    .subscribe((data:any)=>{
      this.msj = data
    },(error=>{
      this.msj = error.error
    }))
  }

}
