const { log, error, time, timeEnd } = console;

// functional macros are called as functions, and expanded into primitive calculations
///////
// ~[mut`outsider`] == [a](2 ** 2 / 1);
// -[mut`outsider`] == -4 * 0.5;
// +[final`outsider`] == [a]((a * a) / b.val - 1);
// ![mut`outsider`] == [a]((a * a) / b.val - 1);
// _[mut`SQUARE`]
// $[fun`SQUARE`]
/*
  + define
  - undefine
  ~ flip on/off
  _ define with old value if undefined
  ! logic on the signs, e.g. !+ is def, !- is undef (!!+), expands to bool in real code
*/
const lambda = function (a, b) {
  !+[final`blob`] == a - 8;
  +[mut`FbF`] == 5 * 5;
  +[`SQUARE`] == [x](x * x);
  console.log(SQUARE(7));
  -[`SQUARE`] == [x](x * x * x);
  console.log(blob + 11);
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
  let oldIndex = -1;
  let adjustString = 0;
  let match;

  /* ### DEFINE */
  while ((match = engine.macro.exec(fn)) != undefined) {
    if (oldIndex === engine.macro.lastIndex) {
      throw new RangeError('Detected infinite preprocessor loop');
    }
    oldIndex = engine.macro.lastIndex;

    const { sign, tag, name, val } = match.groups;
    const start = match.index - adjustString;
    const end = match[0].length;
    const exp = engine.exp.exec(val)?.[0];
    const param = engine.param.exec(val);
    const substr = '';
    str.splice(start, end);
    log((adjustString += end));

    if (engine.isNumbers(exp)) {
      const res = eval(exp);
      const data = { val: res.toString(), pos: start };
      if (name in TOKENS) {
        TOKENS[name].push(data);
      } else {
        TOKENS[name] = [data];
        TOKENS[name].i = 0;
      }
    } else {
      // !TODO process the expression with required args
      const data = { val: exp, pos: start };
      if (name in TOKENS) {
        TOKENS[name].push(data);
      } else {
        TOKENS[name] = [data];
        TOKENS[name].i = 0;
      }
    }
    // const substr = `${engine.tags?.[tag] ?? `const `}${name} = ${TOKENS[name]};`;
  }

  oldIndex = -1;
  adjustString = 0;
  fn = str.join('');
  log(fn);
  /* ### INLINE */
  // match in forward-step every word, inline as needed
  while ((match = engine.name.exec(fn)) != undefined) {
    if (oldIndex === engine.name.lastIndex) {
      throw new RangeError('Detected infinite preprocessor loop');
    }

    oldIndex = engine.macro.lastIndex;

    const key = match.groups.word;
    if (!(key in TOKENS)) continue;

    const token = TOKENS[key];
    let i = token.i;
    const start = match.index + adjustString;
    const end = match[0].length;

    // switch to the next declaration of the macro
    if (start > token[i + 1]?.pos) token.i = ++i;

    const { pos, val } = token[i];

    log(`Word: ${key}; index: ${start}; position: ${pos}; value: ${val}`);
    const substr = val;
    str.splice(start, end, substr);
    adjustString = str.length - fn.length;
  }

  // resets for the engine
  engine.name.lastIndex = 0;
  engine.macro.lastIndex = 0;
  const result = str.join('').replaceAll(engine.space, '\n');
  engine.space.lastIndex = 0;

  return result;
}

// just the lexer, with most regex machines prebuilt and kept
const preprocessEngine = {
  macro:
    /(?<sign>[~!+]|\-){1,2}\[(?<tag>mut|final)?\`(?<name>.*?)\`\]\s*\=\=\s*(?<val>.*?)\;/g,
  // ignores function parameters and namespaces through any combination of ?.[
  name: /(?:(?:function\s*\(.*\)\s*\{\s*)|(?:\s*\(.*\)\s*=>\s*\{\s*))?(?<!(?:\w\??\.?\[?))(?<word>\b(?!\d)\w+\d*\b)/g,
  space: /\n\s*\n/g,
  string: /^[`'"].*[`'"]$/,
  param: /^\[([a-z,\s*])+\]/i,
  special: /0x[a-f\d]+|0b\d+|0o\d+|(?:\d+\_\d+)/,
  boundary: /\(|\{|\[|\]|\}|\)|\,|\;|\s+/,
  e_assert_end: /(?:\w$|\)$|\$$|\s$)/,
  e_extra: /\w\$/,
  // expression that doesn't eval
  exp: null,
  n_edge_operators: /\-\+\~/,
  n_operators: /\/\*\^\<\>\&\|\%/,
  n_extra: /\s*\.\(\)\d/,
  n_assert_end: /(?:\d$|\)$|\s$)/,
  // expression that does eval
  num: null,
  tags: {
    final: `const `,
    mut: `let `,
    fun: `function `
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

log(preprocess(lambda));

// Copyright (c) 2024 [Dan](https://github.com/DANser-freelancer) dans.channels.contact@gmail.com

// Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:

// 1.  Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.

// 2.  Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.

// 3.  Neither the name of the copyright holder nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.

// THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS “AS IS” AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
