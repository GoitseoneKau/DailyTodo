import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { User } from './types/user';
import { TodosService } from './services/todos.service';
import { HttpClient } from '@angular/common/http';
import { CommonModule, JsonPipe } from '@angular/common';
import { UsersService } from './services/users.service';
import { TodoListComponent } from './components/todo-list/todo-list.component';

import { FooterComponent } from './components/footer/footer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,JsonPipe,CommonModule,TodoListComponent,FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'todoApp';
  userList:User[]=[]


  constructor(private todos:TodosService,private users:UsersService,private http:HttpClient){}

  ngOnInit(){
    this.users.getUsers().subscribe(data=>this.userList=data)
  }
}
