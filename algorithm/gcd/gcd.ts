/**
 * алгоритм нахождения наибольшего общего делителя
 * итеративный вариант
 */
export function gcd(a: number, b: number) {
  while (a && b) {
    if (a >= b) {
      a = a % b;
    } else {
      b = b % a;
    }
  }
  return Math.max(a, b);
}

/**
 * рекурсивный вариант нахождения наибольшего общего делителя
 */
export function gcd2(a: number, b: number) {
  if (a === 0 || b === 0) return Math.max(a, b);
  return gcd2(b % a, a);
}
