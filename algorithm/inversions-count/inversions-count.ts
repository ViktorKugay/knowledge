/**
 * Алгоритм имеет замечательную асимптотику и за счёт работы только с исходным массивом
 * и заранее аллоцированным массивом результатов достигаются приемлимые параметры использования
 * дополнительной памяти и времени работы алгоритма
 */

/**
 * Инициализируем шаг "разделения"
 * 
 * @param arr - массив для разделения
 * @param n - длинна этого массива
 */ 
function mergeSort(arr, n) {
  // temp_arr - заранее аллоцированный результирующий массив
  // создание массивов и копирование в них элементов на этапе 
  // merge занимает время, поэтому лучше создать массив заранее 
  // и работать с ним
  const temp_arr = Array(n).fill(0);
  return _mergeSort(arr, temp_arr, 0, n - 1);
}

/**
 * Шаг "разделения"
 * 
 * @param arr - массив для разделения
 * @param temp_arr - заранее аллоцированный массив с результатом 
 * @param left - левая крайняя точка
 * @param right - правая крайняя точка
 */
function _mergeSort(arr, temp_arr, left, right) {
  // cчётчик инверсий
  let inv_count = 0;
  // вычисляем только если имеем больше одного элемента 
  // в массиве для подсчёта числа инверсий
  if (left < right) {
    // середина массива; для массив нечётной длинны - округлённая вниз
    const mid = Math.floor((left + right) / 2);
    // рекурсивно вычисляем чисо инверсий в разделённых половинах
    inv_count += _mergeSort(arr, temp_arr, left, mid);
    inv_count += _mergeSort(arr, temp_arr, mid + 1, right);
    // сливаем обе половины и добавляем в результат найденное количество инверсий
    inv_count += merge(arr, temp_arr, left, mid, right);
  }

  return inv_count;
}

/**
 * 
 * @param arr - исходный массив
 * @param temp_arr - отсортированный массив
 * @param left - значение крайней левой точки
 * @param mid - значение середины
 * @param right - значение правой крайней точки
 */
function merge(arr, temp_arr, left, mid, right) {
  // индекс элемента из левой половины
  let i = left;
  // индекс элемента из правой половины
  let j = mid + 1;
  // начальный индекс отсортированного массива
  let k = left;
  // локальный счётчик инверсий
  let inv_count = 0;

  while (i <= mid && j <= right) {
    if (arr[i] <= arr[j]) {
      temp_arr[k] = arr[i];
      k += 1;
      i += 1;
    // если нарушается порядок сортировки, значит имеют место быть инверсии
    } else {
      temp_arr[k] = arr[j];
      inv_count += mid - i + 1;
      k += 1;
      j += 1;
    }
  }
  // копируем оставшиеся элементы из левой части в результирующий массив
  while (i <= mid) {
    temp_arr[k] = arr[i];
    k += 1;
    i += 1;
  }
  // копируем оставшиеся элементы из правой части в результирующий массив
  while (j <= right) {
    temp_arr[k] = arr[j];
    k += 1;
    j += 1;
  }
  // копируем отсортированный массив в исходный массив
  for (let loop_var = left; loop_var < right + 1; loop_var++) {
    arr[loop_var] = temp_arr[loop_var];
  }

  return inv_count;
}

const arr = [10, 8, 6, 2, 4, 5];
const n = arr.length;
const result = mergeSort(arr, n);
console.log('Number of inversions are', result);