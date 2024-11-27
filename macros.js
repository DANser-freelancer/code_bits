const { log, error } = console;

const guy = {
  name: 'Ben',
  year: 2002
};

function where(fn, args) {
  // const regex = /(?<=\().*?(?=\))/;
  // const params = fn.toString().match(regex)[0].split(', ');
  // arg0, arg1, arg2... body
  const stringified = fn.toString();
  let addition = [];
  for (const key in args) {
    addition.push(`const ${key} = ${args[key]}`);
  }
  addition = addition.join(';\n');
  const final = stringified.replace('{', `{\n${addition}`);
  const extended = new Function(`"use strict"; return ${final}`)();
  log(extended.toString());
  return extended;
}

const normal = function (person, date) {
  if (person == undefined || !Number.isFinite(date)) {
    error(`wrong input!`);
    return;
  }
  if (date - person.year >= 18) {
    log(`ok, ${date - person.year}yrs old`);
  } else {
    error('not ok');
  }
};

const adult = function (person, date) {
  return validInput ? age : error;
};

// const outsider = 66;
// `${outsider}!()`;
// define`outsider`;
// functional macros are called as functions, and expanded into primitive calculations
const lambda = function (a, b) {
  ~[mut`outsider`] == [a, d](a * d - 1);
  ~[mut`outsider`] == 9;
  +[mut`outsider`] == 9;
  for (; outsider < 80; outsider++) {}
  log(outsider);
  return a + b;
}.toString();

const preprocessEngine = {
  macro: /(?<sign>[\~\!\-\+]{0,1})\[(?<tag>mut)\`(?<name>.*?)\`\]\s*\=\=\s*(?<val>.*?)\;/g,
  number: /^\d+$/,
  string: /^[\`\'\"].*[\`\'\"]$/i,
  exp: /\([\(\)\-\+\/\*\^\<\>\%a-z\d\s*]+\)$/i,
  param: /^\[[a-z\,\s*]+\]/i
};

function preprocess(fn) {
  // use the same source string to match,
  // adjust returned indexes by a local variable
  // that records the difference in length between source and target string

  // control sign (?<sign>[\~\!\-\+]{0,1})
  // definition tag (?<tag>mut)
  // anything between ticks \`(?<name>.*?)\`
  // anything after equals, untill semicolon \s*\=\=\s*(?<val>.*?)\;

  // match.index === first inclusive character matched
  // regex.lastIndex === first inclusive character right after the match
  const str = fn.split('');
  const engine = preprocessEngine;
  let old = 0;
  let adjust = 0;
  let match;

  while ((match = engine.macro.exec(fn)) != undefined) {
    if (old === engine.macro.lastIndex) {
      throw new RangeError('Detected infinite preprocessor loop');
    }
    old = engine.macro.lastIndex;
    const { sign, tag, name, val } = match.groups;
    const start = match.index + adjust;
    const end = engine.macro.lastIndex + adjust;
    const exp = engine.exp.exec(val)[0];
    const param = engine.param.exec(val)[0];

    log(match.index);
    log(engine.macro.lastIndex);
    str.splice(start, end - start, 'forest');
    log((adjust = str.length - fn.length));
  }

  engine.macro.lastIndex = 0;
  return str.join('');
}

log(preprocess(lambda));
