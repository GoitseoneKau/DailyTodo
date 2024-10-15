import { booleanAttribute, Component } from '@angular/core';
import { TodoComponent } from '../todo/todo.component';
import { HttpClient } from '@angular/common/http';
import { TodosService } from '../../services/todos.service';
import { Todo } from '../../types/todo';
import { CommonModule } from '@angular/common';
import {FormsModule} from '@angular/forms';
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'todo-list',
  standalone: true,
  imports: [TodoComponent,FormsModule,CommonModule,HeaderComponent],
  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.css'
})
export class TodoListComponent {
  Todos:Todo[]=[]
search:string="All"
completeFilter:string="All"

  constructor(private todos:TodosService,private http:HttpClient){}

  ngOnInit(){
    this.todos.getTodos().subscribe(data=>this.Todos=data)
  }

  checkTodo(todo:Todo){
    todo.completed = !todo.completed
    this.todos.updateTodos(todo).subscribe()
  }

  deleteTodo(todo:Todo){
    this.todos.deleteTodo(todo).subscribe(()=>this.Todos=this.Todos.filter(t=>t.id !== todo.id))
  }

  updateSearch(e:string){
    const truthy = e
    if(truthy==="All"){
      this.todos.getTodos().subscribe(data=>this.Todos=data)
    }else{
      this.todos.getTodos().subscribe(data=>this.Todos=data.filter((d)=>d.completed === booleanAttribute(truthy)))
    }
  
  }
}
