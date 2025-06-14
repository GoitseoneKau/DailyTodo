import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { UsersService } from '../../services/users.service';
import { PasswordMatchValidator } from '../../customValidators/password-match-validator';
import { PasswordValidator } from '../../customValidators/password-validator';
import { PhoneNumberValidator } from '../../customValidators/phone-number-validator';
import { delay } from 'rxjs';
import { User } from '../../types/user';
import { LoaderService } from '../../services/loader.service';
import { NgxSpinnerModule } from 'ngx-spinner';
import { LoginService } from '../../services/login.service';



@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [ReactiveFormsModule,NgIf,NgxSpinnerModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {

 signupForm!:FormGroup //class to access form
private Users:User[]=[] //users empty array
userInfo:User | undefined;//undefined single user info
userExistMessage:string="" //empty message for user not existing
bdcolor:string=""
ani_color:string=""
loadingMessage:string="Loading..."
signedUp:boolean = false

  constructor(
    private router:Router,
    private fb:FormBuilder,
    private userService:UsersService,
    private loginService:LoginService,
    private loaderService:LoaderService
  ){//Injected services
    //assiging formcontrols/variables via a form builder class
        this.signupForm = this.fb.group({
          firstName: new FormControl("",[
            Validators.required,
            Validators.minLength(3)
          ]),
          lastName: new FormControl("",[
            Validators.required,
            Validators.minLength(3)
          ]),
          email: new FormControl("",[
            Validators.required,
            Validators.pattern("[\\w-\\.]+@([\\w]+\.)+[\\w]{2,4}")
          ]),
          phone: new FormControl("",[
            Validators.required,
            PhoneNumberValidator.phoneValidator()//custom phone number validator
          ]), 
          password:new FormControl("",[
            Validators.required,
            Validators.minLength(6),
            Validators.maxLength(15),
            PasswordValidator.passwordValidator()//custom password validator
          ]),
          vpassword:new FormControl("",[
            Validators.required,PasswordMatchValidator.passwordCompare()//custom password confirmation validator
          ])
        })

    

  }

  ngOnInit(){
     if(this.loginService.user){
       if(this.router.url=="/signup" && this.loginService.isLoggedIn()){
       this.router.navigate(["/todos",this.loginService.user.id])//navigate to user todos page
    }
    }
   //set users data whn component intializes
    this.userService.getUsers().subscribe(
      (data)=>{
          this.Users=data
      })
  }

  backToLogin(){
    this.router.navigate(["/"],{replaceUrl:true})//redirect to login page
  }


  getNextUserId(obj:any){
    return (Math.max.apply(Math,obj.map((o: { userId: number })=>o.userId))+1);//create unique userid number looping through object 
  }

  signUp(){//function for signing up/registering user

    //take in form values into single user variable
    this.userInfo={
      firstName:this.signupForm.get('firstName')?.value,
      lastName:this.signupForm.get('lastName')?.value,
      email:this.signupForm.get('email')?.value,
      password:this.signupForm.get('password')?.value,
      phone:this.signupForm.get('phone')?.value,
      userId:this.getNextUserId(this.Users)
    }
    
    if(this.checkUserExists(this.userInfo)){//check if the user exists
       this.userExistMessage="user already exists"
    }else{//if not already existing, put them inside the databse
      //open loading animation
      this.loaderService.loading()

      //set background color to white,80% opacity
      this.bdcolor="rgba(255,255,255,0.8)"

      //set loader color to red
      this.ani_color ="#f81212"

      //set message
      this.loadingMessage="Please wait"

      //pipe delay function to post http observable
      const uploadUser = this.userService.postUsers(this.userInfo).pipe(delay(1000))//delay http post observable for server response time
     
      //subscribe to post http observable
      uploadUser.subscribe({
        complete:()=>{//post services completes or returns complete response

           //change loader to green
           this.ani_color="rgb(2,177,75)"

            //change message
            this.loadingMessage="Signed Up"

            //unload animation after 2 seconds, set 'signedUp' to true
            setTimeout(()=>{
              this.loaderService.unloading() 
              this.signedUp=true

            },1000)
        }
      })//after uploaing user data, end loading animation

      uploadUser.subscribe(()=> this.router.navigate(['/'],{replaceUrl:true}))//redirect to login page
    }
    


   
  }

  checkUserExists(u:User):boolean{//function to check if user exists
    if(this.Users.find((user)=>user.email==u.email)){
      return true
    }
    return false
  }
  
}
