import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import {NoticesService} from '../services/notices.service';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.css']
})
export class MyProfileComponent implements OnInit {

//!--VARIABLES------------------------------------------------------------------------------------------

infoToUpdate = {
  firstname : "",
  lastname : "",
  email : "",
  username : "",
  oldpassword : "",
  newpassword : ""
}


//*USER-INFO

_id:any = "";
firstname:any = "";
lastname:any = "";
username:any = "";
email:any = "";
admintype:any = "";


//!--VARIABLES------------------------------------------------------------------------------------------


  constructor(private _HttpNoticesService: NoticesService,
    private _router:Router,
    private _route:ActivatedRoute,
    ) { }

  ngOnInit(): void {
    this.getFromSession();
    this.protectURL();
  }

  protectURL():void{
    const admintype = sessionStorage.getItem('userAdminType');
    if(!admintype){
      this._router.navigate( ['/'] )
    }
  }

  getFromSession():void{
    const sessionID = sessionStorage.getItem('userID');
    const sessionFirstname = sessionStorage.getItem('userFirstname');
    const sessionLastname = sessionStorage.getItem('userLastname');
    const sessionUsername = sessionStorage.getItem('userUsername');
    const sessionEmail = sessionStorage.getItem('userEmail');
    const sessionAdminType = sessionStorage.getItem('userAdminType');
    this._id = sessionID;
    this.firstname = sessionFirstname;
    this.lastname = sessionLastname;
    this.email = sessionUsername;
    this.username = sessionUsername;
    this.email = sessionEmail;
    this.admintype = sessionAdminType;
  }


}
