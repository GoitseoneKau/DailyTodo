import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../../services/login.service';
import { User } from '../../types/user';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  constructor(private router:Router,private loginService:LoginService){//inject services

  }

  goToList() {
    const user = JSON.parse(sessionStorage.getItem("user")!)//get logged in user info
    this.router.navigate([`/todos/${+user.id}`])//go back to todo list of user
  }

  logOut(){
    this.loginService.logout()//use ling service to logout
    this.router.navigate(["/"],{replaceUrl:true})//redirect to login page
  }
}
