import pMemoize from 'p-memoize';

/**
 * рекурсивный вариант с кешем
 */
const memo = pMemoize(fib, {maxAge: null});

export function fib(n: number) {
  if (n <= 1) return n;

  return memo(n - 1) + memo(n - 2);
}

/**
 * итеративный вариант
 */
export function fib2(n: number) {
  let n1 = 0,
    n2 = 1;
  for (let i = 0; i < n - 1; i++) {
    [n1, n2] = [n2, n1 + n2];
  }

  return n2;
}
