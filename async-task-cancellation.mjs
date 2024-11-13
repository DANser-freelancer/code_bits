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

const prom = createDeferred(
  (val) => {
    console.log(`prom 6 resolved`);
    return val;
  },
  (reason) => {
    throw new Error(reason);
  }
);

async function longTask(signal) {
  console.log(`executing long task`);

  const answer = await new Promise((resolve, reject) => {
    signal
      .then((val) => {
        console.log(val);
        resolve(7);
      })
      .catch((reason) => {
        reject(`Abort long task!\n ${reason}`);
      });
    setTimeout(() => {
      console.log(`long task response from endpoint`);
      resolve(1 + 1);
    }, 5000);
  });

  return answer;
}

// setTimeout(() => {
//   prom[0](`i don't want to wait, 7 is fine`);
// }, 2000);
setTimeout(() => {
  prom[1](`i want to cancel this`);
}, 2000);

try {
  const result = await longTask(prom[2]);
  console.log(result);
} catch (err) {
  console.error(`no result here, sorry.\n${err}`);
}
