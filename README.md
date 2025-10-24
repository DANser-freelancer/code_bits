## About 
This is an implementation of a chunked callback iterator. It's like `Array.prototype.forEach()` but allows to send an arbitrary amount of entries to the callback.\
This function is compatible with all [iterables](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols#the_iterable_protocol) except custom generators on non-iterable objects.

### Syntax 
`chunkIterator(chunkSize, callback)` - callback is the last param to make binding easier.
  - `chunkSize` - the amount of entries you want to receive in one call.
  - `callback` - the function that will be called untill the iterable is exhausted.

### Notes
I tried making an object iterable by using `for..in` which didn't work as expected, using `Object.entries()` will be more expensive but also more compatible.\
I've used [iterator helpers](https://v8.dev/features/iterator-helpers) from 2024 so this requires modern JS.\
The `.forChunks()` method also works as a standalone function, you only need to replace `this` with a new parameter.\
Unlike `Array.prototype.forEach()` the `.forChunks()` method is designed to work with index-less iterables, such as `Map`, and to iterate in chunks. Therefore I cannot give the callback the current index as a second-to-last arg, but I can still give the target iterable as the last arg.\
I think `if (Iterator.from(this).drop(skip).next().done) break;` could be a little too expensive for my likinig, but it's a must have. This is the only way to know if an index-less iterable is exhausted.
