import { booleanAttribute, Component, DestroyRef, ElementRef, HostListener, inject, OnDestroy, OnInit, ViewChild} from '@angular/core';
import { TodoComponent } from '../todo/todo.component';
import { TodosService } from '../../services/todos.service';
import { Todo } from '../../types/todo';
import {  CommonModule, DatePipe } from '@angular/common';
import {FormsModule} from '@angular/forms';
import { HeaderComponent } from '../header/header.component';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from '../../services/login.service';
import { UsersService } from '../../services/users.service';
import { User } from '../../types/user';
import { delay, Subscription, take } from 'rxjs';
import { LoaderService } from '../../services/loader.service';
import { NgxSpinnerModule } from 'ngx-spinner';



@Component({
  selector: 'todo-list',
  standalone: true,
  imports: [TodoComponent,FormsModule,CommonModule,HeaderComponent,DatePipe,NgxSpinnerModule],
  providers:[DatePipe],
  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.css'
})
export class TodoListComponent implements OnInit,OnDestroy {
//initialize variables
  Todos:Todo[]=[]
  filteredTodos: Todo[]=[];
  subscribedTodos?: Subscription;
  subscribedTodo$?: Subscription;
  isLoggedIn:boolean=false
  todayDate = new Date();
  user!:User
  destroyRef = inject(DestroyRef)
  userId:number=0
  isHighZero:boolean = false
  isMedZero:boolean = false
  isLowZero:boolean=false
  todoIsCompleteFilter:string|boolean = "All"
  todoPriorityFilter:string="All"
  bdcolor: string="";
  ani_color: string="";
  loadingMessage: string="";
//scroll vars
  showScrollButton = false;
  private scrollThreshold = 200;

  constructor(
    private todoService:TodosService,
    private userService:UsersService,
    private router:Router,
    private loginService:LoginService,
    private activatedRoute:ActivatedRoute,
    private loaderService:LoaderService,
    private dp:DatePipe
  ){ }//inject services 


  // scroll event
   @HostListener('window:scroll', [])
  onWindowScroll() {
    this.showScrollButton = window.scrollY > this.scrollThreshold;
  }

  // scroll to top function
  scrollToTop() {
     window.scrollTo({top:0,left:0,behavior:'smooth'})
  }

   ngOnInit(){

    //check if user is logged in
    this.isLoggedIn = this.loginService.isLoggedIn()

    //store user id
    const Id = parseInt(this.activatedRoute.snapshot.paramMap.get('uid')!)
    this.getUser(Id)

    //start loader
    this.startLoader()
   
    //subscribe to getTodos
    this.subscribedTodos = this.todoService.getTodos()
    .subscribe({
     next: (data)=>{
      
        //store updated filtered todos by user, sorted by dates in descending order
        this.Todos=data.filter(d=>d.userId===this.userId)
        .sort((a, b) => (a.dueDate > b.dueDate ? -1 : b.dueDate > a.dueDate ? 1 : 0))

        //store data for filtering,speeds up search
        this.filteredTodos = this.Todos

        //update ui according to status in select control
        this.updateStatus(this.todoIsCompleteFilter)

        //update empty todos
        this.checkEmptyTodosOnPage(this.Todos)
      },
      complete:()=>{
          //end loader
          this.completeLoader()
      }
    })

 
  }

  ngOnDestroy(){
      this.subscribedTodos?.unsubscribe()//unsubscribe to todos subscription
  }


  //complete loader function
  completeLoader(){
    //change loader to green
    this.ani_color="rgb(2,177,75)"

    //change message
    this.loadingMessage="Complete"

    //unload animation ,set 'signedUp' to true
    setTimeout(() => {
      this.loaderService.unloading() 
    }, 1000);
  }

 //start loader function
  startLoader(){
    
    //open loading animation
    this.loaderService.loading()

    //set background color to white,80% opacity
    this.bdcolor ="rgba(255,255,255,0.8)"

    //set loader color to red
    this.ani_color ="#f81212"

    //set message
    this.loadingMessage = "Loading.."
  }

  //get user according to userId
  getUser(Id:number){
    if(this.userService){
      const user = this.userService.getUser(Id).subscribe((user)=>{
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
    const updateComplete = this.todoService.updateTodos(todo).subscribe()

    //update empty todos
    this.checkEmptyTodosOnPage(this.Todos)

    //unsubscribe after update
    this.destroyRef.onDestroy(()=>updateComplete.unsubscribe())
  }

  //function to delete todo
  deleteTodo(todo:Todo){

    //delete todo
    const deleteTodo =this.todoService.deleteTodo(todo).subscribe(()=>{
    this.Todos = this.filteredTodos
    .filter(t=>t.id !== todo.id)
    .sort((a, b) => (a.dueDate > b.dueDate ? -1 : b.dueDate > a.dueDate ? 1 : 0))

    //store data for filtering,speeds up search
    this.filteredTodos = this.Todos

    //update ui according to status in select control
    this.updateStatus(this.todoIsCompleteFilter)

    })

    //unsubscribe after deletion operation
    this.destroyRef.onDestroy(()=>deleteTodo.unsubscribe())
  }

  addTodo(){
    //navigate to the add todo form page
    this.router.navigate(["add",this.user.userId])
  }

  editTodo(todo:Todo){
    //navigate to the edit todo form page
    this.router.navigate(["edit",todo.id])
  }

   overDueCheck(todo:Todo){//checks if todo was never completed and it is passed it's due date
    //transform date objects with datepipe service
    const now = this.dp.transform(this.todayDate)
    const task = this.dp.transform(todo.dueDate)
    if(new Date(now!)>new Date(task!) && todo.completed==false){
      return true
    }
    return false
  }

  //filter todos according to status
  updateStatus(e:string|boolean){

    this.todoIsCompleteFilter = e
    
    if(this.todoIsCompleteFilter === "All"){//show all todos  

      this.todoService.getTodos().subscribe((todos)=>{
        //filter to all todos of user's ID
        this.Todos = todos
        .filter((t)=> t.userId === this.userId)
        .sort((a, b) => (a.dueDate > b.dueDate ? -1 : b.dueDate > a.dueDate ? 1 : 0))

        this.filteredTodos = this.Todos
        //update empty todos
        this.checkEmptyTodosOnPage(this.Todos)
      })
       
     
    }else if(this.todoIsCompleteFilter === "overdue"){
      this.todoService.getTodos().subscribe((todos)=>{
            //filter to all todos of user's ID
            this.Todos = todos
            .filter((t)=>this.overDueCheck(t) && t.userId === this.userId)
            .sort((a, b) => (a.dueDate > b.dueDate ? -1 : b.dueDate > a.dueDate ? 1 : 0))

            this.filteredTodos = this.Todos
            //update empty todos
            this.checkEmptyTodosOnPage(this.Todos)
      })
        
    }else{   
      
      this.todoService.getTodos().subscribe((todos)=>{
        //filter to all todos of user's ID
        this.Todos = todos
        .filter((t)=>t.completed === booleanAttribute(this.todoIsCompleteFilter) && t.userId === this.userId)
        .sort((a, b) => (a.dueDate > b.dueDate ? -1 : b.dueDate > a.dueDate ? 1 : 0))

        this.filteredTodos = this.Todos
        //update empty todos
        this.checkEmptyTodosOnPage(this.Todos)
      })
        
    }
  }
  
  //checks if todos are empty after they have been filtered
  checkEmptyTodosOnPage(todos:Todo[]){

    if(todos.filter((data)=>data.priority == "High").length == 0){
      this.isHighZero = true
    }else{
      this.isHighZero = false
    }

    if(todos.filter((data)=>data.priority == "Medium").length == 0){
      this.isMedZero = true
    }else{
      this.isMedZero = false
    }

    if(todos.filter((data)=>data.priority == "Low").length == 0){
      this.isLowZero = true
    }else{
      this.isLowZero = false
    }

  }

}
