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
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

//!--VARIABLES------------------------------------------------------------------------------------------



  currentUser:any = {
    email: "",
    password: ""
  }
  
  errors:any = {};
//!--VARIABLES------------------------------------------------------------------------------------------

emailFormControl = new FormControl('', [Validators.required, Validators.email]);

passFormControl = new FormControl('', [Validators.required, Validators.minLength(8)]);

matcher = new MyErrorStateMatcher();




  constructor(private _HttpService: UsersService,
    private _router:Router,
    private _route:ActivatedRoute,
    private renderer2: Renderer2
    ) { }

  ngOnInit(): void {
    this.protectURL();
  }

  protectURL():void{
    const admintype = sessionStorage.getItem('userAdminType');
    if(admintype){
      this._router.navigate( ['/'] )
    }
  }

  login(event:any):void{

    if(!this.emailFormControl.errors && !this.passFormControl.errors){

      this._HttpService.login(this.currentUser)
    .subscribe((result:any)=>{
            sessionStorage.setItem('userID', result._id); //! Session In
            sessionStorage.setItem('userFirstname', result.firstname); //! Session In
            sessionStorage.setItem('userLastname', result.lastname); //! Session In
            sessionStorage.setItem('userUsername', result.username); //! Session In
            sessionStorage.setItem('userEmail', result.email); //! Session In
            sessionStorage.setItem('userAdminType', result.admintype); //! Session In
            this._router.navigate( ['/'] )
            .finally(()=>{
              location.reload()
            })
    },
    (error:any)=>{
      this.errors = error.error;
    })
    }
    else{
      this.errors.problem = "⚠️ Ha ocurrido un problema con alguno de los espacios"
    }
    
  }

}
