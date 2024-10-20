const Signal = {
  coercion: null
};
class Int extends Number {
  constructor(num) {
    super(Math.floor(num));
    this.type = this.constructor;
    // this.value = Math.floor(num);
  }

  #converter() {
    const oldName = Signal.coercion;
    Signal.coercion = this.type.name;
    if (oldName) {
      if (oldName !== Signal.coercion) {
        // throw TypeError(`Invalid merge of ${Signal.coercion} with ${oldName}`);
        console.error(`Invalid merge of ${Signal.coercion} with ${oldName}`);
        Signal.coercion = null;
        return NaN;
      }
    }
    return this.valueOf();
  }

  [Symbol.toPrimitive](hint) {
    if (hint === 'string') {
      return this[Symbol.toStringTag];
    } else {
      return this.#converter();
    }
  }
}

class Float extends Number {
  constructor(num) {
    super(num);
    this.type = this.constructor;
  }

  #converter() {
    const oldName = Signal.coercion;
    Signal.coercion = this.type.name;
    if (oldName) {
      if (oldName !== Signal.coercion) {
        // throw TypeError(`Invalid merge of ${Signal.coercion} with ${oldName}`);
        console.error(`Invalid merge of ${Signal.coercion} with ${oldName}`);
        Signal.coercion = null;
        return NaN;
      }
    }
    return this.valueOf();
  }

  [Symbol.toPrimitive](hint) {
    if (hint === 'string') {
      return this[Symbol.toStringTag];
    } else {
      return this.#converter();
    }
  }
}

const test = new Int(6.3);
const int = new test.type(9.8);
const float = new Float(7.7);
const res = test + int + float;
const res2 = test + int;

console.log(res);
console.log(res2);
