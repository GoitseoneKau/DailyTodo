import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../types/user';
import { UsersService } from './users.service';
import test from 'node:test';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  public user:User | undefined |null

  constructor(private userService:UsersService) { }

  checkStorage(){
    const userData = sessionStorage.getItem("user")
    if(userData){
      this.user = JSON.parse(userData)
    }else{
      this.user = null
    }
  }

  

  login(user:User){
      sessionStorage.setItem("user",JSON.stringify(user))
      this.checkStorage()
  }

  isLoggedIn(){
    this.checkStorage()
    return this.user !==null
  }

  logout(){
    if(!this.isLoggedIn()){return}
    sessionStorage.clear()
    this.checkStorage()
  }
}
