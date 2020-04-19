/**
 * Шаг слияния, выполняющий O(n^1) работы.
 * 
 * @param  {Array<number>} arr1 - неотсортированный массив
 * @param  {Array<number>} arr2 - неотсортированный массив
 * @return {Array<number>} - отсортированный массив
 */
export function merge(arr1: Array<number>, arr2: Array<number>) {
  const result = [];

  let i = 0;
  let j = 0;

  while (i < arr1.length && j < arr2.length) {
    result.push(arr1[i] < arr2[j] ? arr1[i++] : arr2[j++]);
  }

  return [...result, ...arr1.slice(i), ...arr2.slice(j)];
};

/**
 * Темп сжатия работы совпадает с темпов разрастания подзадачи, т.е.
 * на каждом шаге производится 2 рекурсивных вызова, каждый из которых
 * оперирует половиной данных с предыдущего шага. 
 * 
 * Таким образом, согласно основному методу a = b^d, т.е. 
 * сложность работы алгоритма O(n log n);
 * 
 * @param  {Array<number>} arr - неотсортированный массив
 * @return {Array<number>} - отсортированный массив
 */
export function mergeSort(arr: Array<number>) {
  if (arr.length < 2) {
    return arr;
  }

  const leftHalf = arr.slice(0, Math.floor(arr.length / 2));
  const rightHalf = arr.slice(Math.floor(arr.length / 2));

  return merge(mergeSort(leftHalf), mergeSort(rightHalf));
};

console.log(mergeSort([4, 2, 6, 3, 8, 1, 10]));
