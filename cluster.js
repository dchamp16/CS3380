console.log("\nloading");
const cluster = require("cluster");

if (cluster.isMaster) {
  // when you first run this file, the code runs as master
  console.log("Master");
  cluster.fork(); // first worker, it will run this same file from the top as a worker
  cluster.fork(); // second worker, it will run this same file from the top as a worker
} else if (cluster.isWorker) {
  console.log("Worker");
  process.exit();
}
