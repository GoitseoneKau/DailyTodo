import { CommonModule, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule,NgIf],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm!:FormGroup

  constructor(private router:Router,private fb:FormBuilder){
    this.loginForm = this.fb.group({
      email: new FormControl("",[
        Validators.required,
        Validators.pattern("[\\w-\\.]+@([\\w]+\.)+[\\w]{2,4}")
      ]),
      password:new FormControl("",[
        Validators.required,
        Validators.pattern("(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.+[@.#$!%*?&^])[A-Za-z0-9@.#$!%*?&]{6,15}")//?
      ])
    })
  }


  login(){
    console.log(this.loginForm.value)
  }
}
