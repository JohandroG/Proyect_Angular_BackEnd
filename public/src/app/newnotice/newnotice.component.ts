import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import {NoticesService} from '../services/notices.service';


@Component({
  selector: 'app-newnotice',
  templateUrl: './newnotice.component.html',
  styleUrls: ['./newnotice.component.css']
})
export class NewnoticeComponent implements OnInit {


//!--VARIABLES------------------------------------------------------------------------------------------

newNotice:any = {
  title: "",
  description : "",
  link : "",
  importance : false,
  creator : ""
}


imgprev:any = ""

noticeImage:any =  null;

archivos:any = [];


//*MSJ-----------------------------------------------------------------

msj:any = {};


//!--VARIABLES------------------------------------------------------------------------------------------


  constructor(private _HttpNoticesService: NoticesService,
    private _router:Router,
    private _route:ActivatedRoute,
    ) { }

  ngOnInit(): void {
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



  createnotice(event:any):void{
    
    const sessionUsername = sessionStorage.getItem('userUsername');
    this.newNotice.creator = sessionUsername;

    const formNoticeIndfo = new FormData()
    this.archivos.forEach((archivo:any) => {
      formNoticeIndfo.append('noticeImage',archivo)
      
    });

    formNoticeIndfo.append('title',this.newNotice.title);
    formNoticeIndfo.append('description',this.newNotice.description);
    formNoticeIndfo.append('link',this.newNotice.link);
    formNoticeIndfo.append('importance',JSON.stringify(this.newNotice.importance));
    formNoticeIndfo.append('creator',this.newNotice.creator);
    
    
    this._HttpNoticesService.createNotice(formNoticeIndfo)
    .subscribe((data:any)=>{
      console.log("done");
      console.log(data);
      this._router.navigate( ['/'] )
    },
    (error:any)=>{
      this.msj = error.error
    }
    )
  }

}
