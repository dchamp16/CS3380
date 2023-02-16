let userInput = process.argv.slice(2);

switch (userInput[0]) {
  case "-p":
  case "-P":
  case "--p":
  case "--P":
    console.log(userInput[1]);
    checkFile(userInput[1]);
    break;
  case "-s":
  case "-S":
  case "--s":
  case "--S":
    //TODO sort alpha, extension, size
    break;
  case "-m":
  case "-M":
  case "--m":
  case "--M":
    //TODO size display KB,MB,GB TB instead of bytes
    break;
  case "-t":
  case "-T":
  case "--t":
  case "--T":
    // TODO min, only displays files and folders of at least minimum size. min is the number of billions. min may be an integer like 20 or a decimal fraction like 0.25. Default is -t 1.
    break;
  case "-b":
  case "-B":
  case "--b":
  case "--B":
    // TODO displays the actual storage sizes on disk. default is not blocksize
    break;
  case "-h":
  case "-H":
  case "--h":
  case "--H":
    // TODO displays the actual storage sizes on disk. default is not blocksize
    break;
  default:
    usage();
    break;
}
