## About
This a deep traversal function for irregularly shaped objects, in this case `Array`s in particular.        
The mechanism is pretty simple:    
- iterate over array entries:
  - if **is** another `Array` - recurse into it.
  - if **is not** `Array` - convert value's type.
#### Bonus:     
There is also an `Array` duplication method with a short syntax.
