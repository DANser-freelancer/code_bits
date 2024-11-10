function createDeferred(fn, problem) {
  const controls = new Array(3);
  const promise = new Promise((resolve, reject) => {
    controls[0] = resolve;
    controls[1] = reject;
  })
    .then(fn)
    .catch(
      problem ??
        ((err) => {
          console.error(err);
          return err;
        })
    );
  controls[2] = promise;
  return controls;
}

const prom = createDeferred((val) => {
  console.log(val);
  return val;
});
const prom2 = createDeferred((val) => {
  console.log(val);
  return val;
});
const prom3 = createDeferred((val) => {
  console.log(val);
  return val;
});
const prom4 = createDeferred(
  (val) => {
    console.log(val);
    return val;
  },
  (err) => {
    console.error(`I caught this reason, here it is: `, `\n`, err);
  }
);
const prom5 = createDeferred((val) => {
  console.log(val);
  return val;
});
prom2[2].then((val) => {
  prom5[0](`I waited for promise 2, there's the answer: \n ${val}`);
});

setTimeout(() => {
  prom2[0](`this should be the last one`);
}, 100);
prom[0](`i like it`);
prom3[1](`i dont't like it`);
prom4[1](`i dont't like this either`);
console.log(prom3[2]);
