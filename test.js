let obj1 = [
  {
    name: "node_modules",
    sizeNum: 128,
    sizeStr: "128 B",
    isFile: false,
    blocks: 1,
    files: [],
  },
  {
    name: "remove_this",
    sizeNum: 128,
    sizeStr: "128 B",
    isFile: false,
    blocks: 1,
    files: [],
  },
  {
    name: "test",
    sizeNum: 128,
    sizeStr: "128 B",
    isFile: false,
    blocks: 1,
    files: [],
  },
  {
    name: ".git",
    sizeNum: 512,
    sizeStr: "512 B",
    isDirectory: true,
    blocks: 1,
  },
  {
    name: "bigStuff.js",
    sizeNum: 3174,
    sizeStr: "3.17 kB",
    isDirectory: false,
    blocks: 1,
  },
];

let obj2 = [
  {
    name: "filesize",
    directoryName: "node_modules",
    sizeNum: 224,
    sizeStr: "224 B",
    isFile: false,
    blocks: 1,
  },
  {
    name: ".package-lock.json",
    directoryName: "node_modules",
    sizeNum: 409,
    sizeStr: "409 B",
    isFile: true,
    blocks: 1,
  },
  {
    name: "League Website.pptx",
    directoryName: "remove_this",
    sizeNum: 20292884,
    sizeStr: "20.29 MB",
    isFile: true,
    blocks: 4955,
  },
  {
    name: "json.txt",
    directoryName: "remove_this",
    sizeNum: 16120,
    sizeStr: "16.12 kB",
    isFile: true,
    blocks: 4,
  },
  {
    name: "blah.json",
    directoryName: "test",
    sizeNum: 158,
    sizeStr: "158 B",
    isFile: true,
    blocks: 1,
  },
];

function compare(obj1, obj2) {
  for (let one in obj1) {
    // console.log("first loop:", typeof one);
    console.log(Object.hasOwn(obj1[one], "files"));
    for (let two in obj2) {
      if (
        obj1[one].name === obj1[two].directoryName &&
        Object.hasOwn(obj1[one], "files")
      ) {
        one.files = obj2;
      }
    }
  }
}

compare(obj1, obj2);
console.log(obj1);
