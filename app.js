const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const { prompt } = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");
const team = []

// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

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

// Employee question list
const employeeQuestion = [
  {
    type: 'input',
    name: 'name',
    message: 'Please enter your Name'
  },
  {
    type: 'input',
    name: 'id',
    message: 'What is your ID?'
  },
  {
    type: 'input',
    name: 'email',
    message: 'What is your email address?'
  }
]

// adds question to employee question array
const managerQuest = employeeQuestion.concat([{
  type: 'input',
  name: 'officeNumber',
  message: 'What is your Office Number?'
}])
const engineerQuest = employeeQuestion.concat([{
  type: 'input',
  name: 'github',
  message: 'What is your Github Username?'
}])
const internQuest = employeeQuestion.concat([{
  type: 'input',
  name: 'school',
  message: 'What school are you from?'
}])

// add more question loop
const checkMore = () => {
  prompt({
    type: 'confirm',
    name: 'cont',
    message: 'Do you have more members to add?'
  })
    .then(({ cont }) => {
      if (cont) {
        prompt({
          type: 'list',
          name: 'type',
          message: 'What type of member would you like to add?',
          choices: ['Manager', 'Engineer', 'Intern']
        })
          .then(({ type }) => {
            switch (type) {
              case 'Manager':
                createManager()
                break;
              case 'Engineer':
                createEngineer()
                break;
              case 'Intern':
                createIntern()
                break;
            }
          })
      } else {
        fs.writeFile(outputPath, render(team), err => {
          if (err) { console.log(err) }
          console.log('HTML Generated!')
        })
      }
    })
    .catch(err => console.log(err))
}

// manager function
const createManager = () => {
  prompt(managerQuest)
    .then(({ name, id, email, officeNumber }) => {
      // creates new Manager
      team.push(new Manager(name, id, email, officeNumber))
      checkMore()
    })
    .catch(err => console.log(err))
}

// Engineer function
const createEngineer = () => {
  prompt(engineerQuest)
    .then(({ name, id, email, github }) => {
      // creates new engineer
      team.push(new Engineer(name, id, email, github))
      checkMore()
    })
    .catch(err => console.log(err))
}

// Intern function
const createIntern = () => {
  prompt(internQuest)
    .then(({ name, id, email, school }) => {
      // creates new intern
      team.push(new Intern(name, id, email, school))
      checkMore()
    })
    .catch(err => console.log(err))
}


createManager()