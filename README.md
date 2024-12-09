## About     
This is a rudimentary key&lock mechanism.      
`Symbol`s in javascript are unique values, which I will use as a key.       
If we encapsulate the key somewhere, and bind that key to the function, we create a function that "unlocks" only when called with the correct key.       
### Note     
Tis provides a form of `weak encapsulation` of a function's data or work.    
- by `work` I mean what a function might do with recsources it has access to
- by `data` I mean the securely stored, or calculated return value
The main flaw of this system is that it can be broken in 3 steps, 
