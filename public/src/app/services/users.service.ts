import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private _http: HttpClient) { }


  createNewUser(newUser:any){
    return this._http.post("http://localhost:8080/admins/create", newUser)
  }

  login(userinfo:any){
    return this._http.post("http://localhost:8080/admins/login", userinfo)
  }

  reqEmail(requestinfo:any){
    return this._http.post("http://localhost:8080/admins/recoverpass", requestinfo)
  }

  changePass(passinfo:any){
    return this._http.post("http://localhost:8080/admins/changepass", passinfo)
  }



  // createNewUser(newUser:any){
  //   return this._http.post("admins/create", newUser)
  // }

  // login(userinfo:any){
  //   return this._http.post("admins/login", userinfo)
  // }

  // reqEmail(requestinfo:any){
  //   return this._http.post("admins/recoverpass", requestinfo)
  // }

  // changePass(passinfo:any){
  //   return this._http.post("admins/changepass", passinfo)
  // }

}
