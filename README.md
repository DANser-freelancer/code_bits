This is how you can make a system of custom "types" in vanilla javascript. It even has *synchronous* type checking.        
A few things to note:      
- You probably shouldn't use this in production, unless that's exactly what you want as a complicated behaviour for some of your custom objects.
- Classes can be written as factories to avoid the `new` keyword.
- I don't know if it works in async code or if it can work.
