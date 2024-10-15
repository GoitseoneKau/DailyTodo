import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [ReactiveFormsModule,NgIf],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {
 signupForm!:FormGroup

  constructor(private router:Router,private fb:FormBuilder){
    this.signupForm = this.fb.group({
     name: new FormControl("",[
        Validators.required,
        Validators.pattern("[\\w-\\.]+@([\\w]+\.)+[\\w]{2,4}")
      ]),
      lastname: new FormControl("",[
        Validators.required,
        Validators.pattern("[\\w-\\.]+@([\\w]+\.)+[\\w]{2,4}")
      ]),
      email: new FormControl("",[
        Validators.required,
        Validators.pattern("[\\w-\\.]+@([\\w]+\.)+[\\w]{2,4}")
      ]),
      password:new FormControl("",[
        Validators.required,
        Validators.pattern("(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.+[@.#$!%*?&^])[A-Za-z0-9@.#$!%*?&]{6,15}")//?
      ]),
      vpassword:new FormControl("",[
        Validators.required,
        Validators.//?
      ])
    })
  }


  login(){
    console.log(this.signupForm.value)
  }
}
