'use strict';
const { log } = console;

Object.defineProperty(Function.prototype, 'where', {
  value: function (props) {
    const self = Function.prototype.where;
    const environment = [];
    for (const key in props) {
      let val = props[key];
      if (typeof val == 'function') {
        val = val.toString();
        environment.push(`function ${val};\n`);
      } else {
        environment.push(`const ${key} = ${val};\n`);
      }
    }

    let fn = this.toString();
    const match = self.dissolve_signature.exec(fn);
    let args = match.groups.args.split(',');
    fn = fn.replace(match[0], '');
    fn = fn.replace(self.end_brace, '');
    const print = self.debug ? `\n// !SOURCE_FUNCTION ↓\n` : '';
    environment.push(`${print}${fn}`);

    return new Function(...args, environment.join(''));
  }
});
Object.defineProperties(Function.prototype.where, {
  dissolve_signature: {
    // match function signature and args
    value:
      /^\s*(?:async)?\s*function\*?\s*(?:[a-zA-Z_$][a-zA-Z_$\d]*)?\((?<args>[\s\S]*?)\s*\)\s*\{\s*/
  },
  end_brace: {
    value: /\s*\}$/
  }
});
Function.prototype.where.debug = false;
// Function.prototype.where.debug = true;

const guy = {
  name: 'Ben',
  year: 2002
};

function isAdultImperative(person, date) {
  // guard clause, possible return
  if (person == undefined || !Number.isFinite(date)) {
    // action on guard
    throw new Error('invalid input!');
  }
  // condition, final return
  return date - person.year >= 18;
}

function isAdultDeclarative(person, date) {
  // buisness logic
  return validIn() ? ofAge() : error();

  // application logic, specific instructions
  function validIn() {
    return person != undefined && Number.isFinite(date);
  }
  function error() {
    throw new Error('invalid input!');
  }
  function ofAge() {
    return date - person.year >= 18;
  }
}

const isAdultHaskell = function (person, date) {
  // buisness logic
  return validIn() ? ofAge : error();
}.where({
  // application logic as constant text expressions, or functions
  validIn() {
    return person != undefined && Number.isFinite(date);
  },
  ofAge: 'date - person.year >= 18',
  error() {
    throw new Error('invalid input!');
  }
});

// reapplied .where() on an already altered function
const rebuilt = isAdultHaskell.where({
  sing: `'song'`,
  // will have no effect, oldest definition will be hoisted
  error() {
    console.log(`all is good `);
  },
  // will trigger the old function validIn() as it is hoisted before variables are evaluated
  radio: `console.log('input is valid?: ', validIn())`
  // ofAge: false // will throw for redeclaring
});

log(isAdultImperative(guy, 2024)); // true
log(isAdultDeclarative(guy, 2025)); // true
log(isAdultDeclarative(guy, 2009)); // false
log(isAdultHaskell(guy, 2026)); // true
log(rebuilt(guy, 201)); // input is valid?:  true; false
// log(rebuilt.where({ blue: `'bird'` })(guy, 'century')); // input is valid?:  false; error
// log(isAdultHaskell(guy, '2002')); // error
// log(isAdultDeclarative(guy, '2009')); // error
