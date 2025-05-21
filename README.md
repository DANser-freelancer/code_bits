This is literally all that you need to detect Proxies in the same realm (global scope).        
I don't believe it would be too hard for the ECMAScript spec to implement a forced automatic version of this.       
Why detect Proxies? For a number of reasons involving the issue of a `Proxy` technically being a wrapper.      
For example - you can't access private fields, there's not even a way to redirect them through the handler.
