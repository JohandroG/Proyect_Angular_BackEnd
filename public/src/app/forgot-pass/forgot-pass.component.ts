import {Router, ActivatedRoute, Params} from '@angular/router';
import {UsersService} from '../services/users.service';
import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import {FormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

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

emailFormControl = new FormControl('', [Validators.required, Validators.email]);


matcher = new MyErrorStateMatcher();


  constructor(private _HttpService: UsersService,
    private _router:Router,
    private _route:ActivatedRoute,
    ) { }

  ngOnInit(): void {
  }

  request_recover_pass(event:any):void{
    this.msj = {};

    if(!this.emailFormControl.errors){
        this._HttpService.reqEmail(this.requestinfo)
        .subscribe((data:any)=>{
          this.msj = data
        },(error=>{
          this.msj = error.error
        }))
    }
    else{
      this.msj.problem = "⚠️ Ha ocurrido un problema"
    }
    
  }



}
