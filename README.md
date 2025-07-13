## About      
Despite JS not having a functioning `goto` keyword, the goto mechanism can be easily simulated.         
Both `while` and `switch` are control flow constructs, they are also statements and can therefore be labeled to target them with `break` and `continue` (see [labeled statements](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/label)).         
[switch](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/switch) is especially interesting; the `case`s act more like pointers to where the execution will start, and it will keep going down until the end of the `switch` or a `break`.        
You can also give each `case` it's own block statement to provide a separate scope, and to be able to label (and back out of) individual cases.

## How this works
By matching goto names I effectively select the desired regions of code, unlike an `if..else if` chain - every line down from the selected goto will execute as if you simply jumped around the source file.       
I used a sentinel value in the loop but you could design your gotos in a way that is always guaranteed to eventually `break` execution.
