import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../types/user';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private url:string = "http://localhost:5001/users"
  constructor(private https:HttpClient) { }

  getUsers():Observable<User[]>{
    return this.https.get<User[]>(this.url)
  }
}
