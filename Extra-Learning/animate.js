function makeCounter() {
  const chars = `|/-\\`;
  let n = 0;

  return function () {
    if (n % 997 === 0) process.stdout.write(`\b${chars[n % chars.length]}`);
    n++;
  };
}

// setInterval(() => {
const tick = makeCounter();
for (let i = 0; i < 10; i++) {
  tick();
}
// }, 500);
