const bcrypt = require("bcryptjs");
const _ = require("lodash");

const pws = ["helloworld", "pie", "fart"];
const alphabet =
  "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
//let shuffledArr = _.shuffle(pws);

function genRnd2Chpws() {
  const i1 = _.random(62);
  const i2 = _.random(62);
  return `${alphabet[i1]}${alphabet[i2]}`;
}

for (let i = 0; i < 10; i++) {
  const pw = genRnd2Chpws();
  const hash = bcrypt.hashSync(pw, 4);
  console.log(hash);
}

// for (let pw of shuffledArr) {
//   const hash = bcrypt.hashSync(pw, 4);
//   console.log(hash, pw); // append to a file
// }
