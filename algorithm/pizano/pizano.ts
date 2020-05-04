/**
 * @See https://en.wikipedia.org/wiki/Pisano_period
 *
 * Задача: Даны целые числа 1 < n < 10 ^ 18 и 2 < m < 10 ^ 5,
 * необходимо найти остаток от деления nn-го числа Фибоначчи на m.
 */
export function pizano(m: BigInt) {
  const maxLength = 6n * BigInt(m);

  let n1 = BigInt(0);
  let n2 = BigInt(1);
  const pizano = [n1, n2];

  for (let i = 2; i < maxLength; i++) {
    let k = n2;
    n2 = (n1 + n2) % BigInt(m);
    n1 = k;
    pizano.push(n2 % BigInt(m));
    const length = pizano.length;
    /**
     * проверяем наличие периода
     */
    if (pizano[length - 1] === pizano[1] && pizano[length - 2] === pizano[0]) {
      /**
       * очищаем две последних цифра,
       * которые являются началом периода
       */
      pizano.length = length - 2;

      return pizano;
    }
  }

  return pizano;
}

process.stdin.on('data', data => {
  const [n, m] = data
    .toString()
    .split(' ')
    .map(BigInt);
  const period = pizano(m);
  const index = Number(n % BigInt(period.length));

  return Number(period[index]);
});
