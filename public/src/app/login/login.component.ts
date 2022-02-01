import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import {UsersService} from '../services/users.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

//!--VARIABLES------------------------------------------------------------------------------------------



  currentUser:any = {
    username: "",
    password: ""
  }
  
  errors:any = {};
//!--VARIABLES------------------------------------------------------------------------------------------


  constructor(private _HttpService: UsersService,
    private _router:Router,
    private _route:ActivatedRoute,
    ) { }

  ngOnInit(): void {
  }

  login(event:any):void{
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
      this.errors.problem = "⚠️ Ha ocurrido un problema ";
    })
  }

}
