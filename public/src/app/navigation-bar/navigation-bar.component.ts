import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';

//? Icons



@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.css']
})
export class NavigationBarComponent implements OnInit {

//!--VARIABLES------------------------------------------------------------------------------------------

_id:any = "";
firstname:string = "";
lastname:string = "";
username:string = "";
admintype:string = "";


//!--VARIABLES------------------------------------------------------------------------------------------


constructor(private _router:Router,
  private _route:ActivatedRoute) { }

  ngOnInit(): void {
    this.verifysession();
  }

  verifysession():void{
    const sessionID = sessionStorage.getItem('userID');
    this._id = sessionID;
  }

  logout():void{
    sessionStorage.clear();
    this.verifysession();
    this._router.navigate( ['/'] )
    location.reload()
  }


}
