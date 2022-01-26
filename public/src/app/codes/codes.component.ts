import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import {CodesService} from '../services/codes.service';

@Component({
  selector: 'app-codes',
  templateUrl: './codes.component.html',
  styleUrls: ['./codes.component.css']
})
export class CodesComponent implements OnInit {


//!--VARIABLES------------------------------------------------------------------------------------------

totalcode:any = {
  oldcode : "",
  newcode : ""
}

normalcode:any = {
  oldcode : "",
  newcode : ""
}

registercode:any ={
  oldcode : "",
  newcode : ""
}

totalmsj:any = {}

normalmsj:any = {}

registermsj:any = {}

//!--VARIABLES------------------------------------------------------------------------------------------


  constructor(private _HttpNoticesService: CodesService,
    private _router:Router,
    private _route:ActivatedRoute,
    ) { }



  ngOnInit(): void {
  }

  updateTotal(event:any):void{
    this.totalmsj = {}

    this._HttpNoticesService.changeTotal(this.totalcode)
    .subscribe((data:any)=>{
      this.totalmsj = data
    },(error:any)=>{
      this.totalmsj = error.error
    })
    
  }

  updateNormal(event:any):void{
    this.normalmsj = {}

    this._HttpNoticesService.changeNormal(this.normalcode)
    .subscribe((data:any)=>{
      this.normalmsj = data
    },(error:any)=>{
      this.normalmsj = error.error
    })
  }

  updateRegister(event:any):void{
    this.registermsj = {}

    this._HttpNoticesService.changeRegister(this.registercode)
    .subscribe((data:any)=>{
      this.registermsj = data
    },(error:any)=>{
      this.registermsj = error.error
    })
  }




}
