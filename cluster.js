const cluster = require("cluster");
const numCPUs = require("os").cpus().length;

if (cluster.isMaster) {
  const args = process.argv.slice(2).map(Number);
  const [start, end] = args;
  console.log("Master: I have work to do from %d to %d", start, end);
  console.log("Master: I will get each worker to do a portion");
  const range = end - start;
  const step = range / numCPUs;
  for (let i = 0; i < numCPUs; i++) {
    const worker = cluster.fork();
    worker.send({
      id: i,
      start: start + i * step,
      end: start + i * step + step - 1,
    });
    // Master tells each worker what portion of the work to do
  }
} else {
  //Worker
  process.on("message", (order) => {
    console.log(
      "Worker %d: I have work to do from %d to %d",
      order.id,
      order.start,
      order.end
    );
    process.exit();
  });
}
