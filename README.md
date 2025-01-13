## About
Have you ever wanted to have a `break` and `continue` equivalent for outer function scopes?        
I think Kotlin does it, albeit in a different way.       
Here I demonstrate the simple use of `try..catch`, `throw`, `return` that allows you to exit nested functions early.         
I specifically chose `.forEach()` because it's a looping callback caller that can't be `return`ed from.   
And to be clear `break_` is a utility function, it is irrelevant to the method itself (throw-breaking).      
|Keywords|Loop Equivalent|Result|
|:---:|:---:|:---|
|`try..catch` and `throw`| `break` | return any value, bubbling upwards through function scopes. |
|`return`|`continue`| in regular functions you can leave immediately. |
||| in "locked down" functions like callback callers you can only leave the callback, which then gets called again and again... |
            
Don't you just *love exceptions*? No, only me?        

