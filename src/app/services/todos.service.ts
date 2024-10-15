import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Todo } from '../types/todo';

@Injectable({
  providedIn: 'root'
})
export class TodosService {
private url:string = "http://localhost:5000/todos"
  constructor(private https:HttpClient) { }

  getTodos():Observable<Todo[]>{
    return this.https.get<Todo[]>(this.url)
  }

  deleteTodo(todo:Todo):Observable<Todo>{
    return this.https.delete<Todo>(`${this.url}/${todo.id}`)
  }

  updateTodos(todo:Todo):Observable<Todo[]>{
    return this.https.put<Todo[]>(`${this.url}/${todo.id}`,todo)
  }
}
