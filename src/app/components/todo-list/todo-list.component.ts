import { booleanAttribute, Component, DestroyRef, ElementRef, inject, ViewChild} from '@angular/core';
import { TodoComponent } from '../todo/todo.component';
import { TodosService } from '../../services/todos.service';
import { Todo } from '../../types/todo';
import { CommonModule, DatePipe } from '@angular/common';
import {FormsModule} from '@angular/forms';
import { HeaderComponent } from '../header/header.component';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from '../../services/login.service';
import { UsersService } from '../../services/users.service';
import { User } from '../../types/user';
import { delay } from 'rxjs';


@Component({
  selector: 'todo-list',
  standalone: true,
  imports: [TodoComponent,FormsModule,CommonModule,HeaderComponent,DatePipe],
  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.css'
})
export class TodoListComponent {
//initialize variables
  Todos:Todo[]=[]//todos variable; empty
  isLoggedIn:boolean=false//global variable to store loggedin boolean from login service
  todayDate = new Date();//check today's date
  user!:User//global variable to hold user's currently loggedin information
  destroyRef = inject(DestroyRef)//inject a destroy  reference
  userId:any//global variable to store logged in user's user_id
  isHighZero:boolean = false//global varibale to boolean if high priority todos are zero
  isMedZero:boolean = false//global varibale to boolean if Medium priority todos are zero
  isLowZero:boolean=false//global varibale to boolean if Low priority todos are zero
  todoPriorityFilter:string="All"//two way bound variable for high,low or medium priority filter/select
  todoCompletedFilter:string|boolean="All"//two way bound variable for completed status filter/select

  constructor(private todos:TodosService,
    private users:UsersService,
    private router:Router,
    private loginService:LoginService,
    private activatedRoute:ActivatedRoute){//inject services
  
  }

  ngOnInit(){
    this.isLoggedIn = this.loginService.isLoggedIn()
    const Id = parseInt(this.activatedRoute.snapshot.paramMap.get('uid')!)
    this.getUser(Id)
    this.todos.getTodos().subscribe(data=>{
      this.Todos=data.filter(d=>d.userId===+this.userId).sort((a, b) => 
        (a.dueDate > b.dueDate ? -1 : b.dueDate > a.dueDate ? 1 : 0)
      )
  
      this.checkEmptyTodosOnPage(this.Todos)
      this.updateCompletedStatus(this.todoCompletedFilter)
    })

  }


  //get user according to userId
  getUser(userId:any){
    if(this.users){
      this.users.getUser(userId).subscribe((user)=>{
        this.user=user
        this.userId =user.userId
      })
    }
  }


  //tick the check button/complete check button
  checkTodo(todo:Todo){
    //change the completed status/boolean
    todo.completed = !todo.completed

    //update complete
    this.todos.updateTodos(todo).subscribe()

  }

  deleteTodo(todo:Todo){//function to delete todo

    //delay delation of element to time with animation
    const delayDelete = this.todos.deleteTodo(todo).pipe(delay(1000));

    //delete todo
    delayDelete.subscribe(()=>this.Todos=this.Todos.filter(t=>t.id !== todo.id))
  }


  addTodo(){
    //navigate to the add todo form page
    this.router.navigate(["/add",this.user.userId])
  }


  editTodo(todo:Todo){
    //navigate to the edit todo form page
    this.router.navigate(["/edit",todo.id])
  }


  //filter todos according to status
  updateCompletedStatus(e:any){

    this.todoCompletedFilter = e
    
    if(this.todoCompletedFilter==="All"){//show all todos
      this.todos.getTodos().subscribe(data=>{ 
        this.Todos=data.filter(d=>d.userId===+this.userId).sort((a, b) => 
          (a.dueDate > b.dueDate ? -1 : b.dueDate > a.dueDate ? 1 : 0)
        )
        //update empty todos
        this.checkEmptyTodosOnPage(this.Todos)
      })
    }else{
      this.todos.getTodos().subscribe(data=>{
          this.Todos=data.filter((d)=>d.completed === booleanAttribute(this.todoCompletedFilter)&&d.userId===+this.userId).sort((a, b) => 
            (a.dueDate > b.dueDate ? -1 : b.dueDate > a.dueDate ? 1 : 0)
          )
        
          //update empty todos
          this.checkEmptyTodosOnPage(this.Todos)
      })
    }
  }


  checkEmptyTodosOnPage(todos:Todo[]){//checks if todos are empty after they have been filtered
    if(todos.filter((data)=>data.priority=="High").length==0){
      this.isHighZero=true
    }else{
      this.isHighZero=false
    }
    if(todos.filter((data)=>data.priority=="Medium").length==0){
      this.isMedZero=true
    }else{
      this.isMedZero=false
    }
    if(todos.filter((data)=>data.priority=="Low").length==0){
      this.isLowZero=true
    }else{
      this.isLowZero=false
    }
  }

}
