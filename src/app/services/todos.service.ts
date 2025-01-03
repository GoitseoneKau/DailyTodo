import { map, repeat } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, ReplaySubject, shareReplay, tap } from 'rxjs';
import { Todo } from '../types/todo';

@Injectable({
  providedIn: 'root'
})
export class TodosService {

  private url:string = "https://tsexpressrestapi.onrender.com/api/todos"

  todoBehavior:BehaviorSubject<Todo[]> = new BehaviorSubject<Todo[]>([]);

  todo$ = this.todoBehavior.asObservable();

  constructor(private https:HttpClient) { } 
  
  getTodos$():Observable<Todo[]>{
    return this.https.get<Todo[]>(this.url).pipe(tap((todos)=>this.todoBehavior.next(todos)))
  }

  getTodos():Observable<Todo[]>{
    return this.https.get<Todo[]>(this.url)
  }

  getTodo(id:number):Observable<Todo>{
    return this.https.get<Todo>(`${this.url}/${id}`)
  }

  postTodo(todo:Todo):Observable<Todo[]>{
    return this.https.post<Todo[]>(this.url,todo)
  }

  deleteTodo(todo:Todo):Observable<Todo>{
    return this.https.delete<Todo>(`${this.url}/${todo.id}`)
  }

  updateTodos(todo:Todo):Observable<Todo[]>{
    return this.https.put<Todo[]>(`${this.url}/${todo.id}`,todo)
  }
}
