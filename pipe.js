const { log } = console;

function number(cbk, ...args) {
  if (typeof cbk != 'function') return number.value;
  number.value = cbk(number.value, ...args);
  return number;
}
number.value = 5;

function add(a, b, c) {
  return a + b + c;
}
function multiply(a, b) {
  return a * b;
}
function subtract(a, b) {
  return a - b;
}

const result = number(add, 14, 1)(subtract, 9)(multiply, 3)((a) => {
  log(`
		I'm at the end of a train,
		it's cars make no part of a chain.
		Each rolls on it's own, 
		but the cargo is known. 
		`);
  // heh, in other words there's no recursion
  return a;
})();

log(result); // 33
