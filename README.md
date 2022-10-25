
# Task Manager API



The main objective of this project is to design a Task Manager API using Node.js, to keep track of errands or tasks that need to be done by the users. This application will be a task keeper where the user would enter the tasks that they need to do. The tasks created by a particular user can only view only his/her own tasks, that particular user cannot access the tasks of another user. This website makes to stay focused, become organized, and stay calm with to-do list.Add your tasks. Organize your life. Achieve more every day.




## Prerequisites

1. Before Installation please make sure you have already installed the following tools:
- GitHub
- Node.js
## Installation

1. Fork the Project
2. Clone the project
```bash
git clone https://github.com/eddejayaklu/Task-Manager-API.git
```
3. Navigate to the project directory task-manager
```bash
cd task-manager
```
4.Install dependencies
```bash
npm install
```
5. Make sure you are runing your MongoDB server

6. To start the server
```bash
npm run dev
```


## Features

- Implemented authorization and authentication using Json Web Token.
- All the tasks are filtered, sorted and paginated according to user requirements.
- Whenever an user is created or deleted an email will be sent to that particular user.
- Used environment variables so that we can make our app easier to configure by separating infrequently changing data from our code, environment variables provide security as well when we deploy our project.
- Each user can login on mutiple devices and at the same time if user wants to logout from all devices, the user will be able to do so just from one device.
## Screenshots
- addUser
![addUser](https://user-images.githubusercontent.com/88376986/192283282-41e6f226-c0bb-45a7-976e-e2a0e1d18709.png)

- getTasks_paginated
![getTasks_paginated](https://user-images.githubusercontent.com/88376986/192283639-c97ffa88-74d3-406b-b65c-f6876b397666.png)


## Tech stacks
- Node.js
- Express.js
- MongoDB
