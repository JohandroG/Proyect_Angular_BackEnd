import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import {UsersService} from '../services/users.service';

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


  constructor(private _HttpService: UsersService,
    private _router:Router,
    private _route:ActivatedRoute,
    ) { }

  ngOnInit(): void {
  }

  register(event:any): void{

    this.errors = {};

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
          this.errors.problem = "⚠️ Ha ocurrido un problema ";
        }
      )

  }

}
