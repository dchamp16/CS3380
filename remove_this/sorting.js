//TODO numbers
let nums = [7, 12, 42, 1, 5, 7];
nums.sort((a, b) => a - b);
// console.log(nums);

//TODO strings
let strs = ["run", "the mouse", "up", "Up", "clock"];
strs.sort((a, b) => a.localeCompare(b));
// console.log(strs);

//TODO object
let dogs = [
  { name: "Penny", breed: "corgy", age: 1 },
  { name: "Sammy", breed: "corgy", age: 14 },
  { name: "Cerebus", breed: "hellhound", age: 10000 },
  { name: "Lassie", breed: "collie", age: 1 },
];

// dogs.sort((a, b) => a.age - b.age); //sort age
dogs.sort((a, b) => a.name.localeCompare(b.name));

console.table(dogs);
