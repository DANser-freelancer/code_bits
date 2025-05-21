Object.defineProperty(Symbol, 'isProxy', {
  value: Symbol(
    `The underlying object or handler specifies that you are going through a Proxy`
  ),
});
Object.defineProperty(Proxy, Symbol.hasInstance, {
  value: function (inst) {
    return inst[Symbol.isProxy] === true;
  },
});
// now either declare [Symbol.isProxy] in the handler getter or on the target
