const bcrypt = require("bcryptjs");
const fs = require("fs");

function* pwsOfLen(n) {
  if (n === 1) yield* alphanumeric;
  else {
    for (let ch1 of alphanumeric) {
      for (let ch2 of pwsOfLen(n - 1)) {
        yield ch1 + ch2;
      }
    }
  }
}

const alphanumeric =
  "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";
let crackingPass = ["", ...pwsOfLen(1), ...pwsOfLen(2), ...pwsOfLen(3)];

let scrapePass = fs.readFileSync("mcupws.json", "utf-8");

const jsonObject = JSON.parse(scrapePass);

for (let [index, value] of Object.entries(jsonObject)) {
  crackingPass.push(value);
}

let peerHashed = [
  "$2a$04$C0r1ivVhPrvln2rDPKZ06.DxOy2xOuF4eqMLAJmgsOWywXfPo3muW",
  "$2a$04$C0r1ivVhPrvln2rDPKZ06.ef32MvTKSqmNmOiEKnqHHUwIHXaoYCW",
  "$2a$04$C0r1ivVhPrvln2rDPKZ06..QzEEih4ElLveVNMR7POLBNEzUskDya",
  "$2a$04$C0r1ivVhPrvln2rDPKZ06.8rALxY.D9eUSHZb4hpYD0DqBU/Hfd7q",
  "$2a$04$C0r1ivVhPrvln2rDPKZ06.o/c71N2yk43scxer2AVVG/vymo5nZj2",
  "$2a$04$C0r1ivVhPrvln2rDPKZ06.s6YMTDeVxEbs7aJenSJlpBvDNArMi/2",
  "$2a$04$C0r1ivVhPrvln2rDPKZ06.H.tUqLR5W4NhLVO3a6wlWpr7q.6YpHe",
  "$2a$04$C0r1ivVhPrvln2rDPKZ06.KN45vZxHHK.VCO6O9o1ykmgWuEob4/C",
  "$2a$04$C0r1ivVhPrvln2rDPKZ06.O14sRahyOtxKr3UDJdf5V8zwCGYaCvK",
  "$2a$04$C0r1ivVhPrvln2rDPKZ06.UMQybM1HbQMAn6zKpSFvQDfD/dTC.4.",
];
for (let i = 0; i < peerHashed.length; i++) {
  for (let j = 0; j < crackingPass.length; j++) {
    try {
      let compare = bcrypt.compareSync(crackingPass[j], peerHashed[i]);
      if (compare) {
        console.log(crackingPass[j], peerHashed[i]);
      }
    } catch (err) {
      console.log(err);
    }
  }
}
