# `Rest API - JWT`

## User and Todo-Post API (fully stateless control of backend end-point)

Request 요청에 따라 각 유저가 자신의 To-do 리스트를 만들어 Json으로 결과 값을 보내는 API

<br/>

On request into the end-point, a user can create, update, and delete his/her To-do list and send it as a Json format 

* DB - Mongodb
* ODM - Mongoose
* Tool - Postman

Enjoy!

<br/>

### install npm dependencies 
```bash
npm install
```
<br/>

#### MUST configure the mongodb,port, and JWT inside the config folder and save as config.json

  "development": {
        "PORT": ""
        "MONGODB_URI": ""
        "JWT_SECRET": "" }

<br/>

### Each end point can be tested by postman 

* GET /todos - get all todos
* POST /todos - create todo with body {"text":""}
* GET /todos/:id - get a specific todo
* DELETE /todos/:id - delete a specific todo
* PATCH /todos/:id - update a specific todo {"text":"", "completed": boolean}
* POST /users - sign up a user {"email":"","password":""} (bcrypt applied, Jsonwebtoken created)
* GET /users/me - get the currently authenticated user
* POST /users/login - login a user {"email":"","password":""} (Jsonwebtoken added to the header of response)
* DELETE /users/me/token - Delete the current token (logout)


