## About
This is a repo of all the JavaScript things that I come up with.    
I hear people consider JavaScript to be pretty lispy, and I don't disagree with it.    
This code is meant to do funny, complicated, silly, or cool things.    
Consider this a free RnD project of one guy who wrote vanila JavaScript for 6 years.

Upgrades are welcome too. Every branch has a copy of the permissive free licence.     

### Q&A    
*Why does this work?*    
A short explanation for most code bits would be:
- *almost* everything in javascript is an object, one way or another.
- `.prototype` chains are useful to globally alter behavior of objects (including primitives as they are boxed).
- `constructor.name`, `instanceof`, `name`, and `typeof` can all be used in different scenarios to precisely determine what object you are dealing with.
- JavaScript's heavy lean into flexibility allows me to do some metaprogramming using granular property control, some "magic methods", monkeypatching, code-as-data, and reflection.
