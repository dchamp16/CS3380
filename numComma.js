let nums = [12314215, 43414312, 433, 3234, 13444];

for (let num of nums) {
  let formatedNum = new Intl.NumberFormat("en-US").format(num);
  console.log(typeof formatedNum);
}
