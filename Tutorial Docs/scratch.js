// @ts-check

function splitName(name) {
  return name.split(' ');
}

let jane = 'Jane Smith';
jane = splitName(jane);

console.log(jane[0]);
console.log(jane[1]);