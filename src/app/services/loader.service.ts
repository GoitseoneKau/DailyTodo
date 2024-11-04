import { Injectable } from '@angular/core';
import {NgxSpinnerService} from 'ngx-spinner'
@Injectable({
  providedIn: 'root'
})
export class LoaderService {
requestCount=0
  constructor(private spinnerService:NgxSpinnerService) { }

  loading(){
    this.requestCount++;
    this.spinnerService;
    this.spinnerService.show(undefined,{
       type:"ball-clip-rotate-pulse" ,
     size:"default"
    })
  }

  unloading(){
    this.requestCount--
    if(this.requestCount<=0){
      this.requestCount=0;
      this.spinnerService.hide()
    }
  }
}
