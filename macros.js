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
// -[mut`outsider`] == -4 * 0.5;
// +[mut`outsider`] == [a]((a * a) / b.val - 1);
// ![mut`outsider`] == [a]((a * a) / b.val - 1);
// _[`SQUARE`]
// $[`SQUARE`]
const lambda = function (a, b) {
  +[mut`FbF`] == 5 * 5;
  +[`SQUARE`] == [x](x * x);
  console.log(SQUARE(7));
  -[`SQUARE`] == [x](x * x * x);
  return SQUARE(a) + SQUARE(b) - FbF;
}.toString();

//have to be aware of string "scope"
// the parser
function preprocess(fn) {
  // control sign (?<sign>[\~\!\-\+]{0,1})
  // definition tag (?<tag>mut)
  // anything between ticks \`(?<name>.*?)\`
  // anything after equals, untill semicolon \s*\=\=\s*(?<val>.*?)\;
  // match.index === first inclusive character matched
  // regex.lastIndex === first inclusive character right after the match
  const engine = preprocessEngine;
  const TOKENS = Object.create(null);
  const str = fn.split('');
  let old = 0;
  let adjust = 0;
  let match;

  /* ### DEFINE */
  while ((match = engine.macro.exec(fn)) != undefined) {
    if (old === engine.macro.lastIndex) {
      throw new RangeError('Detected infinite preprocessor loop');
    }
    old = engine.macro.lastIndex;
    const { sign, tag, name, val } = match.groups;
    const start = match.index - adjust;
    const end = match[0].length;
    const exp = engine.exp.exec(val)?.[0];
    const param = engine.param.exec(val);

    const substr = '';

    log(substr);
    str.splice(start, end);
    log((adjust += end));

    if (engine.isNumbers(exp)) {
      const res = eval(exp);
      log(exp, ' is numbers only == ', res);
      const data = { val: res.toString(), pos: start };
      if (name in TOKENS) {
        TOKENS[name].push(data);
      } else {
        TOKENS[name] = [data];
      }
    } else {
      log(exp, ' is a valid expression.');
      // !TODO process the expression with required args
      const data = { val: exp, pos: start };
      if (name in TOKENS) {
        TOKENS[name].push(data);
      } else {
        TOKENS[name] = [data];
      }
    }
    // const substr = `${engine.tags?.[tag] ?? `const `}${name} = ${TOKENS[name]};`;
  }

  fn = str.join('');
  old = 0;
  adjust = 0;
  /* ### INLINE */
  for (const key in TOKENS) {
    const replacer = preprocessEngine.matchName(key);
    const token = TOKENS[key];
    let match;
    let oldIndex = 0;
    let i = 0;
    while ((match = replacer.exec(fn)) != undefined) {
      const start = match.index + adjust;
      const end = match[0].length;
      // const end = replacer.lastIndex + adjust;
      oldIndex = start;
      if (oldIndex > token[i + 1]?.pos) {
        i++;
      }

      const { pos, val } = token[i];
      log(
        `Word: ${match.groups.word}; index: ${oldIndex}; position: ${pos}; value: ${val}`
      );
      const substr = val;
      str.splice(start, end, substr);
      log((adjust = str.length - fn.length));
    }
  }

  engine.macro.lastIndex = 0;
  return str.join('');
}

// just the lexer
const preprocessEngine = {
  macro:
    /(?<sign>[~!+]|\-){1}\[(?<tag>mut|final)?\`(?<name>.*?)\`\]\s*\=\=\s*(?<val>.*?)\;/g,
  string: /^[`'"].*[`'"]$/,
  param: /^\[([a-z,\s*])+\]/i,
  special: /0x[a-f\d]+|0b\d+|0o\d+|(?:\d+\_\d+)/,
  boundary: /\(|\{|\[|\]|\}|\)|\,|\;|\s+/,
  e_assert_end: /(?:\w$|\)$|\$$|\s$)/,
  e_extra: /\w\$/,
  exp: null,
  n_edge_operators: /\-\+\~/,
  n_operators: /\/\*\^\<\>\&\|\%/,
  n_extra: /\s*\.\(\)\d/,
  n_assert_end: /(?:\d$|\)$|\s$)/,
  num: null,
  tags: {
    final: `const `,
    mut: `let `
  },
  matchName(name) {
    name = String(name).replaceAll('$', '\\$');
    return new RegExp(`(?<word>(?<![a-zA-Z_$\\d.])${name}(?![a-zA-Z_$\\d]))+`, 'g');
  },
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
  },
  freeze() {
    if (Object.isFrozen(this)) {
      return this;
    }
    for (const key in this) {
      const field = this[key];
      if (typeof field === `object` && !(field instanceof RegExp)) {
        Object.freeze(field);
      }
    }
    return Object.freeze(this);
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
preprocessEngine.freeze();

log(preprocessEngine.matchName('bar_$$56'));
log(preprocess(lambda));

// console.log(x * x)E(7));
//   -
//   retur(x * x * x)RE(a) (x * x * x)RE(b)25FbF;
