This is how you can make a system of custom "types" in vanilla javascript. It even has *synchronous* type checking.        
A few things to note:      
- You probably shouldn't use this in production, unless that's exactly what you want as a complicated behaviour for some of your custom objects.
- Classes can be written as factories to avoid the `new` keyword.
- The process of creating a new type can be generalized, then put into an abstraction, and then the process will be less verbose.
- I don't know if it works in async code or if it can work.
- Unlike in typescript, this code will continue to work at runtime. Typescript just uses compiler notes to work out the types at compile time.
  Typescript will get transpiled to javascript where all your types are gone.
- Here conversion === coercion and type == class.
### Syntax:
- `<var>.t` - type of the variable, actually references the `<var>.constructor`
- `<var>.v` - number primitive inside the custom type, read only, will trow a `TypeError` when trying to assign a new value. This is done for safety reasons. For example:
  - If you have 10 different variables pointing to `const float`, you might accidentally write `float.v = 79` and that will change the value of other 9 variables.
  - Objects are passed by reference, the restriction lets us avoid the ripple effect of changing a value.
  - We ensure that every next variable pointing to one instance of custom type, will have the same behaviour as creating variables pointing to a primitive.
  - If you need a new value of type `Float` you will have to use `new Float(<val>)` or `new float.t(<val>)` or `(<val>).float`
  - You can safely increment the `<var>` itself, which will convert it to a primitive or reassign it, which will drop the custom type object. More on that in the Advanced section.
- `<var>._` - must be appended to the last custom type in the expression, to clear the `Signal` object. Returns result of `#converter`
- `(<num>).int` - getter attached to `Number` global object. Returns `<num>` converted to an `Int`, works on custom types and primitive numbers
  - Has the effect of `._`
- `(<num>).float` - getter attached to `Number` global object. Returns `<num>` converted to a `Float`, works on custom types and primitive numbers
  - Has the effect of `._`
- `(<num>).str` - getter attached to `Number` global object. Returns `<num>` converted to a `String`, works on custom types and primitive numbers
  - Has the effect of `._`
### Structure:    
- `Signal` - global object that records last conversion/coercion.
  - `Signal.coercion` - a property to record the last converted custom type. Must equal `null` or `<var>.t.name`
- `#converter` - checks `Signal` to confirm if conversion is allowed. Stores the currently converted type in `Signal.coercion`. Returns `.v` if true, else returns `NaN`
- `<var>.t` - a constructor of `<var>`
  - `<var>.t.name` - the name of the type. Used in the `#converter` to determine the type and check if it can be used with the preceding one, stored in `Signal.coercion`
  - `<var>.t.(<num>)` - returns `<num>` converted to a new instance of the same type as `<var>`
### Code:
```javascript
const test = new Int(6.3);
const float = new Float(7.7);
const int = new test.t(9.8); // converts number to a custom type
const converted = new float.t(int); // converts custom type to a custom type
const res = test + int + float._; // expression fails because of type conflict
const res2 = int + int + int + test._;
const res3 = int + 5 + int + int + int._;
const res4 = 5 + float._;
const isix = (6.7).int; // repackages a number to be of Int type
const fsix = (6.7).float; // repackages a number to be of Float type
const res5 = ((float / 2) * 7 + float).int; // works on expresions, eliminates the need for ._
const res6 = float + 5; // sets up the next type to be a NaN, missing ._
const res7 = int._ + 5;
const res8 = (int / 5 + 12).str; // repackages a number to be a String()
const res9 = int.str; // works on custom types
const res10 = (+res8).int; // a way to convert a string to custom type
```
### Advanced tech:      
Incrementing a custom type inevitably coerces it to a number primitive.      
To avoid breaking next expressions down the line you must end them with `._` or `.$`, so is the case here.    
Any of the `res13` assignments in the example work, with a few key differences:    
- `._` - returns a number primitive
- `.$` - returns an instance of the last used type, or `Number` for number primitives
- `._`&`.$` - returns `Number`
- `.$`&`._` - returns number primitive
```javascript
let res13 = (int * 4 + int - int * 2).$;
res13++;
res13++;
res13++;
res13++;
res13 += 4;
// res13 = (res13 + 4)._;
res13 = (res13 + 4).$;
// res13 = res13._;
// res13 = res13.$;
```
As outlined earlier, increments to the `<var>.v` iself are prohibited.    
Which is why I provided a very flexible generator for incrementing a custom type and getting it back as a **new** instance of the same custom type.    
- The generator is bound to the instance of the custom type from which you get that generator with `<var>.i`
  - this makes sure that no matter what you did before calling `<generator>.return()`, the value will be of the correct custom type
  - the staring value is equal to `<var>.v`
  - intermediate value is equal to the current state of `<generator>{val}`. You get it from `<generator>.next().value`
  - the returned value is equal to `new <var>.t(<generator>.return().value)`. You get it from `<generator>.return().value`
- `<generator>.next(<callback>)` accepts a function that tells it what to do with the primitive number value inside it
  - this means that on each iteration you can change what happens to the value stored in the generator
- The generator will have no effect on the expressions executed before, together wih, or after it
  - `<generator>.return()` and `<generator>.next()` don't write or read `Signal.coercion`
- Note that your `<callback>` can affect `Signal.coercion` if you use something like `._` inside it
- You must eventually call `<generator>.return()`, either to get a return value or to release the generator and speed up the garbage collection.
- The generator runs an unrestricted `while(true)` loop, **do not rely on `<generator>.next().done`**
```javascript
const cbk = (a) => {
  return a * 1.6;
};
const gen = test.i;
gen.next(cbk); // cold start
for (let i = 0; i < 4; i++) {
  const out = gen.next(cbk).value;
  console.log(out);
}
const res15 = gen.return().value;
```
### Bonus:      
- `(1)._` or `(1).$` - can be used like a nameless operation to clean up `Signal.coercion`, to make sure that next expressions don't break.
- `+float` - unary operator coercion, works the same way as with numbers. Returns number primitive value
- `''+float` - string unary operator coercion, works the same way as with numbers. Returns string primitive value
- `typeof float` - working as intended, mildly unexpected, returns `'object'`
- `typeof +float` - working as intended, returns `'number'`
- `float instanceof Float` - working as intended, returns `true`. Also `true` for `Number` and of course `false` for `Int`
- `for in float` will do nothing
- `'t' in float` will return `true`
- `for of float` will throw an error as it is not iterable
