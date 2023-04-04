const progressBar = require("cli-progress");

const b1 = new progressBar.Bar();
b1.start(200, 0);
b1.update(100); //update the bars
