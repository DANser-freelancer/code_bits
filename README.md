`function` declarations in javascript are `hoisted`:       
- the function is interpeted and appended to the top of the enclosing function/global scope
- this happens before the scope starts execution        

This can be used to mimick Haskell functionality of [where](https://kiru.io/blog/posts/2024/dear-language-designers-please-copy-where-from-haskell/).      
The small code example of `where.js` might not seem like much, but as the complexity of the task grows, we find many more alternative paths;      
And for each alternative path we have to provide inline logic, unless we separate declaration from functionality.
