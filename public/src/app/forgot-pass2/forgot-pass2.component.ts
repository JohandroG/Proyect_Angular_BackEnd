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

codeFormControl = new FormControl('', [Validators.required]);

passFormControl = new FormControl('', [Validators.required,Validators.minLength(8),Validators.pattern(/^\S*$/)]);

confpassFormControl = new FormControl('', [Validators.required,Validators.minLength(8),Validators.pattern(/^\S*$/)]);

matcher = new MyErrorStateMatcher();

  constructor(private _HttpService: UsersService,
    private _router:Router,
    private _route:ActivatedRoute,
    ) { }

  ngOnInit(): void {
  }

  request_recover_pass(event:any):void{
    if(!this.passFormControl.errors && !this.codeFormControl.errors && !this.confpassFormControl.errors){
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
    else{
      this.msj.problem = "⚠️ Ha ocurrido un problema"
    }
  }

}
