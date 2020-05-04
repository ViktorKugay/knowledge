/**
 * Задача на программирование: непрерывный рюкзак
 */
process.stdin.on('data', (data: any) => {
  const knapsak = data
    .toString()
    .split('\n')
    .slice(0, 1);

  let knapsakCapacity = Number(knapsak[0].split(' ')[1]);

  const items = data
    .toString()
    .split('\n')
    .slice(1)
    .filter(Boolean)
    .map(i => i.split(' ').map(Number));

  const storage = items.map(([sum, capacity]) => ({
    sum,
    capacity,
    amount: sum / capacity,
  }));
  storage.sort((a, b) => b.amount - a.amount);

  let res = 0;
  for (const {amount, capacity} of storage) {
    for (let c = capacity; c > 0; c--) {
      if (knapsakCapacity > 0) {
        res += amount;
        knapsakCapacity -= 1;
      }
    }
  }
  console.log(res.toFixed(3));
});

// 3 50
// 60 20
// 100 50
// 120 30
