const { Worker, isMainThread, parentPort } = require("worker_threads");
const fs = require("fs");
const bcrypt = require("bcrypt");

const ALPHABET =
  "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

function* genCh(len) {
  if (len === 1) yield* ALPHABET;
  else {
    for (let ch1 of ALPHABET) {
      for (let ch2 of genCh(len - 1)) {
        yield ch1 + ch2;
      }
    }
  }
}

const stringsList = [
  "",
  ...Object.values(JSON.parse(fs.readFileSync("./mcupws.json", "utf8"))),
  ...genCh(1),
  ...genCh(2),
  ...genCh(3),
];

if (isMainThread) {
  console.time("hashes processed");
  const partnerHash = fs
    .readFileSync("ZhihuiChen.2k.hashes.txt", "utf8")
    .split("\n");
  const qty = partnerHash.length;
  const numCPUs = require("os").cpus().length;
  const step = Math.ceil(qty / numCPUs);

  if (fs.existsSync("hashes.answers.txt")) {
    fs.unlinkSync("hashes.answers.txt");
    console.log("Removed old hashes.answers.txt");
  }

  let workersCompleted = 0;

  for (let i = 0; i < numCPUs; i++) {
    const worker = new Worker(__filename);
    worker.postMessage({
      id: i,
      start: i * step,
      end: i * step + step,
      partnerHash,
    });
    worker.on("message", (msg) => {
      if (msg.type === "done") {
        workersCompleted++;
        if (workersCompleted === numCPUs) {
          console.timeEnd("hashes processed"); //hashes processed: 29:45.736 (m:ss.mmm)
          console.log("All workers completed");
        }
      }
    });
  }
} else {
  parentPort.on("message", async ({ id, start, end, partnerHash }) => {
    console.log(`Worker ${id} processing hashes ${start}-${end}`);
    const processedHashes = [];

    for (let i = start; i < end; i++) {
      const hash = partnerHash[i];
      const result = await bcryptCompare(hash);
      const processedHash = `${hash} ${result}`;
      console.log(`Hash processed: ${processedHash}`);
      processedHashes.push(processedHash);
    }

    fs.appendFileSync("hashes.answers.txt", processedHashes.join("\n") + "\n");
    parentPort.postMessage({ type: "done" });
    process.exit();
  });
}

async function bcryptCompare(hash) {
  for (let str of stringsList) {
    if (await bcrypt.compare(str, hash)) {
      return str;
    }
  }
  return "";
}
