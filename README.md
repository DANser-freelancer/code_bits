### About
In this code I have attempted to recreate task cancellation by using `Promise` object with exposed `reject` handle to break out of an async function.      
To build exposed `Promise`s I have used a technique shown in this [code bit](https://github.com/DANser-freelancer/code_bits/tree/deferred-promise-factory)
1. `longTask` awaits a timer in a promise to imitate a long running request that one might have in an async function.      
2. The main program *cancels* `longTask` after 2 sec and catches a cancellation exception (error).
   - `longTask` was awaiting a `Promise`, when that promise was initialized it was "hooked up" to `signal` promise
   - once the signal was rejected the `.catch()` microtask rejected the `await new Promise` part of `longTask`
   - which in turn rejected the `await longTask()` promise and had to be handled like any other promise rejection     
3. The `timer` contained in the `longTask` still executes because it was set immediately, 2 sec before `longTask` was cancelled.        
   - this is nothing but a quirk of the testing environment
   - normally `longTask` would send something like a server request and await response
     - once `longTask` is cancelled it should then properly cancel whatever request it has made previously (which must be programmed by you)
#### Bonus       
Because I used a `Promise` object, it is also possible to `resolve` a promise early.
- it will skip the waiting period and let the `longTask` execute untill next `await` or `return`
- it will also allow you to avoid rejection/cancellation exceptions and return some default value instead
### Note
This example is meant for **educational purposes**, and can be used to create custom async functions with behavior similar to `fetch` with `AbortController` signal.       
The code can be written in a nicer looking way, and a factory function can be created for easier initialization syntax.    
The mechanism is similar to how events like `'abort'` from `AbortController.signal` work.
- you subscribe a promise to an event emitting object by giving it a callback with the `reject` handle to activate once the event is emitted
- emitting an event just means calling every subscribed callback in a loop

Even though this code bit is technically perfectly functional, many programmers might find it too complicated and or cumbersome.
For real world creation of cancellable async functions I advise you to use `Promise` objects in combination with `AbortController` or some class extension of `EventEmitter` (nodejs).
#### Rare use case      
I recently had to implement a way to cancel a `Promise` awaiting a worker thread, in case the program got stuck because 10 operations were queued and each took 10 minutes to complete.        
Using an extension of `EventEmitter` I was able to cancel a `Promise` programmatically (in this case after a timeout), in order to let the main program exit. 
