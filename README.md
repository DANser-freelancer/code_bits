## About     
This is a rudimentary key&lock mechanism.      
`Symbol`s in javascript are unique values, which I will use as a key.       
If we encapsulate the key somewhere, and bind that key to the function, we create a function that "unlocks" only when called with the correct key.      
Initially I came up with this to make sure a class instance function only runs if I call it with a class static method.     
Bascially trying to substitute the presently unavailable/deprecated `arguments.callee`.
### Note     
Tis provides a form of `weak encapsulation` of a function's data or work.    
- by `work` I mean what a function might do with recsources it has access to
- by `data` I mean the securely stored, or calculated return value
The main flaw of this system is that it can be broken in 3 steps:
1. create a copycat function that extracts the key out to a variable
2. call static class method
3. use the stolen key to unlock the target function

I will tackle this problem in another code bit.
