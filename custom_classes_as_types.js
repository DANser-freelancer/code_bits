const Signal = {
  coercion: null
};

Object.defineProperties(Number.prototype, {
  int: {
    get() {
      Signal.coercion = null;
      return new Int(this.valueOf());
    }
  },
  float: {
    get() {
      Signal.coercion = null;
      return new Float(this.valueOf());
    }
  },
  str: {
    get() {
      Signal.coercion = null;
      return new String(this.valueOf());
    }
  },
  _: {
    get() {
      const val = this?.c ? this?.c() : this.valueOf();
      Signal.coercion = null;
      return val;
    }
  },
  $: {
    get() {
      const lastT = Signal.coercion;
      const val = this?.c ? this?.c() : this.valueOf();
      Signal.coercion = null;
      if (this?.c) {
        return val;
      }
      if (lastT) {
        return new lastT(val);
      } else {
        return new this.constructor(val);
      }
    }
  }
});

class Int extends Number {
  constructor(num = 0) {
    num = (num?.v ?? false) ? Math.floor(num.v) : Math.floor(num);
    super(num);
    Object.defineProperties(this, {
      t: { value: this.constructor },
      v: { value: num },
      c: { value: this.#converter.bind(this) },
      i: {
        get() {
          function* gen() {
            let val = this.v;
            try {
              while (true) {
                const increment = yield val;
                val = increment(val);
              }
            } finally {
              return new this.constructor(val);
            }
          }
          return gen.call(this);
        }
      }
    });
  }

  #converter() {
    const lastT = Signal.coercion?.name;
    const thisT = this.t.name;
    Signal.coercion = this.t;
    if (lastT) {
      if (lastT !== thisT) {
        console.error(`Invalid merge of ${lastT} with ${thisT}`);
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
}

class Float extends Number {
  constructor(num) {
    num = num?.v ?? num;
    super(num);
    Object.defineProperties(this, {
      t: { value: this.constructor },
      v: { value: num },
      c: { value: this.#converter.bind(this) },
      i: {
        get() {
          function* gen() {
            let val = this.v;
            try {
              while (true) {
                const increment = yield val;
                val = increment(val);
              }
            } finally {
              return new this.t(val);
            }
          }
          return gen.call(this);
        }
      }
    });
  }

  #converter() {
    const lastT = Signal.coercion?.name;
    const thisT = this.t.name;
    Signal.coercion = this.t;
    if (lastT) {
      if (lastT !== thisT) {
        console.error(`Invalid merge of ${lastT} with ${thisT}`);
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
}

const test = new Int(6.3);
const float = new Float(7.7);
const int = new test.t(9.8); // converts number to a custom type
const converted = new int.t(float); // converts custom type to a custom type
const res = test + int + float._; // expression fails because of type conflict
const res2 = int + int + int + test._;
const res3 = int * 5 + int + int + int._;
const res4 = 5 + float._;
const isix = (6.7).int; // repackages a number to be of Int type
const fsix = (6.7).float; // repackages a number to be of Float type
const res5 = ((float / 2) * 7 + float).int; // works on expresions, eliminates the need for ._
const res6 = float + 5; // sets up the next type to be a NaN, missing ._
const res7 = int._ + 5;
const res8 = (int / 5 + 12).str; // repackages a number to be a String()
const res9 = int.str; // works on custom types
const res10 = (+res8).int; // a way to convert a string to custom type
const res11 = (float * 4 + float - float * 2).$; // repackages a number to be the latest custom type
const res12 = float * 4 + float.$; // acts as ._ on custom types

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
console.log(res11);
console.log(res12);

let res13 = (int * 4 + int - int * 2).$;
res13++;
res13++;
res13++;
res13++;
res13 += 4;
// res13 = (res13 + 4)._;
res13 = (res13 + 4).$;
// res13 = res13._;
// res13 = res13.$;

const res14 = float + 1;

console.log(res13);
console.log(res14);

const cbk = (a) => {
  return a * 1.6;
};
const gen = test.i;
gen.next(cbk); // cold start
for (let i = 0; i < 4; i++) {
  const out = gen.next(cbk).value;
  console.log(out);
}
const res15 = gen.return().value;

console.log(res15);
