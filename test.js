let userInput = process.argv.slice(2);
const getHelpText = require("./getHelpText");

switch (userInput[0]) {
  case "peter":
  case "Peter":
    console.log(getHelpText());
    break;
  case "lauren":
  case "Lauren":
    console.log("lauren", true);
    break;
  default:
    console.log("wrong input");
}
