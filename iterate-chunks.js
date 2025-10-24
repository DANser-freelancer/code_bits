const { log } = console;

function chunkIterator(chunkSize, callback) {
  let skip = 0;
  const iter = Iterator.from(this);
  while (true) {
    if (Iterator.from(this).drop(skip).next().done) break;
    const chunk = iter.take(chunkSize);
    callback(...chunk);
    skip += chunkSize;
  }
}

Array.prototype.forChunks = chunkIterator;
Set.prototype.forChunks = chunkIterator;
Map.prototype.forChunks = chunkIterator;

const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9];
const set = new Set([1, 2, 3, 4, 5, 6, 7, 8, 9]);
const map = new Map([
  ['a', 1],
  ['b', 2],
  ['c', 3],
  ['d', 4],
  ['e', 5],
  ['f', 6],
  ['g', 7],
  ['h', 8],
  ['i', 9],
]);

arr.forChunks(3, (a, b, c) => log(a, b, c));
set.forChunks(2, (a, b, c) => log(a, b, c));
map.forChunks(4, (a, b, c) => log(a, b, c));
