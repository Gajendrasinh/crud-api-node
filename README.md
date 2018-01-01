# crud-api-node
Building a Restful CRUD API with Node.js, Express and MongoDB

# Creating the Application

1. Fire up your terminal and create a new folder for the application.

    $ mkdir crud-api

2. Initialize the application with a package.json file

    Go to the root folder of your application and type npm init to initialize your app with a package.json file.

    $ cd crud-api
    $ npm init

3. Install dependencies

    We will need express, mongoose and body-parser modules in our application. Let’s install them by typing the following command -

    $ npm install express body-parser mongoose --save

    Our application folder now has a package.json file and a node_modules folder -

    crud-api
        └── node_modules/
        └── package.json
    
# Setting up the web server

Let’s now create the main entry point of our application. Create a new file named server.js in the root folder of the application with the following contents -

const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
app.set('port', process.env.PORT || 3000);

app.use(bodyParser.urlencoded({ extended: false }))

app.use(bodyParser.json())

app.get('/', function(req, res){<br>
    res.json({"message": "I am working"});<br>
});

var server = app.listen(app.get('port'), function() {<br>
    var port = server.address().port;<br>
    console.log('Magic happens on port ' + port);<br>
});

All right! Let’s now run the server and go to http://localhost:3000 to access the route we just defined.

$ node server.js 
Server is listening on port 3000

# Configuring and Connecting to the database

I like to keep all the configurations for the app in a separate folder. Let’s create a new folder config in the root folder of our application for keeping all the configurations -

    $ mkdir config <br>
    $ cd config
    
Now, Create a new file database.config.js inside config folder with the following contents -

module.exports = {<br>
    url: 'mongodb://localhost:27017/test'<br>
}

# Defining the toDo model in Mongoose

Next, We will define the todo model. Create a new folder called app inside the root folder of the application, then create another folder called models inside the app folder -

$ mkdir app/models <br>
$ cd app/models

Now, create a file called todo.js inside app/models folder with the following contents -

const mongoose = require('mongoose'); <br>

const Schema = mongoose.Schema;  <br>

const toDoSchema = new Schema({  <br>
	title: String,  <br>
	url: String, <br>
	description: String <br>
}); <br>

module.exports = mongoose.model('todo', toDoSchema , 'todo')
