import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CodesService {

  constructor(private _http: HttpClient) { }
  
  createCodes(){
    this._http.get("http://localhost:8080/codes/normal");
    this._http.get("http://localhost:8080/codes/total");
  }


  changeTotal(codeinfo:any){
    return this._http.put("http://localhost:8080/codes/updatetotal",codeinfo);
  }

  changeNormal(codeinfo:any){
    return this._http.put("http://localhost:8080/codes/updatenormal",codeinfo);
  }

  changeRegister(codeinfo:any){
    return this._http.put("http://localhost:8080/codes/updateregister",codeinfo);
  }

    // changeTotal(codeinfo:any){
    //   return this._http.put("codes/updatetotal",codeinfo);
    // }
  
    // changeNormal(codeinfo:any){
    //   return this._http.put("codes/updatenormal",codeinfo);
    // }
  
    // changeRegister(codeinfo:any){
    //   return this._http.put("codes/updateregister",codeinfo);
    // }
  

}
