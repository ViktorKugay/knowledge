/**
 * По данному числу 1 < n < 10^9
 * найдите максимальное число kk, для которого nn можно представить
 * как сумму kk различных натуральных слагаемых.
 * Выведите в первой строке число kk, во второй — kk слагаемых.
 */
process.stdin.on('data', data => {
  const n = Number(data);

  if (n > 2) {
    let level = 0;
    let counter = 3;
    for (let i = 3, l = 1, w = 3; i < n + 1; i++, w--) {
      if (w === 0) {
        counter++;
        l++;
        w = counter;
      }
      level = l;
    }

    const res = [];
    for (let i = 0; i < level; i++) {
      res.push(i + 1);
    }
    res.push(n - res.reduce((acc, i) => acc + i));

    console.log(res.length);
    console.log(res.join(' '));
  } else {
    console.log(1);
    console.log(n);
  }
});
