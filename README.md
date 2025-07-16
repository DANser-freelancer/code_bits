## About      
Despite JS not having a functioning `goto` keyword, the goto mechanism can be easily simulated.         
Both `while` and `switch` are **control flow constructs**, they are also statements and can therefore be labeled to target them with `break` and `continue` (see [labeled statements](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/label)).         
[switch](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/switch) is especially interesting; the `case`s act more like pointers to where the execution will start, after a match it will ignore all `case` clauses until the end of the `switch` or a `break`.        
You can also give each `case` it's own block statement to provide a separate scope, and to be able to label (and back out of) individual cases (which will then cotinue executing the `switch` code below).

## How this works
By matching goto names I effectively select the desired regions of code, unlike an `if..else if` chain - every line down from the selected goto will execute as if you simply jumped around the source file.       
I used a sentinel value in the loop but you could design your gotos in a way that is always guaranteed to eventually `break` execution.        
All the labels, breaks, continues, and cases are actually JIT compiled into literal jumps to specific memory regions of machine code (very efficient). Though `switch` has a few conditions to be a jump table:        
- All cases must be literal primitives. Variables, templates, anything not immediately discernable will not work;
- The case sparsity must be reasonably low. A jump table will take the case values and factor them into jump addresses. For a switch of case 10 and case 1'000'000 JIT would have to create 2 jumps that do anything and pad a giant space of 999'998 with `default`.
