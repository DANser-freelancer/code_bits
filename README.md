### Output:
- `Promise { <pending> }`     
- i like it     
- i dont't like it    
- **I caught this reason, here it is:**
  - **i dont't like this either**     
- this should be the last one     
- I waited for promise 2, there's the answer:    
  - this should be the last one
#### Footnotes
The format [resolve, reject, promise] is randomly made up.      
Every index is a **reference** that you can pass anywhere you want, `[<function>, <function>, <Promise>]`.     
If you await a rejected promise it will squash the reject error and let you continue, but that can always be changed in the factory function.       
  - you could remove the default `.catch()` function I have here so that it only runs manually given functions. 
