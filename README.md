This is literally all that you need to detect Proxies in the same realm (global scope).        
I don't believe it would be too hard for the ECMAScript spec to implement a forced automatic version of this.       
Why detect proxies? For a number of reasons involving the issue of a `Proxy` technically being a wrapper, for example you can't access private fields.
