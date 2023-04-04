const numberComma = (num) => new Intl.NumberFormat("en-US").format(num);

console.log(numberComma(41234132412));
