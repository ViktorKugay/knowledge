/**
 * Задание:
 * Даны отрезки на прямой. Найти такие точки, которые лежат на всех заданных отрезках. Найденное множество должно быть минимальным по размеру.
 *
 * Формат входных данных:
 * Первая строка - количество отрезков
 * Последующие строки - координаты начала и конца отрезка, разделенные пробелом
 *
 * Формат выходных данных:
 * Первая строка - количество найденных точек
 * Вторая строка - найденные точки, разделенные пробелом
 */
process.stdin.on('data', data => {
  const sections = data
    .toString()
    .split('\n')
    .slice(1)
    .filter(Boolean)
    .map(i => i.split(' ').map(Number));

  if (sections.length === 1) return sections[0][0];
  const sortedByRightSections = sections.slice().sort((a, b) => a[1] - b[1]);

  const start = sortedByRightSections[0][1];
  const res = [start];

  for (let i = 1; i < sortedByRightSections.length; i++) {
    const [a, b] = sortedByRightSections[i];
    if (a >= res[res.length - 1]) {
      res.push(b);
    }
  }

  console.log(res.length.toString());
  console.log(res.join(' '));
});

// 1 3
// 2 5
// 3 6

// 3

// 1 10
// 2 9
// 3 8
// 4 7
// 5 6

// 6

// 1 3
// 2 5
// 5 6
// 4 7

// 3 6
