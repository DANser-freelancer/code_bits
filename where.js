'use strict';
const { log } = console;
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
    person == undefined || !Number.isFinite(date) ? false : true;
  }
  function error() {
    throw new Error('invalid input!');
  }
  function ofAge() {
    return date - person.year >= 18;
  }
}

log(isAdultImperative(guy, 2024));
log(isAdultDeclarative(guy, 2024));
log(isAdultDeclarative(guy, 2009));
