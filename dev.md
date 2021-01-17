
- set up your MongoDB database and connected it to your Express app;
- used Mongoose to create a data model in order to facilitate database operations;
- implemented CRUD routes in your Express app which leverage your Mongoose data model, rendering your app fully dynamic.

# update npm
sudo npm install -g npm@latest
Use npm update to perform safe dependency upgrades

# Testing login
to create test user, just use the following code in (user route), after created users, please commented out these lines:

# Mongodb
https://www.digitalocean.com/community/tutorials/how-to-install-mongodb-on-ubuntu-18-04
sudo systemctl status mongodb



```bash
var user = new User( {
    email: 'any.email',
    password: 'any.password'
} );

user.save();
```

# Errors
## error: Pulling is not possible because you have unmerged files.

    git fetch origin
    git reset --hard origin/master
    git pull

Explanation:

    Fetch will download everything from another repository, in this case, the one marked as "origin".
    Reset will discard changes and revert to the mentioned branch, "master" in repository "origin".
    Pull will just get everything from a remote repository and integrate.

## Cannot GET /exportemployeestocsv


## Error: Cannot find module 'cookie-parser'
    npm install cookie-parser

# add field in doc
Files to edit :
- routes/Employee.js
    - router.post("/add", (req, res, next) => { ....
    - router.post('/update', (req, res, next) => { ....
- schema/Employee.js
    - const employeeSchema = new Schema({ ....
- views/employees.hbs
    - <label for="input....
    - <input type="....
    - <!-- Modal - Update Employee details --> ...
- views/static/js/employees.js
    - //on EditBtnEmployees click ....
    - $("#update_ new field
    - //on update employee submit the form 
    - ajax
    - //read list 
    - item[??].innerHTML=$('#update_ new field').val();
    - function getRowHtmlEmployees(item) { ...
    - + getTD(item. new field)



# validation
https://express-validator.github.io/docs/

# ToDo
## Multiple files upload
https://bezkoder.com/node-js-upload-multiple-files/

