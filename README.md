## Float64Array

```mermaid
---
config:
  xyChart:
    height: 380
    xAxis:
      tickLength: 7
    yAxis:
      tickLenght: 7
  themeVariables:
    xyChart:
      plotColorPalette: "#0072B2,#56B4E9,#D55E00,#E69F00"
---
xychart-beta
title "Average iteration time of `for` and `iterator`"
%% if you see this text, try https://mermaid.live/
x-axis "Array size" ["10k", "100k", "1m", "10m", "100m"]
y-axis "Time in milliseconds"

line "for" [0.88, 1.9, 8.99, 26.17, 195.85]
line "forOfNative" [1.99, 3.48, 15.54, 128.07, 1246.56]
line "forOfGeneric" [2.13, 4.17, 27.88, 246.16, 2458.06]
line "forOfOptimized" [1.63, 3.11, 15.34, 75.61, 664.39]
```

## Array

```mermaid
---
config:
  xyChart:
    height: 380
    xAxis:
      tickLength: 7
    yAxis:
      tickLenght: 7
  themeVariables:
    xyChart:
      plotColorPalette: "#0072B2,#56B4E9,#D55E00,#E69F00"
---
xychart-beta
title "Average iteration time of `for` and `iterator`"
%% if you see this text, try https://mermaid.live/
x-axis "Array size" ["1k", "10k", "100k", "1m", "10m"]
y-axis "Time in milliseconds" 1 --> 220

line "for" [0.05, 0.71, 1.09, 2.65, 11.22 ]
line "forOfNative" [0.11, 1.85, 3.36, 13.36, 104.21]
line "forOfGeneric" [0.23, 1.95, 4.51, 27.07, 213.71]
line "forOfOptimized" [0.23, 1.94, 3.15, 13.27, 59.34]
```

### Conditions

Using `performance.now()` in Nodejs `v24` I calculated averages for 4 runs (program start, console log, program end).  
The goal was to iterate over all entries of an array filled with random numbers.  
The workload was one `if..else` to either add or subtract `value**2` from an accumulator variable. The loops were basically empty.  
The charts show 4 contenders:

1. a regular `for` loop, marked in dark blue.
2. `for of` using native generator, marked in bright blue.
3. `for of` using generator syntax sugar (`function*`), marked in dark orange.
4. `for of` using a hand rolled, optimized implementation of the [iterator protocol](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols#the_iterator_protocol), marked in bright orange.
   - it returns the same object (with updated `.value`) every time.

> [!IMPORTANT]
> Could not test `Array` with 100m entries due to `RangeError: Invalid array length` in the loop used to fill arrays with random numbers.

### Observation

A `Float64Array` is a contiguous, type constrained block of binary memory. It's very consistent.  
An `Array` is a contiguous block of pointers to random places in memory. It's less predictable.  
Generally, an iterated generator will create discardable objects and constantly call `.next()`.  
Loop **4** closely follows loop **2** up to ~1m iterations.  
All loops take practically the same amount of time up to ~1m iterations. _More testing is required, with real workload._  
Despite all loops taking practically the same amount of time, technically a `for` loop was always faster. Specifically (at 100m iterations):

- loop **2** was ~12 times slower.
- loop **3** was ~11 times slower.
- loop **4** was ~3.4 times slower.

### Conclusion

<u>Up to the reader.</u>
