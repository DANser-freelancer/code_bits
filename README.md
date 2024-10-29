## About
This is a repo of all the sily JavaScript things that I come up with.    
Here, in every branch I show you just how customizable JavaScript is.    
This code is meant to do funny, complicated, or cool things.    
Consider this a free RnD project of one guy who wrote vanila JavaScript for 6 years.

Upgrades are welcome too.
Every branch has a copy of the permissive free licence.     

### Q&A    
*Why does this work?*    
A short explanation for most code bits would be:     
- everything in javascript is secretly a `<Box>(<val>)`
  - with one exception being `undefined`, while `null` doesn't seem to have a constructor it is typeof `'object'`
  - any value will be wrapped in a container, this is why *'primitive'* values have methods
    - `(7).toExponential(2)` will return a string `'7.00e+0'`
    - `'7.00e+0'.slice(0,3)` will return a string `'7.0'`
    - `(+'7.0').constructor(true)` will return a number `1`, guess why
    - `'7.0'.num` will return a number `7` but also log `'Goofy Number'` because I edited the `.prototype` of this type of *'primitive'*
      - ```javascript
        Object.defineProperty(String.prototype, 'num', {
          get() {
            console.log('Silly Number');
            return this.valueOf();
          }
        });
        ```
        now all things where `typeof <var> === string` true will have this method. Or most of them, I haven't tested everything
    - `+'7.0'` will return a number `7` and the unary operator coercion is an exception because it's built deep into javascript, I can't modify it...
    - except that I **can modify** the behaviour of any type coercion (including `+<var>`) if I have access to instance properties
      - it looks stupid on primitives because you need to write `new String(<var>)` but it works wonders on `class` as they return objects
- and also `.prototype` can carry you pretty far

And yes that was the short answer, to be more precise and true I would need to read through official ECMAScript docs for implementation.    
Those documents look so convoluted that I want to poke my eyes out.
