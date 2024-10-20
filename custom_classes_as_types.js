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
