import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import {Router, ActivatedRoute, Params} from '@angular/router';
import {NoticesService} from '../services/notices.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

//!--VARIABLES------------------------------------------------------------------------------------------

notices:any[] = [];

page_size: number = 5
page_number: number = 1

pageSizeOptions = [5,10,15,20,30,50]

filter_value = "";

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
    this.getallNotices();
    this.getFromSession();
  }

  handlePage(e:PageEvent){
      this.page_size = e.pageSize
      this.page_number = e.pageIndex + 1  
  }
  

  handleSearch(value:string){
    this.filter_value = value;
  }

  getallNotices():void{
    this._HttpNoticesService.requestallNotices()
    .subscribe((result:any)=>{
      this.notices = result.reverse();
    })
    
    
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
