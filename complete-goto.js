const { log } = console;
let goto;
let i = 0;
execution: while (true && i < 20) {
  i++;
  switch (goto) {
    case 'top':
      log(`${i} top case`);
      if (i < 4) {
        goto = 'bottom';
      } else goto = 'middle';
      continue execution;
    case 'middle':
      log(`${i} middle case`);
      if (i === 7 || (i > 3 && i < 13)) goto = 'bottom';
      continue execution;
    default:
    case 'bottom':
      log(`${i} bottom case`);
      if (i < 6) {
        goto = 'top';
      } else goto = 'middle';
      if (i > 20) {
        break execution;
      } else continue execution;
  }
}
