var inquirer = require("inquirer");
var express = require("express");
var mysql = require("mysql");
var app = express();
var PORT = 7050;
// port and listener NOT 3306

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "",
    database: "employee_tracker_db"
});

connection.connect(function(err){
    if(err) throw err;
    console.log("connection is id: "+ connection.threadId);
    start();
});


function addDepartment(){
    var sql = "INSERT into department (name) VALUES (?)"
}

function addEmployee(){
    var sql = "INSERT into employee (first_name, last_name, role_id, manager_id) VALUES (?,?,?,?)"
}

function addRole(){
    var sql = "INSERT into role (title, salary, department_id) VALUES (?.?,?)"
}

function viewDepartments(){
    var sql = "SELECT * FROM department"
    connection.query(sql, function (err, res){
        if(err) throw err;
        console.table(res);
        start();
    })
}

function viewEmployees(){
    var sql = "SELECT * FROM employee"
    connection.query(sql, function (err, res){
        if(err) throw err;
        console.table(res);
        start();
    })
}

function viewRoles(){
    var sql = "SELECT * FROM role"
    connection.query(sql, function (err, res){
        if(err) throw err;
        console.table(res);
        start();
    })
}

var starterQuestion = 
    [{
        type: "list",
        message: "What would you like to do?",
        name: "initialQuestions",
        choices: [
            "Add department",
            new inquirer.Separator(),
            "Add employee",
            new inquirer.Separator(),
            "Add role",
            new inquirer.Separator(),
            "View departments",
            new inquirer.Separator(),
            "View employees",
            new inquirer.Separator(),
            "View roles",
            new inquirer.Separator(),
            "Update employee role",
            new inquirer.Separator()
        ]
    }];

function start () {inquirer.prompt(starterQuestion).then(data => {
    console.log(data)
    if (data.initialQuestions == "View departments"){
        viewDepartments();
    } 
    else if(data.initialQuestions == "View employees"){
        viewEmployees();
    }
    else if(data.initialQuestions == "View roles"){
        viewRoles();
    }
    else if(data.initialQuestions == "Add department"){
        addDepartment();
    }
    else if(data.initialQuestions == "Add employee"){
        addEmployee();
    }
    else if(data.initialQuestions == "Add role"){
        addRole();
    }
});
}
app.listen(PORT, function() {
    console.log("Server listening on: http://localhost:" + PORT);
  });
