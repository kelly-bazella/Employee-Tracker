var inquirer = require("inquirer");
var mysql = require("mysql")

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
})


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
        name: "initial-questions",
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

inquirer.prompt(starterQuestion).then(data => {
    console.log(data)
    // if (answer.initial-questions == "View department"){
    //     viewDepartments();
    // } 
    // else if(answer.initial-questions == "View employees"){
    //     viewEmployees();
    // }
    // else if(answer.initial-questions == "View roles"){
    //     viewRoles();
    // }
});
