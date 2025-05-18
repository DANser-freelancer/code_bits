const { log } = console;

function* forOfGeneric() {
  let i = -1;
  while (++i < this.length) {
    yield this[i];
  }
}
function forOfOptimized() {
  let i = 0;
  const target = this;
  const tuple = { done: false, value: target[i] };
  const iterator = {
    next: function () {
      if (i > target.length) {
        tuple.done = true;
      }
      tuple.value = target[i];
      i++;
      return tuple;
    },
  };
  // gen -> iter - iter.next() -> tuple -> iter.next() -> ...
  return iterator;
}

const arr = new Float64Array(10_000_000); //100_000_000
// const arr = new Array(100_000_000); //10_000_000
for (let i = 0; i < arr.length; i++) {
  arr[i] = Math.random() * 131;
}
// arr[Symbol.iterator] = forOfGeneric.bind(arr);
// arr[Symbol.iterator] = forOfOptimized.bind(arr);
let count = 0;
let ind = 6734;
const startForof = performance.now();
ind++;
for (const num of arr) {
  if (ind % 2) {
    count += num ** 2;
  } else {
    count -= num ** 2;
  }
}
count = 0;
const startFor = performance.now();
for (let i = 0; i < arr.length; i++) {
  if (i % 2) {
    count += arr[i] ** 2;
  } else {
    count -= arr[i] ** 2;
  }
}
const endFor = performance.now();
const endForof = performance.now();
const forTime = endFor - startFor;
const forofTime = endForof - startForof;
log(`for.. ${forTime} ms`);
log(`\x1b[31m for..of ${forofTime} ms \x1b[0m`);
log(
  `diff: ${Math.abs(forTime - forofTime)} ms in favor of ${
    forTime < forofTime ? 'FOR' : 'FOR OF'
  }`
);
log(`longer by: x${(forofTime / forTime).toFixed(2)} times`);
