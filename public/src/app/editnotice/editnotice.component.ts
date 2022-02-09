import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import {FormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import {NoticesService} from '../services/notices.service';


export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

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

imgprev2:any = ""

imgnameprev:any = ""

noticeImage:any =  null;

archivos:any = [];
//!--VARIABLES------------------------------------------------------------------------------------------
titleFormControl = new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(200)]);

descriptionFormControl = new FormControl('', [Validators.required, Validators.minLength(8)]);

matcher = new MyErrorStateMatcher();


//?--INPUTVALIDATOR--------------------------------------------------------------------------------------
@ViewChild('cardpreview') preview: ElementRef<any> | undefined;

@ViewChild('removenotice') r_notice: ElementRef<any> | undefined;
@ViewChild('removeimage') r_image: ElementRef<any> | undefined;
@ViewChild('background') background: ElementRef<any> | undefined;




  constructor(private _HttpNoticesService: NoticesService,
    private _router:Router,
    private _route:ActivatedRoute,
    private renderer2: Renderer2
    ) { }


  ngOnInit(): void {
    this.loadNoticeInfo();
    this.protectURL();
  }

  protectURL():void{
    const admintype = sessionStorage.getItem('userAdminType');
    if(!admintype || admintype === "Register"){
      this._router.navigate( ['/'] )
    }
  }


  selectedIMG(e:any){

    this.imgprev = this.imgprev2
    this.imgnameprev = ""

    const imageCaptured = e.target.files[0]
    if(imageCaptured){
      var reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      reader.onload=(event:any)=>{
        this.imgprev = event.target.result;
      }
      this.archivos.push(imageCaptured)
      this.imgnameprev = imageCaptured.name;
    }
  }

  loadNoticeInfo():void{

    this._route.params.subscribe((params:any) => this._id = params.id)

    this._HttpNoticesService.findNotice(this._id)
    .subscribe((data:any)=>{
      this.newNotice.title = data.title
      this.newNotice.description = data.description.split("<br/>").join("\n")
      this.newNotice.link = data.link
      this.newNotice.importance = data.importance
      // this.newNotice.creator = data.creator
      this.imgprev = data.picture
      this.imgprev2 = data.picture
    })
  }


  updatenotice(event:any):void{
    if(!this.titleFormControl.errors && !this.descriptionFormControl.errors){
      this._route.params.subscribe((params:any) => this._id = params.id)

      const formNoticeIndfo = new FormData()
      this.archivos.forEach((archivo:any) => {
        formNoticeIndfo.append('noticeImage',archivo)
      });

      formNoticeIndfo.append('title',this.newNotice.title);
      formNoticeIndfo.append('description',this.newNotice.description.split("\n").join("<br/>"));
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
      })
    }
    else{
      this.msj.problem = "⚠️ Ha ocurrido un problema"
    }
  }

  removeIMG(event:any):void{
    this._route.params.subscribe((params:any) => this._id = params.id)

    this._HttpNoticesService.deleteNoticeIMG(this._id)
    .subscribe((data:any)=>{
      this.msj = data
    },
    (error:any)=>{
      this.msj = error.error
    })

    this.renderer2.removeClass(this.r_image?.nativeElement,'info')
    this.renderer2.removeClass(this.background?.nativeElement,'bg')
    
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

  mobilepreview():void{
    this.renderer2.addClass(this.preview?.nativeElement,'appear')
  }

  showdelete():void{
    
    this.renderer2.addClass(this.r_notice?.nativeElement,'info')
    this.renderer2.addClass(this.background?.nativeElement,'bg')
  }

  showdeleteimg():void{
    this.renderer2.addClass(this.r_image?.nativeElement,'info')
    this.renderer2.addClass(this.background?.nativeElement,'bg')
  }

  hideinfo():void{
    this.renderer2.removeClass(this.r_notice?.nativeElement,'info')
    this.renderer2.removeClass(this.r_image?.nativeElement,'info')
    this.renderer2.removeClass(this.background?.nativeElement,'bg')
  }


}
