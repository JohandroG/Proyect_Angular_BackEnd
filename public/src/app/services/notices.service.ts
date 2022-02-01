import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class NoticesService {

  constructor(private _http: HttpClient) { }

  requestallNotices(){
    return this._http.get("http://localhost:8080/notices/galln");
  }


  createNotice(newNotice:any){
    return this._http.post("http://localhost:8080/notices/create",newNotice);
  }


  findNotice(_id:any){
    return this._http.get(`http://localhost:8080/notices/findN/${_id}`);
  }

  deleteNotice(_id:any){
    return this._http.delete(`http://localhost:8080/notices/delete/${_id}`);
  }

  deleteNoticeIMG(_id:any){
    return this._http.delete(`http://localhost:8080/notices/removeimg/${_id}`);
  }

  updateNotice(_id:any,noticeinfo:any){
    return this._http.put(`http://localhost:8080/notices/update/${_id}`,noticeinfo);
  }



  // requestallNotices(){
  //   return this._http.get("notices/galln");
  // }


  // createNotice(newNotice:any){
  //   return this._http.post("notices/create",newNotice);
  // }


  // findNotice(_id:any){
  //   return this._http.get(`notices/findN/${_id}`);
  // }

  // deleteNotice(_id:any){
  //   return this._http.delete(`notices/delete/${_id}`);
  // }

  // deleteNoticeIMG(_id:any){
  //   return this._http.delete(`notices/removeimg/${_id}`);
  // }

  // updateNotice(_id:any,noticeinfo:any){
  //   return this._http.put(`notices/update/${_id}`,noticeinfo);
  // }


}

