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
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

//!--VARIABLES------------------------------------------------------------------------------------------

  newUser:any = {
    firstname : "",
    lastname : "",
    email : "",
    username : "",
    password : "",
    admincode : "",
    confpass: ""
  }

//*--VALIDATIONS----------------------------------------------------------------------------------------

errors:any = {};

//*--VALIDATIONS----------------------------------------------------------------------------------------


//!--VARIABLES------------------------------------------------------------------------------------------

nameFormControl = new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]);

lastnameFormControl = new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]);

emailFormControl = new FormControl('', [Validators.required, Validators.email]);

usernameFormControl = new FormControl('', [Validators.required, Validators.pattern(/^\S*$/)]); 

passFormControl = new FormControl('', [Validators.required, Validators.minLength(8), Validators.pattern(/^\S*$/)]);

confpassFormControl = new FormControl('', [Validators.required, Validators.minLength(8), Validators.pattern(/^\S*$/)]);

codeFormControl = new FormControl('', [Validators.required, Validators.minLength(5), Validators.pattern(/^\S*$/)]);

matcher = new MyErrorStateMatcher();



  constructor(private _HttpService: UsersService,
    private _router:Router,
    private _route:ActivatedRoute,
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

  register(event:any): void{

    this.errors = {};

    if(!this.nameFormControl.errors && 
      !this.lastnameFormControl.errors && 
      !this.emailFormControl.errors && 
      !this.usernameFormControl.errors && 
      !this.passFormControl.errors && 
      !this.confpassFormControl.errors &&
      !this.codeFormControl.errors ){
        
      this._HttpService.createNewUser(this.newUser)
      .subscribe(
        (result:any)=>{
          if(result._id){
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
            
          }
        },
        (error:any)=>{
          this.errors = error.error;
        });
    }
    else{
      this.errors.problem = "⚠️ Ha ocurrido un problema ";
    }
  }

}
