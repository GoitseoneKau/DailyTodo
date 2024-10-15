import { Routes } from '@angular/router';
import { TodoListComponent } from './components/todo-list/todo-list.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';

export const routes: Routes = [
    {path:"todos",component:TodoListComponent},
    {path:"signup",component:SignupComponent},
    {path:"",component:LoginComponent}
];
