export function pizano(m: number) {
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
    if (pizano[length - 1] === pizano[1] && pizano[length - 2] === pizano[0]) {
      pizano.length = length - 2;
      return pizano;
    }
  }

  return pizano;
}
