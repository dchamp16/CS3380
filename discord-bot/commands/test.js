import { getLorem } from "./fetch-lorem.js";

let lorem = getLorem().then((data) => {
  let string = JSON.parse(data);
  return string["text"];
});

console.log(lorem.then((data) => data));
