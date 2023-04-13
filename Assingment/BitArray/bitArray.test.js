const bitArray = require("./bitArray.cjs");

const bits = bitArray(32);

test("get(0) : 0 (true)", () => {
  bits.set(0);
  expect(bits.get(0)).toBe(1);
});

test("get(3) : 1 (true)", () => {
  bits.set(3);
  expect(bits.get(3)).toBe(1);
});

test("get(7) : 1 (true)", () => {
  bits.set(7);
  expect(bits.get(7)).toBe(1);
});

test("get(8) : 1 (true)", () => {
  bits.set(8);
  expect(bits.get(8)).toBe(1);
});

test("get(24) : 1 (true)", () => {
  bits.set(24);
  expect(bits.get(24)).toBe(1);
});

test("get(30) : 1 (true)", () => {
  bits.set(30);
  expect(bits.get(30)).toBe(1);
});

test("get(1) : 1 (true)", () => {
  bits.set(1);
  expect(bits.get(1)).toBe(1);
});

test("get(1) : 0 (false)", () => {
  bits.clear(1);
  expect(bits.get(1)).toBe(0);
});

test("get(0) : 0 (false)", () => {
  bits.clear(3);
  expect(bits.get(3)).toBe(0);
});

test("get(24) : 0 (false)", () => {
  bits.clear(24);
  expect(bits.get(24)).toBe(0);
});

test("get(0) : 0 (false)", () => {
  bits.clear(0);
  expect(bits.get(0)).toBe(0);
});

test("get(3) : 1 (true)", () => {
  bits.flip(3);
  expect(bits.get(3)).toBe(1);
});

test("get(9) : 1 (true)", () => {
  bits.flip(9);
  expect(bits.get(9)).toBe(1);
});

test("get(30) : 1 (true)", () => {
  bits.flip(30);
  expect(bits.get(30)).toBe(0);
});

test("get(2) : 1 (true)", () => {
  bits.flip(2);
  expect(bits.get(2)).toBe(1);
});
