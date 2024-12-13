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

class Pipe {
  #value;
  constructor(val) {
    this.#value = val;
    return this.callPiped;
  }

  callPiped = function callPiped(cbk, ...args) {
    if (typeof cbk != 'function') return this.#value;
    this.#value = cbk(this.#value, ...args);
    return this.callPiped;
  }.bind(this);
}

const person = new Pipe({ name: 'Amber', age: 12 });
const result2 = person(rename, 'Lex')(reage, 63)(addHobby, 'Phishing')();
log(result2); // {name: 'Lex', age: 63, hobby: 'Phishing'}

function rename(obj, name) {
  obj.name = name;
  return obj;
}
function reage(obj, age) {
  obj.age = age;
  return obj;
}
function addHobby(obj, hobby) {
  obj.hobby = hobby;
  return obj;
}
