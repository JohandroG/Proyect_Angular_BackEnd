import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import {NoticesService} from '../services/notices.service';

@Component({
  selector: 'app-editnotice',
  templateUrl: './editnotice.component.html',
  styleUrls: ['./editnotice.component.css']
})
export class EditnoticeComponent implements OnInit {

  //!--VARIABLES------------------------------------------------------------------------------------------

newNotice:any = {
  title: "",
  description : "",
  link : "",
  importance : false,
  // creator : ""
}

_id:any = "";

msj:any ={}


imgprev:any = ""

noticeImage:any =  null;

archivos:any = [];
//!--VARIABLES------------------------------------------------------------------------------------------

  constructor(private _HttpNoticesService: NoticesService,
    private _router:Router,
    private _route:ActivatedRoute,
    ) { }


  ngOnInit(): void {
    this.loadNoticeInfo();
  }

  selectedIMG(e:any){

    this.imgprev = ""

    const imageCaptured = e.target.files[0]
    if(imageCaptured){
      var reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      reader.onload=(event:any)=>{
        this.imgprev = event.target.result;
      }
      this.archivos.push(imageCaptured)
    }
  }

  loadNoticeInfo():void{

    this._route.params.subscribe((params:any) => this._id = params.id)

    this._HttpNoticesService.findNotice(this._id)
    .subscribe((data:any)=>{
      this.newNotice.title = data.title
      this.newNotice.description = data.description
      this.newNotice.link = data.link
      this.newNotice.importance = data.importance
      // this.newNotice.creator = data.creator
      this.imgprev = data.picture
    })
  }


  updatenotice(event:any):void{
    
    this._route.params.subscribe((params:any) => this._id = params.id)

    const formNoticeIndfo = new FormData()
    this.archivos.forEach((archivo:any) => {
      formNoticeIndfo.append('noticeImage',archivo)
    });
    formNoticeIndfo.append('title',this.newNotice.title);
    formNoticeIndfo.append('description',this.newNotice.description);
    formNoticeIndfo.append('link',this.newNotice.link);
    formNoticeIndfo.append('importance',JSON.stringify(this.newNotice.importance));
    
    
    this._HttpNoticesService.updateNotice(this._id,formNoticeIndfo)
    .subscribe((data:any)=>{
      console.log("done");
      console.log(data);
      this._router.navigate( ['/'] )
      
    },
    (error:any)=>{
      console.log(error);
    }
    )
  }

  removeIMG():void{
    this._route.params.subscribe((params:any) => this._id = params.id)

    this._HttpNoticesService.deleteNoticeIMG(this._id)
    .subscribe((data:any)=>{
      this.msj = data
    },
    (error:any)=>{
      this.msj = error.error
    })
  }


  deleteNotice(event:any):void{
    this._route.params.subscribe((params:any) => this._id = params.id)

    this._HttpNoticesService.deleteNotice(this._id)
    .subscribe((data:any)=>{
      console.log(data);
      this._router.navigate( ['/'] )
            .finally(()=>{
              location.reload()
            })
    })
    
  }
}
