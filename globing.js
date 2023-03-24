const {
  glob,
  globSync,
  globStream,
  globStreamSync,
  Glob,
  globIterateSync,
} = require("glob");
const fs = require("fs");
const _ = require("lodash");
const filesize = require("filesize");
const chalk = require("chalk");

let userInput = process.argv.slice(2);
let command = userInput[0];
let sortCommand = userInput[1];
const directory = userInput[2];
const extension = userInput[3];

function globbing(directory, ext) {
  let statObj = [
    {
      name: "",
      size: 0,
      sizeString: "",
    },
  ];
  for (const file of globIterateSync(`${directory}/**/*.${ext}`, {
    stat: true,
    withFileTypes: true,
  })) {
    makeCounter();
    statObj.push({
      name: file.name,
      size: file.size,
      sizeString: filesize.filesize(file.size),
    });
  }
  switch (sortCommand) {
    case "alpha":
      let sortName = _.sortBy(statObj, (o) => o.name);
      sortName.forEach((data) => console.log(data.name, data.sizeString));
      break;
    case "size":
      let sortSize = _.sortBy(statObj, (o) => o.size).reverse();
      sortSize.forEach((data) => {
        console.log(
          `${data.name} \t\t ${
            data.size < 1000
              ? chalk.bgGreen(data.sizeString)
              : chalk.bgRed(data.sizeString)
          }`
        );
      });
      break;
  }
}

function makeCounter() {
  const spinningChars = `|/-\\`;
  let n = 0;
  function clear() {
    process.stdout.write(`\r`);
  }
  function tick() {
    if (n % 997 === 0)
      process.stdout.write(`\r${spinningChars[n % spinningChars.length]}`);
    n++;
  }
  return { tick, clear };
}

globbing(directory, extension);
