import { ActivatedRoute, Router } from '@angular/router';
import { Component, DestroyRef, inject} from '@angular/core';
import { Todo } from '../../types/todo';
import { AbstractControl, FormBuilder, FormControl, FormGroup,
   ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { NgIf, DatePipe,Location } from '@angular/common';
import { LoginService } from '../../services/login.service';
import { TodosService } from '../../services/todos.service';
import { MinDateValidator } from '../../customValidators/min-date-validator';
@Component({
  selector: 'app-edit-todo',
  standalone: true,
  imports: [ReactiveFormsModule,NgIf,DatePipe],
  providers:[DatePipe],
  templateUrl: './edit-todo.component.html',
  styleUrl: './edit-todo.component.css'
})
export class EditTodoComponent {

editForm!: FormGroup;//variable to access the editi form
todo!:Todo//todo format variable
todoId:any//todo id
todoText:string=""//todo text/description
prioritytext:string=""//todo priority variable
todoDate:Date = new Date()//todo date variable
isLoggedIn:boolean = false//store logged in result
minDate = new Date()//date to check again input date
destroyRef = inject(DestroyRef)//inject destroy service class

  constructor(  private router:Router,
    private loginService:LoginService,
    private todoService:TodosService,
    private activeRoute:ActivatedRoute,
    private location:Location,
    private fb:FormBuilder,
    private dp:DatePipe){//inject services
    this.editForm = this.fb.group({//get form values and validate
      todo: new FormControl(this.todoText,[
         Validators.required,
         Validators.pattern("^[\\w\\s\\S]*$")//regex validator,allows words and character and spaces
       ]),
       priority: new FormControl(this.prioritytext,[
         Validators.required,
       ]),
       dueDate: new FormControl(this.todoDate,[
         Validators.required,
         MinDateValidator.dateMin(this.minDate)//custom date validator
       ])
     })

    
  }

  ngOnInit(){
   this.todoId = this.activeRoute.snapshot.paramMap.get('id');//get todo id from url or route path
    this.isLoggedIn = this.loginService.isLoggedIn()//check if user is logged in
    this.setTodo(this.todoId)//set the todo to be edited
    this.destroyRef.onDestroy(()=>  this.todoService.getTodo(this.todoId).subscribe().unsubscribe())//unsuscribe service so no memory or request overload occurs
  }



  setTodo(id:any){
    const oneTodo =this.todoService?.getTodo(id).subscribe(//get one todo
      (todo)=>{
        this.todo=todo//set todo to local variable of todo
        this.setFormValues(todo)//send todo values to form
      }
    )
    this.destroyRef.onDestroy(()=>oneTodo.unsubscribe())//on component destroy unsuscribe to unused service
  }

  setFormValues(todo:Todo){
    this.editForm.setValue({//set form value function
      todo:this.todo.todo,
      priority:this.todo.priority,
      dueDate:this.dp.transform((this.todo.dueDate),"yyyy-MM-ddThh:mm")
    })  
  }

  editTodo(){//edit or submit updated info
    //get edited todo info
    this.todo.todo = this.editForm.get('todo')?.value
    this.todo.dueDate = this.editForm.get('dueDate')?.value
    this.todo.priority = this.editForm.get('priority')?.value
    this.todo.priorityColor = this.setPriorityColor(this.todo.priority)

    const update = this.todoService.updateTodos(this.todo).subscribe()//post updated todo
    this.destroyRef.onDestroy(()=> update.unsubscribe())
    this.location.back()//redirect to todo list page

  }

  setPriorityColor(priority:string):string{//function to set color according to priority
    let color=""

    if(priority=="High"){   color="#db0d0d" }
    if(priority=="Medium"){ color="Orange"  }
    if(priority=="Low"){    color="#eded15" }

    return color
  }

  cancel(){
    this.location.back()//redirect back without editing
  }
}
