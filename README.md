<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap" rel="stylesheet">


![Login Screen](/src/assets/images/logo.PNG)

<h4 align="center" style="font-family:Poppins;font-size:1.2em;margin-top:20px">Give your daily tasks order.</h4>
<p align="center">A simple project highlighting my core skills as Angular developer. It is a todo app with basic functionality and some complex features</p>


## Table of Contents

* [Introduction](#introduction)

* [Cloning the app](#cloning-and-running-the-app)
  * [Dummy User](#dummy-user-for-test)
  * [CMD Line](#cmd-line)

* [Features](#features)

* [Preview](#preview)

* [Screenshots](#screenshots)




## Introduction
This is a todo list app with basic functionalities built with Angular 18 and raw CSS3 and HTML.
Mimicks basic **CRUD**_(Create,Update,Delete)_ functions while having smooth UI functionality.

The main branch uses an online server to display real life RESTful CRUD operations. The local branch uses json-server which is local server, displays the same RESTful CRUD operations locally. I recomment the local branch fro any testing on your machine.





## Cloning and running the app
This is after you download and extract zip file in your desired folder or cloned this project via github

### CMD line
```
//cloning
git clone -b local --single-branch https://github.com/GoitseoneKau/DailyTodo.git //for the repository that you can use locally, main branch runs with an online server

//This will install dependencies//
npm install 

//To start the app run these commands//
//run userServer and todoServer separate command line along the same path
npm run userServer //This will run json server on port 3000 i.e localhost:3000/users

npm run todoServer//This will run json server on port 3001 i.e localhost:3001/todos

ng serve or npm run start //This will run the angular server
```

*N.B You can change the ports of the JSON servers in the package.json file*

/package.json :
```
"scripts:{
     ....,
    "todoServer": "json-server --watch src/assets/todos.json --port 3001",//JSON server script for todos api or json file
    "userServer": "json-server --watch src/assets/users.json --port 3000",//JSON server script for users api or json file
    ....,
}
```

###  Dummy User For Test
```
    {
      "firstName": "Martin",
      "lastName": "Kau",
      "email": "martinkay@gmail.com",
      "password": "abC12#",
    }
```
## Features

* API functionality with 2 simulated api calls to local JSON server
* Login functionality with **User Authentication**
* Signup functionality with **Existing User Confirmation**
* Reactive Form Validation
* Custom Validators
* Update Todo Item Functionality
* Remove/Delete Todo Item Functionality
* Add Todo Item Functionality
* Display Stored Todo Items In List Form
* Filtering Functionality According to *__Low to High Priority__* and *__Completed Status__*
* Color Coded Todo Schemes To Visually Identify The Most Importantto Least important Todo

## Screenshots
### Login
![Login Screen](/src/assets/images/login.PNG)
### Signup
![Registration Screen](/src/assets/images/registration.PNG)
### Todo List
![Todo Screen](/src/assets/images/filter.PNG)

## Preview

Checkout the preview (Hosted on Vercel) : [Daily Todo](https://daily-todo-one.vercel.app/).

Check out my deployed API simple RESTful server on Render 

[TSExpressAPI for users](https://tsexpressrestapi.onrender.com/api/users) API end point for Users

[TSExpressAPI for todos](https://tsexpressrestapi.onrender.com/api/todos) API end point for Todos

[TSExpressAPI githublink](https://github.com/GoitseoneKau/TSExpressRestAPI) Github source for simple server

This project is using `Angular 18`.

## Angular 18

> Angular is a web framework that empowers developers to build fast, reliable applications.
Maintained by a dedicated team at Google, Angular provides a broad suite of tools, APIs, and libraries to simplify and streamline your development workflow. Angular gives you a solid platform on which to build fast, reliable applications that scale with both the size of your team and the size of your codebase..
>