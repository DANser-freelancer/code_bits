const Signal = {
  coercion: null
};

Object.defineProperty(Number.prototype, 'int', {
  get() {
    Signal.coercion = null;
    return new Int(this?.v ?? this.valueOf());
  }
});
Object.defineProperty(Number.prototype, 'float', {
  get() {
    Signal.coercion = null;
    return new Float(this?.v ?? this.valueOf());
  }
});
Object.defineProperty(Number.prototype, 'str', {
  get() {
    Signal.coercion = null;
    return new String(this);
  }
});

class Int extends Number {
  constructor(num) {
    num = num?.v ?? num;
    super(Math.floor(num));
    this.t = this.constructor;
    Object.defineProperty(this, 'v', {
      value: Math.floor(num)
    });
  }

  #converter() {
    const oldName = Signal.coercion;
    Signal.coercion = this.t.name;
    if (oldName) {
      if (oldName !== Signal.coercion) {
        // throw TypeError(`Invalid merge of ${Signal.coercion} with ${oldName}`);
        console.error(`Invalid merge of ${oldName} with ${Signal.coercion}`);
        Signal.coercion = null;
        return NaN;
      }
    }

    return this.v;
  }

  [Symbol.toPrimitive](hint) {
    if (hint === 'string') {
      return `${this.v}`;
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
    Object.defineProperty(this, 'v', {
      value: Math.floor(num)
    });
  }

  #converter() {
    const oldName = Signal.coercion;
    Signal.coercion = this.t.name;
    if (oldName) {
      if (oldName !== Signal.coercion) {
        // throw TypeError(`Invalid merge of ${Signal.coercion} with ${oldName}`);
        console.error(`Invalid merge of ${oldName} with ${Signal.coercion}`);
        Signal.coercion = null;
        return NaN;
      }
    }

    return this.v;
  }

  [Symbol.toPrimitive](hint) {
    if (hint === 'string') {
      return `${this.v}`;
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

const test = new Int(6.3);
const float = new Float(7.7);
const int = new test.t(9.8); // converts number to a custom type
const converted = new float.t(int); // converts custom type to a custom type
const res = test + int + float._; // expression fails because of type conflict
const res2 = int + int + int + test._;
const res3 = int + 5 + int + int + int._;
const res4 = 5 + float._;
const isix = (6.7).int; // repackages a number to be of Int type
const fsix = (6.7).float; // repackages a number to be of Float type
const res5 = ((float / 2) * 7 + float).int; // works on expresions, eliminates the need for ._
const res6 = float + 5; // sets up the next type to be a NaN, missing ._
const res7 = int._ + 5;
const res8 = (int / 5 + 12).str; // repackages a number to be a String()
const res9 = int.str; // works on custom types
const res10 = (+res8).int; // a way to convert a string to custom type

console.log(converted);
console.log(res);
console.log(res2);
console.log(res3);
console.log(res4);
console.log(res5);
console.log(res6);
console.log(res7);
console.log(res8);
console.log(res9);
console.log(res10);
