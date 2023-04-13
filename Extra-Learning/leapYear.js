function isLeap(year) {
  if (year % 4 === 0) {
    if (year % 100 === 0) {
      if (year % 400 === 0) {
        return true;
      } else {
        return false;
      }
    } else {
      return true;
    }
  } else {
    return false;
  }
}

console.log(isLeap(1980), isLeap(2000), isLeap(2020));
console.log(isLeap(1981), isLeap(1900), isLeap(2023));
