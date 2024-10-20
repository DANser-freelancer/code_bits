This is how you can make a system of custom "types" in vanilla javascript. It even has *synchronous* type checking.        
A few things to note:      
- You probably shouldn't use this in production, unless that's exactly what you want as a complicated behaviour for some of your custom objects.
- Classes can be written as factories to avoid the `new` keyword.
- I don't know if it works in async code or if it can work.
### Syntax:
- `.t` - type of the variable, actually references the <variable.constructor>
- `.v` - number primitive inside the custom type
- `._` - must be appended at the end of the expression to clear the `Signal` object. Converts the custom type as usual.   
### Structure:    
- `Signal` - global object that records every conversion/coercion.
- `#converter` - checks `Signal` to confirm conversion is allowed. Returns `.v` if true, else returns `NaN`.
```javascript
let test = new Int(6.3);
const float = new Float(7.7);
const int = new test.t(9.8); // converts number to a custom type
const converted = new float.t(int); // converts custom type to a custom type
const res = test + int + float._; // expression fails because of type conflict
const res2 = int + int + int + test._;
const res3 = int + 5 + int + int + int._;
const res4 = 5 + float._;
const res5 = float + 5; // sets up the next type to be a NaN, missing ._
const res6 = int._ + 5;
```
