const _ = require("lodash");
var users = [
  { user: "barney", age: 36, active: true },
  { user: "fred", age: 40, active: false },
  { user: "pebbles", age: 1, active: true },
];
let test = _.forEach(users[0], function (o) {
  console.log(o);
});
console.log(test);
