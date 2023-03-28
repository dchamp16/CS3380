const os = require("os");
// console.log(os.type());
// return;
const bitMask = [
  0b00000001, 0b00000010, 0b00000100, 0b00001000, 0b00010000, 0b00100000,
  0b01000000, 0b10000000,
];

function isPosInt(x) {
  /* DONE */
  //TODO return true if x is a positive integer; otherwise false
  //example param values
  //[40] false because it's an array
  //{  } false because it's an object
  //'50' false because it's a string
  //40.5 false because it's float
  //-890 false because it's negative
  //3000 true
  //HINT look at Number methods
  return (positive =
    x > 0 && Number.isInteger(x) && x % 1 === 0 ? true : false);
}

function bitArray(bitSize) {
  let type = os.type();
  if (!isPosInt(bitSize)) {
    console.error("A bitArray can only be created with a positive integer.");
    //TODO detect the OS and return the correct status code /* DONE */
    //13 for Windows
    //33 for OsX/Linux
    //HINT https://nodejs.org/api/os.html#os_os_type
    //(No, I don't know why Mac is called 'Darwin'. You can find out and tell me.)
    switch (type) {
      case "Windows_NT":
        process.exit(13);
        break;
      default:
        process.exit(33);
        break;
    }
  }

  const byteSize = 2; //TODO calc the correct size in bytes
  const bytes = new Uint8Array(byteSize); //automatically 0 filled //used as closure below
  return {
    set: (i) => i | (1 << bytes), //TODO write 1 to ith bit in bytes /* DONE */
    clear: (i) => i & ~(1 << bytes), //TODO write 0 to ith bit in bytes /* DONE */
    get: (i) => (i >> 1) & bytes, //TODO read 0 or 1 from ith bit in bytes /* DONE */
    flip: (i) => i ^ (1 << bytes), //TODO write 1 to ith bit in bytes if it's 0, and vice versa //aka toggle /* DONE */
  }; //HINT set, clear, get, flip can each be done in one line
}
bitArray();
function test() {
  //try it out
  const bits = bitArray(32);

  bits.set(0);
  bits.set(3);
  bits.set(7);
  bits.set(8);
  bits.set(24);
  bits.set(30);
  bits.set(1);

  bits.clear(1);
  bits.clear(3);
  bits.clear(24);
  bits.clear(0);

  bits.flip(3);
  bits.flip(9);
  bits.flip(30);
  bits.flip(2);

  //Do all 32 bits have the value you expected?
  // for (let i = 0; i < 32; i++) {
  //   console.log(i, bits.get(i));
  // }
  //NOTE "trying it out" is not the same as testing--AT ALL. Why not?
  //TODO comment out the print loop /* DONE */
  //TODO add console.assert statements before and after each set, clear, flip statement
  //TODO rename main to test /* DONE */
  console.log(bits.get());
}
test();
