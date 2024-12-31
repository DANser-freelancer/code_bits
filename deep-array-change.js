Object.defineProperties(Array.prototype, {
  L: {
    value: function ([len], alt = 0) {
      len ||= alt;
      return new Array(+len).fill(this);
    },
    configuarable: true
  },
  convertInner: {
    value: function (type, subject = this) {
      if (type === 'num') {
        for (const i in subject) {
          const val = subject[i];
          if (Array.isArray(val)) {
            val.convertInner('num');
          } else {
            // convert values only at the bottom layer
            subject[i] = Number(val);
          }
        }
      }

      return subject;
    },
    configurable: true
  }
});

const { log } = console;
const arr2D = ['38', '57'].L`2`;
const arr4D = ['828', '4.19'].L`2`.L`2`.L`2`;

log(arr4D[0][1][1], typeof arr4D[0][1][1][0]); // ['828', '4.19'] 'string'
arr4D.convertInner('num');
log(arr4D[0][1][1], typeof arr4D[0][1][1][0]); // [828, 4.19] 'number'
log(arr2D[0]); // ['38', '57']
log(arr2D.convertInner('num')[0]); // [38, 57]
