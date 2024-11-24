const { log } = console;
const guy = {
  name: 'Ben',
  year: 2002
};

function where(fn, params) {
  return function (...args) {
    for (const key in params) {
      Object.defineProperty(params, key, {
        get: params[key].bind(null, ...args)
      });
    }
    return fn.call(params, ...args);
  };
}

const isAdultComplex = function (person, date) {
  if (person == undefined || !Number.isFinite(date)) {
    throw new Error('invalid input!');
  }
  const age = date - person.year;
  if (age >= 18) {
    return true;
  } else {
    return false;
  }
};

// !TODO put the .where() on the Function prototype and make it work
const isAdultSimplified = where(
  function (person, date) {
    return this.validIn ? this.age >= 18 : this.error;
  },
  {
    validIn(person, date) {
      if (person == undefined || !Number.isFinite(date)) {
        return false;
      } else {
        return true;
      }
    },
    age(person, date) {
      return date - person.year;
    },
    error() {
      throw new Error('invalid input!');
    }
  }
);

const bool = isAdultComplex(guy, 2024);
const bool2 = isAdultSimplified(guy, 2024);

log(bool, bool2);
