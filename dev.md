
- set up your MongoDB database and connected it to your Express app;
- used Mongoose to create a data model in order to facilitate database operations;
- implemented CRUD routes in your Express app which leverage your Mongoose data model, rendering your app fully dynamic.

# update npm
npm install -g npm@latest

# Testing login
to create test user, just use the following code in (user route), after created users, please commented out these lines:


```bash
var user = new User( {
    email: 'any.email',
    password: 'any.password'
} );

user.save();
```

