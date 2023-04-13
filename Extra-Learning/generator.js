const alphanumeric = "abc012";
// function* helloWorldGen() {
//   yield* alphanumeric;
// }

// function* spikeGenerator1() {
//   yield 4;
//   yield 5;
//   return;
//   yield 6;
// }
// function* spikeGenerator2() {
//   yield 1;
//   yield 2;
//   yield 3;
//   yield* spikeGenerator1();
//   yield 7;
// }
function* pwsOfLen1() {
  yield* alphanumeric;
}

function* pwsOfLen2() {
  for (let ch1 of pwsOfLen1()) {
    for (let ch2 of pwsOfLen1()) {
      yield ch1 + ch2;
    }
  }
}

function* pwsOfLen3() {
  for (let ch1 of pwsOfLen1()) {
    for (let ch2 of pwsOfLen2()) {
      yield ch1 + ch2;
    }
  }
}

function* pwsOfLen(n) {
  if (n === 1) yield* alphanumeric;
  else {
    for (let ch1 of alphanumeric) {
      for (let ch2 of pwsOfLen(n - 1)) {
        yield ch1 + ch2;
      }
    }
  }
}
function* pwsOfLenUpTo(n) {}

function main() {
  for (let word of pwsOfLen(4)) {
    console.log(word);
  }
}

main();
