const Signal = {
  coercion: null
};
class Int extends Number {
  constructor(num) {
    num = num?.v ?? num;
    super(Math.floor(num));
    this.t = this.constructor;
    this.v = Math.floor(num);
  }

  #converter() {
    const oldName = Signal.coercion;
    Signal.coercion = this.t.name;
    if (oldName) {
      if (oldName !== Signal.coercion) {
        // throw TypeError(`Invalid merge of ${Signal.coercion} with ${oldName}`);
        console.error(`Invalid merge of ${Signal.coercion} with ${oldName}`);
        Signal.coercion = null;
        return NaN;
      }
    }

    return this.v;
  }

  [Symbol.toPrimitive](hint) {
    if (hint === 'string') {
      return this[Symbol.toStringTag];
    } else {
      return this.#converter();
    }
  }

  get _() {
    const val = this.#converter();
    Signal.coercion = null;
    return val;
  }
}

class Float extends Number {
  constructor(num) {
    num = num?.v ?? num;
    super(num);
    this.t = this.constructor;
    this.v = num;
  }

  #converter() {
    const oldName = Signal.coercion;
    Signal.coercion = this.t.name;
    if (oldName) {
      if (oldName !== Signal.coercion) {
        // throw TypeError(`Invalid merge of ${Signal.coercion} with ${oldName}`);
        console.error(`Invalid merge of ${Signal.coercion} with ${oldName}`);
        Signal.coercion = null;
        return NaN;
      }
    }

    return this.v;
  }

  [Symbol.toPrimitive](hint) {
    if (hint === 'string') {
      return this[Symbol.toStringTag];
    } else {
      return this.#converter();
    }
  }

  get _() {
    const val = this.#converter();
    Signal.coercion = null;
    return val;
  }
}

let test = new Int(6.3);
const float = new Float(7.7);
const int = new test.t(9.8); // converts number to a custom type
const converted = new float.t(int); // converts custom type to a custom type
const res = test + int + float._; // expression fails because of type conflict
const res2 = int + int + int + test._;
const res3 = int + 5 + int + int + int._;
const res4 = 5 + float._;
const res5 = float + 5; // sets up the next type to be a NaN, missing ._
const res6 = int._ + 5;

console.log(converted);
console.log(res);
console.log(res2);
console.log(res3);
console.log(res4);
console.log(res5);
console.log(res6);
