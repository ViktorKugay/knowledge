/**
 * Для целочисленного умножения используется метод Гаусса, который позволяет
 * экономить на одном рекурсивном вызове, что позволяет достичь времени работы
 * алгоритма O(n^log2(3));
 *
 * Время работы рассчитывается исходя из рекурентного соотношения вида
 * T(n) <= a * T(n / b) + O(n^d), где
 *
 * а - число рекурсивных вызовов
 * b - коэффициент с которым размер входных данных сжимается
 * d - экспонента работы, вполняемой вне рекурсивных вызовов
 *
 * Итого, в данном случае a > b^d?, в соответствии с основным методом это дает время работы
 *
 * O(n^log b(a)), что алгоритма Каратсубы с применением метода Гаусса дает О(n^log2(3));
 *
 * @param  {Number} x - первый множитель
 * @param  {Number} y - второй множитель
 * @return {Number} - результат целочисленного умножения
 */
export function karatsuba(x: number, y: number) {
  // базовый случай рекурсии, в котором происходит
  // целочисленое умножение однозначных чисел
  if (x < 10 && y < 10) {
    return x * y;
  }

  let sX = String(x);
  let sY = String(y);

  // дополнение y до длинны x
  if (sX.length > sY.length) {
    sY = sY.padStart(sX.length, '0');
  }

  // дополнение x до длинны y
  if (sX.length < sY.length) {
    sX = sX.padStart(sY.length, '0');
  }

  const xHalf = Math.floor(sX.length / 2);
  const yHalf = Math.floor(sY.length / 2);

  const a = sX.substr(0, xHalf);
  const b = sX.substr(xHalf);
  const c = sY.substr(0, yHalf);
  const d = sY.substr(yHalf);

  const n = sX.length % 2 === 0 ? sX.length : sX.length + 1;

  // применяем метод Гаусса, который
  // позволяет экономить один рекурсивный вызов
  const p = Number(a) + Number(b);
  const q = Number(c) + Number(d);

  const pq = karatsuba(p, q);
  const ac = karatsuba(Number(a), Number(c));
  const bd = karatsuba(Number(b), Number(d));

  const adbc = pq - ac - bd;

  // производим вычисления согласно алогоритму Каратсубы
  return 10 ** n * ac + 10 ** (n / 2) * adbc + bd;
}

console.log(karatsuba(534211, 4231));
