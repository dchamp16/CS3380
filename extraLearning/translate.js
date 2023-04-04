const fs = require("fs");
const msgs = require("./msgs.en-us.json");
const mensahe = require("./msgs.es-MX.json");

console.log(msgs["must supply a path1"]);
return;

let userInput = process.argv.slice(2);
const language = userInput[0];
const location = userInput[1];

// console.log(`lang: ${language} | loc: ${location}`); //for testing

function helpAnyLang(lang, loc) {
  const text = fs.readFileSync(`help-${lang}-${loc}.txt`, "utf-8");

  console.log(text);
}

helpAnyLang(language, location);
