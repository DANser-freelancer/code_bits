const { log } = console;
const key = Symbol('key for a function');
const lock = function lock(key, secret, token) {
  if (key !== token) return;
  return secret;
};

const coinSafe = lock.bind(null, key, 'gold coin');

log(coinSafe('gimme coin')); // fails
log(coinSafe(Symbol('key for a function'))); // fails
log(coinSafe(key)); // 'gold coin'
