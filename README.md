## About     
Very simply put [function piping](https://en.wikipedia.org/wiki/Pipeline_(software)#:~:text=The%20name%20%22pipeline%22%20comes%20from,byte%20streams%20as%20data%20objects.) is when you call a function and then pass it's output to another one (calling it) and so on.      
Javascript technically can do it but provides no syntax for it.      
Everybody keeps providing similar examples to [this](https://medium.com/@ian_grubb/function-piping-in-javascript-a125b0876a2b).      
I. don't. like it.        
Both the single `(     long parenthesis     )` and the multiple `.method.Chaining` are not my cup of tea, specifically when it comes to mimicking a pipe.       
So this here is a version that's a little bit more self evident.          
### Syntax        
```javascript      
initialFunctionWithValue(fn, arg)(fn, arg)(fn, arg)()
```    

- `initialFunctionWithValue` - start of the pipe is a pipeable function reference.
- `(fn, arg)` - middle consists of "pipe sections".
  1. `fn` refers to a function to call in this section of pipe;
  2. `arg` is where you can specify any amout of arguments to send to the `fn`.
- `()` - acts as the pipe end or "outlet" to get the final value.
There's nothing revolutionary about it, I simply like how pipe start, end, and sections are clearly defined without having to go through some method.
