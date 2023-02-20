function myFunction(input) {
  if (input >= 10) {
    //if input is greater than 10
    console.log("done"); // show num value
  } else {
    input++;
    myFunction(input);
  }
  console.log(input);
}
myFunction(0);
