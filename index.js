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
    inquirer.prompt([{
        type: "input",
        message: "What is the name of the department you would like to add?",
        name: "dept"
    }]).then(({dept}) => {
        var sql = "INSERT into department (name) VALUES (?)"
        connection.query(sql, dept, function (err, res){
            if(err) throw err;
            viewDepartments();
        })
    })
}

function addEmployee(){
    inquirer.prompt([
    {
        type: "input",
        message: "What is your employee's first name?",
        name: "firstname"
    },
    {
        type: "input",
        message: "What is your employee's last name?",
        name: "lastname"
    },
    {
        type: "input",
        message: "What is your employee's role id?",
        name: "roleid"
    },
    {
        type: "input",
        message: "What is your employee's manager id?",
        name: "managerid"
    }
]).then(data =>{
    var sql = "INSERT into employee (first_name, last_name, role_id, manager_id) VALUES (?,?,?,?)"
    // same as dept but dept in connection query [x,y,z,f]
    connection.query(sql, [data.firstname, data.lastname, data.roleid, data.managerid], function (err, res){
        if(err) throw err;
    viewEmployees();
})
})
}


function addRole(){
    inquirer.prompt([
        {
            type:"input",
            message: "What is the title of the job?",
            name: "title"
        },
        {
            type: "input",
            message: "What is the salary for this position?",
            name: "salary"
        },
        {
            type: "input",
            message: "What is the department id number?",
            name: "deptid"
        }
    ]).then(data => {
        var sql = "INSERT into role (title, salary, department_id) VALUES (?,?,?)"
        connection.query(sql, [data.title, data.salary, data.deptid], function (err, res){
            if(err) throw err;
        viewRoles();
    })
    })
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

function updateEmployeeRole(){
    inquirer.prompt([
        {
            type: "input",
            message: "What is the role ID number?",
            name: "rolenumber"
        },
        {
            type: "input",
            message: "What is the ID number where you want to make this change?",
            name: "idnumber"
        }
    ]).then(data => {
        var sql = "UPDATE employee SET role_id = ? WHERE id = ?;"
        connection.query(sql, [data.rolenumber, data.idnumber], function (err, res){
            if(err) throw err;
        viewEmployees();
    })
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
    else if(data.initialQuestions == "Update employee role"){
        updateEmployeeRole();
    }
});
}

app.listen(PORT, function() {
    console.log("Server listening on: http://localhost:" + PORT);
  });
