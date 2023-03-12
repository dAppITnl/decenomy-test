var x = 1;
let y = 2;

function example() {
  var x = 3;
  let y = 4;

  if (true) {
    var x = 5;
    let y = 6;
    console.log(x); // output: 5
    console.log(y); // output: 6
  }

  console.log(x); // output: 3
  console.log(y); // output: 4
}

if (true) {
  var x = 7;
  let y = 8;
  console.log(x); // output: 7
  console.log(y); // output: 8
}

example();

console.log(x); // output: 7
console.log(y); // output: 2
