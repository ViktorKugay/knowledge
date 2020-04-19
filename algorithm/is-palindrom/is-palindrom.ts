// функция предикат для определния палиндрома
function isPalindrome(x) {
  if (x.length === 1) {
    return true;
  }

  const string = String(x);
  const length = string.length;

  let pivot = length / 2;

  if (length === 2) {
    return string[0] === string[1];
  }

  if (pivot % 2 !== 0) {
    pivot = Math.floor(pivot);
  }

  const list = string.split('');

  for (let i = 0; i < pivot; i++) {
    if (list[i] !== list[length - i - 1]) {
      return false;
    }
  }

  return true;
}
