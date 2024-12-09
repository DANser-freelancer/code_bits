const { log } = console;
const key = Symbol('key for a function');
const lock = function lock(key, secret, token) {
  if (key !== token) return;
  return secret;
};

const coinSafe = lock.bind(null, key, 'gold coin');

log(coinSafe('gimme coin'));
log(coinSafe(Symbol('key for a function')));
log(coinSafe(key));
