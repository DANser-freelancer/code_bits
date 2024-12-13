## About     
Very simply put **function piping** is when you call a function and then pass it's output to another one (calling it) and so on.      
Javascript technically can do it but provides no syntax for it.      
Everybody keeps providing similar examples to [this](https://medium.com/@ian_grubb/function-piping-in-javascript-a125b0876a2b).      
I. don't. like it.        
Both the single `(     long parenthesis     )` and the multiple `.method.Chaining` are not my cup of tea, specifically when it comes to mimicking a pipe.       
So here is a version that's a little bit more self evident, `initialFunctionWithValue(function, any args)(pipe here)(next pipe here)()`.     
`()` acts as the pipe end or "outlet" to get the final value.
