const { glob, globSync, globStream, globStreamSync, Glob } = require("glob");
const fs = require("fs");
const _ = require("lodash");
const filesize = require("filesize");
const chalk = require("chalk");

let userInput = process.argv.slice(2);
let command = userInput[0];
const directory = userInput[1];
const extension = userInput[2];

if (command === "test") globbing(directory, extension);

function globbing(directory, ext) {
  if (typeof directory === "undefined" || typeof ext === "undefined") {
    console.log("peter");
  } else {
    console.log("justine");
  }
  // const filesStream = globSync(`${directory}/**/*.${ext}`);
  // const regex = `\\w+\.${ext}`;
  // const regexFileName = new RegExp(regex, "g");
  // let statObj = [
  //   {
  //     name: "",
  //     size: 0,
  //     sizeString: "",
  //   },
  // ];
  // for (let file of filesStream) {
  //   const stat = fs.statSync(file);
  //   statObj.push({
  //     name: file.match(regexFileName).toLocaleString(),
  //     size: stat.size,
  //     sizeString: filesize.filesize(stat.size),
  //   });
  // }
  // console.log(statObj);
  // switch (sortCommand) {
  //   case "alpha":
  //     let sortName = _.sortBy(statObj, (o) => o.name.toLowerCase());
  //     sortName.forEach((data) => console.log(data.name, data.sizeString));
  //     break;
  //   case "size":
  //     let sortSize = _.sortBy(statObj, (o) => o.size).reverse();
  //     sortSize.forEach((data) => {
  //       console.log(
  //         `${data.name} \t\t ${
  //           data.size < 1000
  //             ? chalk.bgGreen(data.sizeString)
  //             : chalk.bgRed(data.sizeString)
  //         }`
  //       );
  //     });
  //     break;
  // }
}
