import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { LoginService } from './login.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RouteGuardService implements CanActivate{

  constructor(private loginService:LoginService,private router:Router) { }
  canActivate():Observable<boolean>|Promise<boolean>|boolean {
  
    if (this.loginService.isLoggedIn()==false) {
      this.router.navigate(["/"],{replaceUrl:true})
    }

    return true;
  }
}
