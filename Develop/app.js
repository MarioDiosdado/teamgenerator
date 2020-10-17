const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

const arr = [];
// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)
function addEmployee() {
    inquirer
        .prompt([
            {
                type: "input",
                message: "What is your name?",
                name: "name"
            },
            {
                type: "input",
                message: "What is your id?",
                name: "id"
            },
            {
                type: "input",
                message: "What is your email?",
                name: "email"
            },
            {
                type: "list",
                message: "What is your role?",
                name: "role",
                choices: [
                    "Manager",
                    "Engineer",
                    "Intern"
                ]
            }
        ]).then(function (data) {
            const name = data.name;
            const id = data.id;
            const email = data.email;
            if (data.role === "Manager") {
                inquirer.prompt([
                    {
                        type: "input",
                        message: "What is your office number?",
                        name: "officeNumber"
                    }
                ]).then(function (data) {
                    const officeNumber = data.officeNumber;
                    const manager = new Manager(name, id, email, officeNumber);
                    arr.push(manager);
                    console.log(arr);
                    inquirer.prompt([
                        {
                            type: "list",
                            message: "Do you want to add another employee?",
                            name: "goAgain",
                            choices: [
                                "Yes",
                                "No"
                            ]
                        }
                    ]).then(function (data) {
                        if (data.goAgain === "Yes") {
                            addEmployee();
                        } else {
                            var a = render(arr);
                            console.log(a);
                        }
                    })
                })
            } else if (data.role === "Engineer") {
                inquirer.prompt([
                    {
                        type: "input",
                        message: "What is your GitHub username?",
                        name: "github"
                    }
                ]).then(function (data) {
                    const github = data.github;
                    const engineer = new Engineer(name, id, email, github);
                    arr.push(engineer);
                    console.log(arr);
                    inquirer.prompt([
                        {
                            type: "list",
                            message: "Do you want to add another employee?",
                            name: "goAgain",
                            choices: [
                                "Yes",
                                "No"
                            ]
                        }
                    ]).then(function (data) {
                        if (data.goAgain === "Yes") {
                            addEmployee();
                        } else {
                            var a = render(arr);
                            console.log(a);
                        }
                    })
                })
            } else if (data.role === "Intern") {
                inquirer.prompt([
                    {
                        type: "input",
                        message: "What is your School?",
                        name: "school"
                    }
                ]).then(function (data) {
                    const school = data.school;
                    const intern = new Intern(name, id, email, school);
                    arr.push(intern);
                    console.log(arr);
                    inquirer.prompt([
                        {
                            type: "list",
                            message: "Do you want to add another employee?",
                            name: "goAgain",
                            choices: [
                                "Yes",
                                "No"
                            ]
                        }
                    ]).then(function (data) {
                        if (data.goAgain === "Yes") {
                            addEmployee();
                        } else {
                            var a = render(arr);
                            console.log(a);
                        }
                    })
                })
            }

        })
}

addEmployee();
// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
