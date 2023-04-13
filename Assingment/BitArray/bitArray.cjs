const os = require("os");

const bitMask = [
  0b00000001, 0b00000010, 0b00000100, 0b00001000, 0b00010000, 0b00100000,
  0b01000000, 0b10000000,
];

function isPosInt(x) {
  return (positive =
    x > 0 && Number.isInteger(x) && x % 1 === 0 ? true : false);
}

function bitArray(bitSize) {
  let isOsType = os.type === "Windows_NT" ? 13 : 33;
  if (!isPosInt(bitSize)) {
    console.error("A bitArray can only be created with a positive integer.");
    process.exit(isOsType);
  }

  const byteSize = Math.ceil(bitSize / 8);
  const bytes = new Uint8Array(byteSize);
  return {
    set: (i) => (bytes[Math.floor(i / 8)] |= bitMask[i % 8]),
    clear: (i) => (bytes[Math.floor(i / 8)] &= ~bitMask[i % 8]),
    get: (i) => (bytes[Math.floor(i / 8)] & bitMask[i % 8] ? 1 : 0),
    flip: (i) => (bytes[Math.floor(i / 8)] ^= bitMask[i % 8]),
  };
}

function test() {
  const bits = bitArray(32);
  console.assert(bits.get(0) === 0, "get(0) : 0");
  bits.set(0);
  console.assert(bits.get(0) === 1, "get(0) : 1");

  console.assert(bits.get(3) === 0, "get(3) : 0");
  bits.set(3);
  console.assert(bits.get(3) === 1, "get(3) : 1");

  console.assert(bits.get(7) === 0, "get(7) : 0");
  bits.set(7);
  console.assert(bits.get(7) === 1, "get(7) : 1");

  console.assert(bits.get(8) === 0, "get(8) : 0");
  bits.set(8);
  console.assert(bits.get(8) === 1, "get(8) : 1");

  console.assert(bits.get(24) === 0, "get(24) : 0");
  bits.set(24);
  console.assert(bits.get(24) === 1, "get(24) : 1");

  console.assert(bits.get(30) === 0, "get(30) : 0");
  bits.set(30);
  console.assert(bits.get(30) === 1, "get(30) : 1");

  console.assert(bits.get(1) === 0, "get(1) : 0");
  bits.set(1);
  console.assert(bits.get(1) === 1, "get(1) : 1");

  console.assert(bits.get(1) === 1, "get(1) : 1");
  bits.clear(1);
  console.assert(bits.get(1) === 0, "get(1) : 0");

  console.assert(bits.get(3) === 1, "get(3) : 1");
  bits.clear(3);
  console.assert(bits.get(3) === 0, "get(3) : 0");

  console.assert(bits.get(24) === 1, "get(24) : 1");
  bits.clear(24);
  console.assert(bits.get(24) === 0, "get(24) : 0");

  console.assert(bits.get(0) === 1, "get(0) : 1");
  bits.clear(0);
  console.assert(bits.get(0) === 0, "get(0) : 0");

  console.assert(bits.get(3) === 0, "get(3) : 0");
  bits.flip(3);
  console.assert(bits.get(3) === 1, "get(3) : 1");

  console.assert(bits.get(9) === 0, "get(9) : 0");
  bits.flip(9);
  console.assert(bits.get(9) === 1, "get(9) : 1");

  console.assert(bits.get(30) === 1, "get(30) : 1");
  bits.flip(30);
  console.assert(bits.get(30) === 0, "get(30) : 0");

  console.assert(bits.get(2) === 0, "get(2) : 0");
  bits.flip(2);
  console.assert(bits.get(2) === 1, "get(2) : 1");

  // for (let i = 0; i < 32; i++) {
  //   console.log(i, bits.get(i));
  // }
}

// test();

// const bits = new bitArray(20);
// console.log(bits.get(0));
// bits.set(0);
// console.log(bits.get(0));

module.exports = bitArray;
