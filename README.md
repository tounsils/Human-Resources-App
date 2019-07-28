Human Resources application dealing with the people and issues rela ted to people such as compensation and benefits, recruiting and hiring employees, onboarding employees, performance management, training, and organization devel opment and culture.


## Table of Contents

1.  [Installation](#1-Installation)
2.  [Running the Application](#2-Running-the-Application)

7.  [Issues](#7-Issues)
8.  [Committee](#8-Committee)
10.  [TODO](#10-TODO)


<br/><br/>

# `1. Installation`
## Steps to Setup

1. Install dependencies

```bash
npm install
```

2. Run Server

```bash
npm start
```
## Git
git init
git add .
git commit -m "Updated modified files but still problem in employee route"
git remote add origin https://github.com/tounsils/hr
git push origin master

git clone https://github.com/tounsils/hr

### Create a new repository on the command line

git init
git add .
git commit -m "first uploaded files"
git remote add origin https://github.com/tounsils/hr.git
git push -u origin master

…or push an existing repository from the command line

git remote add origin https://github.com/tounsils/hr.git
git push -u origin master

# `2. Running the Application`

To run the application, open a command prompt and navigate to project directory. Run command as
npm start

	
npm start

If you are running for the first time, then before you run the start command, initialize the project with
npm init

	
npm init

This will start the node server at port 6002 and you can access the application at url http://localhost:6002/

# `7. Issues`

## ![✔] import http from 'http'  // reported ERR!

quick fix
npm i @types/node

// Replace 
// import app from "./app"; 
// with the following line :
var app = require("./app");


# `8. Committee`

Meet the hr committee members - the people who work together to provide 
guidance and future direction to the project. 
In addition, each member of the committee leads a project tracked under our Github projects.

# `10. TODO`
recording is only on appusers database
users is using views/static/js/home.js