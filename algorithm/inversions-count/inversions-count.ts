/**
 * массив удобнее обрабатывать в объекте, чтобы каждая
 * составная часть массива хранила информацию о 
 * количестве инверсий для дальнейшего суммирования и 
 * подсчёта на шаге слияния
 */
interface ArrayEntity {
    count: number; // количество найденных инверсий в массиве
    arr: number[];
}
/**
 * почти классический алгоритм слияния из mergeSort
 */
function inversionsCount(a: ArrayEntity, b: ArrayEntity) {
    /**
     * суммируем количество инверсий в обоих массивах
     */
    let count = a.count + b.count;
    let i = 0, j = 0;
    let temp = [];
    while(i < a.arr.length && j < b.arr.length) {
        if (a.arr[i] < b.arr[j]) {
            temp.push(a.arr[i++]);
        } else {
            temp.push(b.arr[j++]);
            /**
             * если значение из правой половины меньше, 
             * чем из левой, значит в последовательности
             * эти числа образуют инверсию, обрабатываем
             * значение и увеличиваем счётчик инверсий
             */
            count += a.arr.length - i;
        }
    }

    temp = [...temp, ...a.arr.slice(i), ...b.arr.slice(j)];
    return {arr: temp, count};
}

export function mergeSort(arr: ArrayEntity) {  
    /**
     * базовый случай рекурсии
     */
    if (arr.arr.length < 2) {
        return arr;
    }
    /**
     * используем обычный алогритм сортировки слиянием
     */
    const middle = Math.floor(arr.arr.length / 2);
    const leftHalf = {count: arr.count, arr: arr.arr.slice(0, middle)};
    const rightHalf = {count: arr.count, arr: arr.arr.slice(middle)};

    return inversionsCount(mergeSort(leftHalf), mergeSort(rightHalf));
}