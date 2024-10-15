import { CommonModule, DatePipe } from '@angular/common';
import { Component, EventEmitter, Input, Output} from '@angular/core';
import { Todo } from '../../types/todo';

@Component({
  selector: 'todo-item',
  standalone: true,
  imports: [CommonModule,DatePipe],
  templateUrl: './todo.component.html',
  styleUrl: './todo.component.css'
})
export class TodoComponent {

@Input() todo!:Todo

@Output() onDelete:EventEmitter<Todo>=new EventEmitter()
@Output() onCheck:EventEmitter<Todo>=new EventEmitter();


onCheckTodo(todo:Todo){
  this.onCheck.emit(todo)
}

onDeleteTodo(todo:Todo){
  this.onDelete.emit(todo)
}
}
