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

admintype:any = "";



//!--VARIABLES------------------------------------------------------------------------------------------


constructor(private _router:Router,
  private _route:ActivatedRoute) { }

  ngOnInit(): void {
    this.verifysession();
  }

  verifysession():void{
    const sessionadmintype = sessionStorage.getItem('userAdminType');
    this.admintype = sessionadmintype;
  }

  logout():void{
    sessionStorage.clear();
    this.verifysession();
    this._router.navigate( ['/'] )
    location.reload()
  }


}
