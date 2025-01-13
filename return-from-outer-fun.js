const { log } = console;

function break_(fn, msg, bubbles) {
  let i = null;
  try {
    fn();
  } catch (index) {
    i = index;
    log(typeof index, index, new Error(msg));
  } finally {
    if (bubbles) throw i;
  }
}

void (function main(arr) {
  function first() {
    function second() {
      function third() {
        arr.forEach((v, i) => {
          log(v, i);
          if (i > 5) throw i;
        });
      }

      break_(third, `to get the trace when calling third`, true);
    }
    second();
  }

  break_(first, `to get the trace when calling first`);
})(new Array(1000).fill(Math.random() * 100));
