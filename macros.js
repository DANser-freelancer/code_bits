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
///////
// ~[mut`outsider`] == [a](2 ** 2 / 1);
// ~[mut`outsider`] == -4 * 0.5;
// +[mut`outsider`] == [a]((a * a) / b.val - 1);
const lambda = function (a, b) {
  +[mut`SQUARE`] == [x](0xf + 0b100);
  return SQUARE(a) + SQUARE(b);
}.toString();

// just the lexer
const preprocessEngine = {
  macro:
    /(?<sign>[\~\!\-\+]{0,1})\[(?<tag>mut)\`(?<name>.*?)\`\]\s*\=\=\s*(?<val>.*?)\;/g,
  string: /^[\`\'\"].*[\`\'\"]$/,
  param: /^\[[a-z\,\s*]+\]/i,
  special: /0x[a-f\d]+|0b\d+|0o\d+|(?:\d+\_\d+)/,
  e_assert_end: /(?:\w|\)|\$|\s*)$/,
  e_extra: /\w\$/,
  exp: null,
  n_edge_operators: /\-\+\~/,
  n_operators: /\/\*\^\<\>\&\|\%/,
  n_extra: /\s*\.\(\)/,
  n_assert_end: /(?:\d|\)|\s*)$/,
  num: null,
  isNumbers(str) {
    return this.num.test(str);
  },
  build(...names) {
    const str = new Array(names.length);
    for (let n = 0; n < names.length; n++) {
      str[n] = this[names[n]].source;
    }
    return str.join('');
  },
  stitch(src, val) {
    const str = src.split('');
    str.splice(2, 0, val);
    return str.join('');
  }
};
preprocessEngine.num = new RegExp(
  `^(?:${preprocessEngine.special.source}|[${preprocessEngine.build(
    `n_edge_operators`,
    `n_operators`,
    `n_extra`
  )}])*${preprocessEngine.n_assert_end.source}`,
  'i'
);
preprocessEngine.exp = new RegExp(
  `(?:${preprocessEngine.special.source}|[${preprocessEngine.build(
    `n_edge_operators`,
    `n_operators`,
    `n_extra`,
    `e_extra`
  )}])*${preprocessEngine.e_assert_end.source}`,
  'i'
);
Object.freeze(preprocessEngine);

function preprocess(fn) {
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
    const exp = engine.exp.exec(val)?.[0];
    const param = engine.param.exec(val)?.[0];
    if (engine.isNumbers(exp)) {
      log(exp, ' is numbers only == ', eval(exp));
    } else {
      log(exp, ' is a valid expression.');
    }

    log(match.index);
    log(engine.macro.lastIndex);
    str.splice(start, end - start, 'forest');
    log((adjust = str.length - fn.length));
  }

  engine.macro.lastIndex = 0;
  return str.join('');
}

log(preprocess(lambda));
