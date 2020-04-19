export function mergeSort(arr: number[]) {
    if (arr.length < 2) {
        return arr; // базовый случай рекурсии
    }
    /**
     * классический пример алгоритма разделяй и властвуй,
     * когда степень сжатия работы превышает скорость
     * разрастания подзадачи
     */
    const middle = Math.floor(arr.length / 2);
    const leftHalf = arr.slice(0, middle);
    const rightHalf = arr.slice(middle);

    /**
     * после разделения всех массивов, выполняяем 
     * слиянеие в нужном порядке
     */
    return merge(mergeSort(leftHalf), mergeSort(rightHalf));
}

function merge(a: number[], b: number[]) {
    const result = [];
    let i = 0, j = 0;
    
    /**
     * выполняется слияние двух массивов
     * время работы О(a.length + b.length)
     */
    while(i < a.length && j < b.length) {
        if (a[i] < b[j]) {
            result.push(a[i++]);
        } else {
            result.push(b[j++]);
        }
    }

    /**
     * т.к. один из массивов закончится раньше другого, 
     * необходимо добавить оставшиеся значения в 
     * результирующий массив
     */
    return [...result, ...a.slice(i), ...b.slice(j)];
}